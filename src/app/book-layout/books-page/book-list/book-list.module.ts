import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookList } from './book-list';
import { HighlightPipe } from '../pipes/highlight.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    BookList,
    HighlightPipe,
  ],
  imports: [
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  exports: [
    BookList,
  ]
})
export class BookListModule { }