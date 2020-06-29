import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatafilterswidgetComponent } from './datafilterswidget.component';

describe('DatafilterswidgetComponent', () => {
  let component: DatafilterswidgetComponent;
  let fixture: ComponentFixture<DatafilterswidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatafilterswidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatafilterswidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
