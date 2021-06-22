import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PoiDetailsPageRoutingModule } from './poi-details-routing.module';
import { PoiDetailsPage } from './poi-details.page';
import { StarcategoryComponent } from './starcategory/starcategory.component';
import { WishlistaddPageModule } from '../wishlistadd/wishlistadd.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PoiDetailsPageRoutingModule,
    WishlistaddPageModule
  ],
  declarations: [PoiDetailsPage, StarcategoryComponent]
})
export class PoiDetailsPageModule {}
