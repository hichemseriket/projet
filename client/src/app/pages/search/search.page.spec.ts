import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPage } from './search.page';
import {PageFooterComponent} from '../../components/page-content/page-footer/page-footer.component';
import {PageHeaderComponent} from '../../components/page-content/page-header/page-header.component';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {HTTP} from '@ionic-native/http/ngx';

describe('SearchPage', () => {
  let component: SearchPage;
  let fixture: ComponentFixture<SearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterModule],
      declarations: [ SearchPage, PageFooterComponent, PageHeaderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: HttpClient},
        {provide: HTTP},
        {provide: Router},
        {provide: ActivatedRoute}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  test('should create', () => {
    // expect(component).toBeTruthy();
  });
});
