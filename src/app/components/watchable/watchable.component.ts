import { environment } from 'src/environments/environment';
import { Genres } from './../../interfaces/genres';
import { MovieService } from 'src/app/services/movie.service';
import { Subscription } from 'rxjs';
import { Watchable } from './../../interfaces/watchable.interface';
import { DeliverService } from './../../services/deliver.service';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef, OnDestroy, } from '@angular/core';

@Component({
  selector: 'app-watchable',
  templateUrl: './watchable.component.html',
  styleUrls: ['./watchable.component.scss']
})
export class WatchableComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @ViewChild('iframe') iframe!:ElementRef;
  @ViewChild('top') top!:ElementRef
  watchable!:Watchable;
  type:string = "";
  subscriptions:Subscription[] = [];
  genres:Genres[] = [];
  backgroundPath:string = environment.backgroundPath;
  additionalInfo:string = "";

  constructor(private deliverSrv:DeliverService, private movieSrv:MovieService, private hostElement:ElementRef) { }

  ngOnInit(): void {
    const iframe =  this.hostElement.nativeElement.querySelector('iframe');
    if (this.deliverSrv.displayItem$ != null || this.deliverSrv.displayItem$ != undefined || this.deliverSrv.displayItem$ || "") {
      this.subscriptions.push(this.deliverSrv.displayItem$.subscribe({
        next: data => data!= null ? this.watchable = data : console.log(data),
        error: err => console.log(err)
      }));
      this.subscriptions.push(this.deliverSrv.itemType$.subscribe({
        next: data => data!= undefined ? (data = "movies" ? this.type = "movie" : this.type = "tv") : this.type = "",
        error: err => console.log(err)
      }));
        
      this.subscriptions.push(this.movieSrv.getGenres().subscribe({
        next: data => data!= undefined ? this.genres = data : console.log(data),
        error: err => console.log(err)
      }));
    }
    this.subscriptions.push(this.movieSrv.getAdditionalInfo(this.type, this.watchable.id).subscribe({
      next: data => data!= undefined ? iframe.src = "https://www.youtube.com/embed/" + data.videos.results[0].key  :  this.additionalInfo = "",
      error: err => console.log(err)
      }));
    console.log(this.watchable, this.additionalInfo);    
  }
  // mi serve per evitare che scrolli in basso al cambio pagina
  ngAfterViewInit() {
    if (this.top !== null) {
      try {
      this.top.nativeElement.scrollIntoView(); 
      top = null;
      }
      catch(err) {
        console.log(err)
      }
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.map(s => s.unsubscribe());
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
