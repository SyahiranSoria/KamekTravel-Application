import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { switchMap } from 'rxjs/operators';
import { PlaceLocation } from 'src/app/places/location.model';
import { PlacesService } from 'src/app/places/places.service';

function base64toBlob(base64Data, contentType) {
  contentType = contentType || '';
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: 'app-new-places',
  templateUrl: './new-places.page.html',
  styleUrls: ['./new-places.page.scss'],
})
export class NewPlacesPage implements OnInit {

  formPD: FormGroup;

  constructor(
    private placesservicehere: PlacesService,
    private router: Router,
    private loaderCtrl: LoadingController) { }

  ngOnInit() {
    this.formPD = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(600)]
      }),
      phoneNum: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.min(10)]
      }),
      address: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(200)]
      }),
      category: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      keyword1: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      keyword2: new FormControl(null, {
        updateOn: 'blur'
      }),
      keyword3: new FormControl(null, {
        updateOn: 'blur',
      }),
      sundayFrom: new FormControl(null, {
        updateOn: 'blur',

      }),
      sundayTo: new FormControl(null, {
        updateOn: 'blur',

      }),
      mondayFrom: new FormControl(null, {
        updateOn: 'blur',

      })
      ,
      mondayTo: new FormControl(null, {
        updateOn: 'blur',

      }),
      tuesdayFrom: new FormControl(null, {
        updateOn: 'blur',

      }),
      tuesdayTo: new FormControl(null, {
        updateOn: 'blur',

      }),
      wednesdayFrom: new FormControl(null, {
        updateOn: 'blur',

      }),
      wednesdayTo: new FormControl(null, {
        updateOn: 'blur',

      }),
      thursdayFrom: new FormControl(null, {
        updateOn: 'blur',

      }),
      thursdayTo: new FormControl(null, {
        updateOn: 'blur',

      }),
      fridayFrom: new FormControl(null, {
        updateOn: 'blur',

      }),
      fridayTo: new FormControl(null, {
        updateOn: 'blur',

      }),
      saturdayFrom: new FormControl(null, {
        updateOn: 'blur',

      }),
      saturdayTo: new FormControl(null, {
        updateOn: 'blur',

      }),
      website: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),

      location: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null)
    });
  }

  onLocationPicked(location: PlaceLocation){
    this.formPD.patchValue({location: location});
    //to update our internal object to hold the location
    console.log(location);
    console.log('sini');
  }

  onImagePicked(imageData: string | File){
    let imageFile;
    if(typeof imageData === 'string'){
      try {
        imageFile = base64toBlob(
          imageData.replace('data:image/jpeg;base64,',''), 'image/jpeg');
      }catch (error){
        console.log(error);
        return;
    }
    } else {
      imageFile = imageData;
    }
    this.formPD.patchValue({image: imageFile});
  }

  rate = 0;
  numrating = 0;

  onCreateOffer(){
    if(!this.formPD.valid || !this.formPD.get('image').value){
      return;
    }
    console.log(this.formPD.value);
    this.loaderCtrl.create({
      message: 'Creating Place...'
    }).then(LoadingElPD => {
      LoadingElPD.present();
      this.placesservicehere.uploadImage(
        this.formPD.get('image').value
        ).pipe(switchMap(uploadRes => {
          return this.placesservicehere.addPlace(
            this.formPD.value.title,
            this.formPD.value.description,
            +this.formPD.value.phoneNum,//add + because it is a number
            +this.rate,
            +this.numrating,
            this.formPD.value.category,
            this.formPD.value.keyword1,
            this.formPD.value.keyword2,
            this.formPD.value.keyword3,
            this.formPD.value.sundayFrom,
            this.formPD.value.sundayTo,
            this.formPD.value.mondayFrom,
            this.formPD.value.mondayTo,
            this.formPD.value.tuesdayFrom,
            this.formPD.value.tuesdayTo,
            this.formPD.value.wednesdayFrom,
            this.formPD.value.wednesdayTo,
            this.formPD.value.thursdayFrom,
            this.formPD.value.thursdayTo,
            this.formPD.value.fridayFrom,
            this.formPD.value.fridayTo,
            this.formPD.value.saturdayFrom,
            this.formPD.value.saturdayTo,
            this.formPD.value.website,
            this.formPD.value.location,
            uploadRes.imageUrl,
            this.formPD.value.address
          );
          })
        ).subscribe(() => {
        LoadingElPD.dismiss();
        this.formPD.reset();
        this.router.navigate(['/add-places']);
      });
    });


  }
}
