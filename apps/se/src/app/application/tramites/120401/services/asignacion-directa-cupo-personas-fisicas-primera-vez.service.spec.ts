import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AsignacionDirectaCupoPersonasFisicasPrimeraVezService } from './asignacion-directa-cupo-personas-fisicas-primera-vez.service';
import { Tramite120401Store } from '../estados/tramites/tramite120401.store';
import { DescripcionDelCupo } from '../models/asignacion-directa-cupo.model';
import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src';

describe('AsignacionDirectaCupoPersonasFisicasPrimeraVezService', () => {
  let service: AsignacionDirectaCupoPersonasFisicasPrimeraVezService;
  let httpMock: HttpTestingController;
  let tramite120401StoreMock: Partial<Tramite120401Store>;

  beforeEach(() => {
    tramite120401StoreMock = {
      update: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AsignacionDirectaCupoPersonasFisicasPrimeraVezService,
        { provide: Tramite120401Store, useValue: tramite120401StoreMock },
      ],
    });

    service = TestBed.inject(AsignacionDirectaCupoPersonasFisicasPrimeraVezService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('obtenerRespuestaPorUrl', () => {
    it('should fetch data from the given URL and update the store', () => {
      const mockResponse: RespuestaCatalogos = {
        code: 200,
        data: [{ id: 1, descripcion: 'Test Catalog', clave: 'TC1' }],
        message: 'Success',
      };

      service.obtenerRespuestaPorUrl('testVariable', '/test-url.json');

      const req = httpMock.expectOne('assets/json/test-url.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      expect(tramite120401StoreMock.update).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('getDescripcionDelCupo', () => {
    it('should fetch descripcionDelCupo data and update the provided object', () => {
      const mockResponse: DescripcionDelCupo = {
        claveDelCupo: '123',
        mecanismoDeAsignacion: 'Directo',
        descripcionDelProducto: 'Producto Test',
        unidadDeMedida: 'Kg',
        regimenAduanero: 'Regimen Test',
        fechaDeInicioDeVigenciaDelCupo: '2023-01-01',
        fechaDeFinDeVigenciaDelCupo: '2023-12-31',
        fraccionesArancelarias: 'FA123',
        tratadoAcuerdo: 'Acuerdo Test',
        paises: 'Mexico',
      };

      const datos: DescripcionDelCupo = {} as DescripcionDelCupo;

      service.getDescripcionDelCupo(datos);

      const req = httpMock.expectOne('assets/json/120401/descripcion-del-cupo.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);

      expect(datos.claveDelCupo).toBe('123');
      expect(datos.mecanismoDeAsignacion).toBe('Directo');
      expect(datos.descripcionDelProducto).toBe('Producto Test');
    });
  });

  describe('getEntidad', () => {
    it('should fetch entidad data', () => {
      const mockResponse: Catalogo[] = [{ id: 1, descripcion: 'Entidad Test' }];

      service.getEntidad().subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('assets/json/120401/entidad_federativa.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getRepresentacion', () => {
    it('should fetch representacion data', () => {
      const mockResponse: Catalogo[] = [{ id: 1, descripcion: 'Representacion Test' }];

      service.getRepresentacion().subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('assets/json/120401/representacion_federal.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getProducto', () => {
    it('should fetch producto data', () => {
      const mockResponse: Catalogo[] = [{ id: 1, descripcion: 'Producto Test' }];

      service.getProducto().subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('assets/json/120401/nombre.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getSeleccionDelCupo', () => {
    it('should fetch seleccionDelCupo data', () => {
      const mockResponse: Catalogo[] = [{ id: 1, descripcion: 'Seleccion Test' }];

      service.getSeleccionDelCupo().subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('assets/json/120401/seleccion-del-cupo.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getRegimen', () => {
    it('should fetch regimen data', () => {
      const mockResponse: Catalogo[] = [{ id: 1, descripcion: 'Regimen Test' }];

      service.getRegimen().subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('assets/json/120401/regimen.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('getTratado', () => {
    it('should fetch tratado data', () => {
      const mockResponse: Catalogo[] = [{ id: 1, descripcion: 'Tratado Test' }];

      service.getTratado().subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('assets/json/120401/tratdos-dropdown.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('actualizarEstadoFormulario', () => {
    it('should update the store with the provided data', () => {
      const mockData: Partial<Catalogo[]> = [{ id: 1, descripcion: 'Test Data' }];

      service.actualizarEstadoFormulario(mockData);

      expect(tramite120401StoreMock.update).toHaveBeenCalledWith(expect.any(Function));
    });
  });

  describe('getRegistroTomaMuestrasMercanciasData', () => {
    it('should fetch registroTomaMuestrasMercanciasData data', () => {
      const mockResponse: Catalogo[] = [{ id: 1, descripcion: 'Registro Test' }];

      service.getRegistroTomaMuestrasMercanciasData().subscribe((data) => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('assets/json/120401/datosPrecargados.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });
});