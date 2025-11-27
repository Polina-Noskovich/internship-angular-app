import { Routes } from '@angular/router';
import { BookCountComponent } from './book-count/book-count.component';
import { BooksPageComponent } from './book-layout/books-page/books-page.component';
import { PagesComponent } from './book-layout/pages/pages.component';
import { PageDetailComponent } from './book-layout/page-detail/page-detail.component';
import { BooksLayoutComponent } from './book-layout/books-layout.component'; 

export const appRoutes: Routes = [
  { path: '', redirectTo: 'book-count', pathMatch: 'full'},
  { path: 'book-count', component: BookCountComponent },
  { path: 'books', component: BooksLayoutComponent, 
    children: [
      {
        path: '',
        component: BooksPageComponent 
      },
      { 
        path: ':bookId/pages',
        component: PagesComponent
      },
      { 
        path: ':bookId/pages/:pageNumber', 
        component: PageDetailComponent
      }
    ]
  },
];
