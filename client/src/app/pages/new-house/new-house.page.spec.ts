import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewHousePage } from './new-house.page';
import {FormBuilder, ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HTTP} from '@ionic-native/http/ngx';

import {Router} from '@angular/router';
import {IonicModule} from '@ionic/angular';

describe('NewHousePage', () => {
  let component: NewHousePage;
  let fixture: ComponentFixture<NewHousePage>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, IonicModule ],
      declarations: [ NewHousePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: HttpClient},
        {provide: HTTP},
        {provide: Router},
        {provide: FormBuilder, useValue: formBuilder}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewHousePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
