// import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard.service';
// import {HomeComponent} from "./home/home.component";
// import {HomeModule} from "./home/home.module";

export const router: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', redirectTo: '/home', pathMatch: 'full', canActivate:[AuthGuard] }
  // { path: 'home', loadChildren: './home/home.module#HomeModule', canActivate:[AuthGuard], data: { preload: true }}
];

// export const routes: ModuleWithProviders = RouterModule.forRoot(router);
