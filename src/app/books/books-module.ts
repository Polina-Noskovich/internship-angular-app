import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing-module';
import { BooksPageModule } from './books-page/books-page-module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    BooksPageModule
  ]
})
export class BooksModule { }