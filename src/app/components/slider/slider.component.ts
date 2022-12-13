import { AccessData } from './../../interfaces/access.interfaces';
import { Favourite } from './../../interfaces/favourite.interface';
import { Watchable } from '../../interfaces/watchable.interface';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {

  @Input("watchables") watchables!:Watchable[];
  @Input("type") type!:string;
  @Input("title") title!:string;
  @Input("favourites") favourites!:Favourite[];
  @Input("loggedUser") loggedUser!:AccessData|null;
  

  constructor() { }

  ngOnInit(): void {
  }

  

}
