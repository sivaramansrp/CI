import { TestBed } from '@angular/core/testing';

import { MediodetransporteService } from './mediodetransporte.service';

describe('MediodetransporteService', () => {
  let service: MediodetransporteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediodetransporteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
