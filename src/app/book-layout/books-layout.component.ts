import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-books-layout',
  standalone: true,
  imports: [
    RouterOutlet
  ],
  templateUrl: './books-layout.component.html',
})
export class BooksLayoutComponent {}
