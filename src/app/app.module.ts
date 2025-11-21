import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app';
import { HttpClientModule } from '@angular/common/http';
import { BookCountModule } from './book-count/book-count.module';
import { BookLayoutModule } from './book-layout/book-layout.module';
import { BooksState } from './store/books/books.state';
import { NgxsModule } from '@ngxs/store';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BookCountModule,
    BookLayoutModule,
    NgxsModule.forRoot([BooksState])
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
