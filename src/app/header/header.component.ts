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
    if(this.mainServiceObj.getToken()) {
      this.isLogined = true;
    }
  }

  ngOnInit() {
  }

  logout() {
    
  }
}
