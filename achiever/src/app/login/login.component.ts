import { Component, OnInit, HostBinding } from '@angular/core'
import { Router } from '@angular/router';
import {AuthService} from "../auth.service";
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
  }

  loginGoogle() {
    this.authService.loginGoogle();
  }

}
