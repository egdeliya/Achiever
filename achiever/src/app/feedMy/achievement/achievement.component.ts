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
  // @Input() achievementId: string;
  // @Input() achPhoto: string;
  // @Input() authPhoto: string;
  // @Input() authName: string;
  // @Input() authLevel: string;
  // @Input() authLikes: string;
  // @Input() authId: string;
  // @Input() text: string;
  // @Input() index: number;
  @Input() achievementInfo: AchievementInfo;
  // @Output() ind = new EventEmitter<number>();
  removed: boolean = false;
  achievement: AchievementInfo;
  TAG: string = " [AchievementComponent] ";

  constructor() {
  }


  OnDeleteClick() {

    firebase.database().ref('achievements/'+this.achievementInfo.id)
      .remove().catch( error => console.log(this.TAG + "failed achievement deletion: " + error));
    firebase.database().ref('user/' + this.achievementInfo.authorId + '/achievements/' + this.achievementInfo.id)
      .remove().catch( error => console.log(this.TAG + "failed achievement deletion: " + error));
    // this.ind.emit(this.index);
    this.removed = true;
  }

  ngOnInit() {
    console.log(this.TAG + "on Init ---->", this.achievementInfo.id);
  }

}
