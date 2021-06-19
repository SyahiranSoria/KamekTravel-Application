import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateTravelPlannerPage } from './create-travel-planner.page';

const routes: Routes = [
  {
    path: '',
    component: CreateTravelPlannerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateTravelPlannerPageRoutingModule {}
