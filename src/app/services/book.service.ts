import { Injectable } from '@angular/core';
import { Book } from '../books-page/models/book-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookService  {
  private readonly booksUrl = '/assets/data.json'
  private readonly books$ = new BehaviorSubject<Book[]>([]);

  constructor(private readonly http: HttpClient) { }

  public getBooks(): Observable<Book[]> {
    if (this.books$.getValue().length === 0) {
      this.loadInitialBooks();
    }
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

  private loadInitialBooks(): void {
    this.http.get<Book[]>(this.booksUrl).subscribe({
      next: (books) => {
        this.books$.next(books);
      }
    });
  }

}
