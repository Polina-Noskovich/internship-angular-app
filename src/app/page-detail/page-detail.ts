import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Book } from '../books-page/models/book-model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-page-detail',
  standalone: false,
  templateUrl: './page-detail.html',
  styleUrl: './page-detail.scss',
})
export class PageDetail implements OnInit {
  protected book$!: Observable<Book | undefined>;
  protected pageNumber$!: Observable<number>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly bookService: BookService,
  ) {}

  public ngOnInit(): void {
    this.pageNumber$ = this.route.paramMap.pipe(
      map(params => Number(params.get('pageNumber')))
    );

    this.book$ = this.route.paramMap.pipe(
      switchMap(params => {
        const bookId = Number(params.get('bookId'));
        return this.bookService.getBookById(bookId);
      })
    );
  }

}
