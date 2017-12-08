import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {FeedMyComponent} from "./feedMy/feedMy.component";
import {HomeComponent} from "./home.component";

const homeRoutes: Routes = [
  { path: 'home',
    children: [
      { path: 'feedMy',
        component: FeedMyComponent},
    ],
    component: HomeComponent },
  { path: '', redirectTo: '/home/feedMy', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ],
  declarations: [],
  exports : [RouterModule]
})
export class HomeRoutingModule {

}
