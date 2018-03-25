import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import {FeedMyComponent} from "./home/feedMy/feedMy.component";

const appRoutes: Routes = [
  { path: '', redirectTo: '/feedMy', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes)
  ],
  declarations: [],
  exports : [RouterModule]
})
export class AppRoutingModule {

}
