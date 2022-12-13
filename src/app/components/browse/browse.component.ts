import { Favourite } from './../../interfaces/favourite.interface';
import { AccessData } from './../../interfaces/access.interfaces';
import { Component, ElementRef, HostListener, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Watchable } from 'src/app/interfaces/watchable.interface';
import { User } from 'src/app/interfaces/user.interface';
import { AccessService } from 'src/app/services/access.service';
import { MovieService } from 'src/app/services/movie.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrls: ['./browse.component.scss']
})
export class BrowseComponent implements OnInit, OnDestroy {


  title:string = "";
  loggedUser!:AccessData|null;
  user?:User;
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
  originalMovies!:Watchable[];
  popularMovies!:Watchable[];
  topRatedMovies!:Watchable[];
  trendingMovies!:Watchable[];
  upcomingMovies!:Watchable[];

  @ViewChild('nav') header!: ElementRef;
  headerBackground!:string;
  loadingScreen:string = 'https://mobileinternist.com/wp-content/uploads/2021/02/netflix-logo-android.jpg';
  backgroundPath:string = 'https://www.themoviedb.org/t/p/original'; 

    

  constructor(private accessSrv:AccessService, private movieSrv:MovieService, private router:Router) {
    router.events.subscribe((data) => {
      this.checkCurrentURL();
    });
  }
 

  async ngOnInit(): Promise<void> {
    await this.subscriptions.push(this.accessSrv.user$.subscribe(data => this.loggedUser = data));
    await this.subscriptions.push(this.movieSrv.getLatest().subscribe(data => this.latest = data));
    await this.subscriptions.push(this.movieSrv.getTrending().subscribe(data => {
      data!= undefined ? this.trending = data : [];
      this.trending[0].backdrop_path != undefined ? this.headerBackground = this.backgroundPath + this.trending[0].backdrop_path : this.loadingScreen;
      this.trending[0].title != undefined ? this.title = this.trending[0].title : "";
    }));
    await this.subscriptions.push(this.movieSrv.getPopular().subscribe(data => this.popular = data));   
    await this.subscriptions.push(this.movieSrv.getTopRated().subscribe(data => this.topRated = data));
    await this.subscriptions.push(this.movieSrv.getLatestReal().subscribe(data => this.latestReal = data));  
    await this.subscriptions.push(this.movieSrv.getCults().subscribe(data => this.cults = data)); 
    await this.subscriptions.push(this.movieSrv.getTvSeries().subscribe(data => this.tvSeries = data));
  }

  ngOnDestroy(): void {
    this.subscriptions.map(s => s.unsubscribe());
  }

  checkCurrentURL():void {
    const location = window.location.pathname;
    if (location != "/") {
      this.hidden = true;
    } else {
      this.hidden = false;
    }
  }

  logout():void {
    this.accessSrv.logout();
  }

  async func() {
    console.log(this.latest);
    console.log(this.loggedUser);
    console.log(this.favourites);
    console.log(this.header); 
  }

}
