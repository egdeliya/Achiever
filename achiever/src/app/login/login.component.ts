import { Component, OnInit, HostBinding } from '@angular/core'
import {AngularFireAuth} from 'angularfire2/auth';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { moveIn } from '../router.animations';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [moveIn()],
  host: {'[@moveIn]': ''}
})
export class LoginComponent implements OnInit {

  authState: any = null;
  error: any;

  constructor(public af: AngularFireAuth,
              private router: Router) {

    this.af.authState.subscribe(auth => {
      this.authState = auth
      if ( auth ) {
        this.router.navigateByUrl('/members');
      }
    });
  }

  ngOnInit() {
  }

  loginGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return this.socialSignIn(provider);

    // this.af.auth.login({
    //   provider: new firebase.auth.GoogleAuthProvider(),
    //   method: AuthMethods.Popup,
    // }).then(
    //   (success) => {
    //     this.router.navigate(['/members']);
    //   }).catch(
    //   (err) => {
    //     this.error = err;
    //   })
  }

  private socialSignIn(provider) {
    return this.af.auth.signInWithPopup(provider)
      .then((success) => {
            this.router.navigate(['/members']);
          }).catch(
          (err) => {
            this.error = err;
          });
  }

}
