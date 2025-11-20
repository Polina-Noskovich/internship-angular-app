import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, BehaviorSubject, map, switchMap, combineLatest } from 'rxjs';
import { Book } from '../books-page/models/book-model';
import { BookService } from '../../services/book.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-pages',
  standalone: false,
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
    private readonly bookService: BookService
  ) {}

  public ngOnInit(): void {
    this.book$ = this.route.paramMap.pipe(
      switchMap(params => {
        const bookId = Number(params.get('bookId'));
        return this.bookService.getBookById(bookId);
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