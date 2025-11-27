import { Component, Signal, inject, computed } from '@angular/core';
import { Book } from '../../store/books/books-state.model';
import { BehaviorSubject, debounceTime, distinctUntilChanged } from 'rxjs';
import { Store } from '@ngxs/store';
import { AddBook, DeleteBook, GetBooks } from '../../store/books/books.actions';
import { BooksSelectors } from '../../store/books/books.selectors';
import { toSignal } from '@angular/core/rxjs-interop';
import { Autofocus } from './directives/autofocus.directive';
import { BookListComponent } from './book-list/book-list.component';

@Component({
  selector: 'app-books',
  imports: [
    Autofocus,
    BookListComponent,
  ],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.scss',
}) 
export class BooksPageComponent {
  protected readonly searchValue$ = new BehaviorSubject<string>('');

  private readonly store = inject(Store);
  private readonly allBooks: Signal<Book[]> = this.store.selectSignal(BooksSelectors.books);

  protected readonly searchText: Signal<string> = toSignal(this.searchValue$.pipe(debounceTime(300), distinctUntilChanged()), { initialValue: '' });

  protected readonly filteredBooks = computed(() => {
    return this.filterBooks(this.allBooks(), this.searchText());
  });

  constructor() {}

  protected onSearchInput(value: string): void {
    this.searchValue$.next(value.toLowerCase());
  }

  protected createNewBook(): void {
    const allBooks = this.allBooks();
    const maxId = allBooks.length ? Math.max(...allBooks.map((book) => book.id)) : 0;
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
