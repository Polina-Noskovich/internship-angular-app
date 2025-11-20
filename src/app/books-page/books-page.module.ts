import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksPage } from './books-page';
import { BookListModule } from './book-list/book-list.module'; 
import { Autofocus } from './directives/autofocus.directive';
import { BooksRoutingModule } from './books-page-routing.module';
import { BooksLayout } from './books-layout/books-layout';

@NgModule({
  declarations: [
    BooksPage,
    Autofocus,
    BooksLayout
  ],
  imports: [
    CommonModule,
    BookListModule,
    BooksRoutingModule,
  ],
})
export class BooksPageModule { }