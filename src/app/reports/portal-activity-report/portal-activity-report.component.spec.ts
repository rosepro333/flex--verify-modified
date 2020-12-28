import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PortalActivityReportComponent } from './portal-activity-report.component';

describe('PortalActivityReportComponent', () => {
  let component: PortalActivityReportComponent;
  let fixture: ComponentFixture<PortalActivityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PortalActivityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortalActivityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
