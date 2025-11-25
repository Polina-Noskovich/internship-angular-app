import { Component, Signal, signal, computed, inject  } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Book } from '../../store/books/books-state.model';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
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
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  protected readonly book: Signal<Book | undefined> = toSignal(
    this.route.paramMap.pipe(
      switchMap(params => {
        const bookId = Number(params.get('bookId'));
        return this.store.select<Book | undefined>(BooksSelectors.bookById(bookId));
      })
    )
  );

  protected readonly pagination = signal<PageEvent>({
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  });

  private readonly allPages = computed(() => {
    const book = this.book();
    return book ? Array.from({ length: book.pages }, (_, i) => i + 1) : [];
  });

  protected readonly totalPages = computed(() => this.allPages().length);

  protected readonly paginatedPages = computed(() => {
      const pages = this.allPages();
      const paginationState = this.pagination();

      const startIndex = paginationState.pageIndex * paginationState.pageSize;
      const endIndex = startIndex + paginationState.pageSize;
      return pages.slice(startIndex, endIndex);
  });
  
  constructor() {}

  protected onPageChange(event: PageEvent): void {
    this.pagination.set(event);
  }
}