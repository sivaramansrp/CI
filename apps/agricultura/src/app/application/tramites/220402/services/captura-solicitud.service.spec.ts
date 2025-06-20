import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CapturaSolicitudeService } from './captura-solicitud.service';
import { Solicitud220402Store } from '../estados/tramites/tramites220402.store';
import { RespuestaCatalogos } from '@ng-mf/data-access-user';
import { Solicitud220402State } from '../estados/tramites/tramites220402.store';

describe('CapturaSolicitudeService', () => {
  let service: CapturaSolicitudeService;
  let httpMock: HttpTestingController;
  let storeMock: Partial<Solicitud220402Store>;

  beforeEach(() => {
    storeMock = {
      setTipoDeCertificado: jest.fn(),
      setPuntoDestino: jest.fn(),
      setSeccionAduanera: jest.fn(),
      setBanco: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CapturaSolicitudeService,
        { provide: Solicitud220402Store, useValue: storeMock },
      ],
    });

    service = TestBed.inject(CapturaSolicitudeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch banco data', () => {
    const mockResponse: RespuestaCatalogos = {
      code: 200,
      data: [{ id: 1, descripcion: 'Banco A' }],
      message: 'success'
    };

    service.getBanco().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/220402/banco.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch registro toma muestras data', () => {
    const mockResponse: Solicitud220402State = {
      tipoDeCertificado: 'Certificado B',
    } as Solicitud220402State;

    service.getRegistroTomaMuestrasMercanciasData().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/220402/registro_220402.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});