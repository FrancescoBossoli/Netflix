import { DeliverService } from '../../services/deliver.service';
import { AccessData } from './../../interfaces/access.interfaces';
import { AccessService } from './../../services/access.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { lastValueFrom, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  name: string = "";
  surname: string = "";
  password: string = "";
  email: string = "";
  failedAttempt:boolean = false;
  subscriptions:Subscription[]=[];
  @ViewChild('signupForm') form!: NgForm;

  isLoading=false
  
  constructor(private accessSrv:AccessService, private router:Router, private deliverSrv:DeliverService) { }

  async ngOnInit(): Promise<void> {
    if (this.deliverSrv.email$ != null || this.deliverSrv.email$ != undefined || this.deliverSrv.email$ || "") {
      await this.subscriptions.push(this.deliverSrv.email$.subscribe(data => this.email = data));
    }
  }

  async onsubmit() {
    if (this.form.form.status != "INVALID") {
      this.isLoading=true;
      console.log(this.form.value)
      try {
        const subscription$ = this.accessSrv.signup(this.form.value);
        let data = await lastValueFrom(subscription$) as AccessData;
        
        this.router.navigate(['/'])
        this.isLoading=false
      } catch (error) {
        console.error(error)
        this.isLoading=false
      }
    }
  }
}
