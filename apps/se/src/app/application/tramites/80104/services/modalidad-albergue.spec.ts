import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import {
  AmpliacionServiciosResponse,
  CatalogoResponso,
  InfoServicios,
  PlantasSubfabricanteResponse
} from '../models/nuevo-programa-industrial.model';

import { RespuestaCatalogos } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { PlantasSubfabricante } from '../../../shared/models/empresas-subfabricanta.model';
import { DatosComplimentos } from '../../../shared/models/complimentos.model';
import { NuevoProgramaIndustrialService } from './modalidad-albergue.service';

describe('NuevoProgramaIndustrialService', () => {
  let service: NuevoProgramaIndustrialService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NuevoProgramaIndustrialService]
    });

    service = TestBed.inject(NuevoProgramaIndustrialService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('debería crear', () => {
    expect(service).toBeTruthy();
  });

  describe('getDatos', () => {
    it('Debería retornar infoServicios de ampliacion-servicios.json', () => {
      const mockResponse: AmpliacionServiciosResponse = {
        code: 200,
        data: {
          idsubmanufacturer: '123',
          infoServicios: {
            descripcion: 'Servicio de prueba',
            tipo: 'General',
            seleccionaLaModalidad: '',
            folio: '',
            ano: ''
          } as InfoServicios
        }
      };

      service.getDatos().subscribe(data => {
        expect(data).toEqual(mockResponse.data.infoServicios);
      });

      const req = httpMock.expectOne('assets/json/80205/ampliacion-servicios.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('obtenerIngresoSelectList', () => {
    it('Debería retornar la lista de catalogo de ampliacion-IMMEX-dropdown.json', () => {
      const mockResponse: CatalogoResponso = {
        code: 200,
        message: 'OK',
        data: [
          { id: 1, descripcion: 'Ingreso 1' },
          { id: 2, descripcion: 'Ingreso 2' }
        ]
      };

      service.obtenerIngresoSelectList().subscribe(data => {
        expect(data).toEqual(mockResponse.data);
      });

      const req = httpMock.expectOne('assets/json/80205/ampliacion-IMMEX-dropdown.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  describe('obtenerListaEstado', () => {
    it('debería retornar RespuestaCatalogos de estado-datos.json', () => {
      const mockResponse: RespuestaCatalogos = {
        code: 200,
        message: 'OK',
        data: [
          { id: 1, descripcion: 'México' },
          { id: 2, descripcion: 'Jalisco' }
        ]
      };

      service.obtenerListaEstado().subscribe(data => {
        expect(data).toEqual(mockResponse);
      });

      const req = httpMock.expectOne('assets/json/80207/estado-datos.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

it('debería manejar el error cuando getDatos falla', () => {
  const errorMsg = '404 Not Found';

  service.getDatos().subscribe({
    next: () => fail('expected an error, not data'),
    error: error => {
      expect(error.status).toBe(404);
    }
  });

  const req = httpMock.expectOne('assets/json/80205/ampliacion-servicios.json');
  req.flush(errorMsg, { status: 404, statusText: 'Not Found' });
});

it('debería manejar datos vacíos en obtenerIngresoSelectList', () => {
  const mockResponse: CatalogoResponso = { code: 200, message: 'OK', data: [] };

  service.obtenerIngresoSelectList().subscribe(data => {
    expect(data).toEqual([]);
    expect(data.length).toBe(0);
  });

  const req = httpMock.expectOne('assets/json/80205/ampliacion-IMMEX-dropdown.json');
  req.flush(mockResponse);
});

describe('getSubfabricantesDisponibles', () => {
    it('debería retornar la lista de subfabricantes de submanufactureras-disponibles-datos.json', () => {
      const mockResponse: PlantasSubfabricanteResponse = {
        code: 200,
        data: [
        {
            calle: 'Av. Reforma',
            numExterior: 123,
            numInterior: 4,
            codigoPostal: 11000,
            colonia: 'Centro'
        },
        {
            calle: 'Insurgentes',
            numExterior: 456,
            numInterior: 0,
            codigoPostal: 11300,
            colonia: 'Roma Norte'
        }
        ] as PlantasSubfabricante[]
      };

      service.getSubfabricantesDisponibles().subscribe(data => {
        expect(data).toEqual(mockResponse.data);
      });

      const req = httpMock.expectOne('assets/json/80207/submanufactureras-disponibles-datos.json');
      expect(req.request.method).toBe('GET');
      req.flush(mockResponse);
    });
  });

  it('debería retornar datos de complimentos', () => {
  const mockResponse: DatosComplimentos = {
    modalidad: 'Ampliación',
    programaPreOperativo: 'Sí',
    datosGeneralis: {
      paginaWWeb: 'https://empresa.com',
      localizacion: 'Ciudad de México'
    },
    obligacionesFiscales: {
      opinionPositiva: 'Vigente',
      fechaExpedicion: '2025-06-01',
      aceptarObligacionFiscal: 'Sí'
    },
    formaModificaciones: {
      nombreDelFederatario: 'Lic. Juan Pérez',
      nombreDeNotaria: 'Notaría 23',
      estado: 'CDMX',
      nombreDeActa: 'Acta Constitutiva',
      fechaDeActa: '2022-03-15',
      rfc: 'XAXX010101000',
      nombreDeRepresentante: 'Carlos Mendoza'
    },
    formaCertificacion: {
      certificada: 'Sí',
      fechaInicio: '2024-01-01',
      fechaVigencia: '2025-01-01'
    },
    formaSocioAccionistas: {
      nationalidadMaxicana: 'Sí',
      tipoDePersona: 'Moral',
      formaDatos: {
        socio1: 'Juan López',
        socio2: 'Ana García'
      }
    }
  };

  service.obtenerComplimentos().subscribe((res) => {
    expect(res).toEqual(mockResponse);
    expect(res.modalidad).toBe('Ampliación');
    expect(res.formaCertificacion.certificada).toBe('Sí');
    expect(res.formaSocioAccionistas.formaDatos['socio1']).toBe('Juan López');
  });

  const req = httpMock.expectOne('assets/json/80102/datos-complimentos.json');
  expect(req.request.method).toBe('GET');
  req.flush(mockResponse);
});



});
