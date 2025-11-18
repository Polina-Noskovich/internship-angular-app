import { Injectable } from '@angular/core';
import { Book } from '../books-page/models/book-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, find } from 'rxjs';

const MOCK_BOOKS: Book[] = [
  { id: 1, name: 'Angular Basics', type: 'Design Book', size: '2.5 MB', createdAt: new Date('2023-01-15'), pages: 15 },
  { id: 2, name: 'Project Planning', type: 'Item Schedule', size: '1.2 MB', createdAt: new Date('2023-03-22'), pages: 5 },
  { id: 3, name: 'Server Installation Guide', type: 'Installation Book', size: '10.1 MB', createdAt: new Date('2023-05-30'), pages: 10 },
  { id: 4, name: 'Advanced Angular Design', type: 'Design Book', size: '5.8 MB', createdAt: new Date('2023-08-10'), pages: 12 },
  { id: 5, name: 'Component Library', type: 'Item Schedule', size: '0.8 MB', createdAt: new Date('2023-10-01'), pages: 8 },
];

@Injectable({
  providedIn: 'root',
})
export class BookService  {
  private readonly books$ = new BehaviorSubject<Book[]>(MOCK_BOOKS);
  constructor() {}

  public getBooks(): Observable<Book[]> {
    return this.books$.asObservable();
  }

  public getBooksCount(): Observable<number> {
    return this.books$.pipe(
      map(books => books.length)
    );
  }

  public addBook(book: Book): void {
    const currentBooks = this.books$.getValue();
    const updatedBooks = [...currentBooks, book];
    this.books$.next(updatedBooks);
  }

  public deleteBook(bookId: number): void {
    const currentBooks = this.books$.getValue();
    const updatedBooks = currentBooks.filter(book => book.id !== bookId);
    this.books$.next(updatedBooks);
  }
  
  public getBookById(id: number): Observable<Book | undefined> {
    return this.getBooks().pipe(
      map(books => books.find(book => book.id === id))
    );
  }

}
