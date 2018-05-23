import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {UserProfile} from "../../models/user-profile";
import {log} from "util";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {

  @Input() friend: UserProfile;
  @Input() btnLabel: string;

  @Output() friendId = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  onBtnClick() {
    this.friendId.emit(this.friend.id);
  }

}
