import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { Capacitor } from '@capacitor/core';
import { SplashScreen } from '@capacitor/splash-screen';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { App, AppState } from '@capacitor/app';
import { map, switchMap, take, tap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy{
  private authSub: Subscription;
  private previousAuthState = false;
  show = true;
  user : string;

  constructor(
    private authserviceappcomp: AuthService,
    private routerappcomp: Router,
    private platform: Platform
    ) {this.initializeApp();}


  onLogout(){
    this.authserviceappcomp.logout();
  }

  ngOnInit(){
    console.log('hello');
    this.authSub = this.authserviceappcomp.userIsAuthenticated.subscribe(isAuth => {
      if (!isAuth && this.previousAuthState !== isAuth){
        this.routerappcomp.navigateByUrl('/auth');
      }
      this.previousAuthState = isAuth;

    });

    App.addListener('appStateChange', this.checkAuthOnResume.bind(this));

  }

  ionViewWillEnter(){
    this.userid();
      this.checkuser();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (Capacitor.isPluginAvailable('SplashScreen')) {
        SplashScreen.hide();
      }
    });
  }

  ngOnDestroy(){
    if(this.authSub){
      this.authSub.unsubscribe();
    }
  }

  private checkAuthOnResume(state: AppState) {
    if (state.isActive) {
      this.authserviceappcomp
        .autoLogin()
        .pipe(take(1))
        .subscribe(success => {
          if (!success) {
            this.onLogout();
          }
        });
    }
  }

  userid(){
    this.authserviceappcomp.userId.pipe(take(1)).subscribe(userId => {

    }

    // let fetchedUserId1: string;
    // this.authSub = this.authserviceappcomp.userId.subscribe(userId => {
    //   if (!userId){
    //     throw new Error('No user id found!');
    //   }
    //   fetchedUserId1 = userId;
    //   console.log('masok ka nisik');
      //return this.authserviceappcomp.token;
    )

  }

  // fetchwishlist(id){
  //   this.user = id;
  //   console.log(this.user,'cubacheck');
  // }

  checkuser(){
    console.log(this.user,'checkuser');
    if(this.user == 'QCqyL7GplCUMozXRF0HBq2Y40Z83'){
      this.show = true;
      console.log(this.show,'dapat');
      return this.show;
    } else {
      this.show = false;
      console.log(this.show,'sitok');
      return this.show;
    }
  }

  // onSelect(typeid) {
  //   this.productService.getProducts()
  //     .pipe(
  //         filter((item)=>item.ptypeid == typeid)
  //     )
  //     .subscribe((products) => {
  //        this.productList = products;
  //     });
  // }
}

// addItinerary(
//   ){

//   }

    //let fetchedUserId: string;
    //fetchedUserId=this.authserviceappcomp.userIdlol
      //this.user = fetchedUserId;



    // this.authserviceappcomp.userId.pipe(take(1), switchMap(userId => {
    //   if (!userId) {
    //     throw new Error('No user id found!');
    //   }
    //   fetchedUserId = userId;
    //   console.log('masok ka nisik');
    //   return this.authserviceappcomp.token;
    // }),
    // take(1),
    // tap(user => {
    //   this.user = fetchedUserId;
    // })
    // );



    // let fetchedUserId: string;
    // this.authserviceappcomp.userId.pipe(
    //   take(1),switchMap(userId => {
    //   if(!userId){
    //     throw new Error('User Not Found');
    //   }
    //   fetchedUserId = userId;
    //   console.log(this.user,'dahmasok');

    // })

    // );
