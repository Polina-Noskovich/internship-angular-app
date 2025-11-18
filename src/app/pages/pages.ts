import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { Book } from '../books-page/models/book-model';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-pages',
  standalone: false,
  templateUrl: './pages.html',
  styleUrl: './pages.scss',
})
export class Pages {
  protected book$!: Observable<Book | undefined>;
  protected pages:number[] = [];

  protected selectedPageNumber: number | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly bookService: BookService
  ) {}

  public ngOnInit(): void {
    this.book$ = this.route.paramMap.pipe(
      switchMap(params => {
        const bookId = Number(params.get('bookId'));
        return this.bookService.getBookById(bookId);
      })
    );

    this.book$.subscribe(book=> {
      if(book) {
        this.pages = Array.from({length: book.pages}, (_,i) => i+i);
      }
    });
  }

  protected goToAllPages(): void {
    this.router.navigate(['/books']);
  }

}
