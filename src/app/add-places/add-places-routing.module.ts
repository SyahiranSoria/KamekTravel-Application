import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPlacesPage } from './add-places.page';

const routes: Routes = [
  {
    path: '',
    component: AddPlacesPage
  },
  {
    path: 'new-places',
    loadChildren: () => import('./new-places/new-places.module').then( m => m.NewPlacesPageModule)
  },
  {
    path: ':placeId',
    loadChildren: () => import('./edit-places/edit-places.module').then( m => m.EditPlacesPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPlacesPageRoutingModule {}
