import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksPage } from './books-page';
import { BookListModule } from '../book-list/book-list-module'; 
import { Autofocus } from '../directives/autofocus';
import { BooksRoutingModule } from '../books-routing-module';

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