import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupManagerPage } from './group-manager.page';

describe('GroupManagerPage', () => {
  let component: GroupManagerPage;
  let fixture: ComponentFixture<GroupManagerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroupManagerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupManagerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
