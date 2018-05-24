import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {AchievementInfo} from '../models/achievement-info';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import anything = jasmine.anything;

@Injectable()
export class AchievementsService {

  constructor(private db: AngularFireDatabase) {
  }

  getAchievementsForUser(userId: string): Observable<AchievementInfo[]> {
    // console.log("userId -----> " + userId);
    return this.db.list(`usersPerAchievements/${userId}`)
      .snapshotChanges()
      .map(snapshot =>
        snapshot.map(({key}) => key)
      )
      .switchMap(achievementsKeys => {
        // console.log("achievementsKeys -------> " + achievementsKeys);
        if (achievementsKeys.length === 0) {
          return Observable.of([]);
        }

        const observables = achievementsKeys.map(
          achievementKey =>
            this.db.object(`achievements/${achievementKey}`)
            .snapshotChanges()
            .map(({key, payload}) => ({...payload.val(), id: key}))

        );

        return Observable.combineLatest<AchievementInfo>(observables);
      });
  }

  addAchievement(achievement: AchievementInfo, userId: string){
    const promise = this.db.list('achievements').push(achievement);

    return Observable.of(promise)
      .switchMap(({key}) => {
        this.db.object(`usersPerAchievements/${userId}`)
          .update({[key]: true}).catch(err => console.log(err));

        return this.db.list(`usersPerFriends/${userId}`)
          .snapshotChanges()
          .map(snapshot =>
            snapshot.map(({key}) => key)
          )
          .switchMap(friendsKeys => {
            // console.log("achievementsKeys -------> " + achievementsKeys);
            if (friendsKeys.length === 0) {
              return Observable.of(null);
            }

            friendsKeys.map(
              friendKey =>
                this.db.object(`usersPerAchievements/${friendKey}`)
                  .update({[key]: true}));

            return;
          })
      })
  }

  deleteAchievement(achievementId: string, userId: string): Observable<void> {
    return Observable.of(this.db.object(`usersPerAchievements/${userId}/${achievementId}`).remove())
      .switchMap(() => this.db.object(`achievements/${achievementId}`).remove())
      .switchMap(() => {

        return this.db.list(`usersPerFriends/${userId}`)
          .snapshotChanges()
          .map(snapshot =>
            snapshot.map(({key}) => key)
          )
          .switchMap(friendsKeys => {
            // console.log("achievementsKeys -------> " + achievementsKeys);
            if (friendsKeys.length === 0) {
              return Observable.of(null);
            }

            friendsKeys.map(
              friendKey =>
                this.db.object(`usersPerAchievements/${friendKey}/${achievementId}`)
                  .remove());

            return;
          })
      });
  }

}
