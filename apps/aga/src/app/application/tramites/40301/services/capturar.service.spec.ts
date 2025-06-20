import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CapturarService } from './capturar.service';
import { Tramite40301Store } from '../estados/tramite40301.store';
import { Tramite40301Query } from '../estados/tramite40301.query';
import { CaatNaviroMetaInfo } from '../modelos/caat-naviero.modalidad.model';
import { Catalogo, TituloComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('CapturarService', () => {
  let service: CapturarService;
  let httpMock: HttpTestingController;
  let mockStore: jest.Mocked<Tramite40301Store>;
  let mockQuery: jest.Mocked<Tramite40301Query>;

  beforeEach(() => {
    mockStore = {
      update: jest.fn(),
    } as unknown as jest.Mocked<Tramite40301Store>;

    mockQuery = {
      select: jest.fn(),
    } as unknown as jest.Mocked<Tramite40301Query>;

    TestBed.configureTestingModule({
      imports: [WizardComponent, TituloComponent, HttpClientTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        CapturarService,
        { provide: Tramite40301Store, useValue: mockStore },
        { provide: Tramite40301Query, useValue: mockQuery },
      ],
    });

    service = TestBed.inject(CapturarService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set initial values in the store', () => {
    // Arrange: Mock the `setInitialValues` method of the store
    mockStore.setInitialValues = jest.fn();
  
    // Act: Call the `setInitialValues` method of the service
    service.setInitialValues();
  
    // Assert: Verify that the store's `setInitialValues` method was called
    expect(mockStore.setInitialValues).toHaveBeenCalled();
  });

  it('should get solicitud state', () => {
    service.getTramiteState();
    expect(mockQuery.select).toHaveBeenCalled();
  });

  it('should fetch meta info', () => {
    const mockMetaInfo: CaatNaviroMetaInfo = { tutilo: 'Test Title', tipoAgenteLabel: 'Test Label' };

    service.obtenerMetaInfo('catalogo').subscribe((data) => {
      expect(data).toEqual(mockMetaInfo);
    });

    const req = httpMock.expectOne('/assets/json/40301/metaData.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockMetaInfo);
  });

  it('should fetch user roles', () => {
    const mockRoles: string[] = ['Admin', 'User'];

    service.obtenerRolesUsuario().subscribe((roles) => {
      expect(roles).toEqual(mockRoles);
    });

    const req = httpMock.expectOne('/assets/json/40301/userRoles.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockRoles);
  });

  it('should fetch agent catalog', () => {
    const mockCatalog: Catalogo[] = [
      { id: 1, clave: 'Agent 1', descripcion: 'Agent1' },
      { id: 2, clave: 'Agent 2', descripcion: 'Agent2' },
    ];

    service.getCatalogo('AGENT_CATALOG').subscribe((catalog) => {
      expect(catalog).toEqual(mockCatalog);
    });

    const req = httpMock.expectOne('/assets/json/40301/tipoAgentoData.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockCatalog);
  });

  it('should fetch tramite ID', () => {
    const mockTramiteId = '12345';

    service.obtenerIdTramite().subscribe((id) => {
      expect(id).toBe(mockTramiteId);
    });

    const req = httpMock.expectOne('/assets/json/40301/obtenerIdTramite');
    expect(req.request.method).toBe('GET');
    req.flush(mockTramiteId);
  });
});