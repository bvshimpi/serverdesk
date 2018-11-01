import { Component, OnInit } from '@angular/core';
import {MainService} from './../service/main.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  isLogined : boolean = false;
  constructor(private mainServiceObj: MainService) { 
    this.isUserLogined();
  }

  ngOnInit() {
    this.mainServiceObj.methodForIsLogined.subscribe(value => {
      if(value)
        this.isLogined = true;
      else
        this.isLogined = false;
    });
  }

  isUserLogined() {
    this.mainServiceObj.postRequest("islogined").subscribe(Response => {
      if(Response.Status == "200") {
        this.mainServiceObj.setIsLogined(true);
      }
      else {
        this.mainServiceObj.setIsLogined(false);
      }
    }, error => {
      this.mainServiceObj.HandleErrorMessages(error);
    });
  }

  logout() {
    this.mainServiceObj.removeUserDetails();
    this.mainServiceObj.setIsLogined(false);
    this.mainServiceObj.navigateToComponent("/serverdesk/login");
  }
}
