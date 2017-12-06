import { Component, OnInit } from '@angular/core';

import {AuthService} from "../auth.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private userAvatar: string;
  private userName: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    if (this.authService.currentUser !== null) {
      console.log(this.authService.currentUser.displayName);
      this.userAvatar = this.authService.currentUser.photoURL;
      this.userName = this.authService.currentUser.displayName;
    }
    else
      this.userAvatar = 'http://images6.fanpop.com/image/photos/33100000/-Lyra-mlp-fim-background-characters-33174965-542-599.png';
  }

}
