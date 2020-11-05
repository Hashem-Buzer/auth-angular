import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalService } from '../local/local.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  base_url = 'http://localhost:4000/user/';

  constructor(private http: HttpClient, private local: LocalService) {}

  SignUp(user) {
    return this.http.post(`${this.base_url}signup`, user);
  }

  Login(user) {
    return this.http.post(`${this.base_url}login`, user);
  }

  Logged() {
    return this.http.get(`${this.base_url}user/logged`, {
      headers: { authorization: 'Bearer ' + this.local.getToken() },
    });
  }
}
