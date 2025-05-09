import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ModificacionSolicitudeService } from './modificacion-solicitude.service';
import { Catalogo } from '@ng-mf/data-access-user';
import { DomicilioInfo, Bitacora, DatosModificacion, Federetarios, Operacions, Complimentaria, Anexo } from '../models/plantas-consulta.model';

describe('ModificacionSolicitudeService', () => {
  let service: ModificacionSolicitudeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ModificacionSolicitudeService],
    });
    service = TestBed.inject(ModificacionSolicitudeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch lista de estados', () => {
    const mockResponse: Catalogo[] = [{ id: 1, descripcion: 'Estado 1' }];

    service.obtenerListaEstado().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('./assets/json/80301/estado.json');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockResponse });
  });

  it('should fetch domicilios', () => {
    const mockResponse: DomicilioInfo[] = [{ idPlanta: '1', razonSocial: 'Planta 1' }];

    service.obtenerDomicilios().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/80301/domicilio.json');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockResponse });
  });

  it('should fetch bitacora', () => {
    const mockResponse: Bitacora[] = [{
        tipoModificion: '1', valoresNuevos: 'Bitacora 1',
        fetchModificion: '',
        valoresAnteriores: ''
    }];

    service.obtenerBitacora().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/80301/bitacora.json');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockResponse });
  });

  it('should fetch datos generales', () => {
    const mockResponse: DatosModificacion = {
        rfc: '1', tipoModalidad: 'Datos Generales',
        representacionFederal: '',
        descripcionModalidad: ''
    };

    service.obtenerDatosGenerales().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/80301/datos-modificacion.json');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockResponse });
  });

  it('should fetch federetarios', () => {
    const mockResponse: Federetarios[] = [{ id: 1, nombre: 'Federetario 1' }];

    service.obtenerFederetarios().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/80301/federetarios.json');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockResponse });
  });

  it('should fetch operacion', () => {
    const mockResponse: Operacions[] = [{ id: 1, operacion: 'Operacion 1' }];

    service.obtenerOperacion().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/80301/operacion.json');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockResponse });
  });

  it('should fetch datos de complimentaria', () => {
    const mockResponse: Complimentaria[] = [{ rfc: 'RFC1', nombre: 'Nombre 1' }];

    service.obtenerComplimentaria().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/80301/complimentaria.json');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockResponse });
  });

  it('should fetch datos de anexo', () => {
    const mockResponse: Anexo[] = [{ valoresAnteriores: '1', descripcion: 'Anexo 1' }];

    service.obtenerAnexo().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/80301/anexo.json');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockResponse });
  });
});