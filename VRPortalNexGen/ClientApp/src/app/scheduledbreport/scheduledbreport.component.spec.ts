import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledbreportComponent } from './scheduledbreport.component';

describe('ScheduledbreportComponent', () => {
  let component: ScheduledbreportComponent;
  let fixture: ComponentFixture<ScheduledbreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduledbreportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledbreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
