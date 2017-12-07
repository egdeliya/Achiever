import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {AchievementInfo} from "../../models/achievement-info";

@Component({
  selector: 'app-add-achievement',
  templateUrl: './add-achievement.component.html',
  styleUrls: ['./add-achievement.component.css']
})
export class AddAchievementComponent implements OnInit {
  form: FormGroup;
  @Output() addAchievement = new EventEmitter<AchievementInfo>();

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      theme: ['', [Validators.required]],
      body: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    console.log("----theme"+this.form.value.theme);
    const achievement: AchievementInfo = {
      theme: this.form.value.theme,
      text: this.form.value.body
    };

    this.addAchievement.emit(achievement);
  }

}
