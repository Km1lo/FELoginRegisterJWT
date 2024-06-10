import { TestBed } from '@angular/core/testing';

import { TipocreditoService } from './tipocredito.service';

describe('TipocreditoService', () => {
  let service: TipocreditoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipocreditoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
