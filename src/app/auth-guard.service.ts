import { Injectable } from '@angular/core';
import { CanActivate, RouterModule, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import {map} from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }
  canActivate(router,state:RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(map(user => {
      if (user) { return true; }
      this.router.navigate(['/login'],{queryParams:{returnUrl:state.url}});
      return false;
    }));
  }
}
