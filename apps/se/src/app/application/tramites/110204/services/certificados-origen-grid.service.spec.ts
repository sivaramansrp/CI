import { TestBed } from '@angular/core/testing';
import { CertificadosOrigenGridService } from './certificadosOrigenGrid.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Tramite110204Store } from '../estados/tramite110204.store';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { TramiteState } from '../estados/tramite110204.store';

describe('CertificadosOrigenGridService', () => {
  let service: CertificadosOrigenGridService;
  let httpMock: HttpTestingController;
  let tramiteStoreMock: Partial<Record<keyof Tramite110204Store, jest.Mock>>;

  beforeEach(() => {
    tramiteStoreMock = {
      setEstado: jest.fn(),
      setFactura: jest.fn(),
      setUmc: jest.fn(),
      setBloque: jest.fn(),
      setaltaPlanta: jest.fn(),
      setFormDatosCertificado: jest.fn(),
      setFormCertificado: jest.fn(),
      setFormMercancia: jest.fn(),
      setbuscarMercancia: jest.fn()
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CertificadosOrigenGridService,
        { provide: Tramite110204Store, useValue: tramiteStoreMock }
      ]
    });

    service = TestBed.inject(CertificadosOrigenGridService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  type MethodWithUrl = {
    method: () => import('rxjs').Observable<Catalogo[]>,
    url: string
  };
  
  const methodsWithUrls: MethodWithUrl[] = [
    { method: () => service.obtenerPaisBloque(), url: 'assets/json/110204/país-bloque.json' },
    { method: () => service.obtenerEntidadFederativa(), url: 'assets/json/110204/entidad-federativa.json' },
    { method: () => service.obtenerRepresentacionFederal(), url: 'assets/json/110204/representacion-federal.json' },
    { method: () => service.obtenerFacturas(), url: 'assets/json/110204/factura.json' },
    { method: () => service.obtenerUmc(), url: 'assets/json/110204/umc.json' },
    { method: () => service.obtenerIdioma(), url: 'assets/json/110204/idioma.json' },
    { method: () => service.obtenerListaEstado(), url: './assets/json/110204/estado.json' },
  ];
  
  methodsWithUrls.forEach(({ method, url }) => {
    it(`should fetch data from ${url}`, () => {
      const mockData: Catalogo[] = [{ id: 1, descripcion: 'Test' }];
      method().subscribe((data) => {
        expect(data).toEqual(mockData);
      });
  
      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush({ data: mockData });
    });
  });

  it('should fetch tramite state data for certificados de origen', () => {
    const mockState: TramiteState = {
      idiomaDatos: [],
      entidadFederativaDatos: [],
      representacionFederalDatos: [],
      altaPlanta: [],
      estado: { id: 1, descripcion: '' },
      factura: [],
      facturas: { id: 1, descripcion: '' },
      umc: { id: 1, descripcion: '' },
      umcs: [],
      paisBloques: [],
      paisBloque: { id: 1, descripcion: '' },
      formCertificado: {},
      formDatosCertificado: {},
      mercanciaForm: {},
      buscarMercancia: [],
      mercanciaTabla: [],
      formaValida: {}
    };

    service.getAcuiculturaData().subscribe((data) => {
      expect(data).toEqual(mockState);
    });

    const req = httpMock.expectOne('assets/json/110204/certificadosOrigenForm.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockState);
  });

  it('should call all store setters when actualizarEstadoFormulario is called', () => {
    const mockState: TramiteState = {
      idiomaDatos: [],
      entidadFederativaDatos: [],
      representacionFederalDatos: [],
      altaPlanta: [],
      estado: { id: 1, descripcion: '' },
      factura: [],
      facturas: { id: 1, descripcion: '' },
      umc: { id: 1, descripcion: '' },
      umcs: [],
      paisBloques: [],
      paisBloque: { id: 1, descripcion: '' },
      formCertificado: {},
      formDatosCertificado: {},
      mercanciaForm: {},
      buscarMercancia: [],
      mercanciaTabla: [],
      formaValida: {}
    };

    service.actualizarEstadoFormulario(mockState);

    expect(tramiteStoreMock.setEstado).toHaveBeenCalledWith(mockState.estado);
    expect(tramiteStoreMock.setFactura).toHaveBeenCalledWith(mockState.factura);
    expect(tramiteStoreMock.setUmc).toHaveBeenCalledWith(mockState.umcs);
    expect(tramiteStoreMock.setBloque).toHaveBeenCalledWith(mockState.paisBloques);
    expect(tramiteStoreMock.setaltaPlanta).toHaveBeenCalledWith(mockState.altaPlanta);
    expect(tramiteStoreMock.setFormDatosCertificado).toHaveBeenCalledWith(mockState.formDatosCertificado);
    expect(tramiteStoreMock.setFormCertificado).toHaveBeenCalledWith(mockState.formCertificado);
    expect(tramiteStoreMock.setFormMercancia).toHaveBeenCalledWith(mockState.mercanciaForm);
    expect(tramiteStoreMock.setbuscarMercancia).toHaveBeenCalledWith(mockState.buscarMercancia);
  });
});
