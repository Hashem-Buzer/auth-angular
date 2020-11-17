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

  resetPassSwal(title, input, button) {
    return new Promise((resolve, reject) => {
      Swal.fire({
        title: title,
        input: input,
        inputAttributes: {
          autocapitalize: "off",
        },
        showCancelButton: true,
        confirmButtonText: button,
        showLoaderOnConfirm: true,
        preConfirm: (res) => {
          console.log("Email==> ", res);
          resolve(res);

          // .catch((error) => {
          //   Swal.showValidationMessage(`Request failed: ${error}`);
          // });
        },
        allowOutsideClick: () => !Swal.isLoading(),
      });
      // console.log("result===>", result);

      // if (result.isConfirmed) {
      //   Swal.fire({
      //     title: `${result.value.login}'s avatar`,
      //     imageUrl: result.value.avatar_url,
      //   });
      // }
    });
  }
}
