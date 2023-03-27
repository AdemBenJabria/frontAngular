import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRendu]'
})
export class RenduDirective {

  constructor(
    el: ElementRef
  ) {
    el.nativeElement.style.color = '#92cfff'
   }

}
