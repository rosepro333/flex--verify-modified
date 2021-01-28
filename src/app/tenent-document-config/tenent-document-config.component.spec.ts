import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TenentDocumentConfigComponent } from './tenent-document-config.component';

describe('TenentDocumentConfigComponent', () => {
  let component: TenentDocumentConfigComponent;
  let fixture: ComponentFixture<TenentDocumentConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TenentDocumentConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TenentDocumentConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
