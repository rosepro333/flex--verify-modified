import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockTenentComponent } from './block-tenent.component';

describe('BlockTenentComponent', () => {
  let component: BlockTenentComponent;
  let fixture: ComponentFixture<BlockTenentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockTenentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockTenentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
