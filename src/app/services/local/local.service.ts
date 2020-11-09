import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
import { CookieService } from "ngx-cookie-service";

@Injectable({
  providedIn: "root",
})
export class LocalService {
  constructor(private cookie: CookieService) {}

  userNameValidator(username) {
    var illegalChars = /^[a-zA-Z0-9\-\_\.]+$/; // allow letters, numbers, and underscores

    if (username.length < 5 || username.length > 15) {
      return "Username must have 5-15 characters";
    } else if (!illegalChars.test(username)) {
      return 'Please enter valid Username. Must contain (" - " or " _ " or " . ")';
    } else {
      return true;
    }
  }

  passwordValidator(pass) {
    var passw = /^[A-Za-z]\w{5,14}$/;
    if (pass.match(passw)) {
      return true;
    } else {
      return "Password should be between (6 and 14) and contains (at least one numeric digit, one uppercase and one lowercase letter)";
    }
  }

  emailValidator(email) {
    var emailValidator = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (!emailValidator.test(email)) {
      return "Invalid email address!!";
    }
    return true;
  }

  swal(icon, title, text, timer, scb) {
    return Swal.fire({
      icon: icon,
      title: title,
      text: text,
      timer: timer,
      showConfirmButton: scb,
    });
  }

  setToken(token) {
    return this.cookie.set("Token", token);
  }

  getToken() {
    return this.cookie.get("Token");
  }

  destroyToken() {
    return this.cookie.delete("Token");
  }
}
