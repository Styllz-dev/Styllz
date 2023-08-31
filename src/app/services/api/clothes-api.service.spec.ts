import { TestBed } from '@angular/core/testing';

import { ClothesApiService } from './clothes-api.service';

describe('ClothesApiService', () => {
  let service: ClothesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClothesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
