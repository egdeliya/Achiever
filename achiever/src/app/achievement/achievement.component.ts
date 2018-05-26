import {Component, Input, OnInit} from '@angular/core';
import {AchievementInfo} from "../models/achievement-info";
import {AchievementsService} from "../feedMy/achievements.service";
import {AuthService} from "../auth.service";
import {isLineBreak} from "codelyzer/angular/sourceMappingVisitor";

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css'],
})
export class AchievementComponent implements OnInit {

  @Input() isMyAchievement: boolean;
  @Input() achievement: AchievementInfo;
  isLiked: boolean = false;
  removed: boolean = false;
  TAG: string = " [AchievementComponent] ";

  constructor(private achievementsService: AchievementsService,
              private authService: AuthService) {
    // this.isLiked = this.achievementsService.
    //   hasUserLikedAchievement(this.achievement.id, this.authService.currentUserId);
  }

  OnDeleteClick() {
    this.removed = true;
    this.achievementsService.deleteAchievement(this.achievement.id, this.achievement.authorId)
      .subscribe();
  }

  OnLikeClick() {
    if (!this.isLiked) {
      this.isLiked = true;
      console.log(!this.isMyAchievement && this.isLiked);
      this.achievementsService.likeAchievement(this.achievement, this.authService.currentUserId)
        .subscribe();
    }
  }

  ngOnInit() {
  }

}
