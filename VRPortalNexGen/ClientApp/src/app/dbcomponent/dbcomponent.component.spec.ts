import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { DbcomponentComponent } from "./dbcomponent.component";

describe("DbcomponentComponent", () => {
  let component: DbcomponentComponent;
  let fixture: ComponentFixture<DbcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DbcomponentComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DbcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
