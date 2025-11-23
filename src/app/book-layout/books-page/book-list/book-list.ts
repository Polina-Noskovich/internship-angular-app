import { Component, input, output } from '@angular/core';
import { Book } from '../../../store/books/books.model';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookList {
  public books = input.required<Book[]>();
  public searchTerm = input<string>('');

  public readonly deleteBook = output<number>();

  protected onDelete(bookId: number): void {
    this.deleteBook.emit(bookId);
  }
}
