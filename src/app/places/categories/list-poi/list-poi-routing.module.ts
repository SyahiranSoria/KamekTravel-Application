import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPoiPage } from './list-poi.page';

const routes: Routes = [
  {
    path: '',
    component: ListPoiPage
  },
  {
    path: ':placeId',//'poi-details',
    loadChildren: () => import('./poi-details/poi-details.module').then( m => m.PoiDetailsPageModule)
  },
  {
    path: 'wishlistadd',
    loadChildren: () => import('./wishlistadd/wishlistadd.module').then( m => m.WishlistaddPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPoiPageRoutingModule {}
