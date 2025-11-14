import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
  standalone: false
})
export class Autofocus implements AfterViewInit {

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    if(this.elementRef.nativeElement) {
      this.elementRef.nativeElement.focus();
    }
  }
}
