import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-poi-details',
  templateUrl: './poi-details.page.html',
  styleUrls: ['./poi-details.page.scss'],
})
export class PoiDetailsPage implements OnInit {


  constructor(route: ActivatedRoute) { }

  ngOnInit() {

  }

}
