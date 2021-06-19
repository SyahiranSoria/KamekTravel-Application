import { NgModule } from '@angular/core';
import { Routes, RouterModule, Route } from '@angular/router';
import { Observable, of } from 'rxjs';

import { WishlistPage } from './wishlist.page';

const routes: Routes = [
  {
    path: '',
    component: WishlistPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WishlistPageRoutingModule {

}
