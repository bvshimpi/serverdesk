import { Injectable } from '@angular/core';
import {environment} from './../../environments/environment';
import {ToastrService} from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MainService {
  BASE_URL: any;
  constructor(private toastr: ToastrService) { 
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
      timeOut: 0,
      closeButton: true
    });
  }

  private showErrorToastr(msg, title) {
    this.toastr.error(msg, title, {
      timeOut: 3000,
      closeButton: true
    });
  }

  private showWarningToastr(msg, title) {
    this.toastr.warning(msg, title, {
      timeOut: 3000,
      closeButton: true
    });
  }

  private showInfoToastr(msg, title) {
    this.toastr.info(msg, title, {
      timeOut: 3000,
      closeButton: true
    });
  }

  postRequest(apiname: any, body: any) {
    if(this.checkNetworkStatus()) {

    }
    else {

    }
  }

  checkNetworkStatus() {
    if(navigator.onLine)
      return true;
    else
      return false;
  }
}
