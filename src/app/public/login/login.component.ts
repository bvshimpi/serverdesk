import { Component, OnInit } from '@angular/core';
import {MainService} from './../../service/main.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: any;
  password: any;

  constructor(private mainServiceObj: MainService) { }

  ngOnInit() {
    
  }

  test(){
    this.mainServiceObj.postRequest("login", null).subscribe(Response => {
      console.log("Response",Response);
      if(Response.Status == "200") {
        this.mainServiceObj.ShowAlert('success', Response.Message);
      }
      else {
        console.log(Response.Message);
        this.mainServiceObj.ShowAlert('error', Response.Message);
      }
    }, error => {
      this.mainServiceObj.HandleErrorMessages(error);
    });
  } 
}
