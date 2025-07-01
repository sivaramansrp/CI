import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TercerosService } from './terceros.service';
import { Catalogo } from '@libs/shared/data-access-user/src';

describe('TercerosService', () => {
  let service: TercerosService;
  let httpMock: HttpTestingController;

  const mockCatalogo: Catalogo[] = [
    { id: 1, nombre: 'Ejemplo 1' } as unknown as Catalogo,
    { id: 2, nombre: 'Ejemplo 2' } as unknown as Catalogo
  ];
  const mockStringArray: string[] = ['Columna1', 'Columna2'];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TercerosService]
    });
    service = TestBed.inject(TercerosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('debe obtener datos de terceros relacionados', () => {
    service.getData().subscribe(data => {
      expect(data).toEqual(mockCatalogo);
    });
    const req = httpMock.expectOne('assets/json/260212/terceros-relacionados.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockCatalogo);
  });

  it('debe obtener datos de países', () => {
    service.getPaisData().subscribe(data => {
      expect(data).toEqual(mockCatalogo);
    });
    const req = httpMock.expectOne('assets/json/260212/pais.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockCatalogo);
  });

  it('debe obtener datos de municipios', () => {
    service.getMunicipioData().subscribe(data => {
      expect(data).toEqual(mockCatalogo);
    });
    const req = httpMock.expectOne('assets/json/260212/municipio.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockCatalogo);
  });

  it('debe obtener datos de códigos postales', () => {
    service.getCodigoPostalData().subscribe(data => {
      expect(data).toEqual(mockCatalogo);
    });
    const req = httpMock.expectOne('assets/json/260212/codigo-postal.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockCatalogo);
  });

  it('debe obtener datos de colonias', () => {
    service.getColoniaData().subscribe(data => {
      expect(data).toEqual(mockCatalogo);
    });
    const req = httpMock.expectOne('assets/json/260212/colonia.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockCatalogo);
  });

  it('debe obtener datos de localidades', () => {
    service.getLocalidadData().subscribe(data => {
      expect(data).toEqual(mockCatalogo);
    });
    const req = httpMock.expectOne('assets/json/260212/localidad.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockCatalogo);
  });

  it('debe obtener encabezado de tabla', () => {
    service.getEncabezadoDeTabla().subscribe(data => {
      expect(data).toEqual(mockStringArray);
    });
    const req = httpMock.expectOne('assets/json/260212/encabezado-de-tabla.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockStringArray);
  });
});
