import { TestBed } from '@angular/core/testing';

import { PromptApiService } from './prompt-api.service';

describe('PromptApiService', () => {
  let service: PromptApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PromptApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
