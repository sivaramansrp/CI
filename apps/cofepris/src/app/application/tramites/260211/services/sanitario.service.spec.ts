import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SanitarioService } from './sanitario.service';
import { Tramite260211Store } from '../../../estados/tramites/tramite260211.store';
import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { MercanciasTabla, RespuestaTabla } from '../components/domicillo/domicillo.component';
import { Solicitud260211State } from '../../../estados/tramites/tramite260211.store';
import { ProductoResponse } from '../models/permiso-sanitario.enum';
import { of, throwError } from 'rxjs';

describe('SanitarioService', () => {
  let service: SanitarioService;
  let httpMock: HttpTestingController;
  let tramite260211StoreMock: jest.Mocked<Tramite260211Store>;

  beforeEach(() => {
    const tramiteStoreSpy = {
      setRfcResponsableSanitario: jest.fn(),
      setDenominacion: jest.fn(),
      setCorreo: jest.fn(),
      setCodigoPostal: jest.fn(),
      setEstado: jest.fn(),
      setMuncipio: jest.fn(),
      setLocalidad: jest.fn(),
      setColonia: jest.fn(),
      setCalle: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setClaveScianModal: jest.fn(),
      setClaveDescripcionModal: jest.fn(),
      setAvisoCheckbox: jest.fn(),
      setLicenciaSanitaria: jest.fn(),
      setRegimen: jest.fn(),
      setAduanasEntradas: jest.fn(),
      setNumeroPermiso: jest.fn(),
      setClasificacion: jest.fn(),
      setEspecificarClasificacionProducto: jest.fn(),
      setDenominacionEspecifica: jest.fn(),
      setDenominacionDistintiva: jest.fn(),
      setDenominacionComun: jest.fn(),
      setTipoDeProducto: jest.fn(),
      setEstadoFisico: jest.fn(),
      setFraccionArancelaria: jest.fn(),
      setDescripcionFraccion: jest.fn(),
      setCantidadUMT: jest.fn(),
      setUMT: jest.fn(),
      setCantidadUMC: jest.fn(),
      setUMC: jest.fn(),
      setPresentacion: jest.fn(),
      setNumeroRegistro: jest.fn(),
      setFechaCaducidad: jest.fn(),
      setCumplimiento: jest.fn(),
      setRfc: jest.fn(),
      setNombre: jest.fn(),
      setApellidoPaterno: jest.fn(),
      setApellidoMaterno: jest.fn(),
      setreferencia: jest.fn(),
      setcadenaDependencia: jest.fn(),
      setbanco: jest.fn(),
      setLlave: jest.fn(),
      settipoFetch: jest.fn(),
      setimporte: jest.fn(),
      setMensaje: jest.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SanitarioService,
        { provide: Tramite260211Store, useValue: tramiteStoreSpy }
      ]
    });

    service = TestBed.inject(SanitarioService);
    httpMock = TestBed.inject(HttpTestingController);
    tramite260211StoreMock = TestBed.inject(Tramite260211Store) as jest.Mocked<Tramite260211Store>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería ser creado', () => {
    expect(service).toBeTruthy();
  });

  describe('getSolicitudData', () => {
    it('debería retornar datos de solicitud desde archivo JSON', () => {
      const mockSolicitudData: Solicitud260211State = {
        rfcResponsableSanitario: 'RFC123456789',
        denominacion: 'Test Denominacion',
        correo: 'test@example.com',
        codigoPostal: '12345',
        estado: 'Estado Test',
        muncipio: 'Municipio Test',
        localidad: 'Localidad Test',
        colonia: 'Colonia Test',
        calle: 'Calle Test',
        lada: '555',
        telefono: '1234567',
        claveScianModal: 'SCIAN123',
        claveDescripcionModal: 'Descripcion Test',
        avisoCheckbox: true,
        licenciaSanitaria: 'LS123',
        regimen: 'Regimen Test',
        aduanasEntradas: 'Aduana Test',
        numeroPermiso: 'PERM123',
        clasificacion: 'Clasificacion Test',
        especificarClasificacionProducto: 'Especificacion Test',
        denominacionEspecifica: 'Den Especifica',
        denominacionDistintiva: 'Den Distintiva',
        denominacionComun: 'Den Comun',
        tipoDeProducto: 'Tipo Test',
        estadoFisico: 'Estado Fisico Test',
        fraccionArancelaria: 'FA123',
        descripcionFraccion: 'Descripcion Fraccion',
        cantidadUMT: '100',
        UMT: 'KG',
        cantidadUMC: '50',
        UMC: 'PZ',
        presentacion: 'Presentacion Test',
        numeroRegistro: 'REG123',
        fechaCaducidad: '2025-12-31',
        cumplimiento: 'Cumplimiento Test',
        rfc: 'RFC987654321',
        nombre: 'Nombre Test',
        apellidoPaterno: 'Apellido Paterno',
        apellidoMaterno: 'Apellido Materno',
        referencia: 'Referencia Test',
        cadenaDependencia: 'Cadena Test',
        banco: 'Banco Test',
        Llave: 'Llave123',
        deFetch: 'Fetch Test',
        importe: '1000',
        mensaje: false
      };

      service.getSolicitudData().subscribe(data => {
        expect(data).toEqual(mockSolicitudData);
      });

      const req = httpMock.expectOne('assets/json/260211/solicitude_data.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockSolicitudData);
    });
  });

  describe('getDatos', () => {
    it('debería retornar datos desde archivo JSON', () => {
      const mockDatos = { data: 'test data' };

      service.getDatos().subscribe(data => {
        expect(data).toEqual(mockDatos);
      });

      const req = httpMock.expectOne('assets/json/260211/derechos.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockDatos);
    });

    it('debería manejar error al obtener datos', () => {
      const errorMessage = 'Network error';

      service.getDatos().subscribe({
        next: () => {
          throw new Error('should have failed with network error');
        },
        error: (error) => {
          expect(error).toBeTruthy();
        }
      });

      const req = httpMock.expectOne('assets/json/260211/derechos.json');
      req.error(new ErrorEvent(errorMessage));
    });
  });

  describe('getProveedordata', () => {
    it('debería retornar datos de proveedor desde archivo JSON', () => {
      const mockProveedorData = { proveedor: 'test proveedor' };

      service.getProveedordata().subscribe(data => {
        expect(data).toEqual(mockProveedorData);
      });

      const req = httpMock.expectOne('assets/json/260211/proveedor.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockProveedorData);
    });

    it('debería manejar error al obtener datos de proveedor', () => {
      const errorMessage = 'Network error';

      service.getProveedordata().subscribe({
        next: () => {
          throw new Error('should have failed with network error');
        },
        error: (error) => {
          expect(error).toBeTruthy();
        }
      });

      const req = httpMock.expectOne('assets/json/260211/proveedor.json');
      req.error(new ErrorEvent(errorMessage));
    });
  });

  describe('getLocalidaddata', () => {
    it('debería retornar datos de localidad desde archivo JSON', () => {
      const mockLocalidadData = { localidad: 'test localidad' };

      service.getLocalidaddata().subscribe(data => {
        expect(data).toEqual(mockLocalidadData);
      });

      const req = httpMock.expectOne('assets/json/260211/estadolocalidad.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockLocalidadData);
    });

    it('debería manejar error al obtener datos de localidad', () => {
      const errorMessage = 'Network error';

      service.getLocalidaddata().subscribe({
        next: () => {
          throw new Error('should have failed with network error');
        },
        error: (error) => {
          expect(error).toBeTruthy();
        }
      });

      const req = httpMock.expectOne('assets/json/260211/estadolocalidad.json');
      req.error(new ErrorEvent(errorMessage));
    });
  });

  describe('getData', () => {
    it('debería retornar datos de catálogo desde archivo JSON', () => {
      const mockCatalogos: Catalogo[] = [
        { id: 1, descripcion: 'Catalogo 1' },
        { id: 2, descripcion: 'Catalogo 2' }
      ];

      service.getData().subscribe(data => {
        expect(data).toEqual(mockCatalogos);
        expect(data.length).toBe(2);
      });

      const req = httpMock.expectOne('assets/json/260211/terceros-relacionadoes.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockCatalogos);
    });
  });

  describe('getPermisoData', () => {
    it('debería retornar datos de permiso desde archivo JSON', () => {
      const mockPermisoData: ProductoResponse[] = [
        { label: 'Producto 1', value: 'producto1' },
        { label: 'Producto 2', value: 'producto2' }
      ];

      service.getPermisoData().subscribe(data => {
        expect(data).toEqual(mockPermisoData);
        expect(data.length).toBe(2);
      });

      const req = httpMock.expectOne('assets/json/260211/terceros-solicitute.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockPermisoData);
    });
  });

  describe('obtenerEstadoList', () => {
    it('debería retornar lista de estados desde archivo JSON', () => {
      const mockRespuestaCatalogos: RespuestaCatalogos = {
        code: 200,
        data: [
          { id: 1, descripcion: 'Estado 1' },
          { id: 2, descripcion: 'Estado 2' }
        ],
        message: 'Success'
      };

      service.obtenerEstadoList().subscribe(data => {
        expect(data).toEqual(mockRespuestaCatalogos);
      });

      const req = httpMock.expectOne('assets/json/260211/seleccion.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockRespuestaCatalogos);
    });
  });

  describe('obtenerTablaDatos', () => {
    it('debería retornar datos de tabla desde archivo JSON', () => {
      const mockRespuestaTabla: RespuestaTabla = {
        código: 200,
        datos: [
          { clave_Scian: '1', descripcion_Scian: 'Descripcion 1' },
          { clave_Scian: '2', descripcion_Scian: 'Descripcion 2' }
        ],
        mensaje: 'Success'
      };

      service.obtenerTablaDatos().subscribe(data => {
        expect(data).toEqual(mockRespuestaTabla);
      });

      const req = httpMock.expectOne('assets/json/260211/tablaDatos.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockRespuestaTabla);
    });
  });

  describe('obtenerMercanciasDatos', () => {
    it('debería retornar datos de mercancías desde archivo JSON', () => {
      const mockMercanciasTabla: MercanciasTabla = {
        código: 200,
        datos: [
          { 
            clasificacion: 'Clasificacion 1',
            especificar: 'Especificacion 1',
            denominacionEspecifica: 'Den Especifica 1',
            denominacionDistintiva: 'Den Distintiva 1',
            denominacionComun: 'Den Comun 1',
            formaFarmaceutica: 'Forma 1',
            estadoFisico: 'Estado 1',
            fraccionArancelaria: 'FA001',
            descripcionFraccion: 'Desc Fraccion 1',
            unidad: 'KG',
            cantidadUMC: '10',
            unidadUMT: 'PZ',
            cantidadUMT: '5',
            presentacion: 'Presentacion 1',
            numeroRegistro: 'REG001',
            paisDeOrigen: 'Mexico',
            paisDeProcedencia: 'Mexico',
            tipoProducto: 'Tipo 1',
            usoEspecifico: 'Uso 1',
            fechaCaducidad: '2025-12-31'
          }
        ],
        mensaje: 'Success'
      };

      service.obtenerMercanciasDatos().subscribe(data => {
        expect(data).toEqual(mockMercanciasTabla);
      });

      const req = httpMock.expectOne('assets/json/260211/mercanciasDatos.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockMercanciasTabla);
    });
  });

  describe('actualizarEstadoFormulario', () => {
    it('debería actualizar el estado del formulario con los datos proporcionados', () => {
      const mockDatos: Solicitud260211State = {
        rfcResponsableSanitario: 'RFC123456789',
        denominacion: 'Test Denominacion',
        correo: 'test@example.com',
        codigoPostal: '12345',
        estado: 'Estado Test',
        muncipio: 'Municipio Test',
        localidad: 'Localidad Test',
        colonia: 'Colonia Test',
        calle: 'Calle Test',
        lada: '555',
        telefono: '1234567',
        claveScianModal: 'SCIAN123',
        claveDescripcionModal: 'Descripcion Test',
        avisoCheckbox: true,
        licenciaSanitaria: 'LS123',
        regimen: 'Regimen Test',
        aduanasEntradas: 'Aduana Test',
        numeroPermiso: 'PERM123',
        clasificacion: 'Clasificacion Test',
        especificarClasificacionProducto: 'Especificacion Test',
        denominacionEspecifica: 'Den Especifica',
        denominacionDistintiva: 'Den Distintiva',
        denominacionComun: 'Den Comun',
        tipoDeProducto: 'Tipo Test',
        estadoFisico: 'Estado Fisico Test',
        fraccionArancelaria: 'FA123',
        descripcionFraccion: 'Descripcion Fraccion',
        cantidadUMT: '100',
        UMT: 'KG',
        cantidadUMC: '50',
        UMC: 'PZ',
        presentacion: 'Presentacion Test',
        numeroRegistro: 'REG123',
        fechaCaducidad: '2025-12-31',
        cumplimiento: 'Cumplimiento Test',
        rfc: 'RFC987654321',
        nombre: 'Nombre Test',
        apellidoPaterno: 'Apellido Paterno',
        apellidoMaterno: 'Apellido Materno',
        referencia: 'Referencia Test',
        cadenaDependencia: 'Cadena Test',
        banco: 'Banco Test',
        Llave: 'Llave123',
        deFetch: 'Fetch Test',
        importe: '1000',
        mensaje: false
      };

      service.actualizarEstadoFormulario(mockDatos);

      expect(tramite260211StoreMock.setRfcResponsableSanitario).toHaveBeenCalledWith(mockDatos.rfcResponsableSanitario);
      expect(tramite260211StoreMock.setDenominacion).toHaveBeenCalledWith(mockDatos.denominacion);
      expect(tramite260211StoreMock.setCorreo).toHaveBeenCalledWith(mockDatos.correo);
      expect(tramite260211StoreMock.setCodigoPostal).toHaveBeenCalledWith(mockDatos.codigoPostal);
      expect(tramite260211StoreMock.setEstado).toHaveBeenCalledWith(mockDatos.estado);
      expect(tramite260211StoreMock.setMuncipio).toHaveBeenCalledWith(mockDatos.muncipio);
      expect(tramite260211StoreMock.setLocalidad).toHaveBeenCalledWith(mockDatos.localidad);
      expect(tramite260211StoreMock.setColonia).toHaveBeenCalledWith(mockDatos.colonia);
      expect(tramite260211StoreMock.setCalle).toHaveBeenCalledWith(mockDatos.calle);
      expect(tramite260211StoreMock.setLada).toHaveBeenCalledWith(mockDatos.lada);
      expect(tramite260211StoreMock.setTelefono).toHaveBeenCalledWith(mockDatos.telefono);
      expect(tramite260211StoreMock.setClaveScianModal).toHaveBeenCalledWith(mockDatos.claveScianModal);
      expect(tramite260211StoreMock.setClaveDescripcionModal).toHaveBeenCalledWith(mockDatos.claveDescripcionModal);
      expect(tramite260211StoreMock.setAvisoCheckbox).toHaveBeenCalledWith(mockDatos.avisoCheckbox);
      expect(tramite260211StoreMock.setLicenciaSanitaria).toHaveBeenCalledWith(mockDatos.licenciaSanitaria);
      expect(tramite260211StoreMock.setRegimen).toHaveBeenCalledWith(mockDatos.regimen);
      expect(tramite260211StoreMock.setAduanasEntradas).toHaveBeenCalledWith(mockDatos.aduanasEntradas);
      expect(tramite260211StoreMock.setNumeroPermiso).toHaveBeenCalledWith(mockDatos.numeroPermiso);
      expect(tramite260211StoreMock.setClasificacion).toHaveBeenCalledWith(mockDatos.clasificacion);
      expect(tramite260211StoreMock.setEspecificarClasificacionProducto).toHaveBeenCalledWith(mockDatos.especificarClasificacionProducto);
      expect(tramite260211StoreMock.setDenominacionEspecifica).toHaveBeenCalledWith(mockDatos.denominacionEspecifica);
      expect(tramite260211StoreMock.setDenominacionDistintiva).toHaveBeenCalledWith(mockDatos.denominacionDistintiva);
      expect(tramite260211StoreMock.setDenominacionComun).toHaveBeenCalledWith(mockDatos.denominacionComun);
      expect(tramite260211StoreMock.setTipoDeProducto).toHaveBeenCalledWith(mockDatos.tipoDeProducto);
      expect(tramite260211StoreMock.setEstadoFisico).toHaveBeenCalledWith(mockDatos.estadoFisico);
      expect(tramite260211StoreMock.setFraccionArancelaria).toHaveBeenCalledWith(mockDatos.fraccionArancelaria);
      expect(tramite260211StoreMock.setDescripcionFraccion).toHaveBeenCalledWith(mockDatos.descripcionFraccion);
      expect(tramite260211StoreMock.setCantidadUMT).toHaveBeenCalledWith(mockDatos.cantidadUMT);
      expect(tramite260211StoreMock.setUMT).toHaveBeenCalledWith(mockDatos.UMT);
      expect(tramite260211StoreMock.setCantidadUMC).toHaveBeenCalledWith(mockDatos.cantidadUMC);
      expect(tramite260211StoreMock.setUMC).toHaveBeenCalledWith(mockDatos.UMC);
      expect(tramite260211StoreMock.setPresentacion).toHaveBeenCalledWith(mockDatos.presentacion);
      expect(tramite260211StoreMock.setNumeroRegistro).toHaveBeenCalledWith(mockDatos.numeroRegistro);
      expect(tramite260211StoreMock.setFechaCaducidad).toHaveBeenCalledWith(mockDatos.fechaCaducidad);
      expect(tramite260211StoreMock.setCumplimiento).toHaveBeenCalledWith(mockDatos.cumplimiento);
      expect(tramite260211StoreMock.setRfc).toHaveBeenCalledWith(mockDatos.rfc);
      expect(tramite260211StoreMock.setNombre).toHaveBeenCalledWith(mockDatos.nombre);
      expect(tramite260211StoreMock.setApellidoPaterno).toHaveBeenCalledWith(mockDatos.apellidoPaterno);
      expect(tramite260211StoreMock.setApellidoMaterno).toHaveBeenCalledWith(mockDatos.apellidoMaterno);
      expect(tramite260211StoreMock.setreferencia).toHaveBeenCalledWith(mockDatos.referencia);
      expect(tramite260211StoreMock.setcadenaDependencia).toHaveBeenCalledWith(mockDatos.cadenaDependencia);
      expect(tramite260211StoreMock.setbanco).toHaveBeenCalledWith(mockDatos.banco);
      expect(tramite260211StoreMock.setLlave).toHaveBeenCalledWith(mockDatos.Llave);
      expect(tramite260211StoreMock.settipoFetch).toHaveBeenCalledWith(mockDatos.deFetch);
      expect(tramite260211StoreMock.setimporte).toHaveBeenCalledWith(mockDatos.importe);
    });

    it('debería manejar datos parciales al actualizar el estado del formulario', () => {
      const mockPartialDatos: Partial<Solicitud260211State> = {
        rfcResponsableSanitario: 'RFC123456789',
        denominacion: 'Test Denominacion',
        correo: 'test@example.com'
      };

      service.actualizarEstadoFormulario(mockPartialDatos as Solicitud260211State);

      expect(tramite260211StoreMock.setRfcResponsableSanitario).toHaveBeenCalledWith(mockPartialDatos.rfcResponsableSanitario);
      expect(tramite260211StoreMock.setDenominacion).toHaveBeenCalledWith(mockPartialDatos.denominacion);
      expect(tramite260211StoreMock.setCorreo).toHaveBeenCalledWith(mockPartialDatos.correo);
    });
  });

  describe('Manejo de Errores', () => {
    it('debería manejar errores HTTP de manera elegante para todos los métodos GET', () => {
      const methods = [
        { method: 'getSolicitudData', url: 'assets/json/260211/solicitude_data.json' },
        { method: 'getDatos', url: 'assets/json/260211/derechos.json' },
        { method: 'getProveedordata', url: 'assets/json/260211/proveedor.json' },
        { method: 'getLocalidaddata', url: 'assets/json/260211/estadolocalidad.json' },
        { method: 'getData', url: 'assets/json/260211/terceros-relacionadoes.json' },
        { method: 'getPermisoData', url: 'assets/json/260211/terceros-solicitute.json' },
        { method: 'obtenerEstadoList', url: 'assets/json/260211/seleccion.json' },
        { method: 'obtenerTablaDatos', url: 'assets/json/260211/tablaDatos.json' },
        { method: 'obtenerMercanciasDatos', url: 'assets/json/260211/mercanciasDatos.json' }
      ];

      methods.forEach(({ method, url }) => {
        (service as any)[method]().subscribe({
          next: () => {
            throw new Error(`${method} should have failed with 404 error`);
          },
          error: (error: any) => {
            expect(error).toBeTruthy();
          }
        });

        const req = httpMock.expectOne(url);
        req.flush('Not Found', { status: 404, statusText: 'Not Found' });
      });
    });
  });
});