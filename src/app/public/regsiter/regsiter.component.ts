import { Component, OnInit } from '@angular/core';
import {MainService} from './../../service/main.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-regsiter',
  templateUrl: './regsiter.component.html',
  styleUrls: ['./regsiter.component.scss']
})
export class RegsiterComponent implements OnInit {

  email: any;
  password: any;
  name: any;
  cfpassword: any;
  terms: boolean = false;
  PasswordMatchStatus: boolean = true;
  constructor(private mainServiceObj: MainService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
  }

  matchPassword(ConfirmPasswordValue) {
   
    if (this.password != undefined) {
      if (this.password == ConfirmPasswordValue) {
        this.PasswordMatchStatus = true;
      }
      else if (ConfirmPasswordValue == "") {
        this.PasswordMatchStatus = true;
      }
      else {
        this.PasswordMatchStatus = false;
      }
    }
    else {
      if (ConfirmPasswordValue == "") {
        this.PasswordMatchStatus = true;
      }
      else {
        this.PasswordMatchStatus = false;
      }
    }
    console.log("test",this.PasswordMatchStatus);
  }

  register(RegisterFormRef) {
    if(RegisterFormRef.valid) {
      this.spinner.show();
      var requestBody = {
        "name": this.name,
        "email": this.email,
        "password": this.password,
        "cpassword": this.cfpassword
      };

      this.mainServiceObj.postRequest("signup", requestBody).subscribe(Response => {
        if(Response.Status == "200") {
            this.mainServiceObj.ShowAlert('success', Response.Message);
            this.mainServiceObj.navigateToComponent('/serverdesk/login');
        }
        else {
          this.mainServiceObj.ShowAlert('error', Response.Message);
        }
        this.spinner.hide();
      }, error => {
        this.mainServiceObj.HandleErrorMessages(error);
        this.spinner.hide();
      });
    }
  }
}
