import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFlexTenentComponent } from './create-flex-tenent.component';

describe('CreateFlexTenentComponent', () => {
  let component: CreateFlexTenentComponent;
  let fixture: ComponentFixture<CreateFlexTenentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFlexTenentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFlexTenentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
