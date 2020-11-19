import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexTenentComponent } from './flex-tenent.component';

describe('FlexTenentComponent', () => {
  let component: FlexTenentComponent;
  let fixture: ComponentFixture<FlexTenentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexTenentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexTenentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
