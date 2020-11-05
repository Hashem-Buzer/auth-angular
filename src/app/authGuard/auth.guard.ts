import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from '../services/http/http.service';
import { LocalService } from '../services/local/local.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private http: HttpService, private local: LocalService) {}

  header = new Headers({ Authorization: `Bearer ${this.local.getToken}` });

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    console.log('weeeo===> ', this.http.Logged());

    return true;
  }
}
