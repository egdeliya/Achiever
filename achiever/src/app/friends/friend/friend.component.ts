import {Component, Input, OnInit} from '@angular/core';
import {UserProfile} from "../../models/user-profile";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  @Input() friend: UserProfile;

  constructor() { }

  ngOnInit() {
  }

}
