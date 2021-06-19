import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Place } from 'src/app/places/place.model';
import { PlacesService } from 'src/app/places/places.service';

@Component({
  selector: 'app-edit-places',
  templateUrl: './edit-places.page.html',
  styleUrls: ['./edit-places.page.scss'],
})
export class EditPlacesPage implements OnInit, OnDestroy {
  editform : FormGroup;
  placeId: string;
  Placearray : Place;
  private placesSubSitok : Subscription;
  isLoading = false;

  constructor(
    private routeEditOfferpage: ActivatedRoute,
    private PlacesServiceEditOfferPage: PlacesService,
    private NavCtrlEditOfferPage: NavController,
    private routersini : Router,
    private LoadingCtrl : LoadingController,
    private alertCtrl: AlertController) {}

  ngOnInit() {
    this.routeEditOfferpage.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {//why placeId?? sebab sama nama dlm offers-routing.module.ts
        this.NavCtrlEditOfferPage.navigateBack('/add-places');//navigate back if no data
        return;
      }
      this.placeId = paramMap.get('placeId'); //not so sure how this works see tutorial 207. 6:40
      this.isLoading = true;
      this.placesSubSitok = this.PlacesServiceEditOfferPage
      .getPlace(paramMap.get('placeId'))
      .subscribe(place => {
        this.Placearray = place;
        this.editform = new FormGroup({
          title : new FormControl(this.Placearray.title, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          description : new FormControl(this.Placearray.description, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(180)]
          })
        });
        this.isLoading = false;
      }, error => {
        this.alertCtrl.create({
          header: 'An error occurred',
          message: 'Place could not be fetch please try again later.',
          buttons: [{text: 'Okay', handler: () => {
            this.routersini.navigate(['/places/tabs/offers']);
          }}]
        }).then(alertEl => {
          alertEl.present();
        })
      });

    });
  }

  onSaveEdit(){
    if(!this.editform.valid){
      return;
    }
    this.LoadingCtrl
      .create({
      message: 'Updating Place...'
    }).then(loadingEl => {
      loadingEl.present();
      this.PlacesServiceEditOfferPage
        .updateOffer(
        this.Placearray.id,
        this.editform.value.title,
        this.editform.value.description
      )
      .subscribe(() => {
        loadingEl.dismiss();
        this.editform.reset();
        this.routersini.navigate(['/add-places']);
      });
    })

  }

  ngOnDestroy(){
    if(this.placesSubSitok){
      this.placesSubSitok.unsubscribe();
    }
  }

}
