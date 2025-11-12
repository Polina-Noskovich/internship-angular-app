import { Component, Input } from '@angular/core';
import { Book } from '../../models/book-model'

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookList {
  @Input() books: Book[] = [];
  @Input() searchTerm: string = '';
}
