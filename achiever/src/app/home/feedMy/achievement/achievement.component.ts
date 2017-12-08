import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import * as firebase from "firebase";
import {AchievementInfo} from "../../../models/achievement-info";
import {UserProfile} from "../../../models/user-profile";

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css'],
})
export class AchievementComponent implements OnInit {
  @Input() achievementId: string;
  @Input() achPhoto: string;
  @Input() authPhoto: string;
  @Input() authName: string;
  @Input() authLevel: string;
  @Input() authLikes: string;
  @Input() authId: string;
  @Input() text:string;
  @Input() index:number;
  @Output() ind = new EventEmitter<number>();
  removed: boolean = false;
  achievement: AchievementInfo;
  author: UserProfile;


  constructor() {
  }


  OnDeleteClick() {

    firebase.database().ref('achievements/'+this.achievementId).remove();
    firebase.database().ref('user/'+this.authId+'/achievements/'+this.achievementId).remove();
    this.ind.emit(this.index);
    this.removed = true;
  }

  ngOnInit() {
    console.log("I get it---->", this.achievementId);
    // firebase.database().ref().child('achievements/' + this.achievementId)
    //   .on('value', (data) => {
    //     console.log("-----------in achievement " + data.val().authorId);
    //     this.achievement = data.val();
    //     console.log(this.achievement);
    //   });

    // const promise = new Promise((resolve, reject) => {
    // firebase.database().ref().child('achievements/' + this.achievementId)
    //   .on('value', (data) => {
    //     console.log("-----------in achievement " + data.val().authorId);
    //     this.achievement = data.val();
    //     // localStorage.setItem(this.achievementId + 'text', data.val().text);
    //     // localStorage.setItem(this.achievementId + 'photo', data.val().photoUrl);
    //
    //     console.log(this.achievement);
    //     // resolve(this.achievement.authorId);
    //   });
    //
    // localStorage.setItem(this.achievementId + 'text', this.achievement.text);
    // localStorage.setItem(this.achievementId + 'photo', this.achievement.photoUrl);
    // // });
    // // this.achievement.photoUrl = localStorage.getItem(this.achievementId+'photo');
    // // this.achievement.text = localStorage.getItem(this.achievementId+'text');
    //
    //
    // // promise.then((authorId) => {
    // firebase.database().ref().child('users/' + this.achievement.authorId)
    //   .on('value', (data) => {
    //     console.log("-----------in author " + data.val().name);
    //     this.author = data.val();
    //     return this.author;
    //   });
    // }).then((author) => console.log(author))
    //   .then(() => this.ngOnInit());
    // console.log("I get it---->", this.achievementId);
    // // firebase.database().ref().child('achievements/' + this.achievementId)
    // //   .on('value', (data) => {
    // //     console.log("-----------in achievement " + data.val().authorId);
    // //     this.achievement = data.val();
    // //     console.log(this.achievement);
    // //   });
    //
    // const promise = new Promise((resolve, reject) => {
    //   firebase.database().ref().child('achievements/' + this.achievementId)
    //     .on('value', (data) => {
    //       console.log("-----------in achievement " + data.val().authorId);
    //       this.achievement = data.val();
    //       console.log(this.achievement);
    //       resolve(this.achievement.authorId);
    //     });
    // });
    //
    // promise.then((authorId) => {
    //   firebase.database().ref().child('users/' + authorId)
    //     .on('value', (data) => {
    //       console.log("-----------in author " + data.val().name);
    //       this.author = data.val();
    //       return this.author;
    //     });
    // }).then((author) => console.log(author));

  }

  // getAchievementInfo(): Promise<AchievementInfo> {
  //   // return new Promise()
  // }

}
