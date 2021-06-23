import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Capacitor } from '@capacitor/core';
import { AlertController, ModalController } from '@ionic/angular';
import { environment } from '../../../environments/environment';
import { Coordinates } from 'src/app/places/location.model';
import { Geolocation } from '@capacitor/geolocation'


@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.component.html',
  styleUrls: ['./map-modal.component.scss'],
})
export class MapModalComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('map') mapElementsini: ElementRef;
  @Input() center = { lat: 1.577353, lng: 110.298113};
  @Input() selectable = true;
  @Input() closeButtonTextDP = 'Cancel';
  @Input() title = 'Pick Location';
  clickListener: any;
  googleMaps: any;
  distance: string;
  show = false;

  constructor(
    private modalCtrl2: ModalController,
    private renderer: Renderer2,
    private alertCtrl: AlertController
    ) { }

  ngOnInit() {}

  isLoading = false;

  ngAfterViewInit() {
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

        if (this.selectable){
          this.clickListener = map.addListener('click', event => {
            const selectedCoords = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            };
            this.modalCtrl2.dismiss(selectedCoords);
            console.log(selectedCoords, 'hello');
          });
        } else {
          const marker = new googleMaps.Marker({
            position: this.center,
            map : map,
            title: 'Picked Location'
          });
          marker.setMap(map);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  findMe(){
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
      };//import from location.model file
      console.log(coordinates.lat,coordinates.lng);
      //let coords = new this.googleMaps.latlng(coordinates.lat,coordinates.lng);
      let center2 = { lat: coordinates.lat, lng: coordinates.lng};

      this.getGoogleMaps()
      .then(googleMaps => {
        this.googleMaps = googleMaps;
        const mapEl = this.mapElementsini.nativeElement;
        const map = new googleMaps.Map(mapEl, {
          center:  center2,
          zoom: 15
        });

      const marker2 = new googleMaps.Marker({
        position: center2,
        map : map,
        title: 'User location',
      });
      marker2.setMap(map);
      console.log(marker2.title);

      const marker = new googleMaps.Marker({
        position: this.center,
        map : map,
        title: 'Picked Location'
      });
      marker.setMap(map);
      console.log(marker.title);

      let centerPOI = this.center;

      this.applyHaversine(centerPOI,center2);

    })})

    .catch(err => {
    this.isLoading = false;
    this.showErrorAlert();
    });
  }

  //a
  applyHaversine(locations, usersLocation){

        let locationdistance = this.getDistanceBetweenPoints(
            usersLocation,
            locations,
            'km'
        ).toFixed(2);
        this.show = true;
        this.distance = locationdistance;

    return locations;
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
  //b


  private showErrorAlert(){
    this.alertCtrl.create({
      header: 'Could not fetch location',
      message: 'Please use a map to pick a location!'
    }).then(alertEl => {
      alertEl.present();
    });
  }

  onCancel(){
    this.modalCtrl2.dismiss();
  }

  ngOnDestroy(){
    if (this.clickListener){
      this.googleMaps.event.removeListener(this.clickListener);
    }
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

