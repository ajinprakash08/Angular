import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'e-commerce';
  constructor(private auth: AuthService, private router: Router, private userService: UserService) {
    auth.user$.subscribe(user => {
      if (!user) { return; }
      userService.save(user);
      // tslint:disable-next-line:prefer-const
      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) { return; }
      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);

    });
  }
}
