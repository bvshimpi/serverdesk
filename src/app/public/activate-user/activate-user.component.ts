import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import {MainService} from './../../service/main.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-activate-user',
  templateUrl: './activate-user.component.html',
  styleUrls: ['./activate-user.component.scss']
})
export class ActivateUserComponent implements OnInit {

  token:any = "";

  constructor(private spinner:NgxSpinnerService, private mainServiceObj: MainService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.spinner.show();
    this.route.params.subscribe(params => {
      this.token = params["token"];
    });
    this.activateAccount();
  }

  activateAccount() {
    if(this.token) {
      this.mainServiceObj.Token = this.token;
      this.mainServiceObj.postRequest("activateAccount").subscribe(Response => {
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
    else {
      this.mainServiceObj.ShowAlert("error", "Failed to activate user account");
      this.spinner.hide();
    }
  }

  resendEmail() {
    
  }
}
