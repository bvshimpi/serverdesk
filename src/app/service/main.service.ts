import { Injectable } from '@angular/core';
import {environment} from './../../environments/environment';
import {ToastrService} from 'ngx-toastr';
import {Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  BASE_URL: any;
  Token: any;
  constructor(private toastr: ToastrService, private http: Http) { 
    this.BASE_URL = environment.base_url;
  }

  ShowAlert(type = 'info', msg = '', title = '') {
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

      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      let options = new RequestOptions({ headers: headers });
      return this.http.post(this.BASE_URL + apiName, body, options).pipe(
          map(this.extractData),
          catchError(this.handleErrorObservable)
      )
    }
    else {
      this.ShowAlert('error', "Please Check your internet connection.");
    }
  }

  private extractData(res: Response) {
    console.log("res", res);
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
      return Observable.throw(new Error(error.status));
    }
    // 500 - internal server error
    else if (error.status === 500) {
      return  Observable.throw(new Error(error.status));
    }
    // 400 - bad request
    else if (error.status === 400) {
      return Observable.throw(new Error(error.status));
    }
    // 404 - not found
    else if (error.status === 404) {
      return Observable.throw(new Error(error.status));
    }
    // 409 - conflict
    else if (error.status === 409) {
      return Observable.throw(new Error(error.status));
    }
    // 408 - request timeout
    else if (error.status === 408) {
      return Observable.throw(new Error(error.status));
    }
    else {
      return Observable.throw(new Error(error.status));
    }

  }

  HandleErrorMessages(err) {
    if (!this.checkNetworkStatus()) {
      this.ShowAlert('error', 'Please check your internet connection!');
    }
    else if (err.message == '401') {
      var message = "You are unauthorized to access the requested resource. Please log in!";
      this.ShowAlert('error', message);
    }
    else if (err.message == '400') {
      var message = "Invalid syntax for this request was provided!";
      this.ShowAlert('error', message);
    }
    else if (err.message == '404') {
      var message = "We could not find the resource you requested!";
      this.ShowAlert('error', message);
    }
    else if (err.message == '409') {
      var message = "The request could not be completed due to a conflict with the current state of the resource!";
      this.ShowAlert('error', message);
    }
    else if (err.message == '408') {
      var message = "Request time out please try again!";
      this.ShowAlert('error', message);
    }
    else {
      var message = "Oops! Something went wrong";
      this.ShowAlert('error', message);
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
