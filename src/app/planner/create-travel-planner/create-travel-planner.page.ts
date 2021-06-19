import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { PlannerService } from '../../planner/planner.service';
import { Planner } from '../../planner/planner.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-create-travel-planner',
  templateUrl: './create-travel-planner.page.html',
  styleUrls: ['./create-travel-planner.page.scss'],
})
export class CreateTravelPlannerPage implements OnInit, OnDestroy {

  formPD: FormGroup;
  loadedPlanner: Planner[];
  releventPlanner: Planner[];
  private plannersubs : Subscription;
  isLoading = false;
  constructor(
    private placesservicehere: PlannerService,
    private router: Router,
    private loaderCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.formPD = new FormGroup({
      title: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      date: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });

    this.plannersubs = this.placesservicehere.planner.subscribe(feedback => {
      this.loadedPlanner = feedback;
      this.releventPlanner = this.loadedPlanner;
      console.log(this.loadedPlanner);
  });
}


  onCreatePlanner(){
    if(!this.formPD.valid){
      return;
    }
    this.loaderCtrl.create({
      message: 'Creating Place...'
    }).then(LoadingElPD => {
      LoadingElPD.present();
          return this.placesservicehere.addPlanner(
            this.formPD.value.title,
            this.formPD.value.description,
            new Date(this.formPD.value.date)
        ).subscribe(() => {
        LoadingElPD.dismiss();
        this.formPD.reset();
        this.router.navigate(['/planner']);
      });
    });
  }

  ionViewWillEnter(){
    this.isLoading = true;
    this.placesservicehere.fetchPlanner().subscribe(()=>{
      this.isLoading = false;
    });
  }

  ngOnDestroy(){
    if(this.plannersubs){
      this.plannersubs.unsubscribe();
    }
  }

}
