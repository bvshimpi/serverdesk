import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddupdateticketComponent } from './addupdateticket.component';

describe('AddupdateticketComponent', () => {
  let component: AddupdateticketComponent;
  let fixture: ComponentFixture<AddupdateticketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddupdateticketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddupdateticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
