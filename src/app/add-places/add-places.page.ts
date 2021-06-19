import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../places/place.model';
import { PlacesService } from '../places/places.service';

@Component({
  selector: 'app-add-places',
  templateUrl: './add-places.page.html',
  styleUrls: ['./add-places.page.scss'],
})
export class AddPlacesPage implements OnInit, OnDestroy{
 offersPD: Place[];//places ya dari place.model.ts file
 isLoading = false;
 private placesSub: Subscription;

  constructor(private placesServicePD: PlacesService, private routerdlmtok: Router) { }

  ngOnInit() {
    this.placesSub = this.placesServicePD.places.subscribe(places => {
      this.offersPD = places;
    });
    //this.offersPD = this.placesServicePD.places;
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.placesServicePD.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  onEdit(offerIdPD: string, slidimgItem: IonItemSliding){
    slidimgItem.close();
    this.routerdlmtok.navigate(['/', 'add-places', offerIdPD]) // tok cara routing dlm typescript file mun bukan dekat html file. contoh lain semua pake html file tp tok guna dari typescript file. melalui click() method
    console.log('editing Item', offerIdPD);
  }

  ngOnDestroy(){
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }
}
