import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SolicitudService } from './solicitud.service';
import { Tramite120404Store } from '../estados/store/tramite120404.store';
import { Tramite120404State } from '../estados/store/tramite120404.store';

describe('SolicitudService', () => {
  let service: SolicitudService;
  let httpMock: HttpTestingController;
  let mockStore: jest.Mocked<Tramite120404Store>;

  beforeEach(() => {
    mockStore = {
      establecerDatos: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SolicitudService,
        { provide: Tramite120404Store, useValue: mockStore },
      ],
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

  it('should call establecerDatos with correct state in actualizarEstadoFormulario', () => {
    const mockState: Tramite120404State = { folio: 'ABC123' } as any;
    service.actualizarEstadoFormulario(mockState);
    expect(mockStore.establecerDatos).toHaveBeenCalledWith(mockState);
  });

  it('should fetch data from JSON file in getRegistroTomaMuestrasMercanciasData', () => {
    const mockResponse: Tramite120404State = { folio: 'XYZ789' } as any;

    service.getRegistroTomaMuestrasMercanciasData().subscribe((res) => {
      expect(res).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/120404/asignciondirecta.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
