import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Books } from './components/books/books';

const routes: Routes = [
  { path: '', component: Books }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
