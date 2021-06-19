import { Component, Input, OnInit } from '@angular/core';
import { Place } from 'src/app/places/place.model';

@Component({
  selector: 'app-add-places-item',
  templateUrl: './add-places-item.component.html',
  styleUrls: ['./add-places-item.component.scss'],
})
export class AddPlacesItemComponent implements OnInit {
  @Input() offerkeluar: Place; //Decorator that marks a class field as an input property and supplies configuration metadata. The input property is bound to a DOM property in the template. During change detection, Angular automatically updates the data property with the DOM property's value.

  constructor() { }

  ngOnInit() {}



}


