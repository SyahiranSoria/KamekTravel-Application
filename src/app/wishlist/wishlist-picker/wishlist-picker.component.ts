import { Component, Input, OnDestroy, OnInit} from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { wishlist } from '../wishlist.model';
import { WishlistPageModule } from '../wishlist.module';
import { WishlistService } from '../wishlist.service';

@Component({
  selector: 'app-wishlist-picker',
  templateUrl: './wishlist-picker.component.html',
  styleUrls: ['./wishlist-picker.component.scss'],
})
export class WishlistPickerComponent implements OnInit, OnDestroy {

  @Input() tunjokwishlist: wishlist;


  PlaceDlmWishlist : wishlist;

  loadedwishlist: wishlist[];
  private bookingSub: Subscription;
  isLoading = false;

  constructor(
    private modelcontrollercreatewish: ModalController,
    private bookingsServicedlmtok: WishlistService,
    private loadingCtrl : LoadingController,
    private wishlistsini: WishlistService,
    private modalCtrl2: ModalController
    ) { }

  ngOnInit() {
    this.bookingSub = this.bookingsServicedlmtok.wishlisttunjok.subscribe(bookings => {
      this.loadedwishlist = bookings;
    });


  }

  onCancel(){
    this.modelcontrollercreatewish.dismiss(null, 'cancel');
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.bookingsServicedlmtok.fetchwishlist().subscribe(()=> {
      this.isLoading = false;
    });
  }

  ngOnDestroy(){
    if(this.bookingSub){
      this.bookingSub.unsubscribe();
    }
  }

  onSelect(id1: string, id2: string, id3: string, id4: string){
    const wishId = {
      id1,
      id2,
      id3,
      id4
    };

    this.modalCtrl2.dismiss(wishId);
  }



}
