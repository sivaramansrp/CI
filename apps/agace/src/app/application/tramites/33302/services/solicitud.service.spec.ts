import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Solicitud32301Service } from './solicitud.service';
import { Tramite33302Store } from '../estados/tramite33302.store';
import { CatalogoResponse } from '@ng-mf/data-access-user';
import { DatosPrevios } from '../models/avisomodify.model';
import { Catalogo } from '@ng-mf/data-access-user';

describe('Solicitud32301Service', () => {
  let service: Solicitud32301Service;
  let httpMock: HttpTestingController;
  let tramiteStoreMock: jest.Mocked<Tramite33302Store>;

  beforeEach(() => {
    tramiteStoreMock = {
      setCadenaDependencia: jest.fn(),
      setClaveDeReferencia: jest.fn(),
      setBanco: jest.fn(),
      setLlaveDePago: jest.fn(),
      setFechaDePago: jest.fn(),
      setImporteDePago: jest.fn(),
      setNumeroDe: jest.fn(),
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

  afterEach(() => {
    httpMock.verify();
  });
  
  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  
  describe('getAvisoModify', () => {
    it('should fetch aviso modify data from the correct URL', () => {
      const mockResponse: CatalogoResponse = {
        id: 1,
        descripcion: 'Test Description',
      };
  
      service.getAvisoModify().subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });
  
      const req = httpMock.expectOne('assets/json/32301/tipoDeAviso.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  
    it('should handle errors and return a default response', () => {
      const defaultResponse: CatalogoResponse = {
        id: 0,
        descripcion: '',
      };
  
      service.getAvisoModify().subscribe((data) => {
        expect(data).toEqual(defaultResponse);
      });
  
      const req = httpMock.expectOne('assets/json/32301/tipoDeAviso.json');
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent('Network error'));
    });
  });

  describe('actualizarEstadoFormulario', () => {
    it('should update the store with the provided data', () => {
      const mockData: DatosPrevios = {
        claveDeReferencia: 'ABC123',
        cadenaDependencia: 'Dependencia XYZ',
        banco: 'Banco Nacional',
        llaveDePago: 'PAGO987654',
        fechaDePago: '2025-03-17',
        importeDePago: '1500',
        numeroDe: '123456',
      };

      service.actualizarEstadoFormulario(mockData);

      expect(tramiteStoreMock.setCadenaDependencia).toHaveBeenCalledWith('Dependencia XYZ');
      expect(tramiteStoreMock.setClaveDeReferencia).toHaveBeenCalledWith('ABC123');
      expect(tramiteStoreMock.setBanco).toHaveBeenCalledWith('Banco Nacional');
      expect(tramiteStoreMock.setLlaveDePago).toHaveBeenCalledWith('PAGO987654');
      expect(tramiteStoreMock.setFechaDePago).toHaveBeenCalledWith('2025-03-17');
      expect(tramiteStoreMock.setImporteDePago).toHaveBeenCalledWith('1500');
      expect(tramiteStoreMock.setNumeroDe).toHaveBeenCalledWith('123456');
    });
  });

  describe('getRegistroTomaMuestrasMercanciasData', () => {
    it('should fetch registro toma muestras data from the correct URL', () => {
      const mockResponse: DatosPrevios = {
        claveDeReferencia: 'ABC123',
        cadenaDependencia: 'Dependencia XYZ',
        banco: 'Banco Nacional',
        llaveDePago: 'PAGO987654',
        fechaDePago: '2025-03-17',
        importeDePago: '1500',
        numeroDe: '123456',
      };

      service.getRegistroTomaMuestrasMercanciasData().subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('assets/json/33302/datos-previos.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('onBancoList', () => {
    it('should fetch banco list data from the correct URL', () => {
      const mockResponse: Catalogo[] = [
        { id: 1, descripcion: 'Banco 1' },
        { id: 2, descripcion: 'Banco 2' },
      ];

      service.onBancoList().subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('assets/json/33302/banco-list.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});