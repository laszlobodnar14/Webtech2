import { TestBed } from '@angular/core/testing';

import { GepService } from './gep.service';

describe('GepService', () => {
  let service: GepService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GepService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
