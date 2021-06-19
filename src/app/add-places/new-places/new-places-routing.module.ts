import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewPlacesPage } from './new-places.page';

const routes: Routes = [
  {
    path: '',
    component: NewPlacesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewPlacesPageRoutingModule {}
