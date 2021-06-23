import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, IonItemSliding, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { WishlistPickerComponent } from 'src/app/wishlist/wishlist-picker/wishlist-picker.component';

import { Planner } from '../planner.model';
import { PlannerService } from '../planner.service';
import { Itinerary } from './itinerary.model';
import { ItineraryService } from './itinerary.service';
import { wishlist, WishlistItineray } from 'src/app/wishlist/wishlist.model';


@Component({
  selector: 'app-travel-itinerary-new',
  templateUrl: './travel-itinerary-new.page.html',
  styleUrls: ['./travel-itinerary-new.page.scss'],
})
export class TravelItineraryNewPage implements OnInit, OnDestroy {

  PlaceDlmDetail : Planner;
  private placeSubSitok: Subscription;
  isLoading = false;
  formPD: FormGroup;
  loadedItinerary: Itinerary[];
  releventItinerary: Itinerary[];
  private Itinerarysubs : Subscription;
  loadedwishlist: WishlistItineray[];
  itinerararray : Itinerary;
  showEdit = false;
  changeWish = false;
  holdId : string;



  constructor(
    private NavCtrlPD: NavController,
    private routeDP: ActivatedRoute,
    private PlacesServiceDP: PlannerService,
    private itineraryServiceDP: ItineraryService,
    private Modalcontrollerdlmtok : ModalController,
    //private actionsheetctrlPD : ActionSheetController,
    //private bookingService : BookingService,
    private loadingCtrl : LoadingController,
    private authServicePD : AuthService,
    private routersini : Router,
    private alertCtrl : AlertController,
    private Itineraryservicehere: ItineraryService,
    private router: Router,
    private loaderCtrl: LoadingController
    ) { }

    ionViewWillEnter(){


    }

  ngOnInit() {
    this.routeDP.paramMap.subscribe(paramMap => {
      if (!paramMap.has('plannerId')) {
        this.NavCtrlPD.navigateBack('/planner');
        return;
      }
      this.isLoading = true;
      let fetchUserId: string;
      this.authServicePD.userId
        .pipe(
          take(1),switchMap(userId => {
        if (!userId) {
          throw new Error('Found no user!');
        }
        fetchUserId = userId;
        return this.PlacesServiceDP
        .getPlanner(paramMap.get('plannerId'));
      })
    )
    .subscribe(Planner => {
          this.PlaceDlmDetail = Planner;
          Planner.userId !== fetchUserId;
          this.isLoading = false;
          this.isLoading = true;
          this.itineraryServiceDP.fetchItinerary(this.PlaceDlmDetail.id).subscribe(()=> {
            this.isLoading = false;
          });
        }, error => {
          this.alertCtrl.create({
            header: 'An error occurred',
            message: 'Place could not be fetch please try again later.',
            buttons: [{text: 'Okay', handler: () => {
              this.routersini.navigate(['/planner']);
            }}]
          }).then(alertEl => {
            alertEl.present();

          })
        }
      );
      this.placeSubSitok = this.itineraryServiceDP.itinerary.subscribe(bookings => {
        this.loadedItinerary = bookings;
        console.log(this.loadedItinerary);
    });
    });



    this.formPD = new FormGroup({
      time: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      notes: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      itinerary: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      })
    });
  }



  onCreatePlanner(){
    if(!this.formPD.valid){
      return;
    }
    this.loaderCtrl.create({
      message: 'Creating Place...'
    }).then(LoadingElPD => {
      LoadingElPD.present();
          return this.Itineraryservicehere.addItinerary(
            this.formPD.value.time,
            this.formPD.value.notes,
            this.formPD.value.itinerary,
            this.PlaceDlmDetail.id
        ).subscribe(() => {
        LoadingElPD.dismiss();
        this.formPD.reset();
        this.router.navigate(['/planner', this.PlaceDlmDetail.id]);
      });
    });
  }

  ngOnDestroy(){
    if(this.placeSubSitok){
      this.placeSubSitok.unsubscribe();
    } else {
      if(this.Itinerarysubs){
        this.Itinerarysubs.unsubscribe();
      }
    }
  }

  onAddWishlist(itinerary: WishlistItineray){
    this.formPD.patchValue({itinerary: itinerary});
    console.log(itinerary,'aloha');
    console.log('sini');
  }

  onCancelBooking(bookingid: string){
    this.loadingCtrl.create({message: 'deleting...'}).then(loadingEl => {
      loadingEl.present();
    this.itineraryServiceDP.cancelBooking(bookingid).subscribe(() => {
      loadingEl.dismiss();
      console.log('Delete');
    });
  });
  }

  onEdit(id: string){
    this.holdId = id;
    this.changeWish = true;
    this.Itinerarysubs = this.itineraryServiceDP
      .getItinerary(id)
      .subscribe(planner => {
        this.itinerararray = planner;
        this.formPD = new FormGroup({
          time : new FormControl(this.itinerararray.time, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          notes : new FormControl(this.itinerararray.notes, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(180)]
          }),
          itinerary: new FormControl(null, {
            updateOn: 'blur',

          })
        });
        this.isLoading = false;
      }, error => {
        this.alertCtrl.create({
          header: 'An error occurred',
          message: 'Place could not be fetch please try again later.',
          buttons: [{text: 'Okay', handler: () => {

          }}]
        }).then(alertEl => {
          alertEl.present();
        })
      });
      this.showEdit = true;
  }

  saveEdit(){
    if(!this.formPD.valid){
      return;
    }
    this.loadingCtrl
      .create({
      message: 'Updating Place...'
    }).then(loadingEl => {
      loadingEl.present();
      this.itineraryServiceDP
        .updateItinerary(
        this.PlaceDlmDetail.id,
        this.holdId,
        this.formPD.value.time,
        this.formPD.value.notes
      )
      .subscribe(() => {
        loadingEl.dismiss();
        this.formPD.reset();
        this.showEdit = false;
        this.changeWish = false;
      });
    })
  }



}
