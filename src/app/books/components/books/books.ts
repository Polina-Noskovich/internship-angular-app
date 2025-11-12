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
}
