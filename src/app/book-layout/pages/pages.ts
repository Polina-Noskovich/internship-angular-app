import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, map, switchMap, combineLatest } from 'rxjs';
import { Book } from '../../store/books/books.model';
import { PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { GetBooks } from '../../store/books/books.actions';
import { BooksSelectors } from '../../store/books/books.selectors';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatPaginatorModule
  ],
  templateUrl: './pages.html',
  styleUrl: './pages.scss',
})
export class Pages implements OnInit {
  protected book$!: Observable<Book | undefined>;
  protected paginatedPages$!: Observable<number[]>;
  protected totalPages$!: Observable<number>;

  protected readonly pagination$ = new BehaviorSubject<PageEvent>({
    pageIndex: 0,
    pageSize: 10,
    length: 0,
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly store: Store
  ) {}

  public ngOnInit(): void {
    this.store.dispatch(new GetBooks());

    this.book$ = this.route.paramMap.pipe(
      switchMap(params => {
        const bookId = Number(params.get('bookId'));
        return this.store.select(BooksSelectors.getBookById(bookId));
      })
    );

    const allPages$ = this.book$.pipe(
      map(book => book ? Array.from({ length: book.pages }, (_, i) => i + 1) : [])
    );

    this.totalPages$ = allPages$.pipe(map(pages => pages.length));
    
    this.paginatedPages$ = combineLatest([
      allPages$,
      this.pagination$
    ]).pipe(
      map(([allPages, pagination]) => {
        const startIndex = pagination.pageIndex * pagination.pageSize;
        const endIndex = startIndex + pagination.pageSize;
        return allPages.slice(startIndex, endIndex);
      })
    );
  }

  protected onPageChange(event: PageEvent): void {
    this.pagination$.next(event);
  }
}