import { Component, Signal, Injector, OnInit } from '@angular/core';
import { Book } from '../../store/books/books-state.model';
import { BehaviorSubject, debounceTime, distinctUntilChanged, combineLatest, map, take } from 'rxjs';
import { Store } from '@ngxs/store';
import { AddBook, DeleteBook } from '../../store/books/books.actions';
import { BooksSelectors } from '../../store/books/books.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { Autofocus } from './directives/autofocus.directive';
import { BookListComponent } from './book-list/book-list.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [
    Autofocus,
    BookListComponent,
    CommonModule
  ],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.scss',
})
export class BooksPageComponent implements OnInit {
  protected readonly searchValue$ = new BehaviorSubject<string>('');
  protected filteredBooks!: Signal<Book[] | undefined>; 

  constructor(private readonly store: Store, private readonly injector: Injector) {}

  public ngOnInit(): void {
    const allBooks$ = this.store.select(BooksSelectors.books);

    const filteredBooks$ = combineLatest([
      allBooks$,
      this.searchValue$.pipe(debounceTime(300), distinctUntilChanged()),
    ]).pipe(map(([books, searchValue]) => this.filterBooks(books, searchValue)));

    this.filteredBooks = toSignal(filteredBooks$, { injector: this.injector});
  }

  protected onSearchInput(value: string): void {
    this.searchValue$.next(value.toLowerCase());
  }

  protected createNewBook(): void {
    const allBooks = this.store.selectSnapshot(BooksSelectors.books);
    const maxId = allBooks.length > 0 ? Math.max(...allBooks.map((book) => book.id)) : 0;
    const nextId = maxId + 1;
    const newBook: Book = {
      id: nextId,
      name: 'New Book',
      type: 'Design Book',
      size: '1 MB',
      createdAt: new Date(),
      pages: 10,
    };
    this.store.dispatch(new AddBook(newBook));
  }

  protected onDelete(bookId: number): void {
    this.store.dispatch(new DeleteBook(bookId));
  }

  private filterBooks(books: Book[], searchValue: string): Book[] {
    return searchValue
      ? books.filter(
          (book) =>
            book.name.toLowerCase().includes(searchValue) ||
            book.type.toLowerCase().includes(searchValue)
        )
      : [...books];
  }
}
