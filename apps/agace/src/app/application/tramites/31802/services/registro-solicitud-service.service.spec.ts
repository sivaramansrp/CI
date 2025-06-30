import { TestBed } from '@angular/core/testing';
import { RegistroSolicitudService } from './registro-solicitud-service.service';
import { Tramite31802Store } from '../state/Tramite31802.store';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Solicitud31802State } from '../state/Tramite31802.store';

describe('RegistroSolicitudService', () => {
  let service: RegistroSolicitudService;
  let storeMock: any;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    storeMock = {
      setNumeroOperacion: jest.fn(),
      setLlave: jest.fn(),
      setManifiesto1: jest.fn(),
      setManifiesto2: jest.fn(),
      setManifiesto3: jest.fn(),
      setFechaPago: jest.fn(),
      setRenovacion: jest.fn(),
      setHomologacion: jest.fn(),
      setMonedaNacional: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: Tramite31802Store, useValue: storeMock }
      ]
    });

    service = TestBed.inject(RegistroSolicitudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call all store setters in actualizarEstadoFormulario', () => {
    const datos: Solicitud31802State = {
      numeroOperacion: 123,
      llave: 'abc',
      manifiesto1: 'm1',
      manifiesto2: 'm2',
      manifiesto3: 'm3',
      fechaPago: '2024-01-01',
      renovacion: true,
      homologacion: false,
      monedaNacional: 'MXN'
    };
    service.actualizarEstadoFormulario(datos);
    expect(storeMock.setNumeroOperacion).toHaveBeenCalledWith(123);
    expect(storeMock.setLlave).toHaveBeenCalledWith('abc');
    expect(storeMock.setManifiesto1).toHaveBeenCalledWith('m1');
    expect(storeMock.setManifiesto2).toHaveBeenCalledWith('m2');
    expect(storeMock.setManifiesto3).toHaveBeenCalledWith('m3');
    expect(storeMock.setFechaPago).toHaveBeenCalledWith('2024-01-01');
    expect(storeMock.setRenovacion).toHaveBeenCalledWith(true);
    expect(storeMock.setHomologacion).toHaveBeenCalledWith(false);
    expect(storeMock.setMonedaNacional).toHaveBeenCalledWith('MXN');
  });

  it('should get datos de aviso de renovacion doc from JSON', () => {
    const mockResponse: Solicitud31802State = {
      numeroOperacion: 1,
      llave: 'llave',
      manifiesto1: 'm1',
      manifiesto2: 'm2',
      manifiesto3: 'm3',
      fechaPago: '2024-01-01',
      renovacion: true,
      homologacion: false,
      monedaNacional: 'MXN'
    };
    service.getDatosDeAvisoRenovacionDoc().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/31802/aviso-de-renovacion.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});