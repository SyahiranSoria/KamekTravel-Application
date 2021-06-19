import { Injectable } from '@angular/core';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import { BehaviorSubject, of } from 'rxjs';
import { AuthService } from '../auth/auth.service';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { PlaceLocation } from './location.model';

interface PlaceData{
  description: string;
  imageUrl: string;
  phoneNumber: number;
  title: string;
  userId: string;
  location: PlaceLocation;
  rate: number;
  numrating: number;
  category: string;
  keyword1: string;
  keyword2: string;
  keyword3: string;
  sundayFrom: string;
  sundayTo: string;
  mondayFrom: string;
  mondayTo: string;
  tuesdayFrom: string;
  tuesdayTo: string;
  wednesdayFrom: string;
  wednesdayTo: string;
  thursdayFrom: string;
  thursdayTo: string;
  fridayFrom: string;
  fridayTo: string;
  saturdayFrom: string;
  saturdayTo: string;
  website: string;
  address:string;
}

@Injectable({
  providedIn: 'root'
})

export class PlacesService {
  private _places = new BehaviorSubject<Place[]>([]);

  get places(){
    return this._places.asObservable();
    //return [...this._places];tok dapatkan array semua kita perlukan so nya berbeza dgn getplace
  }

  constructor(
    private authServicesitok : AuthService,
    private http: HttpClient) { }

  fetchPlaces(){ //fetchPlaces is a method to show all places from database to apps
    return this.authServicesitok.token.pipe(take(1),switchMap(token => {
      return this.http.get<{[key: string]: PlaceData }>(`https://kamektravel-default-rtdb.asia-southeast1.firebasedatabase.app/offered-places.json?auth=${token}`)
    }),
      map(resData => {
        const places = [];
        for (const key in resData) {
          if(resData.hasOwnProperty(key)){
            places.push(
              new Place(
                key,
                resData[key].title,
                resData[key].description,
                resData[key].phoneNumber,
                resData[key].imageUrl,
                resData[key].userId,
                resData[key].location,
                resData[key].rate,
                resData[key].numrating,
                resData[key].category,
                resData[key].keyword1,
                resData[key].keyword2,
                resData[key].keyword3,
                resData[key].sundayFrom,
                resData[key].sundayTo,
                resData[key].mondayFrom,
                resData[key].mondayTo,
                resData[key].tuesdayFrom,
                resData[key].tuesdayTo,
                resData[key].wednesdayFrom,
                resData[key].wednesdayTo,
                resData[key].thursdayFrom,
                resData[key].thursdayTo,
                resData[key].fridayFrom,
                resData[key].fridayTo,
                resData[key].saturdayFrom,
                resData[key].saturdayTo,
                resData[key].website,
                resData[key].address
              )
            );
          }
        }
        return places;
     }),
      tap(places=> {
        this._places.next(places);
      })
    );
  }

  getPlace(id: string) { //fetchPlaces is a method to show specific places from database to apps
    return this.authServicesitok.token.pipe(take(1),switchMap(token => {
      return this.http
    .get<PlaceData>(`https://kamektravel-default-rtdb.asia-southeast1.firebasedatabase.app/offered-places/${id}.json?auth=${token}`)
    }),
      map(placeData => {
        return new Place(
          id,
          placeData.title,
          placeData.description,
          placeData.phoneNumber,
          placeData.imageUrl,
          placeData.userId,
          placeData.location,
          placeData.rate,
          placeData.numrating,
          placeData.category,
          placeData.keyword1,
          placeData.keyword2,
          placeData.keyword3,
          placeData.sundayFrom,
          placeData.sundayTo,
          placeData.mondayFrom,
          placeData.mondayTo,
          placeData.tuesdayFrom,
          placeData.tuesdayTo,
          placeData.wednesdayFrom,
          placeData.wednesdayTo,
          placeData.thursdayFrom,
          placeData.thursdayTo,
          placeData.fridayFrom,
          placeData.fridayTo,
          placeData.saturdayFrom,
          placeData.saturdayTo,
          placeData.website,
          placeData.address
          );
      })
      //   tap(resData => {console.log(resData);})
    );
  }//untuk dptkan single id of array

