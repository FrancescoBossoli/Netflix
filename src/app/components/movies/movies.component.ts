import { DeliverService } from './../../services/deliver.service';
import { Watchable } from './../../interfaces/watchable.interface';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AccessService } from 'src/app/services/access.service';
import { MovieService } from 'src/app/services/movie.service';
import { AccessData } from 'src/app/interfaces/access.interfaces';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
 
  constructor() { }

  async ngOnInit(): Promise<void> {
  }

}
