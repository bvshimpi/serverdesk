import { Component, OnInit } from '@angular/core';
import {MainService} from './../../service/main.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: any;
  password: any;

  constructor(private mainServiceObj: MainService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    
  }

  login(LoginFormRef){
    if(LoginFormRef.valid) {
      this.spinner.show();
      var requestBody = {
        "email": this.email,
        "password": this.password
      };

      this.mainServiceObj.postRequest("login", requestBody).subscribe(Response => {
        if(Response.Status == "200") {
          if(typeof Response.Data != "undefined") {
            this.mainServiceObj.setIsLogined(true);
            this.mainServiceObj.setUserDetails(Response.Data);
            this.mainServiceObj.navigateToComponent('/serverdesk/myTickets');
          }
          else {
            this.mainServiceObj.ShowAlert('error', "Failed to login.");
          }
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
