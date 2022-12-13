import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appPrevious]'
})
export class PreviousDirective {

  constructor(private element: ElementRef) { }

  @HostListener('click')
  goLeft(): void {
    let sliderMain = this.element.nativeElement.parentElement.parentElement.firstChild.firstChild;
    let item = sliderMain.getElementsByClassName("slider-item");
    sliderMain.prepend(item[item.length - 1]);
  }

}
