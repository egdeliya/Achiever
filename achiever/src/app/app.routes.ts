import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard.service';
import {FeedMyComponent} from "./home/feedMy/feedMy.component";
// import {HomeComponent} from "./home/home.component";

export const router: Routes = [
  { path: '', redirectTo: '/login', canActivate:[AuthGuard], pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'feedMy', component: FeedMyComponent, canActivate: [AuthGuard]  }
  // { path: 'home',
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: '/home'
  //     },
  //     {
  //       path: 'feedMy',
  //       component: FeedMyComponent
  //     }
  //
  //   ],
  //   // redirectTo: '/home',
  //   canActivate:[AuthGuard]
  // }
];

