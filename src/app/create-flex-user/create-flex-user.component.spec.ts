import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFlexUserComponent } from './create-flex-user.component';

describe('CreateFlexUserComponent', () => {
  let component: CreateFlexUserComponent;
  let fixture: ComponentFixture<CreateFlexUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFlexUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFlexUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
