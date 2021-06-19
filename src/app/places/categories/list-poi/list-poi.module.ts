import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListPoiPageRoutingModule } from './list-poi-routing.module';

import { ListPoiPage } from './list-poi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListPoiPageRoutingModule
  ],
  declarations: [ListPoiPage]
})
export class ListPoiPageModule {}
