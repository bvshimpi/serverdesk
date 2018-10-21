import { Component, OnInit } from '@angular/core';

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
  constructor() { }

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
}
