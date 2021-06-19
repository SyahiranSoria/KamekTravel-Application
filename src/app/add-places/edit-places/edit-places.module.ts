import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPlacesPageRoutingModule } from './edit-places-routing.module';

import { EditPlacesPage } from './edit-places.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    EditPlacesPageRoutingModule
  ],
  declarations: [EditPlacesPage]
})
export class EditPlacesPageModule {}
