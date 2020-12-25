import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MobileActivityReportComponent } from './mobile-activity-report.component';

describe('MobileActivityReportComponent', () => {
  let component: MobileActivityReportComponent;
  let fixture: ComponentFixture<MobileActivityReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileActivityReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileActivityReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
