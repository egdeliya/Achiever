import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {AddAchievementComponent} from "./add-achievement.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [AddAchievementComponent],
  exports: [AddAchievementComponent]
})
export class AddAchievementModule { }
