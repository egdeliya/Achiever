import { Injectable } from '@angular/core';
import {AngularFireAction, AngularFireDatabase, DatabaseSnapshot} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {UserProfile} from "../models/user-profile";

@Injectable()
export class FriendsService {

  constructor(private db: AngularFireDatabase) {
  }

  addFriend(friendId: string, userId: string): Observable<void>{

    return Observable.of(this.db.object(`usersPerFriends/${userId}/`)
      .update({[friendId]: true}))
      .switchMap(() => {
        return this.db.object(`friendRequests/${friendId}`).update({[userId]: true});
      });
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
