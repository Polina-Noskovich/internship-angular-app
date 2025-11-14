import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book'; 
import { Book } from '../models/book-model'

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books-page.html',
  styleUrl: './books-page.scss',
})
export class BooksPage implements OnInit {
  private allBooks: Book[] = [];
  public filteredBooks: Book[] = [];
  public searchTerm: string = '';

  constructor(private bookService: BookService) {}

  public ngOnInit(): void {
    this.allBooks = this.bookService.getBooks();
    this.filteredBooks = [...this.allBooks];
  }

  public search(value: string): void {
    this.searchTerm = value.toLowerCase();
    this.filterBooks(); 
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
    this.allBooks.push(newBook);
    this.filterBooks();
  }

  public handleDelete(bookId: number): void {
    this.allBooks = this.allBooks.filter(book => book.id !== bookId);
    this.filterBooks();
  }

  private filterBooks(): void {
    this.filteredBooks = this.allBooks.filter(book =>
      !this.searchTerm ||
      (book.name.toLowerCase().includes(this.searchTerm) ||
       book.type.toLowerCase().includes(this.searchTerm))
    );
  }
}
