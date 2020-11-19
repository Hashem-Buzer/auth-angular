import { Injectable } from "@angular/core";
import Swal from "sweetalert2";
import { CookieService } from "ngx-cookie-service";
import $ from "jquery";

@Injectable({
  providedIn: "root",
})
export class LocalService {
  constructor(private cookie: CookieService) {}

  userNameValidator(username) {
    var illegalChars = /^(?=[a-zA-Z0-9._\-]{5,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/g; // allow letters, numbers, and underscores

    if (username.length < 5 || username.length > 15) {
      return "Username must have 5-15 characters";
    } else if (!illegalChars.test(username)) {
      return 'Please enter valid Username. Must contain (" - " or " _ " or " . ")';
    } else {
      return true;
    }
  }

  passwordValidator(pass) {
    var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
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

  resetPassSwal(title, input, button) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: title,
        input: input,
        inputAttributes: {
          autocapitalize: "off",
          required: "true",
        },
        confirmButtonText: button,
        showCancelButton: true,
        showLoaderOnConfirm: true,
        preConfirm: (res) => {
          // console.log("Res==> ", res);
          resolve(res);
        },
        allowOutsideClick: () => false,
      });
    });
  }

  changePasswordSwal(title, button) {
    return new Promise((resolve) => {
      Swal.fire({
        title: title,
        html:
          '<input type="password" id="swal-input1" class="swal2-input" placeholder="New Password">' +
          '<input type="password" id="swal-input2" class="swal2-input" placeholder="Confirm New Password">',
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonText: button,
        allowOutsideClick: () => false,
        preConfirm: () => {
          const passwords = {
            pass1: $("#swal-input1").val(),
            pass2: $("#swal-input2").val(),
          };

          let validation = this.passwordValidator(passwords.pass1);
          if (validation !== true) {
            Swal.showValidationMessage(`${validation}`);
          }
          if (passwords.pass1 !== passwords.pass2) {
            Swal.showValidationMessage("Passwords should be the same!!");
          }

          resolve(passwords.pass1);
        },
      });
    });
  }
}
