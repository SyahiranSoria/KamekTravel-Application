import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from './categories.service';
import { category } from './category.model';


@Component({
  selector: 'app-categories',
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {

ngOnInit(){}

}


