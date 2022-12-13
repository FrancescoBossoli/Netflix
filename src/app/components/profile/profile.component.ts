import { AccessService } from 'src/app/services/access.service';
import { Subscription } from 'rxjs';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AccessData } from 'src/app/interfaces/access.interfaces';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  loggedUser!:AccessData|null;
  subscriptions:Subscription[]=[];

  constructor(private accessSrv:AccessService) { }

  async ngOnInit(): Promise<void> {
    await this.subscriptions.push(this.accessSrv.user$.subscribe(data => this.loggedUser = data));    
  }

  @ViewChild('email') email!:ElementRef;
  @ViewChild('password') password!:ElementRef;
  @ViewChild('instruction') instruction!:ElementRef;
  @ViewChild('edit') edit!:ElementRef;

  editEmail() {
    if (this.edit.nativeElement.innerText == "Modifica email Account") {
      this.email.nativeElement.value = this.loggedUser?.user.email;
      this.email.nativeElement.removeAttribute("readonly");
      this.password.nativeElement.removeAttribute("readonly");
      this.instruction.nativeElement.classList.remove("d-none");
      this.password.nativeElement.classList.remove("bg-transparent");
      this.password.nativeElement.classList.add("bg-white");
      this.edit.nativeElement.innerText = "Completa il cambio di email";
    }
    else {
      this.accessSrv.updateEmail(this.email.nativeElement.value, this.password.nativeElement.value, this.loggedUser!.user);
      this.email.nativeElement.setAttribute("readonly", "on");
      this.password.nativeElement.removeAttribute("readonly", "on");
      this.instruction.nativeElement.classList.add("d-none");
      this.password.nativeElement.classList.add("bg-transparent");
      this.password.nativeElement.classList.remove("bg-white");
      this.edit.nativeElement.innerText = "Modifica email Account";
    }    
  }

  deleteAccount() {
    this.accessSrv.deleteUser(this.loggedUser!.user.id);
  }

}
