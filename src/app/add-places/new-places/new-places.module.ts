import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewPlacesPageRoutingModule } from './new-places-routing.module';

import { NewPlacesPage } from './new-places.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    NewPlacesPageRoutingModule,
    SharedModule
  ],
  declarations: [NewPlacesPage]
})
export class NewPlacesPageModule {}
