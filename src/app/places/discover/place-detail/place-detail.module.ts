import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlaceDetailPageRoutingModule } from './place-detail-routing.module';

import { PlaceDetailPage } from './place-detail.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { PlacesDetailPageModule } from '../places-detail/places-detail.module';
import { StarRatingPageModule } from 'src/app/star-rating/star-rating.module';
import { StarRatingPage } from 'src/app/star-rating/star-rating.page';
import { StarComponent } from './star/star.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlaceDetailPageRoutingModule,
    PlacesDetailPageModule
  ],
  declarations: [PlaceDetailPage, StarComponent]
})
export class PlaceDetailPageModule {}

