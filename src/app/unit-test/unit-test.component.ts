import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
export class User {
  constructor(public email: string, public password: string) {
  }
}

@Component({
  selector: 'app-unit-test',
  templateUrl: './unit-test.component.html',
  styleUrls: ['./unit-test.component.scss']
})
export class UnitTestComponent implements OnInit {

  @Input() enabled = true;
  @Output() loggedIn = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  login(email, password) {
    if(email && password) {
      console.log("Emitting");
      this.loggedIn.emit(new User(email, password));
    }
  }
}
