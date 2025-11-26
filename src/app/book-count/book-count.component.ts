import { Component, Signal, signal, inject } from '@angular/core';
import { BooksSelectors } from '../store/books/books.selectors';
import { Store } from '@ngxs/store';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './book-count.component.html',
  styleUrl: './book-count.component.scss',
})
export class BookCountComponent {
  private readonly store = inject(Store);

  protected readonly projectName = signal<string>('Internship Book App');
  protected readonly bookCount: Signal<number> = this.store.selectSignal(BooksSelectors.booksCount);
  
}