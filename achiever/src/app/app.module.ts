import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AppComponent } from './app.component';

import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import {HttpModule} from "@angular/http";
import {firebaseConfig} from "../environments/firebase.config";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { OtherComponent } from './members/members.component';

import { AuthGuard } from './auth.service';
import { routes } from './app.routes';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    OtherComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    routes
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
  exports: [AppComponent]
})
export class AppModule { }
