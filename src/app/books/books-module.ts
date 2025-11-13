import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing-module';
import { Books } from './components/books/books';
import { BookList } from './components/book-list/book-list';
import { Highlight } from './directives/highlight';
import { HighlightPipe } from './pipes/highlight-pipe';

@NgModule({
  declarations: [
    Books,
    BookList,
    Highlight,
    HighlightPipe,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule
  ],
  exports: [ BookList ],
})
export class BooksModule { }
