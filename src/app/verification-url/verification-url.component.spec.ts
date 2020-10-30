import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationUrlComponent } from './verification-url.component';

describe('VerificationUrlComponent', () => {
  let component: VerificationUrlComponent;
  let fixture: ComponentFixture<VerificationUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerificationUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
