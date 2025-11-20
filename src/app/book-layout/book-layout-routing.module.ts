import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksPage } from './books-page/books-page';
import { Pages } from './pages/pages';
import { PageDetail } from './page-detail/page-detail';

const routes: Routes = [
  { path: '', redirectTo: 'list', pathMatch: 'full' },
  { path: 'list', component: BooksPage },
  { path: ':bookId/pages', component: Pages },
  { path: ':bookId/pages/:pageNumber', component: PageDetail },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookLayoutRoutingModule { }