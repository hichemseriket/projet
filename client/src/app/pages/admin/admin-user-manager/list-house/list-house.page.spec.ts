import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHousePage } from './list-house.page';

describe('ListHousePage', () => {
  let component: ListHousePage;
  let fixture: ComponentFixture<ListHousePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHousePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHousePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
