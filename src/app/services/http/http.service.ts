import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalService } from "../local/local.service";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  base_url;
  token;

  constructor(private http: HttpClient, private local: LocalService) {
    this.base_url = environment.ApiKey;
    this.token = this.local.getToken();
  }

  SignUp(user) {
    return this.http.post(`${this.base_url}signup`, user);
  }

  Login(user) {
    return this.http.post(`${this.base_url}login`, user);
  }

  isLogged() {
    if (this.token) {
      return this.http.get(`${this.base_url}user/logged`, {
        headers: { authorization: `Bearer ${this.token}` },
      });
    } else {
      return false;
    }
  }

  Logout() {
    return this.local.destroyToken();
  }

  passCode(email) {
    console.log("HTTP email===> ", email);

    return this.http.post(`${this.base_url}send-passCode`, { email });
  }

  confirmPassCode(email, code) {
    console.log("HTTP code===> ", code);

    return this.http.post(`${this.base_url}confirm-passCode`, { email, code });
  }
}
