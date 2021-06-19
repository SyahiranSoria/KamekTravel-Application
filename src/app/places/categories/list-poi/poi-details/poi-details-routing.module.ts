import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoiDetailsPage } from './poi-details.page';

const routes: Routes = [
  {
    path: '',
    component: PoiDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PoiDetailsPageRoutingModule {}
