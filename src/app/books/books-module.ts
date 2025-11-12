import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksRoutingModule } from './books-routing-module';
import { Books } from './components/books/books';
import { BookList } from './components/book-list/book-list';
import { Highlight } from './directives/highlight';

@NgModule({
  declarations: [
    Books,
    BookList,
    Highlight,
  ],
  imports: [
    CommonModule,
    BooksRoutingModule
  ],
  exports: [ BookList ],
})
export class BooksModule { }
