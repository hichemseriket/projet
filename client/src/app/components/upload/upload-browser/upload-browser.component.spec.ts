import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadBrowserComponent } from './upload-browser.component';
import {FileSelectDirective} from 'ng2-file-upload';
import {HttpClient} from '@angular/common/http';
import {HTTP} from '@ionic-native/http/ngx';

describe('UploadBrowserComponent', () => {
  let component: UploadBrowserComponent;
  let fixture: ComponentFixture<UploadBrowserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadBrowserComponent, FileSelectDirective ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: HttpClient},
        {provide: HTTP}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    expect(component).toBeTruthy();
  });
});
