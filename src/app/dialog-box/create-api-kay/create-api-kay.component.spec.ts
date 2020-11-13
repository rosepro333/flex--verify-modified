import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateApiKayComponent } from './create-api-kay.component';

describe('CreateApiKayComponent', () => {
  let component: CreateApiKayComponent;
  let fixture: ComponentFixture<CreateApiKayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateApiKayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateApiKayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
