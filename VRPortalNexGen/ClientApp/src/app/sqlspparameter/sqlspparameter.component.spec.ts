import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlspparameterComponent } from './sqlspparameter.component';

describe('SqlspparameterComponent', () => {
  let component: SqlspparameterComponent;
  let fixture: ComponentFixture<SqlspparameterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SqlspparameterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SqlspparameterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
