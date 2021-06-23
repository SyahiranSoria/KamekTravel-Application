import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AppComponent } from '../app.component';
import { AuthResponseDataSini, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoadingSpinner = false;
  isLogin = true;

  constructor(
    private authServicedlmtok: AuthService,
    private routerPD: Router,
    private loadingcontrollerPD: LoadingController,
    private alertCtrl: AlertController,
    private id: AppComponent
    ) { }

  ngOnInit() {
  }

  authenticate(email: string, password: string){
    this.isLoadingSpinner = true;

    this.loadingcontrollerPD.create({keyboardClose: true, message: 'Logging in...'})
    .then(loadingElPD =>{
      loadingElPD.present();
      let authObs: Observable<AuthResponseDataSini>;
      if(this.isLogin){
        authObs = this.authServicedlmtok.login(email, password);
      } else {
        authObs = this.authServicedlmtok.signup(email, password);
      }
      authObs.subscribe(resData => {
        console.log(resData);
        this.isLoadingSpinner=false;
      loadingElPD.dismiss();
      if(this.isLogin){
        this.routerPD.navigateByUrl('/places/tabs/discover');
      } else {
        this.isLogin = true;
        this.routerPD.navigateByUrl('/auth');
        this.showAlertonsignup();
      }
      }, errRes => {
        console.log(errRes);
        loadingElPD.dismiss();
        const code = errRes.error.error.message;
        let message = 'Could not sign you up, Please try again.'
        if (code === 'EMAIL_EXISTS'){
          message = 'This email address exist already!';
        } else if (code === 'EMAIL_NOT_FOUND') {
          message = 'E-mail address could not be found.';
        } else if (code === 'INVALID_PASSWORD'){
          message = 'This password is not correct.';
        }
        this.showAlert(message);
      });
    });
  }

  onsubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;
    console.log(email,password);

    this.authenticate(email, password);
    form.reset();
  }

  onSwitchAuthMode(){
    this.isLogin = !this.isLogin;
  }

  private showAlert(message: string){
    this.alertCtrl.create({
      header: 'Authentication Failed',
      message: message,
      buttons: ['Okay']
    }).then(alertEl => alertEl.present());
  }

  private showAlertonsignup(){
    this.alertCtrl.create({
      header: 'Suscesss Signup',
      message: 'Please Login to Enter',
      buttons: ['Okay']
    }).then(alertEl => alertEl.present());
  }
}
