import { Component, OnInit } from '@angular/core';
import {FeedBase} from "../feed.base";
import {AchievementInfo} from "../models/achievement-info";
import {Router} from "@angular/router";
import {AngularFireDatabase} from "angularfire2/database";
import {AuthService} from "../auth.service";
// import {AchievementComponent} from "./achievement/achievement.component";
import * as firebase from "firebase";
import {AchievementComponent} from "./achievement/achievement.component";
import {AngularFireList, AngularFireObject} from "angularfire2/database/interfaces";

@Component({
  selector: 'app-feed',
  templateUrl: './feedMy.component.html',
  styleUrls: ['./feedMy.component.css']
})
export class FeedMyComponent extends FeedBase implements OnInit {
  currentUserId: string;
  achievements: AchievementInfo[];
  achievementsObs;

  isAddAchievementOpen: boolean = false;

  constructor(
              private db: AngularFireDatabase,
              private authService: AuthService
  ) {
    super();

    this.achievements = [];
  }

  ngOnInit() {
    this.currentUserId = localStorage.getItem('userid');
    this.achievementsObs = this.db.list('users/'+this.currentUserId + '/achievements/');

    firebase.database().ref('user/'+this.currentUserId+'/achievements/')
      .limitToLast(100).once('value', (snapshot) =>
      snapshot.forEach((childSnapshot) => {
        console.log("------------------child snap", childSnapshot.val());
        this.achievements.unshift(childSnapshot.val());
        return true;
      }));
  }

  delete(i) {
    this.achievements.splice(i, 1);
  }

  addAchievementId(achievement) {
    this.achievements.unshift(achievement);
  }

  toggleAdd() {
    this.isAddAchievementOpen = !this.isAddAchievementOpen;
  }

  onAddAchievement(newAchievement: AchievementInfo) {

    // console.log("---------------add");

    newAchievement.authorName = localStorage.getItem('username');
    newAchievement.authPhoto =localStorage.getItem('userphoto')
    newAchievement.authorId = localStorage.getItem('userid');
    newAchievement.usersLikesId = [];
    newAchievement.likesNumber = 0;

    // console.log("---------------new Achievement!", newAchievement);

    const newAchievementKey = firebase.database().ref().child('achievements').push().key;

    // console.log("-----------new key   ", newAchievementKey);
    let updates = {};
    updates['/achievements/' + newAchievementKey] = newAchievement;
    updates['/user/' + newAchievement.authorId + '/achievements/' + newAchievementKey ] = newAchievement;

    // console.log("---------------updates!", newAchievement);
    newAchievement.id = newAchievementKey;

    this.achievements.unshift(newAchievement);

    firebase.database().ref().update(updates).then();

    console.log("fuck ---->", this.currentUserId);


    // console.log("---------------updated!!!!!!!", newAchievement);

    this.toggleAdd();

    //
    // this.db.object('achievements').update(newAchievement)
    //   .catch(error => console.log(error));
    //
    // firebase.database().ref('users-achievements/' + newAchievement.authorId)
    //   .child('')
  }
}
