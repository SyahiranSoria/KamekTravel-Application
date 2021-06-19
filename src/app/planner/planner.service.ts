import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Planner } from './planner.model';

interface PlannerData{
    title: string;
    description: string;
    date: Date;
    userId : string;
}

@Injectable({
  providedIn: 'root'
})

export class PlannerService {
  private _planner = new BehaviorSubject<Planner[]>([]);

  get planner(){
    return this._planner.asObservable();
  }

  constructor(
    private authServicePD : AuthService,
    private httpsendiri: HttpClient
  ) { }

  addPlanner(
    title: string,
    description: string,
    date: Date
  ){
    let generatedId: string;
    let newPlanner: Planner;
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
      newPlanner = new Planner(
        Math.random().toString(),
        title,
        description,
        date,
        fetchedUserId
        );
        return this.httpsendiri.post<{name:string}>(`https://kamektravel-default-rtdb.asia-southeast1.firebasedatabase.app/planner.json?auth=${token}`,
        { ...newPlanner, id: null }
        );
    }),

    switchMap(resData => {
      generatedId = resData.name;
      return this.planner;
    }),
    take(1),
    tap(bookings => {
      newPlanner.id = generatedId;
      this._planner.next(bookings.concat(newPlanner));
    })
    );
  }

  fetchPlanner(){
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
    .get<{[key:string]: PlannerData }>(`https://kamektravel-default-rtdb.asia-southeast1.firebasedatabase.app/planner.json?orderBy="userId"&equalTo="${fetchedUserId}"&auth=${token}`
    );
      }),
      map(PlannerData => {
        const planner = [];
        for(const key in PlannerData){
          if(PlannerData.hasOwnProperty(key)){
            planner.push
            (new Planner(
              key,
              PlannerData[key].title,
              PlannerData[key].description,
              new Date(PlannerData[key].date),
              PlannerData[key].userId,
              )
            );
          }
        }
        return planner;
      }),
      tap(planner=> {
      this._planner.next(planner);
      })
    );
  }

  cancelBooking(plannerId: string){
    return this.authServicePD.token.pipe(take(1), switchMap(token => {
      return this.httpsendiri
    .delete(`https://kamektravel-default-rtdb.asia-southeast1.firebasedatabase.app/planner/${plannerId}.json?auth=${token}`)
    }),
    switchMap(()=>{
        return this.planner;
      }),
      take(1),
      tap(Planner => {
          this._planner.next(Planner.filter(b => b.id !== plannerId));
        }
      )
    );
  }

  getPlanner(id: string) {
    return this.authServicePD.token.pipe(take(1),switchMap(token => {
      return this.httpsendiri
    .get<PlannerData>(`https://kamektravel-default-rtdb.asia-southeast1.firebasedatabase.app/planner/${id}.json?auth=${token}`)
    }),
      map(placeData => {
        return new Planner(
          id,
          placeData.title,
          placeData.description,
          new Date(placeData.date),
          placeData.userId
        );
      })
      //   tap(resData => {console.log(resData);})
    );
  }


}
