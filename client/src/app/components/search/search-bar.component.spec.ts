import {HttpClient} from "@angular/common/http";
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {HTTP} from "@ionic-native/http/ngx";
import {IonicModule} from "@ionic/angular";

import { SearchBarComponent } from './search-bar.component';

describe('SearchComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    // TestBed.configureTestingModule({
    //   imports: [ReactiveFormsModule, IonicModule],
    //   declarations: [ SearchBarComponent ],
    //   schemas: [CUSTOM_ELEMENTS_SCHEMA],
    //   providers: [
    //     { provide: HttpClient},
    //     { provide: HTTP},
    //     {provide: Router}
    //   ]
    // })
    // .compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(SearchBarComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });
});
