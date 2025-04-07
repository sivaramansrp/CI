import { TestBed } from '@angular/core/testing';

import { TransportacionMaritimaService } from './transportacion-maritima.service';

describe('TransportacionMaritimaService', () => {
  let service: TransportacionMaritimaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransportacionMaritimaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
