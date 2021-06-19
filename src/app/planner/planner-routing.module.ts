import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlannerPage } from './planner.page';

const routes: Routes = [
  {
    path: '',
    component: PlannerPage
  },
  {
    path: 'create-travel-planner',
    loadChildren: () => import('./create-travel-planner/create-travel-planner.module').then( m => m.CreateTravelPlannerPageModule)
  },
  {
    path: ':plannerId',
    loadChildren: () => import('./travel-itinerary-new/travel-itinerary-new.module').then( m => m.TravelItineraryNewPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlannerPageRoutingModule {}
