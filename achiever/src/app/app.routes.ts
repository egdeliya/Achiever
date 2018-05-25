import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard.service';
import {FeedMyComponent} from "./feedMy/feedMy.component";
import {FriendsComponent} from "./friends/friends.component";
import {MyFriendsComponent} from "./friends/my-friends/my-friends.component";
import {FindComponent} from "./friends/find/find.component";
import {RequestsComponent} from "./friends/requests/requests.component";
import {ProfileComponent} from "./profile/profile.component";

export const router: Routes = [
  { path: 'feedMy', component: FeedMyComponent, canActivate: [AuthGuard]  },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]  },
  { path: 'friends', component: FriendsComponent, canActivate: [AuthGuard],
    children: [
      { path: 'myFriends', component: MyFriendsComponent},
      { path: 'find', component: FindComponent},
      { path: 'requests', component: RequestsComponent},
      { path: '', component: MyFriendsComponent},
    ]},
  { path: '', redirectTo: '/feedMy', canActivate: [AuthGuard], pathMatch: 'full' },
];

