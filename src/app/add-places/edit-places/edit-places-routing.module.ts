import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditPlacesPage } from './edit-places.page';

const routes: Routes = [
  {
    path: '',
    component: EditPlacesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditPlacesPageRoutingModule {}
