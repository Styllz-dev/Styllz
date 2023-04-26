import { TestBed } from '@angular/core/testing';

import { StylesApiService } from './styles-api.service';

describe('StylesApiService', () => {
  let service: StylesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StylesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
