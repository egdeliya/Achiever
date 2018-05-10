import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from "@angular/forms";
import {AchievementInfo} from "../models/achievement-info";
import {FileUploaderService} from "../file-uploader.service";
import {FileUpload} from "../file-upload";
import * as firebase from "firebase";

@Component({
  selector: 'app-add-achievement',
  templateUrl: './add-achievement.component.html',
  styleUrls: ['./add-achievement.component.css']
})
export class AddAchievementComponent implements OnInit {
  form: FormGroup;
  @Output() addAchievement = new EventEmitter<AchievementInfo>();
  selectedFiles: FileList;
  currentFileUpload: FileUpload;
  progress: {percentage: number} = {percentage: 0};
  photoUrl: string;
  private basePath = '/images';


  constructor(private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      theme: ['', [Validators.required]],
      body: ['', [Validators.required]]
    });
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    const file = this.selectedFiles.item(0);
    this.currentFileUpload = new FileUpload(file);
    this.pushFileToStorage(this.currentFileUpload, this.progress);
  }


  pushFileToStorage(fileUpload: FileUpload, progress: {percentage: number}) {
    const storageRef = firebase.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${fileUpload.file.name}`).put(fileUpload.file);

    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
        progress.percentage = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
      },
      (error) => {
        // fail
        console.log(error)

      },
      () => {
        // success
        fileUpload.url = uploadTask.snapshot.downloadURL;
        // fileUpload.name = fileUpload.file.name;
        this.saveFileData(fileUpload);

      }
    );
  }

  saveFileData(fileUpload) {
    this.photoUrl = fileUpload.url;
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    // this.photoUrl = this.uploadService.returnPhotoUrl();
    console.log("----theme"+this.form.value.theme);
    if (this.photoUrl) {
      const achievement: AchievementInfo = {
        theme: this.form.value.theme,
        text: this.form.value.body,
        photoUrl: this.photoUrl
      };

      this.addAchievement.emit(achievement);
    } else {
      const achievement: AchievementInfo = {
        theme: this.form.value.theme,
        text: this.form.value.body
      };

      this.addAchievement.emit(achievement);
    }

  }

}
