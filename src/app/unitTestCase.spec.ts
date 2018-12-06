import {TestBed, ComponentFixture, inject, async} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MainService} from './service/main.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {UnitTestComponent, User} from "./unit-test/unit-test.component";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      declarations: [
        AppComponent
      ],
      imports: [RouterTestingModule]
    }).compileComponents();
  }));
  it('Check says hello', () => {
    let obj = new AppComponent();
    expect(obj.helloWorld()).toEqual("Hello world!");
  });
});

describe('MainService', () => {
  let service: MainService;
  beforeAll(() => {
    service = new MainService(null, null, null);
  });

  it("Check Network Status", () => {
    expect(service.checkNetworkStatus()).toBeTruthy();
  });

  it("Check User logut by removing local storage", () => {

    service.removeUserDetails();
    expect(service.getToken()).toBeNull();
  });

  it("Check User login by default", () => {
    expect(service.getToken()).toBeNull();
  });

  it("Check User login by setting token value", () => {
    var user = {
      "token": "testToken",
      "name": "testName",
      "email": "testEmail"
    }
    service.setUserDetails(user);
    expect(service.getToken()).toEqual("testToken");
    service.removeUserDetails();
  });

  it("Check Base url define", () => {
    expect(service.BASE_URL).toBeDefined();
  });
});

describe('Component Form Testing: Login', () => {

  let component: UnitTestComponent;
  let fixture: ComponentFixture<UnitTestComponent>;

  beforeEach(() => {

    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [UnitTestComponent]
    });

    // create component and test fixture
    fixture = TestBed.createComponent(UnitTestComponent);

    // get test component from the fixture
    component = fixture.componentInstance;
    component.ngOnInit();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('email field validity', () => {
    let errors = {};
    let email = component.form.controls['email'];
    expect(email.valid).toBeFalsy();

    // Email field is required
    errors = email.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    email.setValue("test");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeTruthy();

    // Set email to something correct
    email.setValue("test@example.com");
    errors = email.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['pattern']).toBeFalsy();
  });

  it('password field validity', () => {
    let errors = {};
    let password = component.form.controls['password'];

    // Email field is required
    errors = password.errors || {};
    expect(errors['required']).toBeTruthy();

    // Set email to something
    password.setValue("123456");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeTruthy();

    // Set email to something correct
    password.setValue("123456789");
    errors = password.errors || {};
    expect(errors['required']).toBeFalsy();
    expect(errors['minlength']).toBeFalsy();
  });

  it('submitting a form emits a user', () => {
    expect(component.form.valid).toBeFalsy();
    component.form.controls['email'].setValue("test@test.com");
    component.form.controls['password'].setValue("123456789");
    expect(component.form.valid).toBeTruthy();

    let user: User;
    // Subscribe to the Observable and store the user in a local variable.
    component.loggedIn.subscribe((value) => user = value);

    // Trigger the login function
    component.login();

    // Now we can check to make sure the emitted value is correct
    expect(user.email).toBe("test@test.com");
    expect(user.password).toBe("123456789");
  });
})
;