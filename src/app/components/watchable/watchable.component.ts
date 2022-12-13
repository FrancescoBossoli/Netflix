import { Genres } from './../../interfaces/genres';
import { MovieService } from 'src/app/services/movie.service';
import { Subscription } from 'rxjs';
import { Watchable } from './../../interfaces/watchable.interface';
import { DeliverService } from './../../services/deliver.service';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-watchable',
  templateUrl: './watchable.component.html',
  styleUrls: ['./watchable.component.scss']
})
export class WatchableComponent implements OnInit, AfterViewInit {
  
  @ViewChild('top') top!:ElementRef
  watchable!:Watchable;
  type:string = "";
  subscriptions:Subscription[] = [];
  genres:Genres[] = [];
  backgroundPath:string = 'https://www.themoviedb.org/t/p/original';
  additionalInfo:Object = {};

  constructor(private deliverSrv:DeliverService, private movieSrv:MovieService) { }

  async ngOnInit(): Promise<void> {
    if (this.deliverSrv.displayItem$ != null || this.deliverSrv.displayItem$ != undefined || this.deliverSrv.displayItem$ || "") {
      await this.subscriptions.push(this.deliverSrv.displayItem$.subscribe(data => data!= null ? this.watchable = data : console.log(data)));
      await this.subscriptions.push(this.deliverSrv.itemType$.subscribe(data => data!= undefined ? (data = "movies" ? this.type = "movie" : this.type = "tv") : this.type = ""));
      await this.subscriptions.push(this.movieSrv.getGenres().subscribe(data => data!= undefined ? this.genres = data : console.log(data)));
    }
    await this.subscriptions.push(this.movieSrv.getAdditionalInfo(this.type, this.watchable.id).subscribe(data => data!= undefined ? this.additionalInfo = data : this.additionalInfo = {}));
    console.log(this.watchable, this.additionalInfo);    
  }

  ngAfterViewInit() {
    if (this.top !== null) {
      this.top.nativeElement.scrollIntoView();
      top = null;   
    }
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
