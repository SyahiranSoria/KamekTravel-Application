import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-list-poi',
  templateUrl: './list-poi.page.html',
  styleUrls: ['./list-poi.page.scss'],
})


export class ListPoiPage implements OnInit {

id : string;
paul: string;
tunjokPlaces: Place[];//need to be import from place.model file
  listedLoadedPlace: Place[];
  releventPlaces: Place[];
  private placesSubSitok : Subscription;



  constructor(
    private route: ActivatedRoute,
    private placesServicePD: PlacesService,
    private MenuCtrlDiscoverPage : MenuController,
    private authServicePD: AuthService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('list-poi');
    this.placesSubSitok = this.placesServicePD.places.subscribe(places => {
      this.tunjokPlaces = places;
      this.releventPlaces = this.tunjokPlaces;
      this.listedLoadedPlace = this.releventPlaces;
      // if( this.id == 'Animal'){
      //   this.releventPlaces = this.tunjokPlaces.filter(place => place.poi_category == 'Animal');
      // } else {
      //   this.releventPlaces = this.tunjokPlaces.filter(place => place.poi_category == 'Cultural');
      // }
  });

}}
