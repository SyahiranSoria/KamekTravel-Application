import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WishlistaddPage } from './wishlistadd.page';

const routes: Routes = [
  {
    path: '',
    component: WishlistaddPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WishlistaddPageRoutingModule {}
