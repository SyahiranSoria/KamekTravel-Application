import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TravelItineraryNewPageRoutingModule } from './travel-itinerary-new-routing.module';

import { TravelItineraryNewPage } from './travel-itinerary-new.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { WishlistPageModule } from 'src/app/wishlist/wishlist.module';
//import { WishlistPickerComponent } from 'src/app/wishlist/wishlist-picker/wishlist-picker.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    TravelItineraryNewPageRoutingModule,
    WishlistPageModule
  ],
  declarations: [TravelItineraryNewPage]
})
export class TravelItineraryNewPageModule {}
