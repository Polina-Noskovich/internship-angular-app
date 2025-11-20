import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app';
import { HttpClientModule } from '@angular/common/http';
import { BooksPageModule } from './book-layout/books-page/books-page.module';
import { BookCountModule } from './book-count/book-count.module';
import { PagesModule } from './book-layout/pages/pages.module';
import { PageDetailModule } from './book-layout/page-detail/page-detail.module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BooksPageModule,
    BookCountModule,
    PagesModule,
    PageDetailModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
