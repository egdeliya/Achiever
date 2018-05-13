import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard.service';
import {FeedMyComponent} from "./feedMy/feedMy.component";
import {FriendsComponent} from "./friends/friends.component";

export const router: Routes = [
  { path: 'feedMy', component: FeedMyComponent, canActivate: [AuthGuard]  },
  { path: 'friends', component: FriendsComponent, canActivate: [AuthGuard]  },
  { path: '', redirectTo: '/feedMy', canActivate: [AuthGuard], pathMatch: 'full' },
];

