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

    this.setFriends();
  }

  setFriends() {

    this.friendsService.getFriendsForUser(this.currentUser.id)
      .subscribe((friends) => {
        this.setFriendsAsync(friends);
      });
  }

  private setFriendsAsync(friends: UserProfile[]) {
    // this.achievements = achievements;
    this.friends = friends.slice(0).reverse();
    // this.achievements.forEach(achievement => console.log(achievement));

  }

  onAddFriend(newFriend: UserProfile) {

    this.friendsService.addFriend(newFriend.id, this.currentUser.id)
      .subscribe((val) => {
        // this.toggleAdd();
      });
  }

}
