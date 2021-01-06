import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutSidenavComponent } from './about-sidenav.component';

describe('AboutSidenavComponent', () => {
  let component: AboutSidenavComponent;
  let fixture: ComponentFixture<AboutSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
