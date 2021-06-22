import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WishlistaddPageRoutingModule } from './wishlistadd-routing.module';

import { WishlistaddPage } from './wishlistadd.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WishlistaddPageRoutingModule
  ],
  declarations: [WishlistaddPage],
  exports: [WishlistaddPage]
})
export class WishlistaddPageModule {}
