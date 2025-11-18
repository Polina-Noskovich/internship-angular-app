import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageDetail } from './page-detail';

const routes: Routes = [{ path: '', component: PageDetail }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageDetailRoutingModule { }
