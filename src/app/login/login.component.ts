import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { HttpService } from '../services/http/http.service';
import { LocalService } from '../services/local/local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  user: FormGroup;

  constructor(
    private router: Router,
    private http: HttpService,
    private local: LocalService,
    private cookie: CookieService
  ) {}

  ngOnInit(): void {
    this.user = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null),
    });
  }

  onSubmit() {
    this.user.value.username === '' ||
    this.user.value.username === null ||
    this.user.value.password === '' ||
    this.user.value.password === null
      ? this.local.swal(
          'warning',
          'Empty!!',
          'Please fill the inputs!!',
          3000,
          false
        )
      : this.Login();
  }

  Login() {
    this.http.Login(this.user.value).subscribe((data) => {
      if (!data['token']) {
        return this.local.swal('error', 'Oops!!', data['msg'], 3000, false);
      } else {
        this.cookie.set('Token', data['token']);
        this.router.navigate(['']);
      }
    });
  }
}
