import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SolicitudService } from './solicitud.service';
import { SolicitudCatologo } from '../../models/solicitud.model';

describe('SolicitudService', () => {
  let service: SolicitudService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SolicitudService],
    });
    service = TestBed.inject(SolicitudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch solicitud catalogo successfully', () => {
    const mockResponse: SolicitudCatologo = {
      aduana: {
        labelNombre: 'Aduana',
        required: true,
        primerOpcion: 'Seleccione',
        catalogos: [
          {
            id: 1,
            descripcion: '670 - CHIHUAHUA. CHIH.',
          },
          {
            id: 1,
            descripcion: '440 - CIUDAD ACUÑA ',
          },
          {
            id: 1,
            descripcion: '370 - CIUDAD HIDALGO',
          },
        ],
      },
      juntaTecnicaDerivada: {
        labelNombre: 'Junta técnica derivada de',
        required: true,
        primerOpcion: 'Seleccione',
        catalogos: [
          {
            id: 1,
            descripcion: 'RGCE 3.7.5 FRACCION I',
          },
          {
            id: 1,
            descripcion: 'RGCE 3.7.5 FRACCION II (PAMA)',
          },
        ],
      },
    };

    service.conseguirSolicitudCatologo().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/6101/solicitud-catalogo.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error when fetching solicitud catalogo', () => {
    const mockError = new ErrorEvent('Network error', {
      message: 'Failed to load',
    });

    service.conseguirSolicitudCatologo().subscribe({
      next: () => {
        throw new Error('Expected an error, not data');
      },
      error: (error) => {
        expect(error).toBeTruthy();
      },
    });

    const req = httpMock.expectOne('assets/json/6101/solicitud-catalogo.json');
    expect(req.request.method).toBe('GET');
    req.error(mockError);
  });
});
