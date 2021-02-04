import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebHookComponent } from './web-hook.component';

describe('WebHookComponent', () => {
  let component: WebHookComponent;
  let fixture: ComponentFixture<WebHookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebHookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebHookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
