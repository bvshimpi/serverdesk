import {Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';


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
  form: FormGroup;

  constructor(private fb:FormBuilder) { 
  }

  ngOnInit() {
    this.form = this.fb.group({
      email:['', [
        Validators.required,
        Validators.pattern("[^ @]*@[^ @]*")
      ]],
      password:['', [
        Validators.required,
        Validators.minLength(8)
      ]]
    })
  }

  login() {
    if(this.form.valid) {
      console.log("Emitting");
      this.loggedIn.emit(new User(this.form.value.email, this.form.value.password));
    }
  }
}
