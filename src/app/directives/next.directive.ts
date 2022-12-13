import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNext]'
})
export class NextDirective {

  constructor(private element: ElementRef) { }

  @HostListener('click')
  goRight(): void {
    let sliderMain = this.element.nativeElement.parentElement.parentElement.firstChild.firstChild;
    let item = sliderMain.getElementsByClassName("slider-item");
    sliderMain.append(item[0]);
  }

}
