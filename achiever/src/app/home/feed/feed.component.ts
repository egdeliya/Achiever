import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export abstract class FeedComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedGeneralComponent extends FeedComponent {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
