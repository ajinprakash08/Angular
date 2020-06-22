import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user$: Observable<firebase.User>;
  constructor(private auth: AuthService) {
    this.user$ = auth.user$;
  }
  login() {
    this.auth.login();
  }
}
