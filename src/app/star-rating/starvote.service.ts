import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { star } from './star.model';

interface ratingData {
  currentVote: string;
  placeId: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class StarvoteService {

  private _star = new BehaviorSubject<star[]>([]);

  get star(){
    return this._star.asObservable();
  }

  constructor(
    private authServicePD: AuthService,
    private httpsendiri: HttpClient
  ) { }

  addRating(
    placeId: string,
    currentVote: string,
  ){
    let generatedId: string;
    let newStar: star;
    let fetchedUserId: string;
    return this.authServicePD.userId.pipe(take(1), switchMap(userId => {
      if (!userId) {
        throw new Error('No user id found!');
      }
      fetchedUserId = userId;
      return this.authServicePD.token;
    }),
    take(1),
    switchMap(token => {
      newStar = new star(
        Math.random().toString(),
        +currentVote,
        placeId,
        fetchedUserId
        );
        return this.httpsendiri.post<{name:string}>(`https://kamektravel-default-rtdb.asia-southeast1.firebasedatabase.app/starRating.json?auth=${token}`,
        { ...newStar, id: null }
        );
    }),

    switchMap(resData => {
      generatedId = resData.name;//see line 48
      return this.star;
    }),
    take(1),
    tap(bookings => {
      newStar.id = generatedId;
      this._star.next(bookings.concat(newStar));
    })
    );
  }

  getRating(id: string) { //fetchPlaces is a method to show specific places from database to apps
    return this.authServicePD.token.pipe(take(1),switchMap(token => {
      return this.httpsendiri
    .get<ratingData>(`https://kamektravel-default-rtdb.asia-southeast1.firebasedatabase.app/starRating/${id}.json?auth=${token}`)
    }),
      map(placeData => {
        return new star(
          id,
          +placeData.placeId,
          placeData.userId,
          placeData.currentVote
        );
      })
      //   tap(resData => {console.log(resData);})
    );
  }

  fetchRating(){
    let fetchedUserId: string;
    return this.authServicePD.userId.pipe(take(1),switchMap(userId => {
      if(!userId){
        throw new Error('User Not Found');
      }
      fetchedUserId = userId;
      console.log(fetchedUserId,'userId');
      return this.authServicePD.token;
    }),take(1),
    switchMap(token => {
      return this.httpsendiri.get<{[key: string]: ratingData }>(`https://kamektravel-default-rtdb.asia-southeast1.firebasedatabase.app/starRating.json?orderBy="userId"&equalTo="${fetchedUserId}"&auth=${token}`);
    }),
      map(resData => {
        const rating = [];
        for (const key in resData) {
          if(resData.hasOwnProperty(key)){
            rating.push(
              new star(
                key,
                +resData[key].currentVote,
                resData[key].placeId,
                resData[key].userId
              )
            );
          }
        }
        return rating;
     }),
      tap(rating=> {
        this._star.next(rating);
      })
    );
  }


  updateCurrentVote(rateId:string, currentVote: number){
    let updatedVote: star[];
    let fetchedToken: string;
    return this.authServicePD.token.pipe(take(1), switchMap(token => {
      fetchedToken = token;
      return this.star;
    }),
       take(1),
       switchMap(rate => {
         if (!rate || rate.length <=0){
           return this.fetchRating();
         } else {
           return of(rate);
         }
      }),
      switchMap(rate => {
        const updatedRateIndex = rate.findIndex(ntah => ntah.id === rateId);
        updatedVote = [...rate];
        const oldRate = updatedVote[updatedRateIndex];
        updatedVote[updatedRateIndex] = new star(
          oldRate.id,
          currentVote,
          oldRate.placeId,
          oldRate.userId
        );
        return this.httpsendiri.put(
          `https://kamektravel-default-rtdb.asia-southeast1.firebasedatabase.app/starRating/${rateId}.json?auth=${fetchedToken}`,
          {...updatedVote[updatedRateIndex], id: null}
        );}),
      tap(() => {
        this._star.next(updatedVote);
      })
    );
  }
}
