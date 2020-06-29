import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SqlcredentialsComponent } from './sqlcredentials.component';

describe('SqlcredentialsComponent', () => {
  let component: SqlcredentialsComponent;
  let fixture: ComponentFixture<SqlcredentialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SqlcredentialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SqlcredentialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
