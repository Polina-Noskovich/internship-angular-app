import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './book-count.html',
  styleUrl: './book-count.scss',
})

export class BookCount implements OnInit { 
  protected readonly projectName: string = 'Internship Book App';
  protected bookCount$!: Observable<number>;

  constructor(private readonly bookService: BookService) {}

  public ngOnInit(): void {
    this.bookCount$ = this.bookService.getBooksCount();
  }
}