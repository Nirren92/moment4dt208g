import { TestBed } from '@angular/core/testing';

import { KurserService } from './kurser.service';

describe('KurserService', () => {
  let service: KurserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KurserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
