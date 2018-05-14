import { Injectable } from '@angular/core';
import {AngularFireAction, AngularFireDatabase, DatabaseSnapshot} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {UserProfile} from "../models/user-profile";

@Injectable()
export class FriendsService {

  constructor(private db: AngularFireDatabase) {
  }

  getFriendsForUser(userId: string): Observable<any> {
    console.log("userId -----> " + userId);
    return this.db.list(`users`)
      .snapshotChanges()
      .map(snapshot =>
        snapshot.filter(({key}) => key !== userId)
      );
  }

  addFriend(friendId: string, userId: string): Observable<any> {
    const promise = this.db.list(`usersPerFriends/${userId}/${friendId}`).push(true);
    return Observable.of(promise);
  }

  // editPurchase(purchase: Purchase) {
  //   const id = purchase.id;
  //
  //   delete purchase.id;
  //   this.db.object(`purchases/${id}`).update(purchase);
  // }

  deleteFriend(friendId: string, userId: string): Promise<void> {
    return this.db.object(`usersPerAchievements/${userId}/${friendId}`).remove();
  }

}
