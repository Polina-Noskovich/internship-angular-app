import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookService } from './../services/book.service'; 
import { Book } from './models/book-model'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books-page.html',
  styleUrl: './books-page.scss',
})
export class BooksPage implements OnInit, OnDestroy {
  protected filteredBooks: Book[] = [];
  protected searchTerm: string = '';

  private allBooks: Book[] = [];
  private bookSubscription: Subscription = new Subscription();

  constructor(private readonly bookService: BookService) {}

  public ngOnInit(): void {
    this.bookSubscription = this.bookService.getBooks().subscribe(books => {
      this.allBooks = books;
      this.search(this.searchTerm);
    })
  }

  protected search(value: string): void {
    this.searchTerm = value.toLowerCase();
    this.filteredBooks = this.searchTerm
      ? this.allBooks.filter(book =>
          book.name.toLowerCase().includes(this.searchTerm) ||
          book.type.toLowerCase().includes(this.searchTerm)
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
    this.bookSubscription.unsubscribe();
  }
}
