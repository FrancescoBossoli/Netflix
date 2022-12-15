import { DeliverService } from './../../services/deliver.service';
import { AccessService } from './../../services/access.service';
import { MovieService } from 'src/app/services/movie.service';
import { Favourite } from './../../interfaces/favourite.interface';
import { Watchable } from '../../interfaces/watchable.interface';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AccessData } from 'src/app/interfaces/access.interfaces';
import { lastValueFrom, Subscription } from 'rxjs';

@Component({
  selector: 'app-poster',
  templateUrl: './poster.component.html',
  styleUrls: ['./poster.component.scss']
})
export class PosterComponent implements OnInit {

  @Input("watchable") watchable!:Watchable
  @Input("type") type!:string;
  @Input("loggedUser") loggedUser!:AccessData|null
  @ViewChild('heart') heart!:ElementRef
  favourites!:Favourite[]|null;
  subscriptions: Subscription[] = [];
  white = true;
  red = false;

  constructor(private movieSrv:MovieService, private accessSrv:AccessService, private deliverSrv:DeliverService) { }

  ngOnInit():void { 
    this.subscriptions.push(this.movieSrv.favourites$.subscribe(data => this.favourites = data));
    for (let i = 0; i < this.favourites!.length; i++) {
      if (this.favourites![i].movieId == this.watchable.id) {
        // this.heart.nativeElement.classList.toggle("text-white");
        // this.heart.nativeElement.classList.toggle("opacity-50");
        // this.heart.nativeElement.classList.toggle("text-danger");
        // this.heart.nativeElement.classList.toggle("opacity-100");
        this.white = !this.white;
        this.red = !this.red;
      }
    }
  }

  passWatchable() {
    this.deliverSrv.setWatchable(this.watchable, this.type);
  }

  async favouriteChange() {
    if (this.white) {
      try {
        const liking$ = this.movieSrv.setFavourite(this.loggedUser!.user.id, this.watchable.id);
        let data = await lastValueFrom(liking$);
        console.log(data);
      }
      catch (error:any) {
      console.error(error)
      }     
    }
    else {
      for (let i = 0; i < this.favourites!.length; i++) {
        if (this.favourites![i].userId == this.loggedUser!.user.id && this.favourites![i].movieId == this.watchable.id) {
          const liking$ = this.movieSrv.deleteFavourite(this.favourites![i].id);
          let data = await lastValueFrom(liking$);
          console.log(data);
        }
      }
    }
    this.white = !this.white;
    this.red = !this.red;  
  }
}
