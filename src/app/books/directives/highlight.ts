import { Directive, Input, OnChanges, SimpleChanges, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: false
})
export class Highlight implements OnChanges {
  @Input('appHighlight') textToHighlight: string = '';
  @Input() highlightText: string = '';

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['textToHighlight'] || changes['highlightText']) {
      this.updateHiglight();
    }
  }

  private updateHiglight(): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'innerHTML', '');

    if (!this.highlightText || !this.textToHighlight) {
      const textNode = this.renderer.createText(this.textToHighlight);
      this.renderer.appendChild(this.elementRef.nativeElement, textNode);
      return;
    }

    const regex = new RegExp(this.highlightText, 'gi');
    const matches = this.textToHighlight.match(regex);
    const parts = this.textToHighlight.split(regex);

    parts.forEach((part, index) => {
      if (part) {
        const textNode = this.renderer.createText(part);
        this.renderer.appendChild(this.elementRef.nativeElement, textNode);
      }
      
      if (matches && matches[index]) {
        const markElement = this.renderer.createElement('mark');
        const textNode = this.renderer.createText(matches[index]);
        this.renderer.appendChild(markElement, textNode);
        this.renderer.appendChild(this.elementRef.nativeElement, markElement);
      }
    });
  }

}
