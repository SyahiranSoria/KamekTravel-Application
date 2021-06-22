import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PoiDetailsPage } from '../poi-details.page';

@Component({
  selector: 'mat-starcategory',
  templateUrl: './starcategory.component.html',
  styleUrls: ['./starcategory.component.scss'],
})
export class StarcategoryComponent implements OnInit {

  ngOnInit() {}

  starClassName = "star-rating-blank";
  @Input() starId;
  @Input() rating;

  //@Output() leave: EventEmitter<number> = new EventEmitter();
  @Output() enter: EventEmitter<number> = new EventEmitter();
  //@Output() bigClick: EventEmitter<number> = new EventEmitter();
  constructor(
    private star : PoiDetailsPage
  ) {}



  onenter() {
    this.enter.emit(this.starId);
    this.star.onAddtoStar(this.starId);
    console.log(this.starId,'here');
  }

}
