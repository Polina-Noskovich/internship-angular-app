import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksPage } from './books-page';
import { BookListModule } from './book-list/book-list.module'; 
import { Autofocus } from './directives/autofocus.directive';
import { BooksRoutingModule } from './books-page-routing.module';

@NgModule({
  declarations: [
    BooksPage,
    Autofocus
  ],
  imports: [
    CommonModule,
    BookListModule,
    BooksRoutingModule,
    ]
})
export class BooksPageModule { }