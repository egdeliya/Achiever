import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireAuth} from "angularfire2/auth";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Rx";

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
  TAG: string = " [Auth service] ";

  constructor(private router: Router,
              private route: ActivatedRoute,
              private firebaseDataBase: AngularFireDatabase,
              private firebaseAuth: AngularFireAuth) {

    this.firebaseAuth.authState
      .subscribe((authState) => {
        console.log(this.TAG + '---> authState', authState);
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

        this.updateUserData();
        this.router.navigate(['/feedMy']).
          catch( reason => console.log(this.TAG + "routing failed in constructor: "));
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
    return this.firebaseAuth.authState;
  }

  // Returns current user UID
  get currentUserId(): string {
    return this.authenticated ? this.authState.uid : '';
  }

  get currentUserName(): string {
    return this.authenticated ? this.authState.displayName : '';
  }

  get currentUserPhotoUrl(): string {
    return this.authenticated ? this.authState.photoURL : '';
  }

  loginGoogle() {
    console.log(this.TAG + "----authenticated value is: " + this.authenticated);
    if (this.authenticated) {

      this.router.navigate(['/feedMy'])
        .catch( reason => console.log(this.TAG + "routing failed in loginGoogle: " + reason));

      return;
    }
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.socialSignIn(provider);
  }

  private socialSignIn(provider) {
    return this.firebaseAuth.auth.signInWithPopup(provider)
      .then((credential) =>  {

        this.updateUserData();

        this.router.navigate(['/feedMy']).
        catch( reason => console.log(this.TAG + "routing failed in socialSignIn: " + reason));
      })
      .catch(error => console.log(this.TAG + "signIn failed: " + error));
  }

  //// Sign Out ////
  logout(): void {
    this.firebaseAuth.auth.signOut()
      .then(() => location.reload())
      .catch((reason => console.log(this.TAG + "-------------> logout out failed: " + reason)));
  }

  //// Helpers ////
  private updateUserData(): void {
    let path = `users/${this.currentUserId}`;
    let data = {
      name: this.authState.displayName,
      level: 0,
      id: this.authState.uid,
      photoUrl: this.authState.photoURL,
      numberApprovedPosts: 0
    };

    this.firebaseDataBase.object(path).update(data)
      .catch(error => console.log(this.TAG + "--------------------> failed to upload data: " + error));
  }

}
