import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Planner } from 'src/app/planner/planner.model';
import { WishlistPickerComponent } from '../wishlist-picker/wishlist-picker.component';
import { WishlistItineray } from 'src/app/wishlist/wishlist.model';

@Component({
  selector: 'app-wishlist-show',
  templateUrl: './wishlist-show.component.html',
  styleUrls: ['./wishlist-show.component.scss'],
})
export class WishlistShowComponent implements OnInit {

  @Output() wishlistPick = new EventEmitter<WishlistItineray>();
  selectedId: string;
  selectedImage: string;
  selecteddesc: string;
  selectedTitle: string;
  @Input() showPreview = false;

  PlaceDlmDetail : Planner;
  // private placeSubSitok: Subscription;
   isLoading = false;
   showButton = false;
  // formPD: FormGroup;
  // loadedItinerary: Itinerary[];
  // releventItinerary: Itinerary[];
  // private Itinerarysubs : Subscription;

  constructor(
    // private NavCtrlPD: NavController,
    // private routeDP: ActivatedRoute,
    // private PlacesServiceDP: PlannerService,
    // private itineraryServiceDP: ItineraryService,
    private Modalcontrollerdlmtok : ModalController,
    // private actionsheetctrlPD : ActionSheetController,
    // private bookingService : BookingService,
    // private loadingCtrl : LoadingController,
    // private authServicePD : AuthService,
    // private routersini : Router,
    // private alertCtrl : AlertController,
    // private Itineraryservicehere: ItineraryService,
    // private router: Router,
    // private loaderCtrl: LoadingController
  ) { }

  ngOnInit() {}



  openWishlistModal(){
    this.Modalcontrollerdlmtok
      .create({
      component: WishlistPickerComponent,
      componentProps: {tunjokwishlist: this.PlaceDlmDetail}})
    .then(modalElpolah => {
      modalElpolah.present();
        modalElpolah.onDidDismiss().then(modalData => {
          if (!modalData.data) {
            return;
          }
          const wishlist: WishlistItineray ={
            description: modalData.data.id1,
            placeTitle: modalData.data.id2,
            placeImage: modalData.data.id3,
            placeId: modalData.data.id4
          };

          this.selectedId = wishlist.placeId;
          this.selectedImage = wishlist.placeImage;
          this.selecteddesc = wishlist.description;
          this.selectedTitle = wishlist.placeTitle;

          // this.createItinerary(wishlist.placeId,
          //   wishlist.description,wishlist.placeTitle,
          //   wishlist.placeImage)
          // this.selectedWishlist = wishlist.placeImage;
           this.wishlistPick.emit(wishlist);
           console.log(wishlist.description);
        });

      });
  }

  // private createItinerary(placeId: string,
  //   description: string, placeTitle:string,
  //   placeImage: string){
  //       const wishlistPicked: WishlistItineray ={
  //         placeId: placeId,
  //         description: description,
  //         placeTitle: placeTitle,
  //         placeImage: placeImage,
  //       };
  //       console.log(wishlistPicked);
  //   }

}
