import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparisionOutputGridComponent } from './comparision-output-grid.component';

describe('ComparisionOutputGridComponent', () => {
  let component: ComparisionOutputGridComponent;
  let fixture: ComponentFixture<ComparisionOutputGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparisionOutputGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparisionOutputGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
