import {CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import {TranslateService} from '@ngx-translate/core';
import {Storage} from '@ionic/storage';
import {HttpClient} from '@angular/common/http';
import {HTTP} from '@ionic-native/http/ngx';

describe('AppComponent', () => {

  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;

  beforeEach(async(() => {
    statusBarSpy = jest.fn();
    splashScreenSpy = jest.fn();
    platformReadySpy = Promise.resolve();
    platformSpy = jest.fn();
    const storageIonicMock: any = {
      get: () => new Promise<any>((resolve, reject) => resolve('As2342fAfgsdr'))
    };

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: TranslateService},
        { provide: Storage, useValue: storageIonicMock},
        { provide: HttpClient},
        { provide: HTTP}
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    expect(AppComponent).toBeTruthy();
  });

  // it('should initialize the app', async () => {
  //   TestBed.createComponent(AppComponent);
  //   expect(platformSpy.ready).toHaveBeenCalled();
  //   await platformReadySpy;
  //   expect(statusBarSpy.styleDefault).toHaveBeenCalled();
  //   expect(splashScreenSpy.hide).toHaveBeenCalled();
  // });

  // TODO: add more tests!

  it('admin state must be false in initialize', () => {
    expect(this.adminState).toBeFalsy();
  });

});
