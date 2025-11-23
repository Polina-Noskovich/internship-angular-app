import { Component, OnInit, DestroyRef } from '@angular/core';
import { Book } from '../../store/books/books.model';
import {
  Observable,
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  combineLatest,
  map,
  take,
} from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Store } from '@ngxs/store';
import { GetBooks, AddBook, DeleteBook } from '../../store/books/books.actions';
import { BooksSelectors } from '../../store/books/books.selectors';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books-page.html',
  styleUrl: './books-page.scss',
})
export class BooksPage implements OnInit {
  protected readonly searchValue$ = new BehaviorSubject<string>('');
  protected filteredBooks$!: Observable<Book[]>;

  constructor(private readonly store: Store, private readonly destroyRef: DestroyRef) {}

  public ngOnInit(): void {
    this.store.dispatch(new GetBooks());

    const allBooks$ = this.store.select(BooksSelectors.getBooksList);

    this.filteredBooks$ = combineLatest([
      allBooks$,
      this.searchValue$.pipe(debounceTime(300), distinctUntilChanged()),
    ]).pipe(
      map(([books, searchValue]) => {
        return this.filterBooks(books, searchValue);
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  protected onSearchInput(value: string): void {
    this.searchValue$.next(value.toLowerCase());
  }

  protected createNewBook(): void {
    this.store
      .select(BooksSelectors.getBooksList)
      .pipe(take(1))
      .subscribe((allBooks) => {
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
      });
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
