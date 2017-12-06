import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from "angularfire2/auth";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";

import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import * as firebase from "firebase";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {UserProfile} from "./models/user-profile";
import {AngularFireDatabase} from "angularfire2/database";

@Injectable()
export class AuthService {
  user$ = new ReplaySubject<UserProfile>(1);
  authState: any = null;

  constructor(private router: Router,
              private firebaseDataBase: AngularFireDatabase,
              private firebaseAuth: AngularFireAuth) {

    this.firebaseAuth.authState
      .subscribe((authState) => {
        console.log('--- authState', authState);
        if (!authState) {
          this.user$.next(null);
          return;
        }

        this.authState = authState;
        this.user$.next({
          name: authState.displayName,
          level: 0,
          id: authState.uid,
          photoUrl: authState.photoURL,
          numberApprovedPosts: 0
        });

        console.log("----name" + authState.displayName);
        this.updateUserData();
        // this.router.navigate(['/home']);
      });
  }

  getUser(): Observable<UserProfile> {
    return this.user$.asObservable();
  }


  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.authState !== null;
  }

  // Returns current user data
  get currentUser(): any {
    return this.authenticated ? this.authState : null;
  }

  // Returns
  get currentUserObservable(): any {
    return this.firebaseAuth.authState
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  loginGoogle() {
    console.log("----authenticated!!"+this.authenticated);
    if (this.authenticated) {
      // this.router.navigate(['/home']);
      return;
    }
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.firebaseAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {
        console.log(credential.user);
        this.authState = credential.user;
        this.updateUserData();
        // this.router.navigate(['/home']);
      })
      .catch(error => console.log(error));
  }

  //// Sign Out ////
  logout(): void {
    this.firebaseAuth.auth.signOut();
    this.router.navigate(['/'])
  }

  //// Helpers ////
  private updateUserData(): void {
    let path = `users/${this.currentUserId}`;
    let data = {
      name: this.authState.displayName,
      level: 0,
      id: this.authState.uid,
      photoUrl: this.authState.photoURL,
      numberApprovedPosts: 0,
    };

    this.firebaseDataBase.object(path).update(data)
      .catch(error => console.log(error));

  }

}
