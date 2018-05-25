import { Component, OnInit } from '@angular/core';
import {AuthService} from "../auth.service";
import {AchievementInfo} from "../models/achievement-info";
import {AchievementsService} from "../feedMy/achievements.service";
import {UserProfile} from "../models/user-profile";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: UserProfile;
  achievements: AchievementInfo[] = [];
  TAG: string = " [ ProfileComponent] ";
  isAddAchievementOpen: boolean = false;

  constructor(private authService: AuthService,
              private achievementsService: AchievementsService) {
  }

  ngOnInit() {
    this.currentUser = {
      id: this.authService.currentUserId,
      name: this.authService.currentUserName,
      photoUrl: this.authService.currentUser.photoURL
    };

    this.setAchievements();
  }

  setAchievements() {
    console.log("------- HEY -------------");

    this.achievementsService.getUsersAchievements(this.currentUser.id)
      .subscribe((achievements) => {
        this.setAchievementsAsync(achievements);
      });
  }

  private setAchievementsAsync(achievements: AchievementInfo[]) {
    // this.achievements = achievements;
    console.log("------- HEY -------------");
    achievements.forEach(ach => console.log(ach));
    this.achievements = achievements.slice(0).reverse();
    this.achievements.forEach(achievement => console.log(achievement));

  }

  toggleAdd() {
    this.isAddAchievementOpen = !this.isAddAchievementOpen;
  }

  onAddAchievement(newAchievement: AchievementInfo) {
    newAchievement.authorId = this.currentUser.id;
    newAchievement.authPhoto = this.currentUser.photoUrl;
    newAchievement.authorName = this.currentUser.name;

    this.achievementsService.addAchievement(newAchievement, this.currentUser.id)
      .subscribe((val) => {
        this.toggleAdd();
      });
  }

}
