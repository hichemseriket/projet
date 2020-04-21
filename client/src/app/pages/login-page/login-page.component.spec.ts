import {HttpClient} from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {HTTP} from "@ionic-native/http/ngx";
import {IonicModule} from "@ionic/angular";

import { LoginPageComponent } from './login-page.component';

describe('LoginPageComponent', () => {
  let component: LoginPageComponent;
  let fixture: ComponentFixture<LoginPageComponent>;
  const formBuilder: FormBuilder = new FormBuilder();

  beforeEach(async(() => {
    // TestBed.configureTestingModule({
    //   imports: [ ReactiveFormsModule, IonicModule],
    //   declarations: [ LoginPageComponent ],
    //   schemas: [CUSTOM_ELEMENTS_SCHEMA],
    //   providers: [
    //     // {provide: FormBuilder, useValue: formBuilder}
    //   ]
    // })
    // .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(LoginPageComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
