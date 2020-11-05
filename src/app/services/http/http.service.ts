import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { LocalService } from "../local/local.service";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class HttpService {
  base_url;

  constructor(private http: HttpClient, private local: LocalService) {
    this.base_url = environment.ApiKey;
  }

  SignUp(user) {
    return this.http.post(`${this.base_url}signup`, user);
  }

  Login(user) {
    return this.http.post(`${this.base_url}login`, user);
  }

  isLogged() {
    let token = this.local.getToken();

    if (token) {
      return this.http.get(`${this.base_url}user/logged`, {
        headers: { authorization: "Bearer " + token },
      });
    } else {
      return false;
    }
  }

  Logout() {
    return this.local.destroyToken();
  }
}
