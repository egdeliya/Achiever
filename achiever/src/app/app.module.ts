import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';

import {AngularFireAuthModule} from 'angularfire2/auth';
import {AngularFireDatabaseModule} from "angularfire2/database";
import {AngularFireModule} from 'angularfire2';
import {firebaseConfig} from "../environments/firebase.config";
import {LoginComponent} from './login/login.component';
import {AuthService} from './auth.service';

import {router} from './app.routes';
import {AuthGuard} from "./auth.guard.service";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {SidebarComponent} from './sidebar/sidebar.component';
import {FeedMyComponent} from "./feedMy/feedMy.component";
import {AchievementComponent} from "./feedMy/achievement/achievement.component";
import {AddAchievementModule} from "./add-achievement/add-achievement.module";
import {AchievementsService} from "./feedMy/achievements.service";
import {FriendsComponent} from './friends/friends.component';
import {FriendComponent} from "./friends/friend/friend.component";
import {FriendsService} from "./friends/friends.service";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SidebarComponent,
    FeedMyComponent,
    AchievementComponent,
    FriendsComponent,
    FriendComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AddAchievementModule,
    // HomeModule,
    // HomeRoutingModule,
    RouterModule.forRoot(router,
      {enableTracing: true}),
    AngularFireDatabaseModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru'},
    AuthGuard,
    AuthService,
    AchievementsService,
    FriendsService],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule {
}
