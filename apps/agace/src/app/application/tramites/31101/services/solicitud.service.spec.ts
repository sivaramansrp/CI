import { TestBed } from '@angular/core/testing';

import { SolicitudService } from './solicitud.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

describe('SolicitudService', () => {
  let service: SolicitudService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SolicitudService],
    });
    service = TestBed.inject(SolicitudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch recibir notificaciones', () => {
    const mockData = [
      {
        rfc: 'GODE561231GR8',
        curp: 'GODE561231HDFRRN04',
        nombre: 'Juan',
        apellidoPaterno: 'Gómez',
        apellidoMaterno: 'Delgado',
      },
    ];
    service.conseguirRecibirNotificaciones().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(
      'assets/json/31101/recibir-notificaciones.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch modificacion denominacion razon social', () => {
    const mockData = {
      razonSocialAnterior: 'EQUIPOS ELECTRICOS GARCIA SA DE CV',
      razonSocialActual:
        'UNION DE PERMISIONARIOS VERACRUZ BOCA DEL RIO GRUPO LIBERTAD SA DE CV',
    };
    service.conseguirModificacionDenominacionRazonSocial().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(
      'assets/json/31101/modificacion-denominacion-razon-social.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch nombre institucion catalogo', () => {
    const mockData = {
      labelNombre: 'Datos de la póliza de fianza actual',
      required: false,
      primerOpcion: 'Seleccione un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'DORAMA, INSTITUCION DE GARANTIAS SA',
        },
        {
          id: 2,
          descripcion: 'DORAMA, INSTITUCION DE GARANTIAS SA - 1',
        },
      ],
    };
    service.conseguirNombreInstitucionCatalogo().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(
      'assets/json/31101/nombre-institucion-catalogo.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch datos por garantia', () => {
    const mockData = {
      polizaDeFianzaActual: 1,
      numeroFolio: '645456546',
      rfcInstitucion: 'FDO9411098R8',
      fechaExpedicion: '30/09/2024',
      fechaInicioVigenciaNo: '30/09/2024',
      fechaFinVigenciaNo: '30/09/2024',
      fechaInicioVigencia: '30/09/2024',
      fechaFinVigencia: '30/09/2024',
      importeTotal: '3213',
    };
    service.conseguirDatosPorGarantia().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/31101/datos-por-garantia.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch datos generales opcion de radio', () => {
    const mockData = {
      tipoDeEndoso: {
        radioOptions: [
          {
            label: 'Aumento de monto',
            value: 1,
          },
          {
            label: 'Aumento de monto y renovación/ampliación de vigencia',
            value: 2,
          },
          {
            label: 'Modificación de denominación o razórrsocial',
            value: 3,
          },
          {
            label: 'Renovación/ampliación de vigencia',
            value: 4,
          },
        ],
        isRequired: true,
      },
      tipoDeGarantia: {
        radioOptions: [
          {
            label: 'Fianza',
            value: 1,
          },
          {
            label: 'Carta de crédito',
            value: 2,
          },
        ],
        isRequired: true,
      },
      modalidadDeLaGarantia: {
        radioOptions: [
          {
            label: 'Garantía revolvente',
            value: 1,
          },
          {
            label: 'Garantía individual',
            value: 2,
          },
        ],
        isRequired: true,
      },
      tipoSector: {
        radioOptions: [
          {
            label: 'Sector productivo',
            value: 1,
          },
          {
            label: 'Sector servicio',
            value: 2,
          },
        ],
        isRequired: true,
      },
      requisitos: {
        radioOptions: [
          {
            label: 'Sí',
            value: 1,
          },
          {
            label: 'No',
            value: 2,
          },
        ],
        isRequired: true,
      },
    };
    service.conseguirDatosGeneralesOpcionDeRadio().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(
      'assets/json/31101/datos-generales-de-la-solicitud-radio-option.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch datos generales catalogo', () => {
    const mockData = {
      concepto: {
        labelNombre: 'Concepto',
        required: false,
        primerOpcion: 'Seleccione un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Fabricación de maquinaria y equipo',
          },
          {
            id: 2,
            descripcion: 'Fabricación de maquinaria y equipo - 1',
          },
        ],
      },
      tipoDeInversion: {
        labelNombre: 'Tipo de inversión',
        required: true,
        primerOpcion: 'Selecciona un tipo',
        catalogos: [
          {
            id: 1,
            descripcion: 'Test',
          },
          {
            id: 2,
            descripcion: 'Test - 1',
          },
        ],
      },
    };
    service.conseguirDatosGeneralesCatologo().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(
      'assets/json/31101/datos-generales-de-la-solicitud-catologo.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch lista de subcontratistas', () => {
    const mockData = [
      {
        rfc: 'MAHA790703QW5',
        razonSocial: 'ARTURO MATA HERNANDEZ',
      },
    ];
    service.conseguirListaDeSubcontratistas().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(
      'assets/json/31101/lista-de-subcontratistas.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch regimen aduanero', () => {
    const mockData = [
      'Importación temporal para elaboración, transformación o reparación en programas de maquila o de exportación (IMMEX)',
      'Depósito fiscal para someterse al proceso de ensamble y fabricación de vehículos a empresas de la industria automotriz terminal',
      'Elaboración, transformación o reparación en recinto fiscalizado',
      'Recinto fiscalizado estratégico',
    ];
    service.conseguirRegimenAduanero().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/31101/regimen-aduanero.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch miembros de la empresa', () => {
    const mockData = [
      {
        tipoPersonaMuestra: 'Física',
        nombreCompleto: 'Juan Pérez',
        rfc: 'PEJJ800101XXX',
        caracterDe: 'Representante Legal',
        nacionalidad: 'Mexicana',
        nombreEmpresa: 'Tecnologías Avanzadas SA de CV',
        tributarMexico: 'Sí',
        razonSocial: 'Tecnologías Avanzadas SA de CV',
      },
    ];
    service.conseguirMiembrosDeLaEmpresa().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(
      'assets/json/31101/miembros-de-la-empresa.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch tipo de inversion datos', () => {
    const mockData = [
      {
        idRegistro: 'INV12345',
        tipoInversion: 'Bienes Inmuebles',
        descripcion: 'Departamento en Ciudad de México',
        valor: '2500000',
        cveTipoInversion: 'BI01',
      },
    ];
    service.conseguirTipoDeInversionDatos().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(
      'assets/json/31101/tipo-de-inversion-datos.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch domicilios', () => {
    const mockData = [
      {
        instalacionPrincipal: 'Planta Norte',
        cveTipoInstalacion: '01',
        tipoInstalacion: 'Fábrica',
        cveEntidadFederativa: '09',
        entidadFederativa: 'Ciudad de México',
        cveDelegacionMunicipio: '010',
        municipioDelegacion: 'Gustavo A. Madero',
        direccion: 'Av. Central 123',
        codigoPostal: '07760',
        registroSESAT: 'SESAT-456789',
        procesoProductivo: 'Fabricación de electrónicos',
        fechaModificacion: '2025-04-18',
        cveEstatus: 'A1',
        estatus: 'Activo',
        noExterior: '123',
        noInterior: '5B',
        cveColonia: '025',
        calle: 'Av. Central',
        descCol: 'Colonia Industrial',
        idRecinto: 'RC-998877',
        numFolioAcuse: 'FA-20250418-01',
        observaciones: 'Instalación con verificación reciente.',
      },
    ];
    service.conseguirDomicilios().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('assets/json/31101/domicilios.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
