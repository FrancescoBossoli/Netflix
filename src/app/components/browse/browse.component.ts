import { environment } from 'src/environments/environment';
import { DeliverService } from './../../services/deliver.service';
import { Favourite } from './../../interfaces/favourite.interface';
import { AccessData } from './../../interfaces/access.interfaces';
import { Component, ElementRef, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Watchable } from 'src/app/interfaces/watchable.interface';
import { AccessService } from 'src/app/services/access.service';
import { MovieService } from 'src/app/services/movie.service';
import { Router } from '@angular/router';
import { Genres } from 'src/app/interfaces/genres';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss', '../watchable/watchable.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {

  title:string = "";
  overview:string = "";
  genres:Genres[] = [];
  genreIds:number[] = [];
  voteAverage:number = 0;
  loggedUser!:AccessData|null;
  hidden = false;
  subscriptions: Subscription[] = [];

  favourites:Favourite[] = [];
  latest:Watchable[] = [];
  trending:Watchable[] = [];
  popular:Watchable[] = [];
  topRated:Watchable[] = [];
  latestReal:Watchable[] = [];
  cults:Watchable[] = [];
  tvSeries:Watchable[] = [];

  @ViewChild('nav') header!: ElementRef;
  headerBackground!:string;
  loadingScreen:string = 'https://mobileinternist.com/wp-content/uploads/2021/02/netflix-logo-android.jpg';    

  constructor(private accessSrv:AccessService, private movieSrv:MovieService, private deliverService:DeliverService, private router:Router) {
    this.router.events.subscribe(() => {
      this.checkCurrentURL();
    });
  }
 
  ngOnInit(): void {
    this.subscriptions.push(this.accessSrv.user$.subscribe({
      next: data => this.loggedUser = data,
      error: err => console.log("utente trovato in seguito")}));
    this.subscriptions.push(this.movieSrv.getLatest().subscribe({
      next: data => this.latest = data,
      error: err => console.log(err)}));
    this.subscriptions.push(this.movieSrv.getTrending().subscribe({
      next:data => {
        data!= undefined ? this.trending = data : [];
        this.trending[0].backdrop_path != undefined ? this.headerBackground = environment.backgroundPath + this.trending[0].backdrop_path : this.loadingScreen;
        this.trending[0].title != undefined ? this.title = this.trending[0].title : "";
        this.trending[0].overview != undefined ? this.overview = this.trending[0].overview : "";
        this.trending[0].vote_average != undefined ? this.voteAverage = this.trending[0].vote_average : "";
        this.trending[0].genre_ids != undefined ? this.genreIds = this.trending[0].genre_ids : "";      
      },
      error: (err) => console.log(err)
    }));
    this.subscriptions.push(this.movieSrv.getPopular().subscribe({
      next: data => this.popular = data,
      error: (err) => console.log(err)
    }));   
    this.subscriptions.push(this.movieSrv.getTopRated().subscribe({
      next: data => this.topRated = data,
      error: (err) => console.log(err)
    }));
    this.subscriptions.push(this.movieSrv.getLatestReal().subscribe({
      next: data => this.latestReal = data,
      error: (err) => console.log(err)
    }));  
    this.subscriptions.push(this.movieSrv.getCults().subscribe({
      next: data => this.cults = data,
      error: (err) => console.log(err)
    }));
    this.subscriptions.push(this.movieSrv.getTvSeries().subscribe({
      next: data => this.tvSeries = data,
      error: (err) => console.log(err)
    }));
    this.subscriptions.push(this.movieSrv.getGenres().subscribe({
      next: data => data!= undefined ? this.genres = data : console.log(data),
      error: err => console.log(err)
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.map(s => s.unsubscribe());
  }

  checkCurrentURL():void {
    try {
      const location = window.location.pathname;
      if (location != "/") {
        this.hidden = true;
      } else {
        this.hidden = false;
      }
    }
    catch(err) {
      console.log(err)
    }     
  }

  logout():void {
    this.accessSrv.logout();
  }

  passData() {    
    this.deliverService.setTheme(this.cults, this. tvSeries, this.trending);
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

}
