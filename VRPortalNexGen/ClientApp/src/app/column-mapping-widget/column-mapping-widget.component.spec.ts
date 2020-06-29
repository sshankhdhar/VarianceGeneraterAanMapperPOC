import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { ColumnMappingWidgetComponent } from "./column-mapping-widget.component";

describe("ColumnMappingWidgetComponent", () => {
  let component: ColumnMappingWidgetComponent;
  let fixture: ComponentFixture<ColumnMappingWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColumnMappingWidgetComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColumnMappingWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
