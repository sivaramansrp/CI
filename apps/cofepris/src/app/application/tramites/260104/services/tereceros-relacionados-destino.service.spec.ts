import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TercerosRelacionadosDestinoService } from './tereceros-relacionados-destino.service';
import { Destinatario, Fabricante } from '../models/terceros-relacionados-destino.model';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('TercerosRelacionadosDestinoService', () => {
  let service: TercerosRelacionadosDestinoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TercerosRelacionadosDestinoService],
    });

    service = TestBed.inject(TercerosRelacionadosDestinoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get destinatarios using BehaviorSubject', () => {
    const destinatarios: Destinatario[] = [{
        tipoPersona: 'FISICA',
        rfc: 'XAXX010101000',
        nombreRazonSocial:'',
        nombres: 'John',
        primerApellido: 'Doe',
        segundoApellido: 'Smith',
        pais: '1',
        estado: '1',
        municipioAlcaldia: '1',
        estadoLocalidad:'',
        curp:'',
        localidad: '1',
        codigoPostal: '12345',
        colonia: '1',
        calle: 'Main Street',
        numeroExterior: '123',
        numeroInterior: '',
        lada: '55',
        telefono: '12345678',
        correoElectronico: 'john.doe@example.com',
        descPais: 'MEXICO',
        descEstado: '',
        descMunicipio: '',
        descLocalidad: '',
        descCodigoPostal: '',
        descColonia: ''}];
    service.setDestinatario(destinatarios);

    service.destinatario$.subscribe((data) => {
      expect(data).toEqual(destinatarios);
    });
  });

  it('should set and get fabricantes using BehaviorSubject', () => {
    const fabricantes: Fabricante[] = [{tipoPersona: 'FISICA',
        rfc: 'XAXX010101000',
        curp: 'Doe',
        nombreRazonSocial: 'Smith',
        pais: '1',
        descPais:'MEXICO',
        estado: '1',
        municipioAlcaldia: '1',
        estadoLocalidad:'',
        localidad: '1',
        coloniaEquivalente: '12345',
        colonia: '1',
        calle: 'Main Street',
        numeroExterior: '123',
        numeroInterior: '',
        lada: '55',
        telefono: '12345678',
        correoElectronico: 'john.doe@example.com',
      }];
    service.setFabricante(fabricantes);

    service.fabricante$.subscribe((data) => {
      expect(data).toEqual(fabricantes);
    });
  });

  it('should fetch terceros relacionados data from JSON', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Tercero 1' }];

    service.getData().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/cofepris/terceros-relacionados.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch pais data from JSON', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Mexico' }];

    service.getPaisData().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/cofepris/pais.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch municipio data from JSON', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Municipio 1' }];

    service.getMunicipioData().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/cofepris/municipio.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch codigo postal data from JSON', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: '12345' }];

    service.getCodigoPostalData().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/cofepris/codigo-postal.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch colonia data from JSON', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Colonia 1' }];

    service.getColoniaData().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/cofepris/colonia.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch localidad data from JSON', () => {
    const mockData: Catalogo[] = [{ id: 1, descripcion: 'Localidad 1' }];

    service.getLocalidadData().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/cofepris/localidad.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch encabezado de tabla data from JSON', () => {
    const mockData = { columns: ['Column 1', 'Column 2'] };

    service.getEncabezadoDeTabla().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/cofepris/encabezado-de-tabla.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
