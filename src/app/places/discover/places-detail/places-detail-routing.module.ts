import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacesDetailPage } from './places-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PlacesDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesDetailPageRoutingModule {}
