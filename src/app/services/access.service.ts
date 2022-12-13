import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError, Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AccessData, SignupData, LoginData } from '../interfaces/access.interfaces';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})

export class AccessService {

  jwtHelper = new JwtHelperService()
  private authSubject = new BehaviorSubject<AccessData|null>(null);
  user$ = this.authSubject.asObservable();
  timeGranted: any;
  loggedUser:User|undefined;
  private token!:string;

  constructor(private http: HttpClient, private router: Router) {

    this.keepLogged()
  }

  login(credentials:LoginData) {
    return this.http.post<AccessData>(environment.apiUrl + "/api/login", credentials).pipe(tap((data) => {
      this.generateToken(data);
    }), catchError(this.errors));
  }

  keepLogged() {
    const apparentToken = localStorage.getItem('netflixclone');
    if (!apparentToken) return;
    const userData:AccessData = JSON.parse(apparentToken);
    if (this.jwtHelper.isTokenExpired(userData.accessToken)) return;
    this.authSubject.next(userData);
    this.autoLogout(userData)
  }

  signup(data:SignupData) {
    return this.http.post<AccessData>(environment.apiUrl + "/api/register", data).pipe(tap((data) => {
      this.generateToken(data);
    }), catchError(this.errors));
  }

  generateToken(data:AccessData) {
    this.authSubject.next(data);
    localStorage.setItem('netflixclone', JSON.stringify(data));
    this.autoLogout(data)
  }

  updateEmail(email:string, password:string, user:User) {
    this.http.put<any>(environment.apiUrl + "/api/users/" + user.id, {"email":email, "password":password, "name":user.name, "surname":user.surname}).subscribe({
        next: data => {
            console.log(data);
        },
        error: error => {
            console.log(error.message);
            console.error('There was an error!', error);
    }   });
  }

  deleteUser(userId:number) {
    this.http.delete<any>(environment.apiUrl + "/api/users/" + userId).subscribe({next: data => {
      console.log(data);
      this.logout();
    },
    error: error => {
        console.log(error.message);
    }});
  }

  logout() {
    this.authSubject.next(null);
    this.loggedUser = undefined;
    localStorage.removeItem('netflixclone')
    this.router.navigate(['/'])
    if (this.timeGranted) {
      clearTimeout(this.timeGranted)
    }
  }

  autoLogout(data:AccessData) {
    this.loggedUser = data.user;
    const expirationDate = this.jwtHelper.getTokenExpirationDate(data.accessToken) as Date
    const timeLeft = expirationDate.getTime() - new Date().getTime()
    this.timeGranted = setTimeout(() => {
      this.logout()
    }, timeLeft);
  }

  getToken() {
    this.authSubject.subscribe(data => data? this.token = data.accessToken : this.token = "");
    return this.token;
  }

  private errors(err: any) {
    switch (err.error) {
      case "Email and password are required":
        return throwError(() => new Error("Email e password sono necessarie"));
      case "Email already exists":
        return throwError(() => new Error("Utente gia registrato"));
      case "Email format is invalid":
        return throwError(() => new Error('Il campo "email" presenta errori'));
      case "Cannot find user":
        return throwError(() => new Error("Non è stato trovato alcun utente corrispondente ai dati inseriti"));
      default:
        return throwError(() => new Error("Errore nella chiamata"));
    }
  }
}
