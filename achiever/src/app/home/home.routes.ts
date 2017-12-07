import { ModuleWithProviders } from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {HomeComponent} from "./home.component";
import {FeedMyComponent} from "./feedMy/feedMy.component";


export const homeRouter: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'feedsMy', component: FeedMyComponent }
];

// export const homeRoutes: ModuleWithProviders = RouterModule.forChild(homeRouter)
