import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
  standalone: false,
})
export class HighlightPipe implements PipeTransform {

  public constructor(private sanitizer: DomSanitizer) {}

  public transform(text: string, searchTerm: string, color: string = '#cceeff'): SafeHtml {
    if (!searchTerm || !text) {
      return text;
    }
    const regex = new RegExp(searchTerm, 'gi');
    const highlightedText = text.replace(regex, (match) => `<span style="background-color: ${color};">${match}</span>`);

    return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
  }
}