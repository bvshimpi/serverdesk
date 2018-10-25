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
    this.mainServiceObj.showToastr("success", "Bhavesh Shimpi");
  }

  test(){
    this.mainServiceObj.showToastr("success", "Bhavesh Shimpi");
  } 
}
