import { TestBed } from '@angular/core/testing';
import { CancelacionesService } from './cancelaciones.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('CancelacionesService', () => {
  let service: CancelacionesService;
  let httpMock: any;

  beforeEach(() => {
    httpMock = { get: jest.fn() };

    TestBed.configureTestingModule({
      providers: [
        CancelacionesService,
        { provide: HttpClient, useValue: httpMock }
      ]
    });

    service = TestBed.inject(CancelacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get entidades', () => {
    httpMock.get.mockReturnValue(of([{ id: 1, descripcion: 'Entidad' }]));
    service.getEntidades().subscribe(result => {
      expect(result).toEqual([{ id: 1, descripcion: 'Entidad' }]);
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/140201/entidad140201.json');
  });

  it('should get colonia', () => {
    httpMock.get.mockReturnValue(of([{ id: 2, descripcion: 'Colonia' }]));
    service.getColonia().subscribe(result => {
      expect(result).toEqual([{ id: 2, descripcion: 'Colonia' }]);
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/140201/colonia140201.json');
  });

  it('should get municipio', () => {
    httpMock.get.mockReturnValue(of([{ id: 3, descripcion: 'Municipio' }]));
    service.getmunicipio().subscribe(result => {
      expect(result).toEqual([{ id: 3, descripcion: 'Municipio' }]);
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/140201/municipio140201.json');
  });

  it('should get localidad', () => {
    httpMock.get.mockReturnValue(of([{ id: 4, descripcion: 'Localidad' }]));
    service.getLocalidad().subscribe(result => {
      expect(result).toEqual([{ id: 4, descripcion: 'Localidad' }]);
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/140201/localidad140201.json');
  });

  it('should get info', () => {
    httpMock.get.mockReturnValue(of({ calle: 'Av. Siempre Viva' }));
    service.getInfo().subscribe(result => {
      expect(result).toEqual({ calle: 'Av. Siempre Viva' });
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/140201/notificacionsInfo.json');
  });

  it('should get cancelacion de autorizaciones', () => {
    httpMock.get.mockReturnValue(of([{ id: 5, nombre: 'Cancelacion' }]));
    service.getCancelacionDeAutorizaciones().subscribe(result => {
      expect(result).toEqual([{ id: 5, nombre: 'Cancelacion' }]);
    });
    expect(httpMock.get).toHaveBeenCalledWith('assets/json/140201/cancelacion-de-autorizaciones-140201.json');
  });
});