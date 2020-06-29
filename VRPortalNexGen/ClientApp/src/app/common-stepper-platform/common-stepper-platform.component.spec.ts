import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonStepperPlatformComponent } from './common-stepper-platform.component';

describe('CommonStepperPlatformComponent', () => {
  let component: CommonStepperPlatformComponent;
  let fixture: ComponentFixture<CommonStepperPlatformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonStepperPlatformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonStepperPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
