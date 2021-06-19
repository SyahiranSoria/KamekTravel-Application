import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActionSheetController, AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
//import { BookingService } from 'src/app/bookings/booking.service';
//import { CreateBookingComponent } from 'src/app/bookings/create-booking/create-booking.component';
import { MapModalComponent } from 'src/app/shared/map-modal/map-modal.component';
import { StarRatingPage } from 'src/app/star-rating/star-rating.page';
import { star } from 'src/app/star-rating/star.model';
import { StarvoteService } from 'src/app/star-rating/starvote.service';

import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';


@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit, OnDestroy {

  PlaceDlmDetail : Place;
  private placeSubSitok: Subscription;
  isLoading = false;
  isBookable = false;
  loadedrating: star[];
  loadedrating1: star[];

  title = "star-angular";
  stars = [1, 2, 3, 4, 5];
  a = 0;
  rating = this.a;
  hoverState = 0;

  constructor(
    private NavCtrlPD: NavController,
    private routeDP: ActivatedRoute,
    private PlacesServiceDP: PlacesService,
    private Modalcontrollerdlmtok : ModalController,
    //private actionsheetctrlPD : ActionSheetController,
    //private bookingService : BookingService,
    private loadingCtrl : LoadingController,
    private authServicePD : AuthService,
    private routersini : Router,
    private starservice : StarvoteService,
    private alertCtrl : AlertController
    ) { }

  ngOnInit() {
    this.placeSubSitok = this.starservice.star.subscribe(rating => {
      //this.isLoading = true;
      this.loadedrating = rating;
      console.log(this.loadedrating,'rating');
    });
    this.routeDP.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.NavCtrlPD.navigateBack('/places/tabs/discover');//navigate back if no data
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
        .getPlace(paramMap.get('placeId'));
      })
    )
    .subscribe(place => {
          this.PlaceDlmDetail = place;
          this.isBookable = place.userId !== fetchUserId;
          this.isLoading = false;
        }, error => {
          this.alertCtrl.create({
            header: 'An error occurred',
            message: 'Place could not be fetch please try again later.',
            buttons: [{text: 'Okay', handler: () => {
              this.routersini.navigate(['/places/tabs/discover']);
            }}]
          }).then(alertEl => {
            alertEl.present();
          })
        }
      );
      console.log(this.PlaceDlmDetail);
    });
  }

  //method 1
  //onBookPlace(){
    //this.routerPD.navigateByUrl('/places/tabs/discover');
    //this.NavCtrlPD.navigateBack('/places/tabs/discover');
  //   this.actionsheetctrlPD.create({
  //     header: 'Choose an Action',
  //     buttons: [
  //       {
  //         text: 'Select Date',
  //         handler: ()=> {
  //           this.openBookingModal('select');
  //         }
  //       },
  //       {
  //         text: 'Random Date',
  //         handler: ()=> {
  //           this.openBookingModal('random');
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'destructive'
  //       }
  //     ]
  //   }).then(actionsheetElPD => {
  //     actionsheetElPD.present();
  //   });

  // }

  //method 2
  // openRatePlace(){
  //   this.Modalcontrollerdlmtok
  //     .create({
  //     component:StarRatingPage,
  //     componentProps: {}})
  //   .then(modalElpolah => {
  //       modalElpolah.present();
  //       return modalElpolah.onDidDismiss();
  //     })

  // }

  onShowFullMap(){
    this.Modalcontrollerdlmtok.create({component: MapModalComponent, componentProps: {
      center: { lat: this.PlaceDlmDetail.location.lat, lng: this.PlaceDlmDetail.location.lng},
      selectable: false,
      closeButtonText: 'Close',
      title: this.PlaceDlmDetail.location.address
    }})
    .then(modalEl => {
      modalEl.present();
    })
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.starservice.fetchRating().subscribe(()=>
    {
      console.log('baruk masok');
      this.isLoading = false;
      this.loadedrating1 = this.loadedrating.filter(place => place.placeId == this.PlaceDlmDetail.id);
      console.log(this.loadedrating1,'filter');

      if(this.loadedrating1.length == 0 ){
        return ;
        }else{
          this.rating = this.loadedrating1[0].currentVote;
          //console.log(this.loadedrating1[0].placeId);
          console.log('menjadi');
        }
      console.log(this.a,'vote');
    });

  }

  enter(i) {
    this.hoverState = i;
  }

  updateRating(i) {
    this.rating = i;
  }

  onAddtoStar(starId: number){
    if(this.loadedrating1.length == 0 ){
    return this.starservice.addRating(
      this.PlaceDlmDetail.id,
      starId.toString(),
      ).subscribe(() => {
        console.log(this.loadedrating1.length,'test10');
        console.log(this.PlaceDlmDetail.id,'test100');
        this.loadedrating1 = this.loadedrating.filter(place => place.placeId == this.PlaceDlmDetail.id);
      })
    }else{
      //console.log(this.loadedrating1[0].placeId);
      console.log('menjadi');
    }
  }





  //method 3
  ngOnDestroy(){
    if(this.placeSubSitok){
      this.placeSubSitok.unsubscribe();
    }
  }
}
