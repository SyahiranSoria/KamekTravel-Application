import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlaceDetailPage } from 'src/app/places/discover/place-detail/place-detail.page';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styleUrls: ['./star.component.scss'],
})
export class StarComponent implements OnInit {

  ngOnInit() {}

  starClassName = "star-rating-blank";
  @Input() starId;
  @Input() rating;

  //@Output() leave: EventEmitter<number> = new EventEmitter();
  @Output() enter: EventEmitter<number> = new EventEmitter();
  //@Output() bigClick: EventEmitter<number> = new EventEmitter();
  constructor(
    private star : PlaceDetailPage
  ) {}



  onenter() {
    this.enter.emit(this.starId);
    this.star.onAddtoStar(this.starId);
    console.log(this.starId,'here');
  }

}
