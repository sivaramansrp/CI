import { TestBed } from '@angular/core/testing';

import { FloraFaunaService } from './flora-fauna.service';

describe('FloraFaunaService', () => {
  let service: FloraFaunaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FloraFaunaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
