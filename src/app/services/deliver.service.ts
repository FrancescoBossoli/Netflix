import { Watchable } from './../interfaces/watchable.interface';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliverService {

  private mailString = new BehaviorSubject<string>("");
  email$ = this.mailString.asObservable();
  private itemToWatch = new BehaviorSubject<Watchable|null>(null);
  private itemType = new BehaviorSubject<string>("");
  displayItem$ = this.itemToWatch.asObservable();
  itemType$ = this.itemType.asObservable();
  constructor() { }

  setEmail(value:string) {
    this.mailString.next(value);
  }

  setWatchable(entry:Watchable, type:string) {
    this.itemToWatch.next(entry);
    this.itemType.next(type);
  }

}
