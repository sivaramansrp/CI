import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { TercerosProcedenciaService } from './terceros-procedencia.service';

describe('TercerosProcedenciaService', () => {
  let service: TercerosProcedenciaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule], // Add HttpClientModule here
      providers: [TercerosProcedenciaService], // Ensure the service is provided
    });

    service = TestBed.inject(TercerosProcedenciaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
