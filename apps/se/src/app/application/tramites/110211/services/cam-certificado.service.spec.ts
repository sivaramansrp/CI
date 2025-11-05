import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { CamCertificadoService } from './cam-certificado.service';
import { CamState, camCertificadoStore } from '../estados/cam-certificado.store';
import { camCertificadoQuery } from '../estados/cam-certificado.query';
import { JSONResponse, ENVIRONMENT } from '@ng-mf/data-access-user';
import { PROC_110211 } from '../servers/api-route';

describe('CamCertificadoService', () => {
  let service: CamCertificadoService;
  let httpMock: HttpTestingController;
  let mockStore: jest.Mocked<camCertificadoStore>;
  let mockQuery: jest.Mocked<camCertificadoQuery>;

  const mockCamState: CamState = {
    // Agregar propiedades simuladas basadas en la interfaz CamState
  } as CamState;

  const mockJSONResponse: JSONResponse = {
    // Agregar propiedades simuladas basadas en la interfaz JSONResponse
  } as JSONResponse;

  beforeEach(() => {
    const storeMock = {
      setEstadoCompleto: jest.fn(() => of()),
    } as any;

    const queryMock = {
      selectCam$: of(mockCamState)
    } as any;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CamCertificadoService,
        { provide: camCertificadoStore, useValue: storeMock },
        { provide: camCertificadoQuery, useValue: queryMock }
      ]
    });

    service = TestBed.inject(CamCertificadoService);
    httpMock = TestBed.inject(HttpTestingController);
    mockStore = TestBed.inject(camCertificadoStore) as jest.Mocked<camCertificadoStore>;
    mockQuery = TestBed.inject(camCertificadoQuery) as jest.Mocked<camCertificadoQuery>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch CAM certificate data from JSON file', () => {
    const fileName = 'test.json';
    const expectedUrl = service.url + fileName;

    service.obtenerTodosDatosCamCertificado(fileName).subscribe(data => {
      expect(data).toEqual(mockCamState);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCamState);
  });

  it('should update form state in store', () => {
    service.actualizarEstadoFormulario(mockCamState);

    expect(mockStore.setEstadoCompleto).toHaveBeenCalledWith(mockCamState);
  });

  it('should fetch catalog by ID', () => {
    const catalogId = 123;
    const expectedUrl = `${ENVIRONMENT.URL_SERVER_JSON_AUXILIAR}/${catalogId}`;

    service.getCatalogoById(catalogId).subscribe(data => {
      expect(data).toEqual(mockJSONResponse);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockJSONResponse);
  });

  it('should return observable from query', () => {
    service.getAllState().subscribe(data => {
      expect(data).toEqual(mockCamState);
    });
  });

  it('should perform POST request to search merchandise', () => {
    const searchBody = { criteria: 'test' };

    service.buscarMercanciasCert(searchBody).subscribe(data => {
      expect(data).toEqual(mockJSONResponse);
    });

    const req = httpMock.expectOne(PROC_110211.BUSCAR);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(searchBody);
    req.flush(mockJSONResponse);
  });

  it('should build merchandise array with correct structure', () => {
    const inputArray = [
      {
        fraccionArancelaria: '123456',
        cantidad: 10,
        valorMercancia: 100.50,
        umc: 'kg',
        tipoFactura: 'A',
        numeroFactura: 'F001',
        complementoDescripcion: 'Test description',
        fechaFactura: '2024-01-01'
      }
    ];

    const result = service.buildMercanciaSeleccionadas(inputArray);

    expect(result).toEqual([
      {
        fraccionArancelaria: '123456',
        cantidad: 10,
        unidadDeMedida: 'kg',
        valorMercancia: 100.50,
        tipoDeFactura: 'A',
        numeroFactura: 'F001',
        complementoDescripcion: 'Test description',
        fechaFactura: '2024-01-01'
      }
    ]);
  });

  it('should handle empty array', () => {
    const result = service.buildMercanciaSeleccionadas([]);
    expect(result).toEqual([]);
  });

  it('should handle array with multiple items', () => {
    const inputArray = [
      {
        fraccionArancelaria: '123456',
        cantidad: 10,
        valorMercancia: 100.50,
        umc: 'kg'
      },
      {
        fraccionArancelaria: '789012',
        cantidad: 5,
        valorMercancia: 50.25,
        umc: 'pcs'
      }
    ];

    const result = service.buildMercanciaSeleccionadas(inputArray);

    expect(result.length).toBe(2);
    expect(result[0]).toEqual(expect.objectContaining({
      fraccionArancelaria: '123456',
      cantidad: 10,
      unidadDeMedida: 'kg',
      valorMercancia: 100.50
    }));
    expect(result[1]).toEqual(expect.objectContaining({
      fraccionArancelaria: '789012',
      cantidad: 5,
      unidadDeMedida: 'pcs',
      valorMercancia: 50.25
    }));
  });

  it('should perform POST request to save data', () => {
    const saveBody = { data: 'test data' };

    service.guardarDatosPost(saveBody).subscribe(data => {
      expect(data).toEqual(mockJSONResponse);
    });

    const req = httpMock.expectOne(PROC_110211.GUARDAR);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(saveBody);
    req.flush(mockJSONResponse);
  });
});