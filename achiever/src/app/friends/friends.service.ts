import { Injectable } from '@angular/core';
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {UserProfile} from "../models/user-profile";

@Injectable()
export class FriendsService {

  constructor(private db: AngularFireDatabase) {
  }

  getFriendsForUser(userId: string): Observable<UserProfile[]> {
    console.log("userId -----> " + userId);
    return this.db.list(`users`)
      .snapshotChanges()
      .map(snapshot =>
        snapshot.map(({key}) => key)
      )
      .switchMap(achievementsKeys => {
        console.log("achievementsKeys -------> " + achievementsKeys);
        if (achievementsKeys.length === 0) {
          return Observable.of([]);
        }

        const observables = achievementsKeys.map(
          achievementKey =>
            this.db.object(`achievements/${achievementKey}`)
              .snapshotChanges()
              .map(({key, payload}) => ({...payload.val(), id: key}))

        );

        return Observable.combineLatest<UserProfile>(observables);
      });
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
