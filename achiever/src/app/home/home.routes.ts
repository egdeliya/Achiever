import { ModuleWithProviders } from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {FeedMyComponent} from "./feedMy/feedMy.component";


export const homeRouter: Routes = [
  { path: '', redirectTo: 'home/feedsMy', pathMatch: 'full' },
  { path: 'home',
    component: HomeComponent,
    children: [
      { path: 'feedsMy', component: FeedMyComponent }
    ]},

  // { path: 'a', component: FeedMyComponent }
];

// export const homeRoutes: ModuleWithProviders = RouterModule.forChild(homeRouter)
