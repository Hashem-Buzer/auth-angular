import { Component, OnInit } from "@angular/core";
import { HttpService } from "../services/http/http.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  constructor(private http: HttpService, private router: Router) {}

  ngOnInit(): void {}

  logout() {
    this.http.Logout();
    this.router.navigate(["/login"]);
  }
}
