import { NgModule } from '@angular/core';
import { BookCountRoutingModule } from './book-count-routing.module';
import { BookCount } from './book-count';
import { CommonModule } from '@angular/common'; 

@NgModule({
  declarations: [
    BookCount
  ],
  imports: [
    CommonModule,
    BookCountRoutingModule
  ]
})
export class BookCountModule { }