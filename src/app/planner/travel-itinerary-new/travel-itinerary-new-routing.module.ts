import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TravelItineraryNewPage } from './travel-itinerary-new.page';

const routes: Routes = [
  {
    path: '',
    component: TravelItineraryNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TravelItineraryNewPageRoutingModule {}
