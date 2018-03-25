import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.auth.authenticated) { return true; }

    return this.auth.currentUserObservable
      .take(1)
      .map(user => !!user)
      .do(loggedIn => {
        if (!loggedIn) {
          console.log("access denied")
          // this.router.navigate(['/login']);
        }
      })
  }

  // canActivate(next: ActivatedRouteSnapshot,
  //             state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return this.authService.getUser()
  //     .map(user => {
  //       console.log('--- user', user);
  //       if (user) {
  //         return true;
  //       }
  //
  //       this.authService.redirectUrl = state.url;
  //       this.router.navigate(['/login']);
  //
  //       return false;
  //     });
  // }

  // canActivateChild(next: ActivatedRouteSnapshot,
  //                  state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
  //   return this.canActivate(next, state);
  // }

}
