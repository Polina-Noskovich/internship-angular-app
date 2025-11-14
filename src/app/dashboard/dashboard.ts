import { Component, OnInit } from '@angular/core';
import { BookService } from '../books/services/book';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
})
export class Dashboard {
  projectName: string = 'Internship Book App';
  bookCount$!: Observable<number>;

  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookCount$ = this.bookService.getBooksCount();
  }

}
