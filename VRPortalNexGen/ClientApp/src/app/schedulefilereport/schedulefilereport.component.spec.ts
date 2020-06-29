import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulefilereportComponent } from './schedulefilereport.component';

describe('SchedulefilereportComponent', () => {
  let component: SchedulefilereportComponent;
  let fixture: ComponentFixture<SchedulefilereportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulefilereportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulefilereportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
