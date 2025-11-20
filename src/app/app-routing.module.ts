import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { BooksPage } from './books-page/books-page';
import { Pages } from './pages/pages';
import { PageDetail } from './page-detail/page-detail';
import { BooksLayout } from './books-page/books-layout/books-layout'; 

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: Dashboard },
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

  @NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
