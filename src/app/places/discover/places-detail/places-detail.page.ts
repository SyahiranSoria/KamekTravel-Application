import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { WishlistService } from 'src/app/wishlist/wishlist.service';
import { Place } from '../../place.model';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-places-detail',
  templateUrl: './places-detail.page.html',
  styleUrls: ['./places-detail.page.scss'],
})
export class PlacesDetailPage implements OnInit {

  PlaceDlmDetail : Place;

  private placeSubSitok: Subscription;


  constructor(
    private NavCtrlPD: NavController,
    private routeDP: ActivatedRoute,
    private PlacesServiceDP: PlacesService,
    private Modalcontrollerdlmtok : ModalController,
    private wishlist : WishlistService,
    private loadingCtrl : LoadingController,
    private authServicePD : AuthService,
) { }


  ngOnInit() {
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


  onAddtoWislist(){
    this.wishlist.addwishlist(
      this.PlaceDlmDetail.id,
      this.PlaceDlmDetail.title,
      this.PlaceDlmDetail.description,
      this.PlaceDlmDetail.imageUrl,
      ).subscribe(() => {
      })
  }

  ngOnDestroy(){
    if(this.placeSubSitok){
      this.placeSubSitok.unsubscribe();
    }
  }
}

