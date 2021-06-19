import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPoiPage } from './list-poi.page';

const routes: Routes = [
  {
    path: '',
    component: ListPoiPage
  },
  {
    path: ':poi_id',//'poi-details',
    loadChildren: () => import('./poi-details/poi-details.module').then( m => m.PoiDetailsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPoiPageRoutingModule {}
