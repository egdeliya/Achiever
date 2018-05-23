import { Component, OnInit } from '@angular/core';
import {FriendsService} from "../friends.service";
import {AuthService} from "../../auth.service";
import {UserProfile} from "../../models/user-profile";

@Component({
  selector: 'app-my-friends',
  templateUrl: './my-friends.component.html',
  styleUrls: ['./my-friends.component.css']
})
export class MyFriendsComponent implements OnInit {
  friendName: string = "";
  friends: UserProfile[];
  btnLabel: string = "Убрать";
  curUserId: string;

  constructor(private friendsService: FriendsService,
              private authService: AuthService) {
    this.curUserId = this.authService.currentUserId;
  }

  ngOnInit() {
    this.getFriends(this.curUserId);
  }

  onKeyUp(event: any) {
    console.log(this.friendName);
    this.friendName = event.target.value;

    if (this.friendName) {
      console.log("hey!");
      this.friends = this.friends.filter(friendProfile => {
        return friendProfile.name.includes(this.friendName)
      })
    } else {
      this.getFriends(this.curUserId);
    }
  }

  getFriends(friendName: string) {

    this.friendsService.getFriendsForUser(friendName)
      .subscribe((friends) => {
        this.getFriendsAsync(friends);
      });
  }

  private getFriendsAsync(friends: UserProfile[]) {
    // this.achievements = achievements;
    this.friends = friends;
    // this.achievements.forEach(achievement => console.log(achievement));

  }

  onDeleteFriend(event: string) {
    this.friendsService.deleteFriend(event, this.curUserId)
      .catch(er => console.log(er));
    this.getFriends(this.curUserId);
  }
}
