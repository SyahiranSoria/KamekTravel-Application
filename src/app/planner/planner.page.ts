import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Planner } from './planner.model';
import { PlannerService } from './planner.service';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.page.html',
  styleUrls: ['./planner.page.scss'],
})
export class PlannerPage implements OnInit {

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

    this.plannersubs = this.placesservicehere.planner.subscribe(feedback => {
      this.loadedPlanner = feedback;
      this.releventPlanner = this.loadedPlanner;
      console.log(this.loadedPlanner);
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

  onCancelBooking(bookingid: string, demisliding: IonItemSliding){
    demisliding.close();
    this.loaderCtrl.create({message: 'canceling...'}).then(loadingEl => {
      loadingEl.present();

    this.placesservicehere.cancelBooking(bookingid).subscribe(() => {
      loadingEl.dismiss();
      console.log('Delete');
    });
  });
  }

}
