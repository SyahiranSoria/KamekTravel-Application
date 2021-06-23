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
      if (!paramMap.has('placeId')) {
        this.NavCtrlEditOfferPage.navigateBack('/add-places');
        return;
      }
      this.placeId = paramMap.get('placeId');
      this.isLoading = true;
      this.placesSubSitok = this.PlacesServiceEditOfferPage
      .getPlace(paramMap.get('placeId'))
      .subscribe(place => {
        this.Placearray = place;
        this.editform = new FormGroup({
          title: new FormControl(this.Placearray.title, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          description: new FormControl(this.Placearray.description, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(600)]
          }),
          phoneNum: new FormControl(this.Placearray.phoneNumber, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.min(10)]
          }),
          address: new FormControl(this.Placearray.address, {
            updateOn: 'blur',
            validators: [Validators.required, Validators.maxLength(200)]
          }),
          category: new FormControl(this.Placearray.category, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          keyword1: new FormControl(this.Placearray.keyword1, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          keyword2: new FormControl(this.Placearray.keyword2, {
            updateOn: 'blur'
          }),
          keyword3: new FormControl(this.Placearray.keyword3, {
            updateOn: 'blur',
          }),
          sundayFrom: new FormControl(this.Placearray.sundayFrom, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          sundayTo: new FormControl(this.Placearray.sundayTo, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          mondayFrom: new FormControl(this.Placearray.mondayFrom, {
            updateOn: 'blur',
            validators: [Validators.required]
          })
          ,
          mondayTo: new FormControl(this.Placearray.mondayTo, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          tuesdayFrom: new FormControl(this.Placearray.tuesdayFrom, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          tuesdayTo: new FormControl(this.Placearray.tuesdayTo, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          wednesdayFrom: new FormControl(this.Placearray.wednesdayFrom, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          wednesdayTo: new FormControl(this.Placearray.wednesdayTo, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          thursdayFrom: new FormControl(this.Placearray.thursdayFrom, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          thursdayTo: new FormControl(this.Placearray.thursdayTo, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          fridayFrom: new FormControl(this.Placearray.fridayFrom, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          fridayTo: new FormControl(this.Placearray.fridayTo, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          saturdayFrom: new FormControl(this.Placearray.saturdayFrom, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          saturdayTo: new FormControl(this.Placearray.saturdayTo, {
            updateOn: 'blur',
            validators: [Validators.required]
          }),
          website: new FormControl(this.Placearray.website, {
            updateOn: 'blur',
            validators: [Validators.required]
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
        this.editform.value.description,
        +this.editform.value.phoneNum,
        this.editform.value.address,
        this.editform.value.category,
        this.editform.value.keyword1,
        this.editform.value.keyword2,
        this.editform.value.keyword3,
        this.editform.value.sundayFrom,
        this.editform.value.sundayTo,
        this.editform.value.mondayFrom,
        this.editform.value.mondayTo,
        this.editform.value.tuesdayFrom,
        this.editform.value.tuesdayTo,
        this.editform.value.wednesdayFrom,
        this.editform.value.wednesdayTo,
        this.editform.value.thursdayFrom,
        this.editform.value.thursdayTo,
        this.editform.value.fridayFrom,
        this.editform.value.fridayTo,
        this.editform.value.saturdayFrom,
        this.editform.value.saturdayTo,
        this.editform.value.website
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
