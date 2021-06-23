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
  tunjokPlaces: Place[];
  listedLoadedPlace: Place[];
  releventPlaces: Place[];
  isLoading = false;
  private placesSubSitok : Subscription;
  Keyword = false;
  id: string;
  show = false;




  constructor(
    private placesServicePD: PlacesService,
    private MenuCtrlDiscoverPage : MenuController,
    private authServicePD: AuthService){}

  ngOnInit() {
    this.placesSubSitok = this.placesServicePD.places.subscribe(places => {
      this.tunjokPlaces = places;
      this.releventPlaces = this.tunjokPlaces;
      this.releventPlaces = this.tunjokPlaces.filter(place =>  place.rate >= 3.5 );
      //this.listedLoadedPlace = this.releventPlaces.slice(1);
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

   Keyword1(key){
    this.id = key;
    console.log(this.id);
    this.releventPlaces = this.tunjokPlaces.filter(place => place.keyword1 == this.id || place.keyword2 == this.id || place.keyword3 == this.id );
    this.listedLoadedPlace = this.releventPlaces.slice(1);
  }

  onFilterUpdate(event){
      if (event.detail.value === 'Recommendation')
      {
        this.show = true;
        this.Keyword = false;
        this.releventPlaces = this.tunjokPlaces.filter(place =>  place.rate >= 3.5 );
        this.listedLoadedPlace = this.releventPlaces.slice(1);
        //console.log(this.listedLoadedPlace,'test');
      } else {
        this.Keyword = true;
        this.show = true;
      }
  }

  ngOnDestroy(){
    if(this.placesSubSitok){
      this.placesSubSitok.unsubscribe();
    }
  }
}
