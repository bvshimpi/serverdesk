import {TestBed, ComponentFixture, inject, async} from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MainService} from './service/main.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from '@angular/core';
import {UnitTestComponent, User} from './unit-test/unit-test.component';
import {Component, DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";

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

describe('Component: Login', () => {

  let component: UnitTestComponent;
  let fixture: ComponentFixture<UnitTestComponent>;
  let submitEl: DebugElement;
  let loginEl: DebugElement;
  let passwordEl: DebugElement;

  beforeEach(() => {

    // refine the test module by declaring the test component
    TestBed.configureTestingModule({
      declarations: [UnitTestComponent]
    });


    // create component and test fixture
    fixture = TestBed.createComponent(UnitTestComponent);

    // get test component from the fixture
    component = fixture.componentInstance;

    submitEl = fixture.debugElement.query(By.css('button'));
    loginEl = fixture.debugElement.query(By.css('input[type=email]'));
    passwordEl = fixture.debugElement.query(By.css('input[type=password]'));
  });

  it('Setting enabled to false disabled the submit button', () => {
    component.enabled = false;
    fixture.detectChanges();
    expect(submitEl.nativeElement.disabled).toBeTruthy();
  });

  it('Setting enabled to true enables the submit button', () => {
    component.enabled = true;
    fixture.detectChanges();
    expect(submitEl.nativeElement.disabled).toBeFalsy();
  });

  it('Entering email and password emits loggedIn event', () => {
    let user: User;
    loginEl.nativeElement.value = "test@example.com";
    passwordEl.nativeElement.value = "123456";

    // Subscribe to the Observable and store the user in a local variable.
    component.loggedIn.subscribe((value) => user = value);

    // This sync emits the event and the subscribe callback gets executed above
    submitEl.triggerEventHandler('click', null);

    // Now we can check to make sure the emitted value is correct
    expect(user.email).toBe("test@example.com");
    expect(user.password).toBe("123456");
  });
})
;