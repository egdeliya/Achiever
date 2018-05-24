import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {UserProfile} from "../models/user-profile";
import {Observable} from "rxjs/Observable";
import {AuthService} from "../auth.service";

@Injectable()
export class FindFriendsService {
  userFriends = new Set();
  userRequests = new Set();
  curUserId: string;

  constructor(private db: AngularFireDatabase,
              private auth: AuthService) {
    this.curUserId = auth.currentUserId;
    // this.getUserFriendsKeysAsync();
  }

  getUserFriendsKeysAsync() {
    this.db.list(`usersPerFriends/${this.curUserId}`)
      .snapshotChanges()
      .map(snapshot =>
        snapshot.map(({key}) => {
          // console.log("------------" + key);
          this.userFriends.add(key);
        })
      ).subscribe();
  }

  getUserRequestsFriendsAsync() {
    this.db.list(`friendRequests/${this.curUserId}`)
      .snapshotChanges()
      .map(snapshot =>
        snapshot.map(({key}) => {
          // console.log("------------" + key);
          this.userRequests.add(key);
        })
      ).subscribe();
  }

  getNewFriendsForUser(friendName: string | null): Observable<any> {
    console.log("hello!");
    this.getUserFriendsKeysAsync();
    this.getUserRequestsFriendsAsync();

    // console.log("name -----> " + friendName);

    return this.db.list('/users', ref =>
      friendName ? ref.orderByChild('name').startAt(friendName) : ref
    ).snapshotChanges()
      .map(snapshot =>
        snapshot.filter(({key}) => {
          // console.log("----------- key " + key + " " + this.userFriends.has(key));

          return key !== this.curUserId && !this.userFriends.has(key)
            && !this.userRequests.has(key);
      })
    ).map(snapshot =>
        snapshot.map(({key, payload}) => ({...payload.val(), id: key}))
      );
  }

}
