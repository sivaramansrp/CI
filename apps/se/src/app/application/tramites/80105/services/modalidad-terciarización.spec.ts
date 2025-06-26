import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { DatosComplimentos } from '../../../shared/models/complimentos.model';
import { PlantasSubfabricante } from '../../../shared/models/empresas-subfabricanta.model';
import { InfoServicios } from '../models/nuevo-programa-industrial.model';
import { NuevoProgramaIndustrialService } from './modalidad-terciarización.service';

describe('NuevoProgramaIndustrialService', () => {
  let service: NuevoProgramaIndustrialService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NuevoProgramaIndustrialService],
    });

    service = TestBed.inject(NuevoProgramaIndustrialService);

    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch ingreso select list from ampliacion-IMMEX-dropdown.json', () => {
    const mockCatalogos: Catalogo[] = [
      { id: 1, descripcion: 'Opción A' },
      { id: 2, descripcion: 'Opción B' },
    ];

    service.obtenerIngresoSelectList().subscribe((data) => {
      expect(data).toEqual(mockCatalogos);
    });

    const req = httpMock.expectOne('assets/json/80205/ampliacion-IMMEX-dropdown.json');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockCatalogos });
  });

  it('should fetch lista estado from estado-datos.json', () => {
    const mockEstado: RespuestaCatalogos = {
      code: 200,
      data: [
        { id: 1, descripcion: 'CDMX' },
        { id: 2, descripcion: 'Jalisco' },
      ],
      message: 'Éxito',
    };

    service.obtenerListaEstado().subscribe((data) => {
      expect(data).toEqual(mockEstado);
    });

    const req = httpMock.expectOne('assets/json/80207/estado-datos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockEstado);
  });

  it('should fetch subfabricantes disponibles', () => {
    const mockSubfabricantes: PlantasSubfabricante[] = [
      {
        calle: 'Insurgentes',
        numExterior: 100,
        numInterior: 2,
        codigoPostal: 12345,
        colonia: 'Del Valle',
      },
    ];

    service.getSubfabricantesDisponibles().subscribe((data) => {
      expect(data).toEqual(mockSubfabricantes);
    });

    const req = httpMock.expectOne('assets/json/80207/submanufactureras-disponibles-datos.json');
    expect(req.request.method).toBe('GET');
    req.flush({ data: mockSubfabricantes });
  });

  it('should fetch datos complimentos from datos-complimentos.json', () => {
    const mockComplimentos: DatosComplimentos = {
      modalidad: 'Nueva',
      programaPreOperativo: 'Sí',
      datosGeneralis: {
        paginaWWeb: 'https://empresa.mx',
        localizacion: 'Querétaro',
      },
      obligacionesFiscales: {
        opinionPositiva: 'Sí',
        fechaExpedicion: '2025-01-01',
        aceptarObligacionFiscal: 'Sí',
      },
      formaModificaciones: {
        nombreDelFederatario: 'Juan Pérez',
        nombreDeNotaria: 'Notaría 12',
        estado: 'CDMX',
        nombreDeActa: 'Acta A',
        fechaDeActa: '2024-12-15',
        rfc: 'ABC123456XYZ',
        nombreDeRepresentante: 'Carlos López',
      },
      formaCertificacion: {
        certificada: 'Sí',
        fechaInicio: '2024-01-01',
        fechaVigencia: '2026-01-01',
      },
      formaSocioAccionistas: {
        nationalidadMaxicana: 'Sí',
        tipoDePersona: 'Moral',
        formaDatos: {
          socio1: 'Juan',
          socio2: 'Ana',
        },
      },
    };

    service.obtenerComplimentos().subscribe((data) => {
      expect(data).toEqual(mockComplimentos);
    });

    const req = httpMock.expectOne('assets/json/80102/datos-complimentos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockComplimentos);
  });

  it('should fetch estados catalogo from empresas.json', () => {
  const mockCatalogo: Catalogo = { id: 1, descripcion: 'Estado de México' };

  service.getEstadosCatalogo().subscribe((data) => {
    expect(data).toEqual(mockCatalogo);
  });

  const req = httpMock.expectOne('assets/json/80105/empresas.json');
  expect(req.request.method).toBe('GET');
  req.flush(mockCatalogo);
});

it('should handle HTTP error for obtenerIngresoSelectList gracefully', () => {
  const errorMessage = '404 Not Found';

  service.obtenerIngresoSelectList().subscribe({
    next: () => fail('Expected error, but got success response'),
    error: (error) => {
      expect(error.status).toBe(404);
      expect(error.statusText).toBe('Not Found');
    },
  });

  const req = httpMock.expectOne('assets/json/80205/ampliacion-IMMEX-dropdown.json');
  expect(req.request.method).toBe('GET');
  req.flush(errorMessage, {
    status: 404,
    statusText: 'Not Found',
  });
});

});
