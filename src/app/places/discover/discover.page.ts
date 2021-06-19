import { Component, OnDestroy, OnInit } from '@angular/core';

import { PlacesService } from '../places.service';
import { Place } from '../place.model';
import { MenuController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})

export class DiscoverPage implements OnInit, OnDestroy {
  tunjokPlaces: Place[];//need to be import from place.model file
  listedLoadedPlace: Place[];
  releventPlaces: Place[];
  isLoading = false;
  private placesSubSitok : Subscription;
  Keyword = false;


  constructor(
    private placesServicePD: PlacesService,
    private MenuCtrlDiscoverPage : MenuController,
    private authServicePD: AuthService){}//placesServicePD PD=polah dikpun, perlu import

  ngOnInit() {
    this.placesSubSitok = this.placesServicePD.places.subscribe(places => {
      this.tunjokPlaces = places;
      this.releventPlaces = this.tunjokPlaces;
      this.listedLoadedPlace = this.releventPlaces.slice(1);
    });
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.placesServicePD.fetchPlaces().subscribe(()=>{
      this.isLoading = false;
    });
  }

   onOpenMenu(){
     this.MenuCtrlDiscoverPage.open();
   }

  onFilterUpdate(event){
    //console.log(event.detail);
    this.authServicePD.userId.pipe(take(1)).subscribe(userId => {
      if (event.detail.value === 'Recommendation')
      {
        this.Keyword = false;
        this.releventPlaces = this.tunjokPlaces;
        this.listedLoadedPlace = this.releventPlaces.slice(1);
      } else {
        this.Keyword = true;
        // this.releventPlaces = this.tunjokPlaces.filter(place => place.userId !== userId);
        // this.listedLoadedPlace = this.releventPlaces.slice(1);
        //this.Keyword = false;
        this.releventPlaces = this.tunjokPlaces;
        this.listedLoadedPlace = this.releventPlaces.slice(1);
      }
    });
  }



  ngOnDestroy(){
    if(this.placesSubSitok){
      this.placesSubSitok.unsubscribe();
    }
  }
}
