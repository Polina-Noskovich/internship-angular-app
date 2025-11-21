import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookCount } from './book-count';

const routes: Routes = [{ path: '', component: BookCount }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookCountRoutingModule { }
