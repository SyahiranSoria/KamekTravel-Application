import { Component, Input, OnInit } from '@angular/core';
import { Place } from 'src/app/places/place.model';

@Component({
  selector: 'app-add-places-item',
  templateUrl: './add-places-item.component.html',
  styleUrls: ['./add-places-item.component.scss'],
})
export class AddPlacesItemComponent implements OnInit {
  @Input() offerkeluar: Place;
  constructor() { }

  ngOnInit() {}



}


