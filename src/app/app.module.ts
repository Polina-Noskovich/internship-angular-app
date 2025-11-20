import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { App } from './app';
import { HttpClientModule } from '@angular/common/http';
import { BooksPageModule } from './books-page/books-page.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesModule } from './pages/pages.module';
import { PageDetailModule } from './page-detail/page-detail.module';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BooksPageModule,
    DashboardModule,
    PagesModule,
    PageDetailModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
