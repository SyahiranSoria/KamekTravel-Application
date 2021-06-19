import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PoiDetailsPageRoutingModule } from './poi-details-routing.module';

import { PoiDetailsPage } from './poi-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoiDetailsPageRoutingModule
  ],
  declarations: [PoiDetailsPage]
})
export class PoiDetailsPageModule {}
