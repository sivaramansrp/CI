import { TestBed } from '@angular/core/testing';
import { ModificacionSolicitudeService } from './modificacion-solicitude.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import {
  Catalogo
} from '@ng-mf/data-access-user';

import {
  Anexo,
  Bitacora,
  Complimentaria,
  DatosModificacion,
  DomicilioInfo,
  Federetarios,
  Operacions,
} from '../models/plantas-consulta.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ModificacionSolicitudeService', () => {
  let service: ModificacionSolicitudeService;
  let httpClientSpy: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
      // add other HttpClient methods if needed
    } as any;
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ModificacionSolicitudeService,
        { provide: HttpClient, useValue: httpClientSpy },
      ],
    });
    service = TestBed.inject(ModificacionSolicitudeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('obtenerListaEstado should return estados', (done) => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Estado' }];
    httpClientSpy.get.mockReturnValue(of({ data: mockData }));
    service.obtenerListaEstado().subscribe((result) => {
      expect(result).toEqual(mockData);
      done();
    });
    expect(httpClientSpy.get).toHaveBeenCalledWith('./assets/json/80301/estado.json');
  });

  it('obtenerDomicilios should return domicilios', (done) => {
    const mockData: DomicilioInfo[] = [{ id: 1, direccion: 'Calle 1' } as DomicilioInfo];
    httpClientSpy.get.mockReturnValue(of({ data: mockData }));
    service.obtenerDomicilios().subscribe((result) => {
      expect(result).toEqual(mockData);
      done();
    });
    expect(httpClientSpy.get).toHaveBeenCalledWith('assets/json/80301/domicilo-tablo.json');
  });

  it('obtenerBitacora should return bitacora', (done) => {
    const mockData: Bitacora[] = [{ tipoModificion: 'Tipo', fetchModificion: 'Accion', valoresAnteriores:"", valoresNuevos:"" } as Bitacora];
    httpClientSpy.get.mockReturnValue(of({ data: mockData }));
    service.obtenerBitacora().subscribe((result) => {
      expect(result).toEqual(mockData);
      done();
    });
    expect(httpClientSpy.get).toHaveBeenCalledWith('assets/json/80301/bitcora-one-tablo.json');
  });

  it('obtenerDatosGenerales should return datos de modificación', (done) => {
    const mockData: DatosModificacion = { rfc: '', representacionFederal: 'Modificacion', tipoModalidad:"", descripcionModalidad:"" } as DatosModificacion;
    httpClientSpy.get.mockReturnValue(of({ data: mockData }));
    service.obtenerDatosGenerales().subscribe((result) => {
      expect(result).toEqual(mockData);
      done();
    });
    expect(httpClientSpy.get).toHaveBeenCalledWith('assets/json/80301/datos-modificacion.json');
  });

  it('obtenerFederetarios should return federetarios', (done) => {
    const mockData: Federetarios[] = [{ id: 1, nombre: 'Federetario' } as Federetarios];
    httpClientSpy.get.mockReturnValue(of({ data: mockData }));
    service.obtenerFederetarios().subscribe((result) => {
      expect(result).toEqual(mockData);
      done();
    });
    expect(httpClientSpy.get).toHaveBeenCalledWith('assets/json/80301/federetarios.json');
  });

  it('obtenerOperacion should return operaciones', (done) => {
    const mockData: Operacions[] = [{ id: 1, nombre: 'Operacion' } as Operacions];
    httpClientSpy.get.mockReturnValue(of({ data: mockData }));
    service.obtenerOperacion().subscribe((result) => {
      expect(result).toEqual(mockData);
      done();
    });
    expect(httpClientSpy.get).toHaveBeenCalledWith('assets/json/80301/operacion.json');
  });

  it('obtenerComplimentaria should return operaciones complementarias', (done) => {
    const mockData: Complimentaria[] = [{ id: 1, nombre: 'Complimentaria' } as Complimentaria];
    httpClientSpy.get.mockReturnValue(of({ data: mockData }));
    service.obtenerComplimentaria().subscribe((result) => {
      expect(result).toEqual(mockData);
      done();
    });
    expect(httpClientSpy.get).toHaveBeenCalledWith('assets/json/80301/complimentria-opracion.json');
  });

  it('obtenerAnexo should return anexos', (done) => {
    const mockData: Anexo[] = [{ id: 1, nombre: 'Anexo' } as Anexo];
    httpClientSpy.get.mockReturnValue(of({ data: mockData }));
    service.obtenerAnexo().subscribe((result) => {
      expect(result).toEqual(mockData);
      done();
    });
    expect(httpClientSpy.get).toHaveBeenCalledWith('assets/json/80301/anexo.json');
  });
});