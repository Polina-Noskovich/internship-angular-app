import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PagesRoutingModule } from './pages-routing.module';
import { Pages } from './pages';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    Pages
  ],
  imports: [
    CommonModule,
    RouterModule,
    PagesRoutingModule,
    MatIconModule,
    MatPaginatorModule
  ]
})
export class PagesModule { }
