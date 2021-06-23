import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from '../places/place.model';
import { PlacesService } from '../places/places.service';

@Component({
  selector: 'app-add-places',
  templateUrl: './add-places.page.html',
  styleUrls: ['./add-places.page.scss'],
})
export class AddPlacesPage implements OnInit, OnDestroy{
 offersPD: Place[];
 isLoading = false;
 private placesSub: Subscription;

  constructor(private placesServicePD: PlacesService,
    private loadingCtrl : LoadingController, private routerdlmtok: Router) { }

  ngOnInit() {
    this.placesSub = this.placesServicePD.places.subscribe(places => {
      this.offersPD = places;
    });
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.placesServicePD.fetchPlaces().subscribe(() => {
      this.isLoading = false;
    });
  }

  onEdit(offerIdPD: string, slidimgItem: IonItemSliding){
    slidimgItem.close();
    this.routerdlmtok.navigate(['/', 'add-places', offerIdPD])
    console.log('editing Item', offerIdPD);
  }

  ngOnDestroy(){
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  onCancelBooking(bookingid: string, demisliding: IonItemSliding){
    demisliding.close();
    this.loadingCtrl.create({message: 'canceling...'}).then(loadingEl => {
      loadingEl.present();

    this.placesServicePD.cancelBooking(bookingid).subscribe(() => {
      loadingEl.dismiss();
      console.log('Delete');
    });
  });
  }
}
