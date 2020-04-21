import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailHouseComponent } from './detail-house.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {HTTP} from '@ionic-native/http/ngx';
import {Storage} from '@ionic/storage';
import {Router, UrlSerializer} from '@angular/router';
import {Location} from '@angular/common';

describe('DetailHouseComponent', () => {
  let component: DetailHouseComponent;
  let fixture: ComponentFixture<DetailHouseComponent>;
  const storageIonicMock: any = {
    get: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr'))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ DetailHouseComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: HttpClient},
        {provide: HTTP},
        {provide: Router},
        {provide: Location},
        {provide: UrlSerializer},
        {provide: Storage, useValue: storageIonicMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailHouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
