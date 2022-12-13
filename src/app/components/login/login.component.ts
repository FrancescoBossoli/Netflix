import { AccessService } from './../../services/access.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email:string = "";
  password:string = "";
  isLoading = false
  errorMessage = undefined
  failedAttempt:boolean = false;
  @ViewChild('loginForm') form!: NgForm;

  constructor(private accessSrv:AccessService,private router:Router) {}

  ngOnInit(): void {
    this.accessSrv.keepLogged();
  }

  async onsubmit(){
    if (this.form.form.status != "INVALID") {
      try {
        const loginAttempt$ = this.accessSrv.login(this.form.value);
        let data = await lastValueFrom(loginAttempt$);
        console.log(data);
        this.form.form.reset()
        this.errorMessage=undefined
        this.router.navigate(['/'])
      } catch (error:any) {
        this.errorMessage = error
        console.error(error)
      }
    }
    else {
      this.failedAttempt = true;
    }
  }
}
