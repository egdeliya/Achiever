import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard.service';
import {HomeComponent} from "./home/home.component";

export const router: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {path: 'home', component: HomeComponent, canActivate:[AuthGuard]}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
