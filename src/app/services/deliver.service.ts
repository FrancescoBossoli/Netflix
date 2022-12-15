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
  private favourites = new BehaviorSubject<Watchable[]|null>(null);
  private movies = new BehaviorSubject<Watchable[]|null>(null);
  private tvSeries = new BehaviorSubject<Watchable[]|null>(null);
  private trending = new BehaviorSubject<Watchable[]|null>(null);
  favouriteList$ = this.favourites.asObservable();
  movieList$ = this.movies.asObservable();
  tvList$ = this.tvSeries.asObservable();
  trendingList$ = this.trending.asObservable();

  constructor() { }

  setEmail(value:string) {
    this.mailString.next(value);
  }

  setWatchable(entry:Watchable, type:string) {
    this.itemToWatch.next(entry);
    this.itemType.next(type);
  }

  setTheme(movies:Watchable[], tvSeries:Watchable[], trending:Watchable[]) {
    this.movies.next(movies);
    this.tvSeries.next(tvSeries);
    this.trending.next(trending);
  }

}
