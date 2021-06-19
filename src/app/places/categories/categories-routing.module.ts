import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesPage } from './categories.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPage
  },
  {
    path: ':list-poi',
    loadChildren: () => import('./list-poi/list-poi.module').then( m => m.ListPoiPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesPageRoutingModule {}
