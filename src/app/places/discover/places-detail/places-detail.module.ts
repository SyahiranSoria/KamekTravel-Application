import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlacesDetailPageRoutingModule } from './places-detail-routing.module';

import { PlacesDetailPage } from './places-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlacesDetailPageRoutingModule
  ],
  declarations: [PlacesDetailPage],
  exports: [PlacesDetailPage]
})
export class PlacesDetailPageModule {}
