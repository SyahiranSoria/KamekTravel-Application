import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Feedback } from './feedback.modal';
import { FeedbackService } from './feedback.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit, OnDestroy {

  formDesc: FormGroup;
  loadedfeedback: Feedback[];
  releventfeedback: Feedback[];
  private feedbacksubs : Subscription;
  isLoading = false;


  constructor(
    private feedbackservice: FeedbackService,
    private loaderCtrl: LoadingController,
    private router: Router
  ) { }

  ngOnInit(){
    this.formDesc = new FormGroup({
      title: new FormControl(null,{
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });

     this.feedbacksubs = this.feedbackservice.feedback.subscribe(feedback => {
     this.loadedfeedback = feedback;
     this.releventfeedback = this.loadedfeedback;
     console.log(this.loadedfeedback);
     });

  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.feedbackservice.fetchFeedback().subscribe(()=>{
      this.isLoading = false;
    });
  }



  onCreateFeedback(){
    if(!this.formDesc.valid){
      return;
    }
    this.loaderCtrl.create({
      message: 'Creating Place...'
    }).then(LoadingElPD => {
      LoadingElPD.present();
          return this.feedbackservice.addfeedback(
            this.formDesc.value.title,
            this.formDesc.value.description,
            this.formDesc.value.timestamp
        ).subscribe(() => {
        LoadingElPD.dismiss();
        this.formDesc.reset();
        this.router.navigate(['/feedback']);
      });
    });
  }

  ngOnDestroy(){
    if(this.feedbacksubs){
      this.feedbacksubs.unsubscribe();
    }
  }
}


