import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlacesPage } from './places.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'places/tabs/discover',
    pathMatch:'full',
  },
  {
    path: 'tabs',
    component: PlacesPage, //same as places.page.ts
    children: [
      {
        path: 'discover',
        loadChildren: () => import('./discover/discover.module').then( m => m.DiscoverPageModule)
      },
      {
        path: 'explore',
        loadChildren: () => import('./explore/explore.module').then( m => m.ExplorePageModule)
      },
      {
        path: 'categories',
        loadChildren: () => import('./categories/categories.module').then( m => m.CategoriesPageModule)
      }
    ]
  }

];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesPageRoutingModule {}
