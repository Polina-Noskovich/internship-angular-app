import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookList } from './book-list';
import { HighlightPipe } from '../pipes/highlight-pipe';

@NgModule({
  declarations: [
    BookList,
    HighlightPipe,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    BookList
  ]
})
export class BookListModule { }