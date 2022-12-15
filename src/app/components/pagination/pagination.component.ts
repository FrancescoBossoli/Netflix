import { MovieService } from 'src/app/services/movie.service';
import { Genres } from './../../interfaces/genres';
import { environment } from 'src/environments/environment';
import { Watchable } from './../../interfaces/watchable.interface';
import { Component, OnInit, Input } from '@angular/core';
import { AccessData } from 'src/app/interfaces/access.interfaces';
import { Subscription } from 'rxjs';
import { DeliverService } from 'src/app/services/deliver.service';
import { AccessService } from 'src/app/services/access.service';
import { Favourite } from 'src/app/interfaces/favourite.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss', '../watchable/watchable.component.scss']
})
export class PaginationComponent implements OnInit {

  type:string = "";
  subscriptions:Subscription[] = []
  genres:Genres[] = [];
  loggedUser:AccessData|null = null;
  title:string = "";
  watchables:Watchable[] = [];
  backgroundPath:string = environment.backgroundPath;
  favourites!:Favourite[]|null;
  tvAdventure:Watchable[] = [];
  tvAnimation:Watchable[] = [];
  tvComedy:Watchable[] = [];
  tvCrime:Watchable[] = [];
  tvDrama:Watchable[] = [];
  tvMistery:Watchable[] = [];
  tvScifiFantasy:Watchable[] = [];
  movieAction:Watchable[] = [];
  movieAdventure:Watchable[] = [];
  movieAnimation:Watchable[] = [];
  movieComedy:Watchable[] = [];
  movieCrime:Watchable[] = [];
  movieDrama:Watchable[] = [];
  movieFamily:Watchable[] = [];
  movieFantasy:Watchable[] = [];
  movieHistory:Watchable[] = [];
  movieHorror:Watchable[] = [];
  movieMistery:Watchable[] = [];
  movieRomance:Watchable[] = [];
  movieScifi:Watchable[] = [];
  movieThriller:Watchable[] = [];
  movieWar:Watchable[] = [];
  favouriteWatchables:Watchable[]=[]

  constructor(private accessSrv:AccessService, private deliverSrv:DeliverService, private movieSrv:MovieService) { }

   ngOnInit(): void {
    this.subscriptions.push(this.accessSrv.user$.subscribe(data => { if (data != null) { this.loggedUser = data; }}));
    this.subscriptions.push(this.movieSrv.favourites$.subscribe(data => this.favourites = data));
    
    if (window.location.pathname == "/movies" && this.loggedUser != null && this.loggedUser != undefined ) {
      this.type = "movies";
      this.subscriptions.push(this.deliverSrv.movieList$.subscribe({
        next: (data) => { 
          if (data!=null) {
            this.watchables = data
          }}, 
        error: (err) => console.log(err)
      }));
      for (let i = 0; i < this.watchables.length; i++) {
        for (let k=0; k < this.watchables[i].genre_ids.length; k++) {
          switch (this.watchables[i].genre_ids[k]) {
            case 28:
              this.movieAction.push(this.watchables[i]);
              break;
            case 12:
              this.movieAdventure.push(this.watchables[i]);
              break;
            case 16:
              this.movieAnimation.push(this.watchables[i]);
              break;
            case 35:
              this.movieComedy.push(this.watchables[i]);
              break;
            case 80:
              this.movieCrime.push(this.watchables[i]);
              break; 
            case 18:
              this.movieDrama.push(this.watchables[i]);
              break;
            case 10751:
              this.movieFamily.push(this.watchables[i]);
              break;
            case 14:
              this.movieFantasy.push(this.watchables[i]);
              break;
            case 36:
              this.movieHistory.push(this.watchables[i]);
              break;
            case 27:
              this.movieHorror.push(this.watchables[i]);
              break;
            case 9648:
              this.movieMistery.push(this.watchables[i]);
              break;
            case 10749:
              this.movieRomance.push(this.watchables[i]);
              break;
            case 878:
              this.movieScifi.push(this.watchables[i]);
              break; 
            case 53:
              this.movieThriller.push(this.watchables[i]);
              break;
            case 10752:
              this.movieWar.push(this.watchables[i]);
              break;
          }
        }        
      }
      this.shuffle(this.movieAction);
      this.shuffle(this.movieAdventure);
      this.shuffle(this.movieAnimation);
      this.shuffle(this.movieComedy);
      this.shuffle(this.movieCrime);
      this.shuffle(this.movieDrama);
      this.shuffle(this.movieFamily);
      this.shuffle(this.movieFantasy);
      this.shuffle(this.movieHistory);
      this.shuffle(this.movieHorror);
      this.shuffle(this.movieMistery);
      this.shuffle(this.movieRomance);
      this.shuffle(this.movieScifi);
      this.shuffle(this.movieThriller);
      this.shuffle(this.movieWar);
    }
    else if (window.location.pathname == "/tv-series" && this.loggedUser != null && this.loggedUser != undefined) {
      this.type = "tv-series"
      this.subscriptions.push(this.deliverSrv.tvList$.subscribe({
        next: (data) => { 
          if (data!=null) {
            this.watchables = data
          }}, 
        error: (err) => console.log(err)
      }));
      for (let i = 0; i < this.watchables.length; i++) {
        for (let k=0; k < this.watchables[i].genre_ids.length; k++) {
          switch (this.watchables[i].genre_ids[k]) {
            case 10759:
              this.tvAdventure.push(this.watchables[i]);
              break;
            case 16:
              this.tvAnimation.push(this.watchables[i]);
              break;
            case 35:
              this.tvComedy.push(this.watchables[i]);
              break;
            case 80:
              this.tvCrime.push(this.watchables[i]);
              break;
            case 18:
              this.tvDrama.push(this.watchables[i]);
              break; 
            case 9648:
              this.tvMistery.push(this.watchables[i]);
              break;
            case 10765:
              this.tvScifiFantasy.push(this.watchables[i]);
              break;
          }
        }        
      }
      this.shuffle(this.tvAdventure);
      this.shuffle(this.tvAnimation);
      this.shuffle(this.tvComedy);
      this.shuffle(this.tvCrime);
      this.shuffle(this.tvDrama);
      this.shuffle(this.tvMistery);
      this.shuffle(this.tvScifiFantasy);      
    }
    else if (window.location.pathname == "/trending" && this.loggedUser != null && this.loggedUser != undefined) {
      this.type = "trending"
      this.subscriptions.push(this.deliverSrv.trendingList$.subscribe({
        next: (data) => { 
          if (data!=null) {
            this.watchables = data
          }}, 
        error: (err) => console.log(err)
      }));
    }
    else if (window.location.pathname == "/favourites" && this.loggedUser != null && this.loggedUser != undefined) {
      this.type = "favourites"
      this.subscriptions.push(this.movieSrv.favourites$.subscribe({
        next: data => {          
          this.favourites = data;       
        },        
        error: err => console.log(err)
      }));
      this.subscriptions.push(this.deliverSrv.movieList$.subscribe({
        next: (data) => { 
          if (data!=null) {
            this.watchables = data;
            for (let i = 0; i < this.favourites!.length; i++) {
              for (let k = 0; k < this.watchables.length; k++) {
                if (this.favourites![i].movieId == this.watchables[k].id) {
                  this.favouriteWatchables.push(this.watchables[k]);
                }
              }  
            }
          }}, 
        error: (err) => console.log(err)
      }));
      this.subscriptions.push(this.deliverSrv.tvList$.subscribe({
        next: (data) => { 
          if (data!=null) {
            this.watchables = data;
            for (let i = 0; i < this.favourites!.length; i++) {
              for (let k = 0; k < this.watchables.length; k++) {
                if (this.favourites![i].movieId == this.watchables[k].id) {
                  this.favouriteWatchables.push(this.watchables[k]);
                }
              }  
            }
          }},
        error: (err) => console.log(err)
      }));
      this.subscriptions.push(this.deliverSrv.trendingList$.subscribe({            
        next: (data) => { 
          if (data!=null) {
            this.watchables = data;
            for (let i = 0; i < this.favourites!.length; i++) {
              for (let k = 0; k < this.watchables.length; k++) {
                if (this.favourites![i].movieId == this.watchables[k].id) {
                  this.favouriteWatchables.push(this.watchables[k]);
                }
              }  
            }
          }}, 
        error: (err) => console.log(err)
      }));      
    }
    console.log(this.favouriteWatchables)
    this.subscriptions.push(this.movieSrv.getGenres().subscribe({
      next: data => data!= undefined ? this.genres = data : console.log(data),
      error: err => console.log(err)
    }));
  }

  getCategory(genre:number):string {
    let category = ""
    for (let i = 0; i<this.genres.length; i++) {
      if (this.genres[i].id == genre) {
        category = this.genres[i].name;
      }
    }
    return category;
  }

  shuffle(movieList:Watchable[]) {
    let currentIndex = movieList.length,  randomIndex;
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [movieList[currentIndex], movieList[randomIndex]] = [
        movieList[randomIndex], movieList[currentIndex]];
    }
  }

  passWatchable(watchable:Watchable) {
    this.deliverSrv.setWatchable(watchable, this.type);
  }


}
