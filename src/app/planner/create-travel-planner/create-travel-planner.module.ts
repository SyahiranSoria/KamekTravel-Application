import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateTravelPlannerPageRoutingModule } from './create-travel-planner-routing.module';

import { CreateTravelPlannerPage } from './create-travel-planner.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    CreateTravelPlannerPageRoutingModule
  ],
  declarations: [CreateTravelPlannerPage]
})
export class CreateTravelPlannerPageModule {}
