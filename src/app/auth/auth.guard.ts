import { Injectable } from '@angular/core';
import { UrlTree, CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanLoad {

  constructor(private authServicePD : AuthService, private routerdlmtok: Router ){}

  canLoad(
    _route: Route,
    _segments: UrlSegment[]
    ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.authServicePD.userIsAuthenticated.pipe(take(1), switchMap(isAuthenticated => {
        if (!isAuthenticated){
          return this.authServicePD.autoLogin();
        } else {
          return of(isAuthenticated);
        }
      }),tap(isAuthenticated => {
        if (!isAuthenticated){
          this.routerdlmtok.navigateByUrl('/auth');
        }
      }));
  }

}
