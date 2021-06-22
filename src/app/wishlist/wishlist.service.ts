import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { wishlist } from './wishlist.model';

interface wishlistData {
  placeId: string;
  userId: string;
  description: string;
  placeTitle: string;
  placeImage: string;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private _wishlists = new BehaviorSubject<wishlist[]>([]);

  constructor(
    private authServicePD: AuthService,
    private httpsendiri: HttpClient) {}


  get wishlisttunjok(){
    return this._wishlists.asObservable();
  }

  addwishlist(
    placeId: string,
    description: string,
    placeTitle: string,
    placeImage: string,
  ){
    let generatedId: string;
    let newWishlist: wishlist;
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
      newWishlist = new wishlist(
        Math.random().toString(),
        placeId,
        fetchedUserId,
        description,
        placeTitle,
        placeImage,
        );
        return this.httpsendiri.post<{name:string}>(`https://kamektravel-default-rtdb.asia-southeast1.firebasedatabase.app/wishlist.json?auth=${token}`,
        { ...newWishlist, id: null }
        );
    }),

    switchMap(resData => {
      generatedId = resData.name;//see line 48
      return this.wishlisttunjok;
    }),
    take(1),
    tap(bookings => {
      newWishlist.wishlist_id = generatedId;
      this._wishlists.next(bookings.concat(newWishlist));
    })
    );
  }

    cancelBooking(bookingId: string){
      return this.authServicePD.token.pipe(take(1), switchMap(token => {
        return this.httpsendiri
      .delete(`https://kamektravel-default-rtdb.asia-southeast1.firebasedatabase.app/wishlist/${bookingId}.json?auth=${token}`)
      }),
      switchMap(()=>{
          return this.wishlisttunjok;
        }),
        take(1),
        tap(wishlist => {
            this._wishlists.next(wishlist.filter(b => b.wishlist_id !== bookingId));
          }
        )
      );
    }

    fetchwishlist(){
      let fetchedUserId: string;
      return this.authServicePD.userId.pipe(
        take(1),switchMap(userId => {
        if(!userId){
          throw new Error('User Not Found');
        }
        fetchedUserId = userId;
        return this.authServicePD.token;

      }),
        take(1),
        switchMap(token => {
          return this.httpsendiri
      .get<{[key:string]: wishlistData }>(`https://kamektravel-default-rtdb.asia-southeast1.firebasedatabase.app/wishlist.json?orderBy="userId"&equalTo="${fetchedUserId}"&auth=${token}`
      );
        }),
        map(wishlistData => {
          const wishlists = [];
          for(const key in wishlistData){
            if(wishlistData.hasOwnProperty(key)){
              wishlists.push
              (new wishlist(
                key,
                wishlistData[key].placeId,
                wishlistData[key].userId,
                wishlistData[key].description,
                wishlistData[key].placeTitle,
                wishlistData[key].placeImage
                )
              );
            }
          }
          return wishlists;
        }),
        tap(wishlists=> {
        this._wishlists.next(wishlists);
        })
      );
    }

    getWishlist(id: string) { //fetchPlaces is a method to show specific places from database to apps
      return this.authServicePD.token.pipe(take(1),switchMap(token => {
        return this.httpsendiri
      .get<wishlistData>(`https://kamektravel-default-rtdb.asia-southeast1.firebasedatabase.app/wishlist/${id}.json?auth=${token}`)
      }),
        map(placeData => {
          return new wishlist(
            id,
            placeData.placeId,
            placeData.userId,
            placeData.description,
            placeData.placeTitle,
            placeData.placeImage
          );
        })
        //   tap(resData => {console.log(resData);})
      );
    }
}
