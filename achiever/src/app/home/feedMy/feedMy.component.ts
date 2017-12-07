import { Component, OnInit } from '@angular/core';
import {FeedBase} from "../feed.base";
import {AchievementInfo} from "../../models/achievement-info";

@Component({
  selector: 'app-feed',
  templateUrl: './feedMy.component.html',
  styleUrls: ['./feedMy.component.css']
})
export class FeedMyComponent extends FeedBase {

  isAddAchievementOpen: boolean = true;

  constructor() {
    super();
    console.log("-----------FeedsMy hello!");
  }

  ngOnInit() {
  }

  toggleAdd() {
    this.isAddAchievementOpen = !this.isAddAchievementOpen;
  }

  onAddAchievement(newAchievement: AchievementInfo) {

  }
}
