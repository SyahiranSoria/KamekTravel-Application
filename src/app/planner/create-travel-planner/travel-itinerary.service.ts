import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Planner } from '../planner.model';


interface PlannerData{
  id: string;
  Planner: string,
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class TravelItineraryService {

}
