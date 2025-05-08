import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SolicitudService } from './solicitud.service';
import {
  EnlaceOperativo,
  Inventarios,
  RecibirNotificaciones,
  RepresentanteLegal,
  SeccionSubcontratados,
  SolicitudCatologoSelectLista,
  SolicitudRadioLista,
  TransportistasTable,
} from '../models/solicitud.model';

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

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch recibir notificaciones', (done) => {
    const mockData: RecibirNotificaciones[] = [
      {
        rfc: 'LEQI8101314S7',
        curp: 'LEQI810131HDGSXG05',
        nombre: 'MISAEL',
        apellidoPaterno: 'BARRAGAN',
        apellidoMaterno: 'RUIZ',
      },
      {
        rfc: 'MAJIth621207C95',
        curp: 'MAVL621207HDGRLS06',
        nombre: 'EUROFOODS DE MEXICO',
        apellidoPaterno: 'GONZALEZ',
        apellidoMaterno: 'PINAL',
      },
    ];
    service.conseguirRecibirNotificaciones().subscribe((data) => {
      expect(data).toEqual(mockData);
      done();
    });
    const req = httpMock.expectOne(
      'assets/json/32605/recibir-notificaciones.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch enlace operativo datos', (done) => {
    const mockData: EnlaceOperativo[] = [
      {
        rfc: 'ABC123456XYZ',
        nombre: 'Juan',
        apellidoPaterno: 'Pérez',
        apellidoMaterno: 'Gómez',
        claveCiudad: '001',
        ciudad: 'Ciudad de México',
        cargo: 'Gerente',
        telefono: '+52 55 1234 5678',
        correo: 'juan.perez@example.com',
        suplente: 'Maria López',
        calle: 'Avenida Reforma',
        numeroExterior: '123',
        numeroInterior: '4B',
        colonia: 'Centro',
        codigoPostal: '01000',
        localidad: 'Ciudad de México',
        delegacionMunicipio: 'Cuauhtémoc',
      },
    ];
    service.conseguirEnlaceOperativoDatos().subscribe((data) => {
      expect(data).toEqual(mockData);
      done();
    });
    const req = httpMock.expectOne(
      'assets/json/32605/enlace-operativo-datos.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch representante legal datos', (done) => {
    const mockData: RepresentanteLegal = {
      rfcTercero: 'ZURC721023D12',
      rfc: 'ZURC721023D12',
      nombre: 'ROBERTO CARLOS',
      apellidoPaterno: 'CRUZ',
      apellidoMaterno: 'VELAZQUEZ',
      telefono: '22234323',
      correoElectronico: 'vucem2.5@hotmail.com',
    };
    service.conseguirRepresentanteLegalDatos().subscribe((data) => {
      expect(data).toEqual(mockData);
      done();
    });
    const req = httpMock.expectOne(
      'assets/json/32605/representante-legal-datos.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch opcion de radio', (done) => {
    const mockData: SolicitudRadioLista = {
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
      reconocimientoMutuo: {
        radioOptions: [
          {
            label: 'Sí Autorizo',
            value: 1,
          },
          {
            label: 'No Autorizo',
            value: 2,
          },
        ],
        isRequired: true,
      },
      clasificacionInformacion: {
        radioOptions: [
          {
            label: 'Pública',
            value: 1,
          },
          {
            label: 'Privada',
            value: 2,
          },
        ],
        isRequired: true,
      },
    };
    service.conseguirOpcionDeRadio().subscribe((data) => {
      expect(data).toEqual(mockData);
      done();
    });
    const req = httpMock.expectOne(
      'assets/json/32605/solicitud-radio-lista.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch transportistas lista', (done) => {
    const mockData: TransportistasTable[] = [
      {
        rfc: 'AAL0409235E6',
        razonSocial: 'INTEGRADORA DE URBANIZACIONES SIGNUM S DE RL DE CV',
        domicilio:
          'CAMINO VIEJO 1353 81210 LOS MOCHIS MIGUEL HIDALGO AHOME SINALOA ESTADOS UNIDOS MEXICANOS',
        caat: '3CJD',
      },
    ];
    service.conseguirTransportistasLista().subscribe((data) => {
      expect(data).toEqual(mockData);
      done();
    });
    const req = httpMock.expectOne(
      'assets/json/32605/transportistas-lista.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch solicitud catalogo select lista', (done) => {
    const mockData: SolicitudCatologoSelectLista = {
      sectorProductivo: {
        labelNombre: 'Sector Productivo',
        required: false,
        primerOpcion: 'Seleccione un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Bordado o impresión de prendas',
          },
          {
            id: 2,
            descripcion: 'Bordado o impresión de prendas -n1',
          },
        ],
      },
      servicio: {
        labelNombre: 'Servicio',
        required: false,
        primerOpcion: 'Seleccione un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Bordado o impresión de prendas',
          },
          {
            id: 2,
            descripcion: 'Bordado o impresión de prendas -n1',
          },
        ],
      },
      bimestre: {
        labelNombre: 'Bimestre',
        required: false,
        primerOpcion: 'Seleccione un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Marzo-Abril',
          },
          {
            id: 2,
            descripcion: 'Marzo-Abril-1',
          },
        ],
      },
      indiqueTodos: {
        labelNombre: '',
        required: false,
        primerOpcion: 'Seleccione un valor',
        catalogos: [
          {
            id: 1,
            descripcion: 'Domicilios registrados',
          },
          {
            id: 2,
            descripcion: '42025 - Autorización Programa Nuevo Industrial',
          },
        ],
      },
      enSuCaracterDe: {
        labelNombre: 'En su caracter de',
        required: true,
        primerOpcion: 'Selecciona un tipo',
        catalogos: [
          {
            id: 1,
            descripcion: 'Accionista',
          },
          {
            id: 2,
            descripcion: 'Accionista - 1',
          },
        ],
      },
      nacionalidad: {
        labelNombre: 'Nacionalidad',
        required: true,
        primerOpcion: 'Selecciona un tipo',
        catalogos: [
          {
            id: 1,
            descripcion: 'AZERBAIJAN (REPUBLICA AZERBAIJANI)',
          },
          {
            id: 2,
            descripcion: 'AZERBAIJAN (REPUBLICA AZERBAIJANI) - 1',
          },
        ],
      },
      tipoDePersona: {
        labelNombre: 'Tipo de Persona',
        required: true,
        primerOpcion: 'Selecciona un tipo',
        catalogos: [
          {
            id: 1,
            descripcion: 'Física',
          },
          {
            id: 2,
            descripcion: 'Moral',
          },
        ],
      },
      tipoDeInstalacion: {
        labelNombre: 'Tipo de instalación',
        required: true,
        primerOpcion: 'Selecciona un tipo',
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
    service.conseguirSolicitudCatologoSelectLista().subscribe((data) => {
      expect(data).toEqual(mockData);
      done();
    });
    const req = httpMock.expectOne(
      'assets/json/32605/solicitud-catologo-select-lista.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch seccion subcontratados', (done) => {
    const mockData: SeccionSubcontratados = {
      subcontrataRFC: 'MAVL621207C95',
      subcontrataRazonSocial: 'test ',
    };
    service.conseguirSeccionSubcontratados().subscribe((data) => {
      expect(data).toEqual(mockData);
      done();
    });
    const req = httpMock.expectOne(
      'assets/json/32605/seccion-subcontratados.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch inventarios', (done) => {
    const mockData: Inventarios[] = [
      {
        nombre: 'Nombre prueba1',
        lugarRadicacion: 'Mexíco',
        anexo24: '',
      },
    ];
    service.conseguirInventarios().subscribe((data) => {
      expect(data).toEqual(mockData);
      done();
    });
    const req = httpMock.expectOne('assets/json/32605/inventarios-datos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});
