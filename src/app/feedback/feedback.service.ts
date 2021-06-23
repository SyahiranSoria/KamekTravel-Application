import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Feedback } from './feedback.modal';

interface FeedbackData{
    Title: string;
    feedback_message: string;
    timestamp: string;
    userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  private _feedback = new BehaviorSubject<Feedback[]>([]);

  get feedback(){
    return this._feedback.asObservable();
  }

  constructor(
    private authServicesitok : AuthService,
    private http: HttpClient){}

    fetchFeedback(){
      let fetchedUserId: string;
      return this.authServicesitok.userId.pipe(take(1),switchMap(userId => {
        if(!userId){
          throw new Error('User Not Found');
        }
        fetchedUserId = userId;
        return this.authServicesitok.token;
      }),take(1),
      switchMap(token => {
        return this.http.get<{[key: string]: FeedbackData }>(`https://kamektravel-default-rtdb.asia-southeast1.firebasedatabase.app/feedback.json?orderBy="userId"&equalTo="${fetchedUserId}"&auth=${token}`
         );
      }),
        map(resData => {
          const feedbacks = [];
          for (const key in resData) {
            if(resData.hasOwnProperty(key)){
              feedbacks.push(
                new Feedback(
                  key,
                  resData[key].Title,
                  resData[key].feedback_message,
                  resData[key].timestamp,
                  resData[key].userId
                )
              );
            }
          }
          return feedbacks;
          //return [];
       }),
        tap(feedbacks=> {
          this._feedback.next(feedbacks);
        })
      );
    }

  getfeedback(id: string){
    return this.authServicesitok.token.pipe(take(1),switchMap(token => {
      return this.http
    .get<FeedbackData>(`https://kamektravel-default-rtdb.asia-southeast1.firebasedatabase.app/feedback/${id}.json?auth=${token}`)
    }),
    map(FeedbackData => {
      return new Feedback(
        id,
        FeedbackData.Title,
        FeedbackData.feedback_message,
        FeedbackData.timestamp,
        FeedbackData.userId
        );
    })
    );
  }

  addfeedback(
    Title: string,
    feedback_message: string,
    timestamp: string,
    ){
      let generatedId: string;
      let fetchedUserId: string;
      let newFeedback: Feedback;
      return this.authServicesitok.userId.pipe(take(1),switchMap(userId => {
        fetchedUserId = userId;
        return this.authServicesitok.token;
      }),
      take(1),switchMap(token => {
        if (!fetchedUserId) {
          throw new Error('No user found!');
        }
          newFeedback = new Feedback(
            Math.random().toString(),
            Title,
            feedback_message,
            this.onCreateTime().toString(),
            fetchedUserId
          );
          return this.http.post<{name: string}>(`https://kamektravel-default-rtdb.asia-southeast1.firebasedatabase.app/feedback.json?auth=${token}`, {
            ...newFeedback,
            id: null
        })
      }),
      switchMap( ourresult => {
        generatedId = ourresult.name;
        return this.feedback;
      }),take(1),
      tap(places=> {
        newFeedback.feedback_id = generatedId;
        this._feedback.next(places.concat(newFeedback));
      })
    );
  }

  onCreateTime(){
    let currentDate=new Date();
    return currentDate;
  }
}

