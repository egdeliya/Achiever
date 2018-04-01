import {Component, OnInit} from '@angular/core';
import {FeedBase} from "../feed.base";
import {AchievementInfo} from "../models/achievement-info";
import {AngularFireDatabase, AngularFireList} from "angularfire2/database";
import {AuthService} from "../auth.service";
import * as firebase from "firebase";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-feed',
  templateUrl: './feedMy.component.html',
  styleUrls: ['./feedMy.component.css']
})
export class FeedMyComponent extends FeedBase implements OnInit {
  currentUserId: string;
  achievements: AchievementInfo[];
  usersPerAchievementRef;
  TAG: string = " [ FeedMyComponent] ";
  isAddAchievementOpen: boolean = false;

  constructor( private db,
              private authService: AuthService ) {
    super();
    this.achievements = [];
  }

  ngOnInit() {
    this.currentUserId = this.authService.currentUserId;
    this.usersPerAchievementRef = this.db.ref("usersPerAchievements/" + this.currentUserId);

    // this.usersPerAchievementRef.on('child_added')
    // this.usersPerAchievementRef$ = this.db.list('users/' + this.currentUserId + '/achievements/');

    console.log(this.TAG + "---------------------------> achievements observable " + this.achievementsObs$);

    // this.usersPerAchievementRef.on('child_added', function(data) {
    //   this.addAchievement(data.val());
    // });

    firebase.database().ref("/usersPerAchievements/" + this.currentUserId)
      .limitToLast(100).once('value', (snapshot) =>
      snapshot.forEach((childSnapshot) => {
        // console.log("------------------child snap", childSnapshot.val());
        // this.achievements.unshift(childSnapshot.val());

        return true;
      }))
      .catch(error => console.log(this.TAG + "achievements init failed: " + error));
  }

  delete(i) {
    this.achievements.splice(i, 1);
  }

  addAchievement(achievement) {
    this.achievements.unshift(achievement);
  }

  toggleAdd() {
    this.isAddAchievementOpen = !this.isAddAchievementOpen;
  }

  onAddAchievement(newAchievement: AchievementInfo) {

    // console.log("---------------add");

    newAchievement.authorName = this.authService.currentUserName;
    newAchievement.authPhoto = this.authService.currentUserPhotoUrl;
    newAchievement.authorId = this.authService.currentUserId;
    newAchievement.usersLikesId = [];
    newAchievement.likesNumber = 0;

    // console.log("---------------new Achievement!", newAchievement);

    const newAchievementKey = firebase.database().ref().child('achievements').push().key;

    // console.log("-----------new key   ", newAchievementKey);
    let updates = {};
    updates['/achievements/' + newAchievementKey] = newAchievement;
    updates['/usersPerAchievements/' + newAchievement.authorId] = newAchievementKey;

    // console.log("---------------updates!", newAchievement);
    newAchievement.id = newAchievementKey;

    // this.achievements.unshift(newAchievement);

    firebase.database().ref().update(updates).then();

    // console.log("fuck ---->", this.currentUserId);


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
