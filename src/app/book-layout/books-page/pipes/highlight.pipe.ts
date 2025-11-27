import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {

  public constructor(private readonly sanitizer: DomSanitizer) {}

  public transform(text: string, searchValue: string, color: string = '#cceeff'): SafeHtml {
    if (!searchValue || !text) {
      return text;
    }
    const regex = new RegExp(searchValue, 'gi');
    const highlightedText = text.replace(regex, (match) => `<span style="background-color: ${color};">${match}</span>`);

    return this.sanitizer.bypassSecurityTrustHtml(highlightedText);
  }
}