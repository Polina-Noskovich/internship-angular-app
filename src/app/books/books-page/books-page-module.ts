import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksPage } from './books-page';
import { BookListModule } from '../book-list/book-list-module'; 

@NgModule({
  declarations: [
    BooksPage
  ],
  imports: [
    CommonModule,
    BookListModule 
  ]
})
export class BooksPageModule { }