import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageDetailRoutingModule } from './page-detail-routing.module';
import { PageDetail } from './page-detail';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    PageDetail
  ],
  imports: [
    CommonModule,
    PageDetailRoutingModule,
    RouterModule,
    MatIconModule
  ]
})
export class PageDetailModule { }
