import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { StarRatingPage } from '../star-rating.page';

@Component({
  selector: 'app-staraaa',
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
    private star : StarRatingPage
  ) {}



  onenter() {
    this.enter.emit(this.starId);
    this.star.onAddtoStar(this.starId);
    console.log(this.starId,'here');
  }

}
