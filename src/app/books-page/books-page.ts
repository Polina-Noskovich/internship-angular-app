import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from './../services/book.service'; 
import { Book } from './models/book-model'
import { Subscription, Subject, debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books-page.html',
  styleUrl: './books-page.scss',
})
export class BooksPage implements OnInit, OnDestroy {
  private readonly searchTerms$ = new Subject<string>();

  protected filteredBooks: Book[] = [];
  protected searchTerm: string = '';

  private allBooks: Book[] = [];
  private subscriptions: Subscription = new Subscription();

  constructor(private readonly bookService: BookService) {}

  public ngOnInit(): void {
    const booksSub = this.bookService.getBooks().subscribe(books => {
      this.allBooks = books;
      this.filterBooks(this.searchTerm);
    });

    const searchSub = this.searchTerms$.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(term => {
      this.searchTerm = term;
      this.filterBooks(term);
    });

    this.subscriptions.add(booksSub);
    this.subscriptions.add(searchSub);

}

  protected onSearchInput(value: string): void {
    this.searchTerms$.next(value.toLowerCase());
  }

  private filterBooks(term: string) {
    this.filteredBooks = term ?
      this.allBooks.filter(book => 
        book.name.toLowerCase().includes(term) ||
        book.type.toLowerCase().includes(term)
      )
    : [...this.allBooks];
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

  public ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
