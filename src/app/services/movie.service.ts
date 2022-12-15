import { AccessService } from 'src/app/services/access.service';
import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Watchable } from '../interfaces/watchable.interface';
import { BehaviorSubject, catchError, Observable, tap, Subscription } from 'rxjs';
import { Favourite } from '../interfaces/favourite.interface';
import { Genres } from '../interfaces/genres';



@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private url:string = "https://api.themoviedb.org/3";
  private apiString:string = `?api_key=${environment.apiKey}&language=it`;
  mostWatched:Watchable[] = [];
  private favouriteList = new BehaviorSubject<Favourite[]|null>(null);
  favourites$ = this.favouriteList.asObservable();
  subscriptions: Subscription[] = [];
  userId?:number;

  constructor(private http:HttpClient, private accessSrv:AccessService) {
    this.subscriptions.push(this.accessSrv.user$.subscribe(data => this.userId = data?.user.id))
    this.subscriptions.push(this.getFavourites(this.userId!).subscribe(data => this.favouriteList.next(data)));
  }

  getHeaders(token:string) {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getFavourites(userId:number):Observable<Favourite[]> {
    return this.http.get<Favourite[]>(environment.apiUrl + "/api/favorites?userId=" + userId)
  }

  setFavourite(userId:number, movieId:number) {
    return this.http.post(environment.apiUrl + "/api/favorites", {"movieId": movieId, "userId": userId})
  }

  deleteFavourite(id:number) {
    return this.http.delete(environment.apiUrl + "/api/favorites/" + id)
  }

  getLatest():Observable<Watchable[]> {
    return this.http.get<Watchable[]>(environment.apiUrl + "/movie/most_watched")
  }

  getTrending():Observable<Watchable[]> {
    return this.http.get<Watchable[]>(environment.apiUrl + "/movie/trending")
  }

  getPopular():Observable<Watchable[]> {
    return this.http.get<Watchable[]>(environment.apiUrl + "/movie/popular")
  }

  getTopRated():Observable<Watchable[]> {
    return this.http.get<Watchable[]>(environment.apiUrl + "/movie/top_rated")
  }

  getLatestReal():Observable<Watchable[]> {
    return this.http.get<Watchable[]>(environment.apiUrl + "/movie/latest")
  }

  getCults():Observable<Watchable[]> {
    return this.http.get<Watchable[]>(environment.apiUrl + "/movie/cults")
  }

  getTvSeries(): Observable<Watchable[]> {
    return this.http.get<Watchable[]>(environment.apiUrl + "/tv/series")
  }

  setMostWatched(movie:any, token:string) {
    const headers = this.getHeaders(token);
    this.http.post(environment.apiUrl + "/movies-most-watched", JSON.stringify(movie), {headers})
  }

  getAdditionalInfo(type:string, id:number) {
    if (type == "tv-series") {
      type = "tv";
    }
    return this.http.get<any>(environment.realApi + type + "/" + id + "?api_key=" + environment.apiKey + "&language=it&append_to_response=videos")
  }

  getGenres() {
    return this.http.get<Genres[]>(environment.apiUrl + "/genres")
  }

}
