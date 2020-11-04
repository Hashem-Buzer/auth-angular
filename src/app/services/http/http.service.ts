import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  base_url = 'http://localhost:4000/user/';

  constructor(private http: HttpClient) {}

  SignUp(user) {
    return this.http.post(`${this.base_url}signup`, user);
  }

  Login(user) {
    return this.http.post(`${this.base_url}login`, user);
  }
}
