import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AvisoModifyService } from './aviso-modify.service';
import { CatalogoResponse } from '@ng-mf/data-access-user';
import { PersonaFusionEscisionDTO, TableDataNgTable } from '../models/avisomodify.model';

describe('AvisoModifyService', () => {
  let service: AvisoModifyService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AvisoModifyService],
    });
    service = TestBed.inject(AvisoModifyService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


  
  it('should fetch rango de días', () => {
    const mockResponse: string[] = ['1', '2', '3'];

    service.getSelectRangoDias().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/32301/selectRangoDias.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch opciones de fracción adicional', () => {
    const mockResponse: string[] = ['Option1', 'Option2'];

    service.getAdicianFraccionOption().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/32301/adicianFraccionOption.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch capacidad de almacenamiento', () => {
    const mockResponse: string[] = ['Cap1', 'Cap2'];

    service.getCapacidadAlmacenamiento().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/32301/fusionOEscision.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch entidades federativas', () => {
    const mockResponse: string[] = ['Entidad1', 'Entidad2'];

    service.getEntidadFederativa().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/31601/entidadFederative.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch grid domicilios modificados', () => {
    const mockResponse: TableDataNgTable = { tableHeader: [],
      /** Cuerpo de la tabla */
      tableBody: [], };

    service.getGridDomiciliosModificados().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/32301/gridDomiciliosModificados.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch grid mostrar grid modificado', () => {
    const mockResponse: TableDataNgTable = { tableHeader:[],
      /** Cuerpo de la tabla */
      tableBody:[], };

    service.getGridMostrarGridModificado().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/32301/gridMostrarGridModificado.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch opciones de carácter de', () => {
    const mockResponse: string[] = ['Option1', 'Option2'];

    service.getEnSuCaracterDe().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/31601/enSuCaracterDe.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch nacionalidad', () => {
    const mockResponse: string[] = ['Nacionalidad1', 'Nacionalidad2'];

    service.getNacionalidad().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/31601/nacionalidad.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch opciones pre-operativas', () => {
    const mockResponse: string[] = ['Option1', 'Option2'];

    service.getPreOperativo().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/31601/preOperativo.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch grid miembros empresas', () => {
    const mockResponse: TableDataNgTable = { tableHeader:[],
      /** Cuerpo de la tabla */
      tableBody:[],};

    service.getGridMiembrosEmpresas().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/32301/gridMiembrosEmpresas.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch sección miembros revocados', () => {
    const mockResponse: TableDataNgTable = { tableHeader:[],
      /** Cuerpo de la tabla */
      tableBody:[], };

    service.getSeccionMiembrosRevocados().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/32301/seccionMiembrosRevocados.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});