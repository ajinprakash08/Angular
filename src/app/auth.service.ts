import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  iAdmin$: Observable<boolean> ;
  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute,
              private userService: UserService) {
    this.user$ = afAuth.authState;
    this.user$.subscribe(user => {
     // console.log(user.uid);
     if (user) {
      this.iAdmin$ = userService.isAdmin(user.uid);
     }

    });
  }
  login(){
    const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout(){
    this.afAuth.signOut();
  }
}
