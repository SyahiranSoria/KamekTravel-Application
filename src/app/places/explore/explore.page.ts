import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { AlertController, MenuController, ModalController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { Coordinates } from 'src/app/places/location.model';
import { Geolocation } from '@capacitor/geolocation'
import { Place } from '../place.model';
import { PlacesService } from '../places.service';
import { AuthService } from 'src/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { MapModalComponent } from 'src/app/shared/map-modal/map-modal.component';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.page.html',
  styleUrls: ['./explore.page.scss'],
})
export class ExplorePage implements OnInit {

  map: any;
  @ViewChild('map') mapElementsini: ElementRef;
  @Input() center = { lat: 1.577353, lng: 110.298113};
  googleMaps: any;

  tunjokPlaces: Place[];
  isLoading = false;
  private placesSubSitok : Subscription;
  releventPlaces: Place[];

  lat: number;
  lng: number;

  constructor(
    private renderer: Renderer2,
    private placesServicePD: PlacesService,
    private MenuCtrlDiscoverPage : MenuController,
    private authServicePD: AuthService,
    private alertCtrl: AlertController,
    private Modalcontrollerdlmtok: ModalController
  ){}

  ngOnInit(){
    this.placesSubSitok = this.placesServicePD.places.subscribe(places => {
      this.isLoading = true;
      this.tunjokPlaces = places;
      this.releventPlaces = this.tunjokPlaces;
    });

    if(!Capacitor.isPluginAvailable('Geolocation')) {
      this.showErrorAlert();
      return;
    }
    this.isLoading = true;
    Geolocation.getCurrentPosition()
    .then(geoPosition => {
      const coordinates: Coordinates = {
        lat: geoPosition.coords.latitude,
        lng: geoPosition.coords.longitude
      };
      this.isLoading = false;
      console.log(coordinates,'siapa dlok');
      this.lat = coordinates.lat;
      this.lng = coordinates.lng;

    })
    .catch(err => {
    this.isLoading = false;
    this.showErrorAlert();
    });


  }

  data: any;

  ionViewWillEnter(){

    this.placesServicePD.fetchPlaces().subscribe( data =>{

      //this.isLoading = true;
      this.data = this.applyHaversine(this.releventPlaces);
      this.data.sort((locationA, locationB) => {
        this.isLoading = false;
        //console.log(locationA, locationB, 'locationA, locationB');
        console.log(locationA.distance - locationB.distance, 'perbezaan');
        return locationA.distance - locationB.distance;
      });

    });
    //this.showMap();
  }

  private showErrorAlert(){
    this.alertCtrl.create({
      header: 'Could not fetch location',
      message: 'Please use a map to pick a location!'
    }).then(alertEl => {
      alertEl.present();
    });
  }

  applyHaversine(locations){

     let usersLocation = {
         lat: this.lat,
         lng: this.lng
     };

     console.log(usersLocation,'2');

    locations.map((location) => {

        let placeLocation = {
            lat: location.location.lat,
            lng: location.location.lng
        };

        //this.googlemarker(placeLocation.lat, placeLocation.lng);

        location.distance = this.getDistanceBetweenPoints(
          usersLocation,
            placeLocation,
            'km'
        ).toFixed(2);

    });
    return locations;
}

 googlemarker(lat,lng){
   let center2 = { lat: lat, lng: lng};
    console.log(lat,lng);
    //let center21 = { lat:1.5808449821190094 , lng: 110.29631627733687};

    //let maploaded = this.goo

   this.getGoogleMaps()
   .then(googleMaps => {


     this.googleMaps = googleMaps;
     let mapEl = this.mapElementsini.nativeElement;
     let map = new googleMaps.Map(mapEl, {
       center:  this.center,
       zoom: 15,
     });
     //console.log(map, '2');


   let marker2 = new googleMaps.Marker({
     position: center2,
     map : map,
     title: 'User location',
   });
   marker2.setMap(map);
   console.log(marker2.title,'1');
 })
 }



 onShowFullMap(lat: number, lng: number, title: string){
  this.Modalcontrollerdlmtok.create({component: MapModalComponent, componentProps: {
    center: { lat , lng },
    selectable: false,
    closeButtonText: 'Close',
    title: title
  }})
  .then(modalEl => {
    modalEl.present();
  })
}

getDistanceBetweenPoints(start, end, units){

    let earthRadius = {
        miles: 3958.8,
        km: 6371
    };

    let R = earthRadius[units || 'km'];
    let lat1 = start.lat;
    let lon1 = start.lng;
    let lat2 = end.lat;
    let lon2 = end.lng;

    let dLat = this.toRad((lat2 - lat1));
    let dLon = this.toRad((lon2 - lon1));
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;

    return d;

}

toRad(x){
    return x * Math.PI / 180;
}

  showMap(){
    this.getGoogleMaps()
      .then(googleMaps => {
        this.googleMaps = googleMaps;
        const mapEl = this.mapElementsini.nativeElement;
        const map = new googleMaps.Map(mapEl, {
          center:  this.center,
          zoom: 16
        });

        this.googleMaps.event.addListenerOnce(map, 'idle', () => {
          this.renderer.addClass(mapEl, 'visible');
        });
      })
  }

  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src =
        'https://maps.googleapis.com/maps/api/js?key=' + environment.googleMapsAPIKeyPolah;
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadedGoogleModule = win.google;
        if (loadedGoogleModule && loadedGoogleModule.maps) {
          resolve(loadedGoogleModule.maps);
        } else {
          reject('Google maps SDK not available.');
        }
      };
    });
  }

}
