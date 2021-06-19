import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Place } from '../places/place.model';
import { PlacesService } from '../places/places.service';
import { WishlistService } from '../wishlist/wishlist.service';
import { star } from './star.model';
import { StarvoteService } from './starvote.service';

@Component({
  selector: 'app-star-rating',
  templateUrl: './star-rating.page.html',
  styleUrls: ['./star-rating.page.scss'],
})
export class StarRatingPage {

  PlaceDlmDetail : Place;


  loadedrating: star[];
  //private ratingsubs : Subscription;
  private placeSubSitok: Subscription;

  isLoading = false;

  title = "star-angular";
  stars = [1, 2, 3, 4, 5];
  rating = 0;
  hoverState = 0;

  constructor(
    private NavCtrlPD: NavController,
    private routeDP: ActivatedRoute,
    private PlacesServiceDP: PlacesService,
    private starservice : StarvoteService,
    private Modalcontrollerdlmtok : ModalController
) { }


  ngOnInit() {

    this.placeSubSitok = this.starservice.star.subscribe(rating => {
      this.loadedrating = rating;
      console.log(this.loadedrating,'rating');
    });

    this.routeDP.paramMap.subscribe(paramMap => {
      if (!paramMap.has('placeId')) {
        this.NavCtrlPD.navigateBack('/places/tabs/discover');//navigate back if no data
        return;
      }
      this.placeSubSitok = this.PlacesServiceDP.getPlace(paramMap.get('placeId')).subscribe(place => {
        this.PlaceDlmDetail = place;
      });
    });

  }


  onCancel(){
    this.Modalcontrollerdlmtok.dismiss();
  }

  // ionViewWillEnter(){
  //   this.isLoading = true;
  //   this.starservice.fetchRating().subscribe(()=>
  //   {
  //     console.log('hello');
  //     this.isLoading = false;
  //   });
  // }

  enter(i) {
    this.hoverState = i;
  }

  updateRating(i) {
    this.rating = i;
  }

  onAddtoStar(starId: number){
    //if(){
    return this.starservice.addRating(
      this.PlaceDlmDetail.id,
      starId.toString(),
      ).subscribe(() => {
      })
    //}else{

    //}
  }

  ngOnDestroy(){
    if(this.placeSubSitok){
      this.placeSubSitok.unsubscribe();
    }
  }

}
