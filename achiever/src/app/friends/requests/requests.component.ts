import { Component, OnInit } from '@angular/core';
import {FriendsService} from "../friends.service";
import {UserProfile} from "../../models/user-profile";
import {AuthService} from "../../auth.service";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  friends: UserProfile[];
  btnLabel: string = "Принять";
  curUserId: string;

  constructor(private friendsService: FriendsService,
              private authService: AuthService) {
    this.curUserId = this.authService.currentUserId;
  }

  ngOnInit() {
    this.getRequests();
  }

  getRequests() {

    this.friendsService.getRequestsForUser(this.curUserId)
      .subscribe((friends) => {
        this.getRequestsAsync(friends);
      });
  }

  private getRequestsAsync(friends: UserProfile[]) {
    // this.achievements = achievements;
    this.friends = friends;
    // this.achievements.forEach(achievement => console.log(achievement));

  }

  onAcceptFriend(event: string) {
    this.friendsService.acceptRequest(event, this.curUserId).subscribe();
    // this.getFriends(this.curUserId);
  }

  onRejectFriend(event: string) {
    this.friendsService.rejectRequest(event, this.curUserId).subscribe();
    // this.getFriends(this.curUserId);
  }
}
