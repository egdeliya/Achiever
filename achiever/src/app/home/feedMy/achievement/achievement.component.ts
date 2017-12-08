import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-achievement',
  templateUrl: './achievement.component.html',
  styleUrls: ['./achievement.component.css'],
})
export class AchievementComponent implements OnInit {
  @Input() achievementId: string;

  constructor() {
    console.log("I get it---->", this.achievementId);
  }

  ngOnInit() {
  }

}
