import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisonOutputWidgetComponent } from './comparison-output-widget.component';

describe('ComparisonOutputWidgetComponent', () => {
  let component: ComparisonOutputWidgetComponent;
  let fixture: ComponentFixture<ComparisonOutputWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparisonOutputWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisonOutputWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
