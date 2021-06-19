import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { WishlistPickerComponent } from './wishlist-picker/wishlist-picker.component';

import { WishlistPageRoutingModule } from './wishlist-routing.module';
import { WishlistShowComponent } from './wishlist-show/wishlist-show.component';

import { WishlistPage } from './wishlist.page';

//import { MapModalComponent } from '../shared/map-modal/map-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WishlistPageRoutingModule
  ],
  declarations: [WishlistPage, WishlistPickerComponent, WishlistShowComponent],
  exports: [WishlistShowComponent]
})
export class WishlistPageModule {}

// declarations: [LocationPickerComponent, MapModalComponent, ImagePickerComponent],
//   imports: [CommonModule, IonicModule.forRoot()],
//   exports: [LocationPickerComponent, MapModalComponent, ImagePickerComponent],
//   entryComponents: [MapModalComponent]
