import { Component, OnInit } from '@angular/core';
import {FindFriendsService} from "../find-friends.service";
import {UserProfile} from "../../models/user-profile";
import {FriendsService} from "../friends.service";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.css']
})
export class FindComponent implements OnInit {
  friendName: string = "";
  friends: UserProfile[];
  btnLabel: string = "Добавить";
  curUserId: string;

  constructor(private findFriendService: FindFriendsService,
              private friendsService: FriendsService,
              private authService: AuthService) {
    this.curUserId = this.authService.currentUserId;
    this.friendName = "";
  }

  ngOnInit() {
    this.friendName = "";
    this.setFriends(this.friendName);
  }

  onKeyUp(event: any) {
    this.friendName = event.target.value;

    this.setFriends(this.friendName);
  }

  setFriends(friendName: string) {

    this.findFriendService.getNewFriendsForUser(friendName)
      .subscribe((friends) => {
        this.setFriendsAsync(friends);
      });
  }

  private setFriendsAsync(friends: UserProfile[]) {
    // this.achievements = achievements;
    this.friends = friends;
    // this.achievements.forEach(achievement => console.log(achievement));

  }

  onAddFriend(event: string) {
    this.friendsService.addFriend(event, this.curUserId)
      .subscribe();

    this.setFriends(this.friendName);
  }
}
