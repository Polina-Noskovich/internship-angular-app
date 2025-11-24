import { Component, Signal, signal } from '@angular/core';
import { BooksSelectors } from '../store/books/books.selectors';
import { GetBooks } from '../store/books/books.actions';
import { Store } from '@ngxs/store';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './book-count.component.html',
  styleUrl: './book-count.component.scss',
})
export class BookCountComponent {
  protected readonly projectName = signal<string>('Internship Book App');
  protected readonly bookCount: Signal<number>;

  constructor(private readonly store: Store) {
    this.bookCount = this.store.selectSignal(BooksSelectors.getBooksCount);
    
    this.store.dispatch(new GetBooks());
  }
}