import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModaloutputComponent } from './modaloutput.component';

describe('ModaloutputComponent', () => {
  let component: ModaloutputComponent;
  let fixture: ComponentFixture<ModaloutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModaloutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModaloutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
