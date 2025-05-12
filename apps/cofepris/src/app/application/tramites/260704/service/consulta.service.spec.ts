import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ConsultaService } from './consulta.service';
import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { ColumnasTabla, Destinatario, ListaClave, Mercancia, Asociados } from '../models/consulta.model';

describe('ConsultaService', () => {
  let service: ConsultaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ConsultaService],
    });
    service = TestBed.inject(ConsultaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch datos estado', () => {
    const mockResponse: Catalogo[] = [{ id: 1, descripcion: 'Estado Test' }];

    service.obtenerDatosEstado().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/260704/estado.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch datos clave', () => {
    const mockResponse: Catalogo[] = [{ id: 1, descripcion: 'Clave Test' }];

    service.obtenerDatosClave().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/260704/clave.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch tabla scian', () => {
    const mockResponse: ColumnasTabla[] = [{ claveScian: '123', descripcionScian: 'SCIAN Test' }];

    service.obtenerTablaScian().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/260704/clave-scian.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch tabla mercancias', () => {
    const mockResponse: Mercancia[] = [{ clasificaionProductos: 'Producto Test', especificarProducto: 1, nombreProductoEspecifico: 'Nombre Test', marca: 'Marca Test', tipoProducto: 1, fraccionArancelaria: '123', descripcionFraccionArancelaria: 'Descripción Test', cantidadUMT: '10', umt: 'UMT Test', cantidadUMC: '5', umc: 1, paisDeOrigen: 'México', paisDeProcedencia: 'USA', usoEspecifico: 'Uso Test' }];

    service.obtenerTablaMercancias().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/260704/mercancia-tabla.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch tabla lista clave', () => {
    const mockResponse: ListaClave[] = [{ claveDeLosLotes: '123', fechaDeFabricacion: '2025-01-01', fechaDeCaducidad: '2025-12-31' }];

    service.obtenerTablaListaClave().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/260704/lista-clave-tabla.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch tabla tramites', () => {
    const mockResponse: Asociados[] = [{ folioTramite: '12345', tipoTramite: 'Tipo Test', estatus: 'Activo', fechaRegistro: '2025-04-10' }];

    service.obtenerTablaTramites().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/260704/asociados-tabla.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch tabla terceros', () => {
    const mockResponse: Destinatario[] = [{ nombre: 'Destinatario Test', rfc: 'RFC123', curp: 'CURP123', telefono: '1234567890', correoElectronico: 'test@test.com', calle: 'Calle Test', numeroExterior: '123', numeroInterior: '456', pais: 'México', colonia: 'Colonia Test', municipio: 'Municipio Test', localidad: 'Localidad Test', estado: 'Estado Test', estado2: 'Estado2 Test', codigo: '12345' }];

    service.obtenerTablaTerceros().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/260704/terceros-tabla.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch datos banco', () => {
    const mockResponse: Catalogo[] = [{ id: 1, descripcion: 'Banco Test' }];

    service.obtenerDatosBanco().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/260704/banco.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch descripcion scian', () => {
    const mockResponse: RespuestaCatalogos = {
      code: 200, 
      message: 'Success',
      data: [{ id: 1, descripcion: 'SCIAN Test' }],
    };
  
    service.getDescripcionScian().subscribe((data) => {
      expect(data).toEqual(mockResponse);
    });
  
    const req = httpMock.expectOne('assets/json/260601/descripcion-scian.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});