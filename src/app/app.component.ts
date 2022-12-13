import { AccessData } from './interfaces/access.interfaces';
import { AccessService } from './services/access.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from "@angular/core";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  subscriptions: Subscription[] = [];
  loggedUser!: AccessData|null;

  constructor(private permitSrv:AccessService) {}

  async ngOnInit(): Promise<void> {
      await this.subscriptions.push(this.permitSrv.user$.subscribe(data => this.loggedUser = data));
  }



}
