import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSdyKeyComponent } from './create-sdy-key.component';

describe('CreateSdyKeyComponent', () => {
  let component: CreateSdyKeyComponent;
  let fixture: ComponentFixture<CreateSdyKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateSdyKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateSdyKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
