import {HttpClient} from "@angular/common/http";
import { TestBed } from '@angular/core/testing';
import {HTTP} from "@ionic-native/http/ngx";

import { SearchService } from './search.service';

describe('SearchService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      { provide: HttpClient},
      { provide: HTTP}
    ]
  }));

  it('should be created', () => {
    const service: SearchService = TestBed.get(SearchService);
    expect(service).toBeTruthy();
  });
});
