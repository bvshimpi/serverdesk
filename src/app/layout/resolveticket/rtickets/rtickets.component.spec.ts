import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RticketsComponent } from './rtickets.component';

describe('RticketsComponent', () => {
  let component: RticketsComponent;
  let fixture: ComponentFixture<RticketsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RticketsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RticketsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
