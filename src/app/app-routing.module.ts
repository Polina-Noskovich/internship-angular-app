import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'books', loadChildren: () => import('./books-page/books-page.module').then(m => m.BooksPageModule) },
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'pages/:bookId', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
  { path: 'page-detail/:bookId/:pageNumber', loadChildren: () => import('./page-detail/page-detail.module').then(m => m.PageDetailModule) },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
