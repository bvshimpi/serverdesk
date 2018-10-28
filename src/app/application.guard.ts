import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import {MainService} from './service/main.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationGuard implements CanActivate {
  constructor(private mainServiceObj: MainService) {

  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    var token = this.mainServiceObj.getToken();
    if(token) {
      return true;
    }
    else {
      this.mainServiceObj.navigateToComponent("/serverdesk/login");
      return false;
    }
  }
}
