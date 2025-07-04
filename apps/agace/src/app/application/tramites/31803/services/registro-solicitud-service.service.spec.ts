import { TestBed } from '@angular/core/testing';
import { RegistroSolicitudService, SolicitudDatosResponse } from './registro-solicitud-service.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Tramite31803Store } from '../state/Tramite31803.store';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegistroSolicitudService', () => {
  let service: RegistroSolicitudService;
  let httpClientSpy: jest.Mocked<HttpClient>;
  let tramite31803StoreSpy: jest.Mocked<Tramite31803Store>;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(()=> of())
    } as any;

    tramite31803StoreSpy = {
      setBanco: jest.fn(()=> of()),
      setNumeroOperacion: jest.fn(()=> of()),
      setLlave: jest.fn(()=> of()),
      setManifiesto1: jest.fn(()=> of()),
      setManifiesto2: jest.fn(()=> of()),
      setFechaPago: jest.fn(()=> of())
    } as any;

    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [
        RegistroSolicitudService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Tramite31803Store, useValue: tramite31803StoreSpy }
      ]
    });

    service = TestBed.inject(RegistroSolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

    it('should update the store with provided data', () => {
      const datos = {
        banco: [{ id: '1', descripcion: 'Banco1' }],
        numeroOperacion: '123',
        llave: 'abc',
        manifiesto1: 'man1',
        manifiesto2: 'man2',
        fechaPago: '2024-01-01'
      } as any;

      service.actualizarEstadoFormulario(datos);

      expect(tramite31803StoreSpy.setBanco).toHaveBeenCalledWith(datos.banco);
      expect(tramite31803StoreSpy.setNumeroOperacion).toHaveBeenCalledWith(datos.numeroOperacion);
      expect(tramite31803StoreSpy.setLlave).toHaveBeenCalledWith(datos.llave);
      expect(tramite31803StoreSpy.setManifiesto1).toHaveBeenCalledWith(datos.manifiesto1);
      expect(tramite31803StoreSpy.setManifiesto2).toHaveBeenCalledWith(datos.manifiesto2);
      expect(tramite31803StoreSpy.setFechaPago).toHaveBeenCalledWith(datos.fechaPago);
    });

    it('should set banco to empty array if undefined', () => {
      const datos = {
        banco: undefined,
        numeroOperacion: '123',
        llave: 'abc',
        manifiesto1: 'man1',
        manifiesto2: 'man2',
        fechaPago: '2024-01-01'
      } as any;

      service.actualizarEstadoFormulario(datos);

      expect(tramite31803StoreSpy.setBanco).toHaveBeenCalledWith([]);
    });

    it('should call http.get with correct URL and return Catalogo[]', (done) => {
      const mockCatalogos: Catalogo[] = [{ id: 1, descripcion: 'Banco1' }];
      httpClientSpy.get.mockReturnValue(of(mockCatalogos));

      service.obtenerDatosBanco().subscribe(result => {
        expect(result).toEqual(mockCatalogos);
        expect(httpClientSpy.get).toHaveBeenCalledWith('assets/json/31803/banco.json');
        done();
      });
    });

    it('should call http.get with correct URL and return SolicitudDatosResponse', (done) => {
      const mockResponse: SolicitudDatosResponse = {
        numeroOperacion: '123',
        banco: 'Banco1',
        llave: 'abc',
        manifiesto1: 'man1',
        manifiesto2: 'man2',
        fechaPago: '2024-01-01'
      };
      httpClientSpy.get.mockReturnValue(of(mockResponse));

      service.getSolicitudDatos().subscribe(result => {
        expect(result).toEqual(mockResponse);
        expect(httpClientSpy.get).toHaveBeenCalledWith('assets/json/31803/solicitud-banco.json');
        done();
      });
    });
});