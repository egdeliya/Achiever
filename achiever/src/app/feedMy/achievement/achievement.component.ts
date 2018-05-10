import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import * as firebase from "firebase";
import {AchievementInfo} from "../../models/achievement-info";
import {UserProfile} from "../../models/user-profile";

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css'],
})
export class AchievementComponent implements OnInit {

  @Input() achievement: AchievementInfo;
  removed: boolean = false;
  TAG: string = " [AchievementComponent] ";

  constructor() {
  }


  // TODO
  OnDeleteClick() {

    this.removed = true;
  }

  ngOnInit() {
    // console.log(this.TAG + "on Init ---->", this.achievement);
  }

}
