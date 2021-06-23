import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'places/tabs/discover',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'places',
    loadChildren: () => import('./places/places.module').then( m => m.PlacesPageModule) , canLoad: [AuthGuard],
  },
  {
    path: 'wishlist',
    loadChildren: () => import('./wishlist/wishlist.module').then( m => m.WishlistPageModule), canLoad: [AuthGuard],
  },
  {
    path: 'planner',
    loadChildren: () => import('./planner/planner.module').then( m => m.PlannerPageModule), canLoad: [AuthGuard],
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule), canLoad: [AuthGuard],
  },
  {
    path: 'add-places',
    loadChildren: () => import('./add-places/add-places.module').then( m => m.AddPlacesPageModule), canLoad: [AuthGuard],
  },
  {
    path: 'star-rating',
    loadChildren: () => import('./star-rating/star-rating.module').then( m => m.StarRatingPageModule), canLoad: [AuthGuard]
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
