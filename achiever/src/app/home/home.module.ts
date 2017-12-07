import {LOCALE_ID, NgModule} from '@angular/core';
import {HomeComponent} from "./home.component";
import {AchievementComponent} from "./achievement/achievement.component";
import {SidebarComponent} from "./sidebar/sidebar.component";
import {homeRouter} from "./home.routes";
import {AngularFireDatabaseModule} from "angularfire2/database";
import { AngularFireModule } from 'angularfire2';
// import {AppModule} from "../app.module";
import {FeedMyComponent} from "./feedMy/feedMy.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import { AddAchievementComponent } from './add-achievement/add-achievement.component';
// import {HttpModule} from "@angular/http";
// import {FormsModule} from "@angular/forms";
// import {BrowserModule} from "@angular/platform-browser";
import {AddAchievementModule} from "./add-achievement/add-achievement.module";

@NgModule({
  declarations: [
    FeedMyComponent,
    HomeComponent,
    SidebarComponent,
    AchievementComponent
    // ,
    // AddAchievementComponent
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    // FormsModule,
    // HttpModule,
    AddAchievementModule,
    RouterModule.forChild(homeRouter),
    // homeRoutes,
    AngularFireDatabaseModule,
    AngularFireModule,
    // AppModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru'}
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
