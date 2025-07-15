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

  it('getAvisoModify should return CatalogoResponse on success', () => {
    const mockResponse: CatalogoResponse = {
      id: 1,
      descripcion: 'desc'
    };
    service.getAvisoModify().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/32301/tipoDeAviso.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('getAvisoModify should return default CatalogoResponse on error', () => {
    service.getAvisoModify().subscribe(res => {
      expect(res.id).toBe(0);
      expect(res.descripcion).toContain('Respuesta por defecto');
    });
    const req = httpMock.expectOne('assets/json/32301/tipoDeAviso.json');
    req.error(new ErrorEvent('Network error'));
  });

  it('cargarDatosPersonaFusion should return PersonaFusionEscisionDTO on success', () => {
    const mockResponse: PersonaFusionEscisionDTO = {
     rfc: "string",
  razonSocial: "string",
  numFolioTramite: "string",
  fechaInicioVigencia: "string",
  fechaFinVigencia: "string"
    };
    service.cargarDatosPersonaFusion().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/32301/personaFusionEscision.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('cargarDatosPersonaFusion should return default PersonaFusionEscisionDTO on error', () => {
    service.cargarDatosPersonaFusion().subscribe(res => {
      expect(res.rfc).toBe('');
      expect(res.razonSocial).toContain('Respuesta por defecto');
    });
    const req = httpMock.expectOne('assets/json/32301/personaFusionEscision.json');
    req.error(new ErrorEvent('Network error'));
  });

  it('gridsubFusionOescision should return TableDataNgTable', () => {
    const mockTable: TableDataNgTable = { tableHeader: [], tableBody: [] };
    service.gridsubFusionOescision().subscribe(res => {
      expect(res).toEqual(mockTable);
    });
    const req = httpMock.expectOne('assets/json/32301/subFusionOescision.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockTable);
  });

  it('getSelectRangoDias should return string[]', () => {
    const mockData = ['1', '2', '3'];
    service.getSelectRangoDias().subscribe(res => {
      expect(res).toEqual(mockData);
    });
    const req = httpMock.expectOne('assets/json/32301/selectRangoDias.json');
    req.flush(mockData);
  });

  it('getAdicianFraccionOption should return string[]', () => {
    const mockData = ['a', 'b'];
    service.getAdicianFraccionOption().subscribe(res => {
      expect(res).toEqual(mockData);
    });
    const req = httpMock.expectOne('assets/json/32301/adicianFraccionOption.json');
    req.flush(mockData);
  });

  it('getAdicianFraccionNicoModOptions should return string[]', () => {
    const mockData = ['x', 'y'];
    service.getAdicianFraccionNicoModOptions().subscribe(res => {
      expect(res).toEqual(mockData);
    });
    const req = httpMock.expectOne('assets/json/32301/adicianFraccionNicoModOptions.json');
    req.flush(mockData);
  });

  it('getAdicianFraccionUnidadMedidaModOption should return string[]', () => {
    const mockData = ['kg', 'g'];
    service.getAdicianFraccionUnidadMedidaModOption().subscribe(res => {
      expect(res).toEqual(mockData);
    });
    const req = httpMock.expectOne('assets/json/32301/adicianFraccionUnidadMedidaModOption.json');
    req.flush(mockData);
  });

  it('getAdicianFraccionActivRelProcModOption should return string[]', () => {
    const mockData = ['proc1', 'proc2'];
    service.getAdicianFraccionActivRelProcModOption().subscribe(res => {
      expect(res).toEqual(mockData);
    });
    const req = httpMock.expectOne('assets/json/32301/adicianFraccionActivRelProcModOption.json');
    req.flush(mockData);
  });

  it('getAdicianFraccioncveFraccionCorrelacionModOption should return string[]', () => {
    const mockData = ['corr1', 'corr2'];
    service.getAdicianFraccioncveFraccionCorrelacionModOption().subscribe(res => {
      expect(res).toEqual(mockData);
    });
    const req = httpMock.expectOne('assets/json/32301/adicianFraccioncveFraccionCorrelacionModOption.json');
    req.flush(mockData);
  });

  it('getCapacidadAlmacenamiento should return string[]', () => {
    const mockData = ['cap1', 'cap2'];
    service.getCapacidadAlmacenamiento().subscribe(res => {
      expect(res).toEqual(mockData);
    });
    const req = httpMock.expectOne('assets/json/32301/fusionOEscision.json');
    req.flush(mockData);
  });

  it('getEntidadFederativa should return string[]', () => {
    const mockData = ['CDMX', 'JAL'];
    service.getEntidadFederativa().subscribe(res => {
      expect(res).toEqual(mockData);
    });
    const req = httpMock.expectOne('assets/json/31601/entidadFederative.json');
    req.flush(mockData);
  });

  it('getGridDomiciliosModificados should return TableDataNgTable', () => {
    const mockTable: TableDataNgTable = { tableHeader: [], tableBody: [] };
    service.getGridDomiciliosModificados().subscribe(res => {
      expect(res).toEqual(mockTable);
    });
    const req = httpMock.expectOne('assets/json/32301/gridDomiciliosModificados.json');
    req.flush(mockTable);
  });

  it('getGridMostrarGridModificado should return TableDataNgTable', () => {
    const mockTable: TableDataNgTable = { tableHeader: [], tableBody: [] };
    service.getGridMostrarGridModificado().subscribe(res => {
      expect(res).toEqual(mockTable);
    });
    const req = httpMock.expectOne('assets/json/32301/gridMostrarGridModificado.json');
    req.flush(mockTable);
  });

  it('getEnSuCaracterDe should return string[]', () => {
    const mockData = ['caracter1', 'caracter2'];
    service.getEnSuCaracterDe().subscribe(res => {
      expect(res).toEqual(mockData);
    });
    const req = httpMock.expectOne('assets/json/31601/enSuCaracterDe.json');
    req.flush(mockData);
  });

  it('getNacionalidad should return string[]', () => {
    const mockData = ['MX', 'US'];
    service.getNacionalidad().subscribe(res => {
      expect(res).toEqual(mockData);
    });
    const req = httpMock.expectOne('assets/json/31601/nacionalidad.json');
    req.flush(mockData);
  });

  it('getPreOperativo should return string[]', () => {
    const mockData = ['pre1', 'pre2'];
    service.getPreOperativo().subscribe(res => {
      expect(res).toEqual(mockData);
    });
    const req = httpMock.expectOne('assets/json/31601/preOperativo.json');
    req.flush(mockData);
  });

  it('getGridMiembrosEmpresas should return TableDataNgTable', () => {
    const mockTable: TableDataNgTable = { tableHeader: [], tableBody: [] };
    service.getGridMiembrosEmpresas().subscribe(res => {
      expect(res).toEqual(mockTable);
    });
    const req = httpMock.expectOne('assets/json/32301/gridMiembrosEmpresas.json');
    req.flush(mockTable);
  });

  it('getSeccionMiembrosRevocados should return TableDataNgTable', () => {
    const mockTable: TableDataNgTable = { tableHeader: [], tableBody: [] };
    service.getSeccionMiembrosRevocados().subscribe(res => {
      expect(res).toEqual(mockTable);
    });
    const req = httpMock.expectOne('assets/json/32301/seccionMiembrosRevocados.json');
    req.flush(mockTable);
  });
});