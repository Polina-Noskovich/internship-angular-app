import { Component, OnInit, Signal } from '@angular/core';
import { BooksSelectors } from '../store/books/books.selectors';
import { GetBooks } from '../store/books/books.actions';
import { Store } from '@ngxs/store';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './book-count.html',
  styleUrl: './book-count.scss',
})
export class BookCount {
  protected readonly projectName: string = 'Internship Book App';
  protected bookCount: Signal<number | undefined>;

  constructor(private readonly store: Store) {
    this.store.dispatch(new GetBooks());

    const bookCount$ = this.store.select(BooksSelectors.getBooksCount);
    this.bookCount = toSignal(bookCount$);
  }
}
