import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NuevoProgramaIndustrialService } from './modalidad-albergue.service';
import {
  AmpliacionServiciosResponse,
  CatalogoResponso,
  InfoServicios,
  PlantasSubfabricanteResponse
} from '../models/nuevo-programa-industrial.model';
import { Catalogo, RespuestaCatalogos } from '@libs/shared/data-access-user/src/core/models/shared/catalogos.model';
import { DatosComplimentos } from '../../../shared/models/complimentos.model';
import { PlantasSubfabricante } from '../../../shared/models/empresas-subfabricanta.model';

describe('NuevoProgramaIndustrialService', () => {
  let service: NuevoProgramaIndustrialService;
  let httpMock: HttpTestingController;

  const MOCK_INFO_SERVICIOS: InfoServicios = {
    seleccionaLaModalidad: 'Servicios',
    folio: 'ABC123',
    ano: '2025'
  };

  const MOCK_CATALOGO: Catalogo[] = [
    { id: 1, descripcion: 'Jalisco' },
    { id: 2, descripcion: 'Nuevo León' }
  ];

  const MOCK_ESTADOS: RespuestaCatalogos = {
    code: 200,
    message: 'success',
    data: MOCK_CATALOGO
  };

  const MOCK_SUBFABRICANTES: PlantasSubfabricante[] = [
    {
      calle: 'Av Reforma',
      numExterior: 100,
      numInterior: 10,
      codigoPostal: 11000,
      colonia: 'Centro'
    }
  ];

  const MOCK_COMPLIMENTOS: DatosComplimentos = {
    modalidad: 'Servicios',
    programaPreOperativo: '',
    datosGeneralis: {
      paginaWWeb: '',
      localizacion: ''
    },
    obligacionesFiscales: {
      opinionPositiva: 'Si',
      fechaExpedicion: '2025-03-15',
      aceptarObligacionFiscal: ''
    },
    formaModificaciones: {
      nombreDelFederatario: '',
      nombreDeNotaria: '',
      estado: '',
      nombreDeActa: '',
      fechaDeActa: '2025-01-20',
      rfc: '',
      nombreDeRepresentante: 'Maria Lopez'
    },
    formaCertificacion: {
      certificada: 'No',
      fechaInicio: '',
      fechaVigencia: ''
    },
    formaSocioAccionistas: {
      nationalidadMaxicana: 'false',
      tipoDePersona: 'false',
      formaDatos: {
        rfc: '',
        taxId: '',
        razonSocial: '',
        pais: '',
        codigoPostal: '',
        estado: '',
        correoElectronico: '',
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        cp: ''
      }
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NuevoProgramaIndustrialService]
    });

    service = TestBed.inject(NuevoProgramaIndustrialService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch InfoServicios from ampliacion-servicios.json', () => {
    const mockResponse: AmpliacionServiciosResponse = {
      code: 200,
      data: {
        idsubmanufacturer: 'X123',
        infoServicios: MOCK_INFO_SERVICIOS
      }
    };

    service.getDatos().subscribe((result) => {
      expect(result).toEqual(MOCK_INFO_SERVICIOS);
    });

    const req = httpMock.expectOne('assets/json/80205/ampliacion-servicios.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch catalog options from ampliacion-IMMEX-dropdown.json', () => {
    const mockResponse: CatalogoResponso = {
      code: 200,
      message: 'success',
      data: MOCK_CATALOGO
    };

    service.obtenerIngresoSelectList().subscribe((result) => {
      expect(result).toEqual(MOCK_CATALOGO);
    });

    const req = httpMock.expectOne('assets/json/80205/ampliacion-IMMEX-dropdown.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch estados from estado-datos.json', () => {
    service.obtenerListaEstado().subscribe((result) => {
      expect(result).toEqual(MOCK_ESTADOS);
    });

    const req = httpMock.expectOne('assets/json/80207/estado-datos.json');
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_ESTADOS);
  });

  it('should fetch subfabricantes from submanufactureras-disponibles-datos.json', () => {
    const mockResponse: PlantasSubfabricanteResponse = {
      code: 200,
      data: MOCK_SUBFABRICANTES
    };

    service.getSubfabricantesDisponibles().subscribe((result) => {
      expect(result).toEqual(MOCK_SUBFABRICANTES);
    });

    const req = httpMock.expectOne('assets/json/80207/submanufactureras-disponibles-datos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch datos complimentos from datos-complimentos.json', () => {
    service.obtenerComplimentos().subscribe((result) => {
      expect(result).toEqual(MOCK_COMPLIMENTOS);
    });

    const req = httpMock.expectOne('assets/json/80102/datos-complimentos.json');
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_COMPLIMENTOS);
  });
});
