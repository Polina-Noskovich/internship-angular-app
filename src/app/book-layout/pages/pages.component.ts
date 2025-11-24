import { Component, OnInit, Signal, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Book } from '../../store/books/books-state.model';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { GetBooks } from '../../store/books/books.actions';
import { BooksSelectors } from '../../store/books/books.selectors';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    RouterModule,
    MatIconModule,
    MatPaginatorModule
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
})
export class PagesComponent {
  protected book: Signal<Book | undefined>;
  protected paginatedPages: Signal<number[]>;
  protected totalPages: Signal<number>;

  protected readonly pagination = signal<PageEvent>({
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store
  ) {
    this.book = toSignal(
      this.route.paramMap.pipe(
        switchMap(params => {
          const bookId = Number(params.get('bookId'));
          return this.store.select<Book | undefined>(BooksSelectors.getBookById(bookId));
        })
      )
    );

    const allPages = computed(() => {
      const book = this.book();
      return book ? Array.from({ length: book.pages }, (_,i) => i + 1) : [];
    });

    this.totalPages = computed(() => allPages().length);

    this.paginatedPages = computed(() => {
      const pages = allPages();
      const paginationState = this.pagination();

      const startIndex = paginationState.pageIndex * paginationState.pageSize;
      const endIndex = startIndex + paginationState.pageSize;
      return pages.slice(startIndex, endIndex);
    });

    this.store.dispatch(new GetBooks());
  }

  protected onPageChange(event: PageEvent): void {
    this.pagination.set(event);
  }
}