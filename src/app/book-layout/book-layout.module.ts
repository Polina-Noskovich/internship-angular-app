import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BooksPageModule } from './books-page/books-page.module';
import { PagesModule } from './pages/pages.module';
import { PageDetailModule } from './page-detail/page-detail.module';
import { BooksLayout } from './books-layout';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BooksLayout
  ],
  imports: [
    CommonModule,
    BooksPageModule,
    PagesModule,
    PageDetailModule,
    RouterModule
  ]
})
export class BookLayoutModule { }