import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveUserPage } from './inactive-user.page';

describe('InactiveUserPage', () => {
  let component: InactiveUserPage;
  let fixture: ComponentFixture<InactiveUserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InactiveUserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InactiveUserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
