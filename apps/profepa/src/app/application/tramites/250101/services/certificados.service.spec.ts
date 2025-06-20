import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import { CertificadosService } from './certificados.service';

describe('CertificadosService', () => {
  let service: CertificadosService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], 
      providers: [CertificadosService]
    });
    service = TestBed.inject(CertificadosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
