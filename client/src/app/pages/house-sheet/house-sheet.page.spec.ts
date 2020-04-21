import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseSheetPage } from './house-sheet.page';

describe('HouseSheetPage', () => {
  let component: HouseSheetPage;
  let fixture: ComponentFixture<HouseSheetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HouseSheetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HouseSheetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
