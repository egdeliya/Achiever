import { Injectable } from '@angular/core';
import {AngularFireAction, AngularFireDatabase, DatabaseSnapshot} from "angularfire2/database";
import {Observable} from "rxjs/Observable";
import {UserProfile} from "../models/user-profile";

@Injectable()
export class FriendsService {

  constructor(private db: AngularFireDatabase) {
  }

  addFriend(friendId: string, userId: string): Observable<any> {
    return Observable.of(this.db.object(`friendRequests/${friendId}`)
      .update({[userId]: true}));
  }

  acceptRequest(friendId: string, userId: string): Observable<void> {
    return Observable.of(this.db.object(`usersPerFriends/${userId}/`)
      .update({[friendId]: true}))
      .switchMap(() => {
        return this.db.object(`usersPerFriends/${friendId}/`)
          .update({[userId]: true})
            .then(() => this.db.object(`friendRequests/${userId}/${friendId}`)
          .remove())
    });
  }

  rejectRequest(friendId: string, userId: string): Observable<any> {
    return Observable.of(this.db.object(`friendRequests/${userId}/${friendId}`).remove());
  }

  getFriendsForUser(userId: string): Observable<UserProfile[]>  {

    return this.db.list(`usersPerFriends/${userId}`)
      .snapshotChanges()
      .map(snapshot =>
        snapshot.map(({key}) => key)
      )
      .switchMap(friendsKeys => {
        // console.log("achievementsKeys -------> " + achievementsKeys);
        if (friendsKeys.length === 0) {
          return Observable.of([]);
        }

        const observables = friendsKeys
          .filter(friendKey => friendKey !== userId)
          .map(friendKey =>
            this.db.object(`users/${friendKey}`)
              .snapshotChanges()
              .map(({key, payload}) => ({...payload.val(), id: key}))
        );

        return Observable.combineLatest<UserProfile>(observables);
      });
  }

  getRequestsForUser(userId: string): Observable<UserProfile[]> {
    return this.db.list(`friendRequests/${userId}`)
      .snapshotChanges()
      .map(snapshot =>
        snapshot.map(({key}) => key)
      )
      .switchMap(friendsKeys => {
        // console.log("achievementsKeys -------> " + achievementsKeys);
        if (friendsKeys.length === 0) {
          return Observable.of([]);
        }

        const observables = friendsKeys
          .filter(friendKey => friendKey !== userId)
          .map(friendKey =>
            this.db.object(`users/${friendKey}`)
              .snapshotChanges()
              .map(({key, payload}) => ({...payload.val(), id: key}))
          );

        return Observable.combineLatest<UserProfile>(observables);
      });
  }

  deleteFriend(friendId: string, userId: string): Observable<void> {
    return Observable.of(this.db.object(`usersPerFriends/${userId}/${friendId}`).remove())
      .switchMap(() => {
        return this.db.object(`friendRequests/${friendId}/${userId}`).remove()
      });
  }

}
