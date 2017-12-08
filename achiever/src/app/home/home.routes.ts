import { Routes } from "@angular/router";
import { HomeComponent } from "./home.component";
import { FeedMyComponent } from "./feedMy/feedMy.component";


export const homeRouter: Routes = [
  { path: 'home',
    children: [
      { path: 'feedMy', component: FeedMyComponent  }
    ],
    component: HomeComponent,
    pathMatch: 'full'
  },
  // { path: 'feedMy', component: FeedMyComponent  },
  { path: '', redirectTo: 'home/feedMy', pathMatch: 'full' }
];
