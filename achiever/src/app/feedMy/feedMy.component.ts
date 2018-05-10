import {Component, OnInit} from '@angular/core';
import {FeedBase} from "../feed.base";
import {AchievementInfo} from "../models/achievement-info";
import {AuthService} from "../auth.service";
import {AchievementsService} from "./achievements.service";
import {UserProfile} from "../models/user-profile";

@Component({
  selector: 'app-feed',
  templateUrl: './feedMy.component.html',
  styleUrls: ['./feedMy.component.css']
})
export class FeedMyComponent extends FeedBase implements OnInit {

  currentUser: UserProfile;
  achievements: AchievementInfo[] = [];
  TAG: string = " [ FeedMyComponent] ";
  isAddAchievementOpen: boolean = false;

  constructor(private authService: AuthService,
              private achievementsService: AchievementsService) {
    super();
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

    this.achievementsService.getAchievementsForUser(this.currentUser.id)
      .subscribe((achievements) => {
        this.setAchievementsAsync(achievements);
      });
  }

  private setAchievementsAsync(achievements: AchievementInfo[]) {
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
