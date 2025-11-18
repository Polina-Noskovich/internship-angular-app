import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../models/book-model'

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookList {
  @Input() public books: Book[] = [];
  @Input() public searchTerm: string = '';
  @Output() public readonly deleteBook = new EventEmitter<number>();

  protected activeMenuId: number | null = null;

  protected  toggleMenu(bookId: number): void {
    this.activeMenuId = this.activeMenuId ===bookId ? null : bookId;
  }
  protected  onDelete(bookId: number): void {
    this.deleteBook.emit(bookId);
    this.activeMenuId = null;
  }
}
