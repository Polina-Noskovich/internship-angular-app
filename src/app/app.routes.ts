import { Routes } from '@angular/router';
import { BookCount } from './book-count/book-count';
import { BooksPage } from './book-layout/books-page/books-page';
import { Pages } from './book-layout/pages/pages';
import { PageDetail } from './book-layout/page-detail/page-detail';
import { BooksLayout } from './book-layout/books-layout'; 

export const appRoutes: Routes = [
  { path: '', redirectTo: 'book-count', pathMatch: 'full'},
  { path: 'book-count', component: BookCount },
  { path: 'books', component: BooksLayout, 
    children: [
      {
        path: '',
        component: BooksPage 
      },
      { 
        path: ':bookId/pages',
        component: Pages
      },
      { 
        path: ':bookId/pages/:pageNumber', 
        component: PageDetail
      }
    ]
  },
];
