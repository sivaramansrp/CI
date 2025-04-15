import { TestBed } from '@angular/core/testing';
import { SolicitudDatosService } from '../services/solicitud-datos.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DatosDeSolicitud } from '../models/solicitud-datos.model';
import { Solicitud } from '../models/solicitud-datos.model';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { Mercancia } from '../models/mercancia.model';
import { ClavesDeLotes } from '../models/claves-de-lotes.model';
import { Destinatario } from '../models/destinatario.model';
import { Fabricante } from '../models/fabricante.model';
import { DestinatarioCatalogos } from '../models/destinatario.model';
import { MercanciaCatalogos } from '../models/mercancia.model';
import { MercanciaCrossList } from '../models/mercancia.model';
import { DestinatarioImitar } from '../models/mercancia.model';

describe('SolicitudDatosService', () => {
  let service: SolicitudDatosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SolicitudDatosService],
    });

    service = TestBed.inject(SolicitudDatosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no unmatched HTTP requests are outstanding
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch datos de solicitud', () => {
    const MOCK_DATA: DatosDeSolicitud = {
      tablaHeadData: ['Fecha creacion', 'Mercancia', 'Cantidad', 'Proveedor'],
      tablaFilaDatos: [
        {
          fechaCreacion: '2025-02018 13:17:57.0 ',
          mercancia: 'Grasa butrica Dashidratada...',
          cantidad: '10000',
          proovedor: 'AGRICOLA ALPE S DE RL DE CV',
          SCIANLista: {
            tableHeader: ['Clave S.C.I.A.N', 'Descripción del S.C.I.A.N.'],
            tableBody: [
              {
                tbodyData: [
                  '311321',
                  'Deshidratación  de productos agrícolas alimecticios.',
                ],
              },
              {
                tbodyData: [
                  '614074',
                  'Deshidratación  de productos agrícolas alimecticios.',
                ],
              },
            ],
          },
          mercancias: {
            tableHeader: [
              'CerClasificación del producto',
              'Especificar Clasificación del product',
              'Denominación específico del product',
              'Marca',
              'Fracción arancelaria',
              'Descripción de la frac',
            ],
            tableBody: [
              {
                tbodyData: [
                  'ALIMENTOS',
                  'Pastas, granos y semillas',
                  'test22',
                  'test',
                  '044509001',
                  'Grasa butirica desc',
                ],
              },
            ],
          },
        },
        {
          fechaCreacion: '2025-02018 13:17:57.0 ',
          mercancia: 'Grasa butrica Dashidratada...',
          cantidad: '10000',
          proovedor: 'AGRICOLA ALPE S DE RL DE CV',
          SCIANLista: {
            tableHeader: ['Clave S.C.I.A.N', 'Descripción del S.C.I.A.N.'],
            tableBody: [
              {
                tbodyData: [
                  '311321',
                  'Deshidratación  de productos agrícolas alimecticios.',
                ],
              },
              {
                tbodyData: [
                  '614074',
                  'Deshidratación  de productos agrícolas alimecticios.',
                ],
              },
            ],
          },
          mercancias: {
            tableHeader: [
              'CerClasificación del producto',
              'Especificar Clasificación del product',
              'Denominación específico del product',
              'Marca',
              'Fracción arancelaria',
              'Descripción de la frac',
            ],
            tableBody: [
              {
                tbodyData: [
                  'ALIMENTOS',
                  'Pastas, granos y semillas',
                  'test22',
                  'test',
                  '044509001',
                  'Grasa butirica desc',
                ],
              },
            ],
          },
        },
        {
          fechaCreacion: '2025-02018 13:17:57.0 ',
          mercancia: 'Grasa butrica Dashidratada...',
          cantidad: '10000',
          proovedor: 'AGRICOLA ALPE S DE RL DE CV',
          SCIANLista: {
            tableHeader: ['Clave S.C.I.A.N', 'Descripción del S.C.I.A.N.'],
            tableBody: [
              {
                tbodyData: [
                  '311321',
                  'Deshidratación  de productos agrícolas alimecticios.',
                ],
              },
              {
                tbodyData: [
                  '614074',
                  'Deshidratación  de productos agrícolas alimecticios.',
                ],
              },
            ],
          },
          mercancias: {
            tableHeader: [
              'CerClasificación del producto',
              'Especificar Clasificación del product',
              'Denominación específico del product',
              'Marca',
              'Fracción arancelaria',
              'Descripción de la frac',
            ],
            tableBody: [
              {
                tbodyData: [
                  'ALIMENTOS',
                  'Pastas, granos y semillas',
                  'test22',
                  'test',
                  '044509001',
                  'Grasa butirica desc',
                ],
              },
            ],
          },
        },
      ],
      hacerlosRadioOptions: [
        {
          label: 'No',
          value: 1,
        },
        {
          label: 'Sí',
          value: 2,
        },
      ],
    };

    service.obtenerDatosDeSolicitud().subscribe((data) => {
      expect(data).toEqual(MOCK_DATA);
    });

    const req = httpMock.expectOne(
      '../../../assets/json/260101/solicitud-datos.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_DATA);
  });

  it('should fetch solicitud', () => {
    const MOCK_SOLICITUD: Solicitud = {
      razonSocial: 'XYXYXYXYYX',
      correoElectronico: 'landa@gmail.com',
      codigoPostal: '62785',
      estado: 1,
      municipio: 'Zacatepec',
      localidad: 'Galeana',
      colonia: 'Vicente Guerrero',
      calle: 'Test',
      lada: 52,
      telefono: 2344786324,
      avisoDeFuncionamiento: 'false',
      licenciaSanitaria: '',
      liveFreshFrozen: 'false',
      regimen: 0,
      hacerlos: '',
      rfc: '',
      legalRazonSocial: 'Ruben',
      apellidoPaterno: 'landa',
      apellidoMeterno: 'Escudero',
      aduana: 1,
    };
    service.obtenerSolicitud().subscribe((data) => {
      expect(data).toEqual(MOCK_SOLICITUD);
    });

    const req = httpMock.expectOne(
      '../../../assets/json/260101/solicitud.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(MOCK_SOLICITUD);
  });

  it('should fetch regimen destinara listo', () => {
    const mockRegimen: CatalogosSelect = {
      labelNombre: 'Régimen al que se destinarán la mercancías',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'Definitivos',
        },
        {
          id: 2,
          descripcion: 'Depósito fiscal',
        },
        {
          id: 3,
          descripcion: 'Temporales',
        },
      ],
    };

    service.obtenerRegimenDestinaraListo().subscribe((data) => {
      expect(data).toEqual(mockRegimen);
    });

    const req = httpMock.expectOne(
      '../../../assets/json/260101/regimen-destinaran.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockRegimen);
  });

  it('should fetch aduana listo', () => {
    const mockAduana: CatalogosSelect = {
      labelNombre: 'Aduana',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'Aduana 1',
        },
        {
          id: 2,
          descripcion: 'Aduana 2',
        },
        {
          id: 3,
          descripcion: 'Aduana 3',
        },
      ],
    };

    service.obtenerAduanaListo().subscribe((data) => {
      expect(data).toEqual(mockAduana);
    });

    const req = httpMock.expectOne('../../../assets/json/260101/aduana.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockAduana);
  });

  it('should fetch estado catalogo', () => {
    const mockEstado: CatalogosSelect = {
      labelNombre: 'Estado',
      required: true,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'estado 1',
        },
        {
          id: 2,
          descripcion: 'estado 2',
        },
        {
          id: 3,
          descripcion: 'estado 3',
        },
      ],
    };

    service.obtenerEstadoCatalogo().subscribe((data) => {
      expect(data).toEqual(mockEstado);
    });

    const req = httpMock.expectOne(
      '../../../assets/json/260101/estado-catalogo.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockEstado);
  });

  it('should fetch mercancia listo', () => {
    const mockMercancia: Mercancia[] = [
      /* mock data */
    ];

    service.obtenerMercanciaListo().subscribe((data) => {
      expect(data).toEqual(mockMercancia);
    });

    const req = httpMock.expectOne(
      '../../../assets/json/260101/mercancia.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockMercancia);
  });

  it('should fetch claves de lotes listo', () => {
    const mockClaves: ClavesDeLotes[] = [
      /* mock data */
    ];

    service.obtenerClavesDeLotesListo().subscribe((data) => {
      expect(data).toEqual(mockClaves);
    });

    const req = httpMock.expectOne(
      '../../../assets/json/260101/claves-de-lotes.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockClaves);
  });

  it('should fetch destinatario listo', () => {
    const mockDestinatarios: Destinatario[] = [
      /* mock data */
    ];

    service.obtenerDestinatarioListo().subscribe((data) => {
      expect(data).toEqual(mockDestinatarios);
    });

    const req = httpMock.expectOne(
      '../../../assets/json/260101/destinatario.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockDestinatarios);
  });

  it('should fetch fabricante listo', () => {
    const mockFabricantes: Fabricante[] = [
      /* mock data */
    ];

    service.obtenerFabricanteListo().subscribe((data) => {
      expect(data).toEqual(mockFabricantes);
    });

    const req = httpMock.expectOne(
      '../../../assets/json/260101/fabricante.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockFabricantes);
  });

  it('should fetch destinatario catalogos', () => {
    const mockCatalogos: DestinatarioCatalogos = {
      paisCatalogo: {
        labelNombre: 'País',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Test 1',
          },
          {
            id: 1,
            descripcion: 'Test 2',
          },
        ],
      },
      estadoCatalogo: {
        labelNombre: 'Estado/localidad',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Test 1',
          },
          {
            id: 1,
            descripcion: 'Test 2',
          },
        ],
      },
      municipioCatalogo: {
        labelNombre: 'Municipio/alcaldía',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Test 1',
          },
          {
            id: 1,
            descripcion: 'Test 2',
          },
        ],
      },
      localidadCatalogo: {
        labelNombre: 'Localidad',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Test 1',
          },
          {
            id: 1,
            descripcion: 'Test 2',
          },
        ],
      },
      codigoCatalogo: {
        labelNombre: 'Código postal o equivalente',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Test 1',
          },
          {
            id: 1,
            descripcion: 'Test 2',
          },
        ],
      },
      coloniaCatalogo: {
        labelNombre: 'Colonia',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Test 1',
          },
          {
            id: 1,
            descripcion: 'Test 2',
          },
        ],
      },
    };
    service.obtenerDestinatarioCatalogos().subscribe((data) => {
      expect(data).toEqual(mockCatalogos);
    });

    const req = httpMock.expectOne(
      '../../../assets/json/260101/destinatario-catalogos.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCatalogos);
  });

  it('should fetch destinatario radio', () => {
    const mockRadio = [{ label: 'Option1', value: 1 }];

    service.obtenerDestinatarioRadio().subscribe((data) => {
      expect(data).toEqual(mockRadio);
    });

    const req = httpMock.expectOne(
      '../../../assets/json/260101/destinatario-radio.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockRadio);
  });

  it('should fetch mercancia catalogos', () => {
    const mockCatalogos: MercanciaCatalogos = {
      productosCatalogo: {
        labelNombre: 'Clasificación del producto',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Test 1',
          },
          {
            id: 2,
            descripcion: 'Test 2',
          },
        ],
      },
      especificarCatalogo: {
        labelNombre: 'Especificar Clasificación del producto',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Test 1',
          },
          {
            id: 2,
            descripcion: 'Test 2',
          },
        ],
      },
      tipoProductoCatalogo: {
        labelNombre: 'Tipo de producto',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Test 1',
          },
          {
            id: 2,
            descripcion: 'Test 2',
          },
        ],
      },
      umcCatalogo: {
        labelNombre: 'UMC',
        required: true,
        primerOpcion: 'Selecciona un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Test 1',
          },
          {
            id: 2,
            descripcion: 'Test 2',
          },
        ],
      },
    };
    service.obtenerMercanciaCatalogos().subscribe((data) => {
      expect(data).toEqual(mockCatalogos);
    });

    const req = httpMock.expectOne(
      '../../../assets/json/260101/mercancia-catalogos.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCatalogos);
  });

  it('should fetch crosslisto', () => {
    const mockCrossList: MercanciaCrossList = {
      paisOrigenCrossList: {
        label: {
          tituluDeLaIzquierda: 'Pais de origen',
          derecha: 'Pais(es) seleccionado(s)',
        },
        fechas: [
          'ANGUILA',
          'ANTARTIDA',
          'ALBANIA (REPUBLICA DE)',
          'ALEMANIA',
          'ANDORRA(PRINCIPADO DE)',
          'ANGOLA (REPUBLICA DE)',
          'ANTIGUA Y BARBUDDA',
        ],
      },
      paisProcedencisCrossList: {
        label: {
          tituluDeLaIzquierda: 'Pais de origen',
          derecha: 'Pais(es) seleccionado(s)',
        },
        fechas: [
          'ANGUILA',
          'ANTARTIDA',
          'ALBANIA (REPUBLICA DE)',
          'ALEMANIA',
          'ANDORRA(PRINCIPADO DE)',
          'ANGOLA (REPUBLICA DE)',
          'ANTIGUA Y BARBUDDA',
        ],
      },
      usoEspecificoCrossList: {
        label: {
          tituluDeLaIzquierda: 'Uso especifico:',
          derecha: 'Uso especifico seleccionado*:',
        },
        fechas: [
          'ANGUILA',
          'ANTARTIDA',
          'ALBANIA (REPUBLICA DE)',
          'ALEMANIA',
          'ANDORRA(PRINCIPADO DE)',
          'ANGOLA (REPUBLICA DE)',
          'ANTIGUA Y BARBUDDA',
        ],
      },
    };

    service.obtenerCrosslisto().subscribe((data) => {
      expect(data).toEqual(mockCrossList);
    });

    const req = httpMock.expectOne(
      '../../../assets/json/260101/mercancia-cross-list.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockCrossList);
  });

  it('should fetch pago derechos', () => {
    const mockPago: CatalogosSelect = {
      labelNombre: 'Banco',
      required: false,
      primerOpcion: 'Selecciona un valor',
      catalogos: [
        {
          id: 1,
          descripcion: 'Banco 1',
        },
        {
          id: 2,
          descripcion: 'Banco 2',
        },
        {
          id: 3,
          descripcion: 'Banco 3',
        },
      ],
    };
    service.obtenerPagoDerechos().subscribe((data) => {
      expect(data).toEqual(mockPago);
    });

    const req = httpMock.expectOne(
      '../../../assets/json/260101/pago-derechos.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockPago);
  });

  it('should fetch destinatario imitar', () => {
    const mockImitar: DestinatarioImitar = {
      tipoPersona: 'Física',
      modificarRFC: '',
      denominacion: 'John Doe Enterprises',
      domicilioPais: 1,
      domicilioEstado: 'Jalisco',
      domicilioMunicipio: 'Guadalajara',
      domicilioLocalidad: 'Zapopan',
      domicilioCodigo: '44100',
      domicilioColonia: 'Centro',
      domiciliCalle: 'Avenida Juárez',
      domiciliNumeroExterior: '123',
      domiciliNumeroInterior: '4B',
      domiciliLada: '+52',
      domiciliTelefono: '3312345678',
      domiciliCorreoElectronioco: 'johndoe@example.com',
    };

    service.obtenerDestinatarioImitar().subscribe((data) => {
      expect(data).toEqual(mockImitar);
    });

    const req = httpMock.expectOne(
      '../../../assets/json/260101/destinatario-mock.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockImitar);
  });
});
