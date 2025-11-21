import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BooksSelectors } from '../store/books/books.selectors';
import { GetBooks } from '../store/books/books.actions'; 
import { Select, Store } from '@ngxs/store';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './book-count.html',
  styleUrl: './book-count.scss',
})

export class BookCount implements OnInit { 

  protected readonly projectName: string = 'Internship Book App';

  @Select(BooksSelectors.getBooksCount)
  protected readonly bookCount$!: Observable<number>;

  constructor(private readonly store: Store) {}

  public ngOnInit(): void {
    this.store.dispatch(new GetBooks());
  }
}