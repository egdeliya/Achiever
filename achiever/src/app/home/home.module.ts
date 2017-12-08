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
import {AddAchievementModule} from "./add-achievement/add-achievement.module";
import {FileUploaderService} from "./file-uploader.service";
import {HomeRoutingModule} from "./home-routing.module";

@NgModule({
  declarations: [
    HomeComponent,
    FeedMyComponent,
    SidebarComponent,
    AchievementComponent
  ],
  imports: [
    CommonModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    AddAchievementModule,
    HomeRoutingModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru'},
    FileUploaderService
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
