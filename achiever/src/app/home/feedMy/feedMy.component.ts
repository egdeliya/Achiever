import { Component, OnInit } from '@angular/core';
import {FeedBase} from "../feed.base";
import {AchievementInfo} from "../../models/achievement-info";
import {Router} from "@angular/router";
import {AngularFireDatabase} from "angularfire2/database";
import {AuthService} from "../../auth.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-feed',
  templateUrl: './feedMy.component.html',
  styleUrls: ['./feedMy.component.css']
})
export class FeedMyComponent extends FeedBase implements OnInit {

  isAddAchievementOpen: boolean = false;

  constructor(private router: Router,
              private db: AngularFireDatabase,
              private authService: AuthService) {
    super();
    console.log("-----------FeedsMy hello!");
  }

  ngOnInit() {
    console.log("-----------FeedsMy hello on init!");
    // this.router.navigate(['/feedMy']);
  }

  toggleAdd() {
    this.isAddAchievementOpen = !this.isAddAchievementOpen;
  }

  onAddAchievement(newAchievement: AchievementInfo) {

    console.log("---------------add");

    newAchievement.authorId = localStorage.getItem('userid');
    newAchievement.usersLikesId = [];
    newAchievement.likesNumber = 0;

    console.log("---------------new Achievement!", newAchievement);

    const newAchievementKey = firebase.database().ref().child('achievements').push().key;

    console.log("-----------new key   ", newAchievementKey);
    let updates = {};
    updates['/achievements/' + newAchievementKey] = newAchievement;
    updates['/user-achievements/' + newAchievement.authorId + '/' + newAchievementKey ] = true;

    console.log("---------------updates!", newAchievement);

    firebase.database().ref().update(updates).then();

    console.log("---------------updated!!!!!!!", newAchievement);

    this.toggleAdd();

    //
    // this.db.object('achievements').update(newAchievement)
    //   .catch(error => console.log(error));
    //
    // firebase.database().ref('users-achievements/' + newAchievement.authorId)
    //   .child('')
  }
}
