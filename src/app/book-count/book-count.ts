import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksSelectors } from '../store/books/books.selectors';
import { GetBooks } from '../store/books/books.actions';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './book-count.html',
  styleUrl: './book-count.scss',
})
export class BookCount implements OnInit {
  protected readonly projectName: string = 'Internship Book App';
  protected bookCount$!: Observable<number>;

  constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(new GetBooks());
    this.bookCount$ = this.store.select(BooksSelectors.getBooksCount);
  }
}
