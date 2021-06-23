import { Component, OnInit } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { wishlist } from './wishlist.model';
import { WishlistService } from './wishlist.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.page.html',
  styleUrls: ['./wishlist.page.scss'],
})
export class WishlistPage implements OnInit {

  loadedwishlist: wishlist[];
  private bookingSub: Subscription;
  isLoading = false;

  constructor(
    private bookingsServicedlmtok: WishlistService,
    private loadingCtrl : LoadingController  ) { }

  ngOnInit() {
    this.bookingSub = this.bookingsServicedlmtok.wishlisttunjok.subscribe(bookings => {
      this.loadedwishlist = bookings;
      console.log(this.loadedwishlist);
    });
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.bookingsServicedlmtok.fetchwishlist().subscribe(()=> {
      this.isLoading = false;
    });
  }

  onCancelBooking(bookingid: string, demisliding: IonItemSliding){
    demisliding.close();
    this.loadingCtrl.create({message: 'canceling...'}).then(loadingEl => {
      loadingEl.present();

    this.bookingsServicedlmtok.cancelBooking(bookingid).subscribe(() => {
      loadingEl.dismiss();
      console.log('Delete');
    });
  });
  }

  ngOnDestroy(){
    if(this.bookingSub){
      this.bookingSub.unsubscribe();
    }
  }

}
