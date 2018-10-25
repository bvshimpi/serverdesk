import { Injectable } from '@angular/core';
import {environment} from './../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError  } from "rxjs";
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  BASE_URL: any;
  Token: any;
  constructor(private toastr: ToastrService, private http: HttpClient) { 
    this.BASE_URL = environment.base_url;
  }

  showToastr(type = 'info', msg = '', title = '') {
    switch(type) {
      case 'success': 
        this.showSuccessToastr(msg, title);
        break;
      case 'error': 
        this.showErrorToastr(msg, title);
        break;
      case 'warning': 
          this.showWarningToastr(msg, title);
          break;
      default: 
          this.showInfoToastr(msg, title);
          break;
    }
  }

  private showSuccessToastr(msg, title) {
    this.toastr.success(msg, title, {
      timeOut: 20000,
      closeButton: true,
      messageClass: "toast-message"
    });
  }

  private showErrorToastr(msg, title) {
    this.toastr.error(msg, title, {
      timeOut: 4000,
      closeButton: true,
      messageClass: "toast-message"
    });
  }

  private showWarningToastr(msg, title) {
    this.toastr.warning(msg, title, {
      timeOut: 4000,
      closeButton: true,
      messageClass: "toast-message"
    });
  }

  private showInfoToastr(msg, title) {
    this.toastr.info(msg, title, {
      timeOut: 4000,
      closeButton: true,
      messageClass: "toast-message"
    });
  }

  postRequest(apiName: any, body: any = null, content_type = "application/json") : Observable<any> {
    if(this.checkNetworkStatus()) {
      var token = this.getToken();
      var headersData = {
        "token": token,
        "Content-Type": content_type
      };
      
      var headerOptions = {
        headers: new HttpHeaders(headersData)
      };

      return this.http.post(this.BASE_URL + apiName, body, headerOptions).pipe(
        map(this.extractData),
        catchError(this.handleErrorObservable)
      );
    }
    else {
      this.showToastr('error', "Please Check your internet connection.");
    }
  }

  private extractData(res: Response) {
    if (res.status === 200) {
      let body = res.json();
      return body;
    }
    else {
      return {};
    }
  }

  private handleErrorObservable(error: any) {
    // 401 - unAuthorized
    if (error.status === 401) {
      return throwError(new Error(error.status));
    }
    // 500 - internal server error
    else if (error.status === 500) {
      return throwError(new Error(error.status));
    }
    // 400 - bad request
    else if (error.status === 400) {
      return throwError(new Error(error.status));
    }
    // 404 - not found
    else if (error.status === 404) {
      return throwError(new Error(error.status));
    }
    // 409 - conflict
    else if (error.status === 409) {
      return throwError(new Error(error.status));
    }
    // 408 - request timeout
    else if (error.status === 408) {
      return throwError(new Error(error.status));
    }
    else {
      return throwError(new Error(error.status));
    }

  }

  checkNetworkStatus() {
    if(navigator.onLine)
      return true;
    else
      return false;
  }

  setToken(token = "") {
    localStorage.setItem("token", token);
    this.Token = token;
  }

  getToken() {
    return localStorage.getItem("token");
  }

  removeToken() {
    localStorage.removeItem("token");
  }
}
