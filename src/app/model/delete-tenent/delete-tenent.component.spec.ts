import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteTenentComponent } from './delete-tenent.component';

describe('DeleteTenentComponent', () => {
  let component: DeleteTenentComponent;
  let fixture: ComponentFixture<DeleteTenentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteTenentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteTenentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
