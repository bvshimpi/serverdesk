import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MainService} from './service/main.service';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA  } from '@angular/core';
import{ LoginComponent } from './public/login/login.component';

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
