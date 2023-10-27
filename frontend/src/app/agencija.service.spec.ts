import { TestBed } from '@angular/core/testing';

import { AgencijaService } from './agencija.service';

describe('AgencijaService', () => {
  let service: AgencijaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgencijaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
