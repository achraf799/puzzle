import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Puzzle1Component } from './puzzle1.component';

describe('Puzzle1Component', () => {
  let component: Puzzle1Component;
  let fixture: ComponentFixture<Puzzle1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Puzzle1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Puzzle1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
