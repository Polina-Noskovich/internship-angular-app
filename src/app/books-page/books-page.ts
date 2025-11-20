import { Component, OnInit, DestroyRef  } from '@angular/core';
import { BookService } from './../services/book.service'; 
import { Book } from './models/book-model'
import { Observable, BehaviorSubject, debounceTime, distinctUntilChanged, startWith, combineLatest, map } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books-page.html',
  styleUrl: './books-page.scss',
})
export class BooksPage implements OnInit {

  protected readonly searchValue$ = new BehaviorSubject<string>('');
  protected filteredBooks$!: Observable<Book[]>;

  private allBooks: Book[] = [];

  constructor(private readonly bookService: BookService, private readonly destroyRef: DestroyRef) {}

  public ngOnInit(): void {
    const allBooks$ = this.bookService.getBooks();

    this.filteredBooks$ = combineLatest([
      allBooks$,
      this.searchValue$.pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
    ]).pipe(
      map(([books, term]) => {
        this.allBooks = books;
        return this.filterBooks(books, term);
      }),
      takeUntilDestroyed(this.destroyRef)
    );
  }

  protected onSearchInput(value: string): void {
    this.searchValue$.next(value.toLowerCase());
  }
  
  public createNewBook(): void {
    const maxId = this.allBooks.length > 0 ? Math.max(...this.allBooks.map(book => book.id)) : 0;    
    const nextId = maxId + 1;
    const newBook: Book = {
      id: nextId,
      name: 'New Book',
      type: 'Design Book',
      size: `1 MB`,
      createdAt: new Date(),
      pages: 10,
    };
    this.bookService.addBook(newBook);
  }

  protected onDelete(bookId: number): void {
    this.bookService.deleteBook(bookId); 
   }

  private filterBooks(books: Book[], term: string): Book[] {
    return term
      ? books.filter(book => 
          book.name.toLowerCase().includes(term) ||
          book.type.toLowerCase().includes(term)
        )
      : [...books];
  }
}
