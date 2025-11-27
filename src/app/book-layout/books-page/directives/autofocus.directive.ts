import { Directive, AfterViewInit, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAutofocus]',
})
export class Autofocus implements AfterViewInit {

  constructor(private readonly elementRef: ElementRef) { }

  public ngAfterViewInit(): void {
    if(this.elementRef.nativeElement) {
      this.elementRef.nativeElement.focus();
    }
  }
}
