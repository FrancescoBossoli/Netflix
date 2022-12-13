import { Subscription } from 'rxjs';
import { DeliverService } from '../../services/deliver.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccessService } from 'src/app/services/access.service';
import { AccessData } from 'src/app/interfaces/access.interfaces';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  email:string = "";
  emailValidation: boolean = true;
  failedAttempt:boolean = false;
  subscriptions:Subscription[] = [];
  loggedUser!: AccessData|null;
  @ViewChild('emailForm') form!: NgForm;


  constructor(private router:Router, private deliverSrv:DeliverService, private accessSrv:AccessService) { }

  async ngOnInit(): Promise<void> {
    await this.subscriptions.push(this.accessSrv.user$.subscribe(data => this.loggedUser = data));
  } 

  submit() {
    if (this.form.form.status != "INVALID") {
      this.deliverSrv.setEmail(this.email);
      this.router.navigate(['/signup']);
    }
    else {
      this.failedAttempt = true;
    }
  }
}
