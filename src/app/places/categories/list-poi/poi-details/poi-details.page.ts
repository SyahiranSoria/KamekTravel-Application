import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Place } from 'src/app/places/place.model';
import { PlacesService } from 'src/app/places/places.service';
import { MapModalComponent } from 'src/app/shared/map-modal/map-modal.component';
import { star } from 'src/app/star-rating/star.model';
import { StarvoteService } from 'src/app/star-rating/starvote.service';
import { Capacitor } from '@capacitor/core';
import { Browser } from '@capacitor/browser';

@Component({
  selector: 'app-poi-details',
  templateUrl: './poi-details.page.html',
  styleUrls: ['./poi-details.page.scss'],
})
export class PoiDetailsPage implements OnInit {

  PlaceDlmDetail : Place;
  starRating: star;
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
          console.log(this.rating);
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
        let people = 1;
        this.loadedrating1 = this.loadedrating.filter(place => place.placeId == this.PlaceDlmDetail.id);
        this.AverageStarFirst(starId);
      })
    }else{
      //update user rate
      console.log(this.loadedrating1[0].placeId);
      console.log('menjadi');
      this.AverageStar(starId);
      console.log(this.loadedrating1[0].id,'cuba');
      this.starservice
        .updateCurrentVote(
          this.loadedrating1[0].id,
          starId
      )
      .subscribe(() => {

      });
    }
  }

  AverageStarFirst(rate: number){
    let people = 1;
    let totalpeople = this.PlaceDlmDetail.numrating + people;
    console.log('Number of People Rate: ', totalpeople );
    let totalrate = this.PlaceDlmDetail.rate + rate;
    let average = totalrate / totalpeople;
    console.log('Average: ',average);

    this.PlacesServiceDP
        .updateOfferRating(
        this.PlaceDlmDetail.id,
        average,
        totalpeople
      )
      .subscribe(() => {

      });
  }

  AverageStar(rate: number){
    let minusRating = this.rating;
    let totalrate = this.PlaceDlmDetail.rate - minusRating;
    let newrate = totalrate + rate;
    let average = newrate / this.PlaceDlmDetail.numrating;
    console.log('rating: ', newrate);
    console.log('people: ',this.PlaceDlmDetail.numrating);
    console.log('Average: ', average);

    this.PlacesServiceDP
        .updateOfferRating(
        this.PlaceDlmDetail.id,
        average,
        this.PlaceDlmDetail.numrating
      )
      .subscribe(() => {

      });
  }





  //method 3
  ngOnDestroy(){
    if(this.placeSubSitok){
      this.placeSubSitok.unsubscribe();
    }
  }

  async openWebpage(url: string) {
     //const url = 'http://capacitor.ionicframework.com/';
     await Browser.open({'url': url});

   // Inject scripts, css and more with browser.X
  }
}
