import { Component, OnInit } from '@angular/core';

import {AuthService} from "../auth.service";
import {UserProfile} from "../models/user-profile";
import {Observable} from "rxjs/Observable";

import {FileUploaderService} from "./file-uploader.service";
import {FileUpload} from "./file-upload";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // user$: Observable<UserProfile>;
  // selectedFiles: FileList;
  // currentFileUpload: FileUpload;
  // progress: {percentage: number} = {percentage: 0};
  // authState: any = null;
  photoUrl: string;
  name: string;

  constructor(private authService: AuthService,
              private router: Router,
              // private uploadService: FileUploaderService
  ) {
  }

  ngOnInit() {
    // this.user$ = this.authService.getUser();
    // this.photoUrl = this.authService.photoUrl;
    // this.name = this.authService.name;
    this.name  = localStorage.getItem('username');
    this.photoUrl= localStorage.getItem('userphoto')
    console.log("------name  ", this.name);
  }

  logout() {
    // this.router.navigate(['../login']);
    this.authService.logout();
  }
  //
  // selectFile(event) {
  //   this.selectedFiles = event.target.files;
  // }
  //
  // upload() {
  //   const file = this.selectedFiles.item(0);
  //   // console.log("click!");
  //   this.currentFileUpload = new FileUpload(file);
  //   this.uploadService.pushFileToStorage(this.currentFileUpload, this.progress)
  // }

}
