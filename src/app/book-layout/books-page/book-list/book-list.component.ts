import { Component, input, output } from '@angular/core';
import { Book } from '../../../store/books/books-state.model';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { HighlightPipe } from '../pipes/highlight.pipe';
import { DatePipe } from '@angular/common'; 

@Component({
  selector: 'app-book-list',
  imports: [
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    HighlightPipe,
    DatePipe
  ],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
})
export class BookListComponent {
  public readonly books = input.required<Book[]>();
  public readonly searchValue = input<string>('');

  public readonly deleteBook = output<number>();

  protected onDelete(bookId: number): void {
    this.deleteBook.emit(bookId);
  }
}