  uploadImage(image: File){
    const uploadData = new FormData();
    uploadData.append('image', image);

    return this.authServicesitok.token.pipe(take(1),switchMap(token => {
      return this.http.post<{imageUrl: string, imagePath: string}>(
        'https://us-central1-kamektravel.cloudfunctions.net/storeImage',
        uploadData, {headers: {Authorization: 'Bearer' + token}}
      );
    }))
  }

    addPlace(
    title: string,
    description: string,
    phoneNumber: number,
    rate: number,
    numrating: number,
    category: string,
    keyword1: string,
    keyword2: string,
    keyword3: string,
    sundayFrom: string,
    sundayTo: string,
    mondayFrom: string,
    mondayTo: string,
    tuesdayFrom: string,
    tuesdayTo: string,
    wednesdayFrom: string,
    wednesdayTo: string,
    thursdayFrom: string,
    thursdayTo: string,
    fridayFrom: string,
    fridayTo: string,
    saturdayFrom: string,
    saturdayTo: string,
    website:string,
    location: PlaceLocation,
    imageUrl: string,
    address: string
    ){
      let generatedId: string;
      let fetchedUserId: string;
      let newPlace: Place;
      return this.authServicesitok.userId.pipe(take(1),switchMap(userId => {
        fetchedUserId = userId;
        return this.authServicesitok.token;
      }),
      take(1),switchMap(token => {
        if (!fetchedUserId) {
          throw new Error('No user found!');
        }
        newPlace = new Place(
          Math.random().toString(),
          title,
          description,
          phoneNumber,
          imageUrl,
          fetchedUserId,
          location,
          rate,
          numrating,
          category,
          keyword1,
          keyword2,
          keyword3,
          sundayFrom,
          sundayTo,
          mondayFrom,
          mondayTo,
          tuesdayFrom,
          tuesdayTo,
          wednesdayFrom,
          wednesdayTo,
          thursdayFrom,
          thursdayTo,
          fridayFrom,
          fridayTo,
          saturdayFrom,
          saturdayTo,
          website,
          address
        );
        return this.http.post<{name: string}>(`https://kamektravel-default-rtdb.asia-southeast1.firebasedatabase.app/offered-places.json?auth=${token}`, {
            ...newPlace,
            id: null,
        })
      }),
        switchMap( ourresult => {
          generatedId = ourresult.name;
          return this.places;
        }),take(1),
        tap(places=> {
          newPlace.id = generatedId;
          this._places.next(places.concat(newPlace));
          //this.places.push(newPlace); concat meaning- return new array without change hardcoded array
        })
      );
    }

  updateOffer(placeId: string,title: string, description: string){
    let updatedPlaces: Place[];
    let fetchedToken: string;
    return this.authServicesitok.token.pipe(take(1), switchMap(token => {
      fetchedToken = token;
      return this.places;
    }),
       take(1),
       switchMap(places => {
         if (!places || places.length <=0){
           return this.fetchPlaces();
         } else {
           return of(places);
         }
      }),
      switchMap(places => {
        const updatedPlaceIndex = places.findIndex(ntah => ntah.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.phoneNumber,
          oldPlace.imageUrl,
          oldPlace.userId,
          oldPlace.location,
          oldPlace.rate,
          oldPlace.numrating,
          oldPlace.category,
          oldPlace.keyword1,
          oldPlace.keyword2,
          oldPlace.keyword3,
          oldPlace.sundayFrom,
          oldPlace.sundayTo,
          oldPlace.mondayFrom,
          oldPlace.mondayTo,
          oldPlace.tuesdayFrom,
          oldPlace.tuesdayTo,
          oldPlace.wednesdayFrom,
          oldPlace.wednesdayTo,
          oldPlace.thursdayFrom,
          oldPlace.thursdayTo,
          oldPlace.fridayFrom,
          oldPlace.fridayTo,
          oldPlace.saturdayFrom,
          oldPlace.saturdayTo,
          oldPlace.website,
          oldPlace.address
        );
        return this.http.put(
          `https://kamektravel-default-rtdb.asia-southeast1.firebasedatabase.app/offered-places/${placeId}.json?auth=${fetchedToken}`,
          {...updatedPlaces[updatedPlaceIndex], id: null}
        );}),
      tap(() => {
        this._places.next(updatedPlaces);
      })
    );
  }

}

