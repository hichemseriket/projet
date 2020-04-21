import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GcuPage } from './gcu.page';

describe('GcuPage', () => {
  let component: GcuPage;
  let fixture: ComponentFixture<GcuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GcuPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GcuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
