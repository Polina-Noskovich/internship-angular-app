import { Component, input, output } from '@angular/core';
import { Book } from '../../../store/books/books.model';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HighlightPipe } from '../pipes/highlight.pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    HighlightPipe,
    CommonModule
  ],
  templateUrl: './book-list.html',
  styleUrl: './book-list.scss',
})
export class BookList {
  public books = input.required<Book[]>();
  public searchTerm = input<string>('');

  public readonly deleteBook = output<number>();

  protected onDelete(bookId: number): void {
    this.deleteBook.emit(bookId);
  }
}
