import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadModileComponent } from './upload-modile.component';
import {Camera} from '@ionic-native/camera/ngx';
import {File} from '@ionic-native/file/ngx';
import {HttpClient} from '@angular/common/http';
import {HTTP} from '@ionic-native/http/ngx';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import {Storage} from '@ionic/storage';
import {FilePath} from '@ionic-native/file-path/ngx';

describe('UploadModileComponent', () => {
  let component: UploadModileComponent;
  let fixture: ComponentFixture<UploadModileComponent>;
  const storageIonicMock: any = {
    get: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr'))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadModileComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: Camera},
        {provide: File},
        {provide: HttpClient},
        {provide: HTTP},
        {provide: WebView},
        {provide: FilePath},
        {provide: Storage, useValue: storageIonicMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadModileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
