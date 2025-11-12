import { Component, OnInit } from '@angular/core';
import { MOCK_BOOKS } from '../../data/mock-books'; 
import { Book } from '../../models/book-model'

@Component({
  selector: 'app-books',
  standalone: false,
  templateUrl: './books.html',
  styleUrl: './books.scss',
})
export class Books implements OnInit {
  allBooks: Book[] = [];
  filteredBooks: Book[] = [];
  searchTerm: string = '';

  ngOnInit(): void {
    this.allBooks = MOCK_BOOKS;
    this.filteredBooks = [...this.allBooks];
  }

  search(value: string): void {
    this.searchTerm = value.toLowerCase();
    if(!this.searchTerm) {
      this.filteredBooks = [...this.allBooks];
    }
    else {
      this.filteredBooks = this.allBooks.filter(book => 
        book.name.toLowerCase().includes(this.searchTerm) ||
        book.type.toLowerCase().includes(this.searchTerm)
      );
    }
  }

  createNewBook(): void {
    const newBook: Book = {
      id: Date.now(),
      name: 'New Book',
      type: 'Design Book',
      size: '1.0 MB',
      createdAt: new Date(),
      pages: 10,
    };
    this.allBooks.push(newBook);
      this.filteredBooks = this.allBooks.filter(book => 
        book.name.toLowerCase().includes(this.searchTerm) ||
        book.type.toLowerCase().includes(this.searchTerm)
      );
    if (!this.searchTerm) {
      this.filteredBooks = [...this.allBooks];
    }
  }

  handleDelete(bookId: number): void {
    this.allBooks = this.allBooks.filter(book => book.id !== bookId);
    this.filteredBooks = this.filteredBooks.filter(book => book.id !== bookId);
  }
}
