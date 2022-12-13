import { Component, OnInit, DoCheck } from '@angular/core';

@Component({
  selector: 'app-head',
  templateUrl: './head.component.html',
  styleUrls: ['./head.component.scss']
})
export class HeadComponent implements OnInit, DoCheck {

  pathname:string = window.location.pathname;

  constructor() { }

  ngOnInit(): void {
  }

  ngDoCheck(): void {
    this.pathname = window.location.pathname;
  }



}
