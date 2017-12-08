import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';

import { AngularFireAuthModule } from 'angularfire2/auth';
import {AngularFireDatabaseModule} from "angularfire2/database";
import { AngularFireModule } from 'angularfire2';
// import {HttpModule} from "@angular/http";
import {firebaseConfig} from "../environments/firebase.config";
import { LoginComponent } from './login/login.component';
import {HomeModule} from "./home/home.module";
import {AuthService} from './auth.service';

import {router} from './app.routes';
import {AuthGuard} from "./auth.guard.service";
import {HttpClientModule} from "@angular/common/http";
import {Routes, RouterModule} from "@angular/router";
import {HomeRoutingModule} from "./home/home-routing.module";
// import { HomeComponent } from './home/home.component';

// import {HomeComponent} from "./home/home.component";
// import {FeedMyComponent} from "./home/feedMy/feedMy.component";
// import { HomeComponent } from './home/home.component';
// import {FeedMyComponent} from './home/feedMy/feedMy.component';
// import { SidebarComponent } from './home/sidebar/sidebar.component';
// import { AchievementComponent } from './home/achievement/achievement.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    // HomeComponent,
    // FeedMyComponent
    // SidebarComponent,
    // AchievementComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    HomeModule,
    HomeRoutingModule,
    RouterModule.forRoot(router,
      { enableTracing: true }),
    AngularFireDatabaseModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru'},
    AuthGuard,
    AuthService],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
