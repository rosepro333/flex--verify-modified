import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexUserComponent } from './flex-user.component';

describe('FlexUserComponent', () => {
  let component: FlexUserComponent;
  let fixture: ComponentFixture<FlexUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlexUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
