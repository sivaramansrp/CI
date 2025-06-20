import { TestBed } from '@angular/core/testing';
import { DesistirSolicitudInformacionHistoricaService } from './desistir-solicitud-informacion-historica.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Tramite31910Store } from '../../../estados/tramites/tramite31910.store';
import { Solicitud31910State } from '../../../estados/tramites/tramite31910.store';

describe('DesistirSolicitudInformacionHistoricaService', () => {
  let service: DesistirSolicitudInformacionHistoricaService;
  let httpMock: HttpTestingController;
  let tramite31910StoreMock: Partial<Tramite31910Store>;

  beforeEach(() => {
    tramite31910StoreMock = {
      actualizarEstado: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        DesistirSolicitudInformacionHistoricaService,
        { provide: Tramite31910Store, useValue: tramite31910StoreMock }
      ]
    });

    service = TestBed.inject(DesistirSolicitudInformacionHistoricaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call actualizarEstado on tramite31910Store when actualizarEstadoFormulario is called', () => {
    const mockData: Solicitud31910State = { justificacion: 'test justificacion' };
    service.actualizarEstadoFormulario(mockData);
    expect(tramite31910StoreMock.actualizarEstado).toHaveBeenCalledWith(mockData);
  });

  it('should return expected data from getDatosDeLaSolicitud()', () => {
    const mockResponse: Solicitud31910State = { justificacion: 'test justificacion' };

    service.getDatosDeLaSolicitud().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/31910/datos-de-la-solicitud.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
