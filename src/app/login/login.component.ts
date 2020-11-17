import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { HttpService } from "../services/http/http.service";
import { LocalService } from "../services/local/local.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  user: FormGroup;

  constructor(
    private router: Router,
    private http: HttpService,
    private local: LocalService
  ) {}

  ngOnInit(): void {
    this.user = new FormGroup({
      username: new FormControl(null),
      password: new FormControl(null),
    });
  }

  onSubmit() {
    this.user.value.username === "" ||
    this.user.value.username === null ||
    this.user.value.password === "" ||
    this.user.value.password === null
      ? this.local.swal(
          "warning",
          "Empty!!",
          "Please fill the inputs!!",
          3000,
          false
        )
      : this.Login();
  }

  Login() {
    this.http.Login(this.user.value).subscribe((data) => {
      if (!data["token"]) {
        return this.local.swal("error", "Oops!!", data["msg"], 3000, false);
      } else {
        this.local.setToken(data["token"]);
        this.router.navigate([""]);
      }
    });
  }

  async sendPassCode() {
    const email = await this.local.resetPassSwal(
      "Please Enter Your Email",
      "email",
      "Send Code"
    );
    console.log("EMAIL===> ", email);

    await this.http.passCode(email).subscribe((data) => {
      console.log("Data passcode===> ", data);
      // data["status"]
      //   ? this.local.swal("success", data["msg"], null, 3000, false)
      //   : this.local.swal("error", data["msg"], null, 3000, false);
    });
    // console.log("Email check as var====> ", email);

    if (email) {
      const code = await this.local.resetPassSwal(
        "Please Enter The Code",
        "text",
        "Check Code"
      );
      console.log("CODE===> ", code);

      await this.http.confirmPassCode(email, code).subscribe((data) => {
        console.log("Data passcode===> ", data);
        // data["status"]
        //   ? this.local.swal("success", data["msg"], null, 3000, false)
        //   : this.local.swal("error", data["msg"], null, 3000, false);
      });
    }
  }
}
