import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private db: AngularFireDatabase) { }
  save(user: firebase.User) {
    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    });
  }
  isAdmin(uid: string) {
    return this.db.object('/roles/' + uid).snapshotChanges().pipe(map(
      data => {
        console.log(data.payload.val());
        if (data.key) {
          if (data.payload.val()) {
            return true;
          }
          return false;
        }
        return false;
      }
    ));
  }
}
