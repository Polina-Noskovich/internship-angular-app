import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() deleteBook = new EventEmitter<number>();
  activeMenuId: number | null = null;

  toggleMenu(bookId: number): void {
    this.activeMenuId = this.activeMenuId ===bookId ? null : bookId;
  }
  onDelete(bookId: number): void {
    this.deleteBook.emit(bookId);
    this.activeMenuId = null;
  }
}
