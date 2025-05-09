import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SolicitudService } from './solicitud.service';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { DatosDelModificacion } from '../models/datos-tramite.model';
import { Anexo, Complimentaria, Federetarios, Operacions } from '../models/plantas-consulta.model';

describe('SolicitudService', () => {
  let service: SolicitudService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SolicitudService],
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

  it('should fetch datos del solicitante', (done) => {
    const mockResponse: RespuestaCatalogos = {
      code: 200,
      data: [{ id: 1, descripcion: 'Solicitante 1' }],
      message: 'Success',
    };
  
    service.getDatosDelSolicitante().subscribe((data) => {
      expect(data).toEqual(mockResponse.data); 
      done();
    });
  
    const req = httpMock.expectOne('assets/json/80301/datosSolicitante.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch datos de modificación', () => {
    const mockResponse: RespuestaCatalogos={ 
        code:200 ,
        data:[{id:1, descripcion: 'Modificación 1'}],
        message: 'Success'
    };        
    service.getDatosModificacion().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/80301/modificacion.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch datos de la tabla', () => {
    const mockResponse: DatosDelModificacion[] = [
      {
          id: 1, codigoPostal: '12345', localidad: 'Localidad 1',
          delegacionMunicipio: undefined
      },
    ];
  
    service.getDatosTableData().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne('assets/json/80301/datosTabla.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch datos de anexo', () => {
    const mockResponse: Anexo[] = [
      { descripcion: 'Anexo 1', tipoFraccion: 'Fracción 1' },
    ];
  
    service.obtenerAnexo().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne('assets/json/80301/anexo.json');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockResponse });
  });
  it('should fetch datos de anexo', () => {
    const mockResponse: Anexo[] = [
      { descripcion: 'Anexo 1', tipoFraccion: 'Fracción 1' },
    ];
  
    service.obtenerAnexo().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne('assets/json/80301/anexo.json');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockResponse });
  });

  it('should fetch datos de federetarios', () => {
    const mockResponse: Federetarios[] = [{ id: 1, nombre: 'Federetario 1' }];
  
    service.obtenerFederetarios().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne('assets/json/80301/federetarios.json');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockResponse });
  });

  it('should fetch datos de operaciones', () => {
    const mockResponse: Operacions[] = [{ id: 1, operacion: 'Operación 1' }];

    service.obtenerOperacion().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/80301/operacion.json');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockResponse });
  });
});