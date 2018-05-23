import { Component, OnInit } from '@angular/core';
import {UserProfile} from "../models/user-profile";
import {AuthService} from "../auth.service";
import {FriendsService} from "./friends.service";

@Component({
  selector: 'app-friends',
  templateUrl: './friends.component.html',
  styleUrls: ['./friends.component.css']
})
export class FriendsComponent implements OnInit {

  currentUser: UserProfile;
  friends: UserProfile[] = [];
  friendName: string;
  TAG: string = " [ FriendsComponent] ";

  constructor(private authService: AuthService,
              private friendsService: FriendsService) {
  }

  ngOnInit() {
    this.currentUser = {
      id: this.authService.currentUserId,
      name: this.authService.currentUserName,
      photoUrl: this.authService.currentUser.photoURL
    };
  }

}
