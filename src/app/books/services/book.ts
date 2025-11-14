import { Injectable } from '@angular/core';
import { Book } from '../models/book-model';

const MOCK_BOOKS: Book[] = [
  { id: 1, name: 'Angular Basics', type: 'Design Book', size: '2.5 MB', createdAt: new Date('2023-01-15'), pages: 150 },
  { id: 2, name: 'Project Planning', type: 'Item Schedule', size: '1.2 MB', createdAt: new Date('2023-03-22'), pages: 45 },
  { id: 3, name: 'Server Installation Guide', type: 'Installation Book', size: '10.1 MB', createdAt: new Date('2023-05-30'), pages: 320 },
  { id: 4, name: 'Advanced Angular Design', type: 'Design Book', size: '5.8 MB', createdAt: new Date('2023-08-10'), pages: 450 },
  { id: 5, name: 'Component Library', type: 'Item Schedule', size: '0.8 MB', createdAt: new Date('2023-10-01'), pages: 80 },
];

@Injectable({
  providedIn: 'root',
})
export class BookService  {
  private books: Book[] = MOCK_BOOKS;
  constructor() {}

  getBooks(): Book[] {
    return [...this.books];
  }

  getBooksCount(): number {
    return this.books.length;
  }
}
