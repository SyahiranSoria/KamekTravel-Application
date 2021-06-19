import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPlacesPageRoutingModule } from './add-places-routing.module';

import { AddPlacesPage } from './add-places.page';

import { AddPlacesItemComponent } from './add-places-item/add-places-item.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPlacesPageRoutingModule
  ],
  declarations: [AddPlacesPage,AddPlacesItemComponent]
})
export class AddPlacesPageModule {}
