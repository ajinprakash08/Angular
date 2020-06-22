import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { auth } from 'firebase';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router, private userService: UserService) { }
  canActivate(): Observable<boolean> {
   return this.auth.user$.pipe(map(user => {
     console.log(user.uid);
      if (this.userService.isAdmin(user.uid)) { return true; }
      return false;
    }));
  }
}
