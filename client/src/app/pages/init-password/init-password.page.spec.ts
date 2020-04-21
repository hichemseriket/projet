import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitPasswordPage } from './init-password.page';

describe('InitPasswordPage', () => {
  let component: InitPasswordPage;
  let fixture: ComponentFixture<InitPasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitPasswordPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
