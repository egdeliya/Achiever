import { Injectable } from '@angular/core';
import {AngularFireDatabase} from 'angularfire2/database';
import {Observable} from 'rxjs/Observable';
import {AchievementInfo} from '../models/achievement-info';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

@Injectable()
export class AchievementsService {

  threshold: number = 3;
  levelsMap: Map<number, number> = new Map<number, number>([[0, 0], [1, 1], [5, 2], [15, 3], [40, 4],
        [80, 5], [250, 6], [500, 7], [1000, 8], [2500, 9], [5000, 10]]);

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

  getUsersAchievements(userId: string): Observable<AchievementInfo[]> {
    console.log("userId -----> " + userId);
    return this.db.list(`usersPerAchievements/${userId}`)
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
              .map(({key, payload}) => {
                return ({...payload.val(), id: key})
              })
              .filter(achievement => {
                console.log("----------ach  " + achievement.authorId);
                console.log(achievement.authorId === userId);
                return achievement.authorId === userId;
              })

        );

        return Observable.combineLatest<AchievementInfo>(observables);
      });
  }

  addAchievement(achievement: AchievementInfo, userId: string): Observable<any> {
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
              return Observable.of([]);
            }

            return Observable.of(friendsKeys.map(
              friendKey =>
                this.db.object(`usersPerAchievements/${friendKey}`)
                  .update({[key]: true})));

            // return;
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

  likeAchievement(achievement: AchievementInfo, userId: string) {
    return Observable.of(this.db.database.ref(`achievements/${achievement.id}/likesNumber`)
      .transaction(currentValue => {
        let newValue;
        if (currentValue === null) {
          newValue = 1;
        } else {
          newValue = currentValue + 1;
        }

        if (newValue == this.threshold) {
          this.db.database.ref(`users/${achievement.authorId}/numberApprovedPosts`)
            .transaction(currentValue => {

              let newValue;
              if (currentValue === null) {
                newValue = 1;
              } else {
                newValue = currentValue + 1;
              }

              if (this.levelsMap.has(newValue)) {
                this.db.database.ref(`users/${achievement.authorId}/level`)
                  .transaction(currentValue => this.levelsMap.get(newValue))
                  .catch(err => console.log(err));
              }

              return newValue;
            })
            .catch(err => console.log(err));
        }

        return newValue;
      })).switchMap(() => {
      return this.db.object(`achievementsUserLiked/${userId}`)
        .update({[achievement.id]: true});
    });
  }

  hasUserLikedAchievement(achievementId: string, userId: string): boolean {
    let res = true;
    this.db.database.ref(`achievementsUserLiked/${userId}/${achievementId}`)
      .transaction(currentValue => {
        if (currentValue !== null){
          res = true;
        } else {
          res = false;
        }
        return currentValue;
    }).catch(err => console.log(err));

    return res;
  }

}
