import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Solicitud32301Service } from './solicitud.service';
import { Tramite33302Store } from '../estados/tramite33302.store';
import { CatalogoResponse, Catalogo } from '@ng-mf/data-access-user';
import { DatosPrevios } from '../models/avisomodify.model';

describe('Solicitud32301Service', () => {
  let service: Solicitud32301Service;
  let httpMock: HttpTestingController;
  let tramiteStoreMock: jest.Mocked<Tramite33302Store>;

  beforeEach(() => {
    tramiteStoreMock = {
      actualizarEstado: jest.fn(),
    } as unknown as jest.Mocked<Tramite33302Store>;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        Solicitud32301Service,
        { provide: Tramite33302Store, useValue: tramiteStoreMock },
      ],
    });

    service = TestBed.inject(Solicitud32301Service);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getAvisoModify', () => {
    it('should fetch tipoDeAviso data successfully', () => {
      const mockResponse: CatalogoResponse = {
        id: 1,
        descripcion: 'Test Aviso',
        
        
      };

      service.getAvisoModify().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('assets/json/32301/tipoDeAviso.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });

    it('should return default response on error', () => {
      const defaultResponse: CatalogoResponse = {
        id: 0,
        descripcion: '',
        
      };

      service.getAvisoModify().subscribe((response) => {
        expect(response).toEqual(defaultResponse);
      });

      const req = httpMock.expectOne('assets/json/32301/tipoDeAviso.json');
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('actualizarEstadoFormulario', () => {
    it('should update the store with the provided data', () => {
      const mockDatos: DatosPrevios = {
        claveDeReferencia: '12345',
        cadenaDependencia: 'Dependencia Test',
        banco: 'Banco Test',
        llaveDePago: 'Llave123',
        fechaDePago: '2023-01-01',
        importeDePago: '1000',
        numeroDe: '67890',
      };

      service.actualizarEstadoFormulario(mockDatos);

      expect(tramiteStoreMock.actualizarEstado).toHaveBeenCalledWith({
        claveDeReferencia: '12345',
      });
      expect(tramiteStoreMock.actualizarEstado).toHaveBeenCalledWith({
        cadenaDependencia: 'Dependencia Test',
      });
      expect(tramiteStoreMock.actualizarEstado).toHaveBeenCalledWith({
        banco: 'Banco Test',
      });
      expect(tramiteStoreMock.actualizarEstado).toHaveBeenCalledWith({
        llaveDePago: 'Llave123',
      });
      expect(tramiteStoreMock.actualizarEstado).toHaveBeenCalledWith({
        fechaDePago: '2023-01-01',
      });
      expect(tramiteStoreMock.actualizarEstado).toHaveBeenCalledWith({
        importeDePago: '1000',
      });
      expect(tramiteStoreMock.actualizarEstado).toHaveBeenCalledWith({
        numeroDe: '67890',
      });
    });
  });

  describe('getRegistroTomaMuestrasMercanciasData', () => {
    it('should fetch registro toma muestras data successfully', () => {
      const mockResponse: DatosPrevios = {
        claveDeReferencia: '12345',
        cadenaDependencia: 'Dependencia Test',
        banco: 'Banco Test',
        llaveDePago: 'Llave123',
        fechaDePago: '2023-01-01',
        importeDePago: '1000',
        numeroDe: '67890',
      };

      service.getRegistroTomaMuestrasMercanciasData().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('assets/json/33302/datos-previos.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('onBancoList', () => {
    it('should fetch banco list successfully', () => {
      const mockResponse: Catalogo[] = [
        { id: 1, descripcion: 'Banco 1' },
        { id: 2, descripcion: 'Banco 2' },
      ];

      service.onBancoList().subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('assets/json/33302/banco-list.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});