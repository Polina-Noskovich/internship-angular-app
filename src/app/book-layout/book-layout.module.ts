import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookLayoutRoutingModule } from './book-layout-routing.module';
import { BooksPageModule } from './books-page/books-page.module';
import { PagesModule } from './pages/pages.module';
import { PageDetailModule } from './page-detail/page-detail.module';
import { BooksLayout } from './books-layout';

@NgModule({
  declarations: [
    BooksLayout
  ],
  imports: [
    CommonModule,
    BookLayoutRoutingModule,
    BooksPageModule,
    PagesModule,
    PageDetailModule
  ]
})
export class BookLayoutModule { }