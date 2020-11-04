import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http/http.service';
import { LocalService } from '../services/local/local.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
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
      confirmPassword: new FormControl(null),
    });
  }

  onSubmit() {
    if (
      this.user.value.username === '' ||
      this.user.value.username === null ||
      this.user.value.password === '' ||
      this.user.value.password === null ||
      this.user.value.confirmPassword === '' ||
      this.user.value.confirmPassword === null
    ) {
      return this.local.swal(
        'warning',
        'Empty!!',
        'Please fill the inputs!!',
        3000,
        false
      );
    } else if (this.user.value.password !== this.user.value.confirmPassword) {
      this.local.swal(
        'warning',
        'Not Match!!',
        'Password and Confirm Password should be the same.',
        3000,
        false
      );
    } else {
      var pass = this.local.passwordValidator(this.user.value.password);
      var uName = this.local.userNameValidator(this.user.value.username);
      if (uName === true) {
        if (pass === true) {
          return this.SignUp();
        } else {
          return this.local.swal('warning', 'Not Match!!', pass, 3000, false);
        }
      } else {
        return this.local.swal('warning', 'Not Match!!', uName, 3000, false);
      }
    }
  }

  SignUp() {
    this.http.SignUp(this.user.value).subscribe((data) => {
      if (!data['token']) {
        return this.local.swal('error', 'Oops!!', data['msg'], 3000, false);
      } else {
        this.cookie.set('Token', data['token']);
        this.router.navigate(['']);
      }
    });
  }
}
