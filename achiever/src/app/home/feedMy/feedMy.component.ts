import { Component, OnInit } from '@angular/core';
import {FeedBase} from "../feed.base";

@Component({
  selector: 'app-feed',
  templateUrl: './feedMy.component.html',
  styleUrls: ['./feedMy.component.css']
})
export class FeedMyComponent extends FeedBase {

  constructor() {
    super();
    console.log("-----------FeedsMy hello!");
  }

  ngOnInit() {
  }

}
