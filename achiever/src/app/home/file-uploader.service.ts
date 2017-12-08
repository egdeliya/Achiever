import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from 'firebase';

import {FileUpload} from './file-upload';
import {AuthService} from "../auth.service";

@Injectable()
export class FileUploaderService {
  photoUrl: string;

  constructor(private db: AngularFireDatabase) { }

  private basePath = '/images';

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
        fileUpload.name = fileUpload.file.name;
        this.saveFileData(fileUpload);

      }
    );
    // console.log(uploadTask.snapshot.downloadURL);
    console.log("-----------photo_url11111"+fileUpload.url);
  }

  private saveFileData(fileUpload: FileUpload) {
    this.photoUrl =  fileUpload.url;
    console.log("-----------photo_url "+this.photoUrl);
    this.db.list(`${this.basePath}/`).push(fileUpload)
      .then((snapshot) =>
    console.log(snapshot)
  );

  }

}
