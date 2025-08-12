import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SolicitudService } from './solicitud.service';
import { Solicitud32605Store, Solicitud32605State } from '../estados/solicitud32605.store';
import {
    RecibirNotificaciones,
    EnlaceOperativo,
    RepresentanteLegal,
    SolicitudRadioLista,
    SolicitudCatologoSelectLista,
    SeccionSubcontratados,
    Inventarios,
    GuardarDatosFormulario,
    RFCEnlaceOperativo,
    TransportistasListaInterface,
    InputRadio
} from '../models/solicitud.model';
import { PersonaRespuestaTabla, TablaPersonasNotificaciones } from '../models/personas-notificaciones-tabla.model';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { ApiResponse, BuscarRfcResponse, InstalacionesInterface } from '../models/oea-textil-registro.model';

describe('SolicitudService', () => {
    let service: SolicitudService;
    let httpMock: HttpTestingController;
    let mockStore: jest.Mocked<Solicitud32605Store>;

    beforeEach(() => {
        // Create mock store
        mockStore = {
            actualizarEstado: jest.fn()
        } as any;

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                SolicitudService,
                { provide: Solicitud32605Store, useValue: mockStore }
            ]
        });

        service = TestBed.inject(SolicitudService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
        jest.clearAllMocks();
    });

    describe('Constructor', () => {
        it('debe crear el servicio correctamente', () => {
            expect(service).toBeTruthy();
        });

        it('debe inyectar HttpClient y Solicitud32605Store correctamente', () => {
            expect(service['http']).toBeDefined();
            expect(service.solicitud32605Store).toBeDefined();
            expect(service.solicitud32605Store).toBe(mockStore);
        });
    });

    describe('conseguirRecibirNotificaciones', () => {
        it('debe obtener la lista de opciones para recibir notificaciones', () => {
            // Arrange
            const mockResponse: RecibirNotificaciones[] = [
                {
                    rfc: 'ABCD123456EFG',
                    curp: 'ABCD123456HDFGHJ01',
                    nombre: 'Juan',
                    apellidoPaterno: 'Pérez',
                    apellidoMaterno: 'García'
                },
                {
                    rfc: 'EFGH789012IJK',
                    curp: 'EFGH789012MNOPQR02',
                    nombre: 'María',
                    apellidoPaterno: 'López',
                    apellidoMaterno: 'Martínez'
                }
            ];

            // Act
            service.conseguirRecibirNotificaciones().subscribe(response => {
                // Assert
                expect(response).toEqual(mockResponse);
                expect(response.length).toBe(2);
                expect(response[0].rfc).toBe('ABCD123456EFG');
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/recibir-notificaciones.json');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('debe manejar errores de HTTP correctamente', () => {
            // Act
            service.conseguirRecibirNotificaciones().subscribe({
                next: () => fail('Should have failed'),
                error: (error) => {
                    // Assert
                    expect(error.status).toBe(404);
                }
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/recibir-notificaciones.json');
            req.flush('Not Found', { status: 404, statusText: 'Not Found' });
        });

        it('debe retornar array vacío cuando no hay datos', () => {
            // Arrange
            const mockResponse: RecibirNotificaciones[] = [];

            // Act
            service.conseguirRecibirNotificaciones().subscribe(response => {
                // Assert
                expect(response).toEqual([]);
                expect(Array.isArray(response)).toBeTruthy();
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/recibir-notificaciones.json');
            req.flush(mockResponse);
        });
    });

    describe('conseguirEnlaceOperativoDatos', () => {
        it('debe obtener la lista de enlaces operativos', () => {
            // Arrange
            const mockResponse: EnlaceOperativo[] = [
                {
                    rfc: 'JUAN851201ABC',
                    nombre: 'Juan',
                    apellidoPaterno: 'Perez',
                    apellidoMaterno: 'García',
                    claveCiudad: '09001',
                    ciudad: 'Ciudad de México',
                    cargo: 'Director',
                    telefono: '5551234567',
                    correo: 'juan@empresa.com',
                    suplente: 'NO',
                    calle: 'Av. Principal',
                    numeroExterior: '123',
                    numeroInterior: '1',
                    colonia: 'Centro',
                    codigoPostal: '06000',
                    localidad: 'Cuauhtémoc',
                    delegacionMunicipio: 'Cuauhtémoc'
                }
            ];

            // Act
            service.conseguirEnlaceOperativoDatos().subscribe(response => {
                // Assert
                expect(response).toEqual(mockResponse);
                expect(response.length).toBe(1);
                expect(response[0].rfc).toBe('JUAN851201ABC');
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/enlace-operativo-datos.json');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('debe retornar array vacío cuando no hay datos', () => {
            // Arrange
            const mockResponse: EnlaceOperativo[] = [];

            // Act
            service.conseguirEnlaceOperativoDatos().subscribe(response => {
                // Assert
                expect(response).toEqual([]);
                expect(Array.isArray(response)).toBeTruthy();
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/enlace-operativo-datos.json');
            req.flush(mockResponse);
        });

        it('debe manejar errores de HTTP para enlace operativo', () => {
            // Act
            service.conseguirEnlaceOperativoDatos().subscribe({
                next: () => fail('Should have failed'),
                error: (error) => {
                    // Assert
                    expect(error.status).toBe(500);
                }
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/enlace-operativo-datos.json');
            req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
        });
    });

    describe('conseguirRepresentanteLegalDatos', () => {
        it('debe obtener los datos del representante legal', () => {
            // Arrange
            const mockResponse: RepresentanteLegal = {
                idPersonaSolicitud: '12345',
                rfcTercero: 'TERC123456ABC',
                rfc: 'REPR123456DEF',
                nombre: 'Carlos Rodriguez',
                apellidoPaterno: 'Martínez',
                apellidoMaterno: 'López',
                telefono: '5551234567',
                correoElectronico: 'carlos@empresa.com'
            };

            // Act
            service.conseguirRepresentanteLegalDatos().subscribe(response => {
                // Assert
                expect(response).toEqual(mockResponse);
                expect(response.rfc).toBe('REPR123456DEF');
                expect(response.nombre).toBe('Carlos Rodriguez');
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/representante-legal-datos.json');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('debe manejar respuesta con datos vacíos', () => {
            // Arrange
            const mockResponse: RepresentanteLegal = {
                rfcTercero: '',
                rfc: '',
                nombre: '',
                apellidoPaterno: '',
                apellidoMaterno: '',
                telefono: '',
                correoElectronico: ''
            };

            // Act
            service.conseguirRepresentanteLegalDatos().subscribe(response => {
                // Assert
                expect(response).toEqual(mockResponse);
                expect(response.rfc).toBe('');
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/representante-legal-datos.json');
            req.flush(mockResponse);
        });
    });

    describe('conseguirOpcionDeRadio', () => {
        it('debe obtener las opciones de radio de la solicitud', () => {
            // Arrange
            const mockInputRadio: InputRadio = {
                radioOptions: [
                    {
                        label: 'Sí',
                        value: 'si'
                    }
                ],
                isRequired: true
            };

            const mockResponse: SolicitudRadioLista = {
                requisitos: mockInputRadio,
                clasificacionInformacion: mockInputRadio,
                reconocimientoMutuo: mockInputRadio
            };

            // Act
            service.conseguirOpcionDeRadio().subscribe(response => {
                // Assert
                expect(response).toEqual(mockResponse);
                expect(response.requisitos).toBeDefined();
                expect(response.clasificacionInformacion).toBeDefined();
                expect(response.reconocimientoMutuo).toBeDefined();
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/solicitud-radio-lista.json');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('conseguirSolicitudCatologoSelectLista', () => {
        it('debe obtener los catálogos selectivos de la solicitud', () => {
            // Arrange
            const mockResponse: SolicitudCatologoSelectLista = {} as SolicitudCatologoSelectLista;

            // Act
            service.conseguirSolicitudCatologoSelectLista().subscribe(response => {
                // Assert
                expect(response).toEqual(mockResponse);
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/solicitud-catologo-select-lista.json');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('conseguirSeccionSubcontratados', () => {
        it('debe obtener los datos de la sección de subcontratados', () => {
            // Arrange
            const mockResponse: SeccionSubcontratados = {} as SeccionSubcontratados;

            // Act
            service.conseguirSeccionSubcontratados().subscribe(response => {
                // Assert
                expect(response).toEqual(mockResponse);
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/seccion-subcontratados.json');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('conseguirInventarios', () => {
        it('debe obtener los inventarios registrados', () => {
            // Arrange
            const mockResponse: Inventarios[] = [
                {} as Inventarios,
                {} as Inventarios
            ];

            // Act
            service.conseguirInventarios().subscribe(response => {
                // Assert
                expect(response).toEqual(mockResponse);
                expect(response.length).toBe(2);
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/inventarios-datos.json');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('debe manejar lista vacía de inventarios', () => {
            // Arrange
            const mockResponse: Inventarios[] = [];

            // Act
            service.conseguirInventarios().subscribe(response => {
                // Assert
                expect(response).toEqual([]);
                expect(response.length).toBe(0);
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/inventarios-datos.json');
            req.flush(mockResponse);
        });
    });

    describe('guardarDatosFormulario', () => {
        it('debe obtener los datos guardados del formulario', () => {
            // Arrange
            const mockResponse: GuardarDatosFormulario = {} as GuardarDatosFormulario;

            // Act
            service.guardarDatosFormulario().subscribe(response => {
                // Assert
                expect(response).toEqual(mockResponse);
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/guardar-datos-formulario.json');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('conseguirDatosPorRFC', () => {
        it('debe obtener datos de empresa por RFC', () => {
            // Arrange
            const rfc = 'ABC123456DEF';
            const mockResponse: { [key: string]: RFCEnlaceOperativo } = {
                [rfc]: {} as RFCEnlaceOperativo
            };

            // Act
            service.conseguirDatosPorRFC(rfc).subscribe(response => {
                // Assert
                expect(response).toEqual(mockResponse);
                expect(response[rfc]).toBeDefined();
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/rfc-datos.json');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('debe manejar RFC no encontrado', () => {
            // Arrange
            const rfc = 'NOTFOUND123';
            const mockResponse: { [key: string]: RFCEnlaceOperativo } = {};

            // Act
            service.conseguirDatosPorRFC(rfc).subscribe(response => {
                // Assert
                expect(response).toEqual(mockResponse);
                expect(response[rfc]).toBeUndefined();
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/rfc-datos.json');
            req.flush(mockResponse);
        });

        it('debe ignorar el parámetro RFC y hacer la petición al endpoint fijo', () => {
            // Arrange
            const rfc1 = 'RFC1';
            const rfc2 = 'RFC2';
            const mockResponse = { test: 'data' };

            // Act - Primera llamada
            service.conseguirDatosPorRFC(rfc1).subscribe();
            // Act - Segunda llamada con RFC diferente
            service.conseguirDatosPorRFC(rfc2).subscribe();

            // Assert - Ambas llamadas van al mismo endpoint
            const requests = httpMock.match('assets/json/32605/rfc-datos.json');
            expect(requests.length).toBe(2);
            requests.forEach(req => {
                expect(req.request.method).toBe('GET');
                req.flush(mockResponse);
            });
        });
    });

    describe('conseguirTransportistasLista', () => {
        it('debe obtener la lista de transportistas', () => {
            // Arrange
            const rfc = 'TRANS123';
            const mockResponse: { [key: string]: TransportistasListaInterface } = {
                transportista1: {} as TransportistasListaInterface,
                transportista2: {} as TransportistasListaInterface
            };

            // Act
            service.conseguirTransportistasLista(rfc).subscribe(response => {
                // Assert
                expect(response).toEqual(mockResponse);
                expect(Object.keys(response).length).toBe(2);
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/transportistas-lista.json');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('debe manejar lista vacía de transportistas', () => {
            // Arrange
            const rfc = 'EMPTY123';
            const mockResponse: { [key: string]: TransportistasListaInterface } = {};

            // Act
            service.conseguirTransportistasLista(rfc).subscribe(response => {
                // Assert
                expect(response).toEqual({});
                expect(Object.keys(response).length).toBe(0);
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/transportistas-lista.json');
            req.flush(mockResponse);
        });
    });

    describe('actualizarEstado', () => {
        it('debe actualizar el estado completo de la solicitud en el store', () => {
            // Arrange
            const datosCompletos: Solicitud32605State = {
                sectorProductivo: 'Textil',
                sectorServicio: 'Manufactura',
                cumplimientoFiscalAduanero: 'Si',
                representanteRfc: 'REP123456',
                representanteNombre: 'Juan Pérez'
            } as Solicitud32605State;

            // Act
            service.actualizarEstado(datosCompletos);

            // Assert
            expect(mockStore.actualizarEstado).toHaveBeenCalledWith(datosCompletos);
            expect(mockStore.actualizarEstado).toHaveBeenCalledTimes(1);
        });

        it('debe actualizar el estado con datos parciales', () => {
            // Arrange
            const datosParcialesCasted = {
                representanteNombre: 'Maria García',
                representanteTelefono: '5559876543'
            } as Solicitud32605State;

            // Act
            service.actualizarEstado(datosParcialesCasted);

            // Assert
            expect(mockStore.actualizarEstado).toHaveBeenCalledWith(datosParcialesCasted);
        });

        it('debe manejar estado vacío', () => {
            // Arrange
            const estadoVacio = {} as Solicitud32605State;

            // Act
            service.actualizarEstado(estadoVacio);

            // Assert
            expect(mockStore.actualizarEstado).toHaveBeenCalledWith(estadoVacio);
        });
    });

    describe('obtenerDatos', () => {
        it('debe obtener los datos completos de la solicitud', () => {
            // Arrange
            const mockResponse: Solicitud32605State = {
                sectorProductivo: 'Servicios',
                representanteRfc: 'SOL123456',
                representanteNombre: 'Empresa Solicitud S.A.'
            } as Solicitud32605State;

            // Act
            service.obtenerDatos().subscribe(response => {
                // Assert
                expect(response).toEqual(mockResponse);
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/datos.json');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('debe manejar datos de solicitud con campos nulos', () => {
            // Arrange
            const mockResponse: Solicitud32605State = {
                sectorProductivo: '',
                representanteRfc: null,
                representanteNombre: undefined
            } as any;

            // Act
            service.obtenerDatos().subscribe(response => {
                // Assert
                expect(response).toEqual(mockResponse);
                expect(response.representanteRfc).toBeNull();
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/datos.json');
            req.flush(mockResponse);
        });
    });

    describe('obtenerPersonaTablaDatos', () => {
        it('debe obtener los datos de la tabla de personas', () => {
            // Arrange
            const mockResponse: PersonaRespuestaTabla = {
                code: 200,
                data: [
                    {
                        rfc: 'PERS123456ABC',
                        curp: 'PERS123456HDFGHJ01',
                        nombre: 'Persona A',
                        apellidoPaterno: 'García',
                        apellidoMaterno: 'López'
                    },
                    {
                        rfc: 'PERS789012DEF',
                        curp: 'PERS789012MNOPQR02',
                        nombre: 'Persona B',
                        apellidoPaterno: 'Martínez',
                        apellidoMaterno: 'Pérez'
                    }
                ],
                message: 'Datos obtenidos correctamente'
            };

            // Act
            service.obtenerPersonaTablaDatos().subscribe(response => {
                // Assert
                expect(response).toEqual(mockResponse);
                expect(response.data.length).toBe(2);
                expect(response.code).toBe(200);
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/personas-notificacione.json');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('debe manejar tabla de personas vacía', () => {
            // Arrange
            const mockResponse: PersonaRespuestaTabla = {
                code: 200,
                data: [],
                message: 'No hay datos disponibles'
            };

            // Act
            service.obtenerPersonaTablaDatos().subscribe(response => {
                // Assert
                expect(response.data).toEqual([]);
                expect(response.code).toBe(200);
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/personas-notificacione.json');
            req.flush(mockResponse);
        });
    });

    describe('sectorListaDeSelects', () => {
        it('debe obtener todas las listas de selects del sector usando forkJoin', () => {
            // Arrange
            const mockSectorProductivo: Catalogo[] = [
                { id: 1, descripcion: 'Textil' },
                { id: 2, descripcion: 'Automotriz' }
            ];
            const mockSectorServicio: Catalogo[] = [
                { id: 1, descripcion: 'Logística' },
                { id: 2, descripcion: 'Consultoría' }
            ];
            const mockBimestre: Catalogo[] = [
                { id: 1, descripcion: 'Enero-Febrero' },
                { id: 2, descripcion: 'Marzo-Abril' }
            ];

            // Act
            service.sectorListaDeSelects().subscribe(response => {
                // Assert
                expect(response.sectorProductivoList).toEqual(mockSectorProductivo);
                expect(response.sectorServicioList).toEqual(mockSectorServicio);
                expect(response.bimestreList).toEqual(mockBimestre);
                expect(response.sectorProductivoList.length).toBe(2);
                expect(response.sectorServicioList.length).toBe(2);
                expect(response.bimestreList.length).toBe(2);
            });

            // Assert HTTP requests
            const reqSectorProductivo = httpMock.expectOne('assets/json/32605/sector-productivo-list.json');
            const reqSectorServicio = httpMock.expectOne('assets/json/32605/sector-servicio-list.json');
            const reqBimestre = httpMock.expectOne('assets/json/32605/bimestre-list.json');

            expect(reqSectorProductivo.request.method).toBe('GET');
            expect(reqSectorServicio.request.method).toBe('GET');
            expect(reqBimestre.request.method).toBe('GET');

            reqSectorProductivo.flush(mockSectorProductivo);
            reqSectorServicio.flush(mockSectorServicio);
            reqBimestre.flush(mockBimestre);
        });

        it('debe manejar listas vacías en forkJoin', () => {
            // Arrange
            const mockSectorProductivo: Catalogo[] = [];
            const mockSectorServicio: Catalogo[] = [];
            const mockBimestre: Catalogo[] = [];

            // Act
            service.sectorListaDeSelects().subscribe(response => {
                // Assert
                expect(response.sectorProductivoList).toEqual([]);
                expect(response.sectorServicioList).toEqual([]);
                expect(response.bimestreList).toEqual([]);
            });

            // Assert HTTP requests
            const reqSectorProductivo = httpMock.expectOne('assets/json/32605/sector-productivo-list.json');
            const reqSectorServicio = httpMock.expectOne('assets/json/32605/sector-servicio-list.json');
            const reqBimestre = httpMock.expectOne('assets/json/32605/bimestre-list.json');

            reqSectorProductivo.flush(mockSectorProductivo);
            reqSectorServicio.flush(mockSectorServicio);
            reqBimestre.flush(mockBimestre);
        });

        it('debe manejar error en una de las peticiones del forkJoin', () => {
            // Act
            service.sectorListaDeSelects().subscribe({
                next: () => fail('Should have failed'),
                error: (error) => {
                    // Assert
                    expect(error.status).toBe(500);
                }
            });

            // Assert HTTP requests - only flush the failing request when using forkJoin
            const reqSectorProductivo = httpMock.expectOne('assets/json/32605/sector-productivo-list.json');
            const reqSectorServicio = httpMock.expectOne('assets/json/32605/sector-servicio-list.json');
            const reqBimestre = httpMock.expectOne('assets/json/32605/bimestre-list.json');

            // When one request in forkJoin fails, other requests are cancelled
            // So we only flush the failing request
            reqSectorServicio.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
        });
    });

    describe('getRFCDetails', () => {
        it('debe obtener los detalles del RFC', () => {
            // Arrange
            const mockResponse: BuscarRfcResponse = {
                code: 200,
                data: {
                    denominacionSocial: 'Empresa RFC S.A.',
                    rfc: 'RFC123456ABC',
                    numeroDeEmpleados: 100,
                    bimestre: '2023-01'
                },
                message: 'RFC encontrado correctamente'
            };

            // Act
            service.getRFCDetails().subscribe(response => {
                // Assert
                expect(response).toEqual(mockResponse);
                expect(response.code).toBe(200);
                expect(response.data.denominacionSocial).toBe('Empresa RFC S.A.');
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/buscar-rfc-datos.json');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('debe manejar RFC no encontrado', () => {
            // Arrange
            const mockResponse: BuscarRfcResponse = {
                code: 404,
                data: {},
                message: 'RFC no encontrado'
            };

            // Act
            service.getRFCDetails().subscribe(response => {
                // Assert
                expect(response.code).toBe(404);
                expect(response.message).toBe('RFC no encontrado');
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/buscar-rfc-datos.json');
            req.flush(mockResponse);
        });
    });

    describe('getEntidadesFederativas', () => {
        it('debe obtener la lista de Entidades Federativas', () => {
            // Arrange
            const mockResponse: ApiResponse<Catalogo> = {
                code: 200,
                data: [
                    { id: 1, descripcion: 'Ciudad de México' },
                    { id: 2, descripcion: 'Jalisco' },
                    { id: 3, descripcion: 'Nuevo León' }
                ],
                message: 'Entidades obtenidas correctamente'
            };

            // Act
            service.getEntidadesFederativas().subscribe(response => {
                // Assert
                expect(response).toEqual(mockResponse);
                expect(response.data.length).toBe(3);
                expect(response.code).toBe(200);
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/entidad-federativa-list.json');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('debe manejar respuesta con error', () => {
            // Arrange
            const mockResponse: ApiResponse<Catalogo> = {
                code: 500,
                data: [],
                message: 'Error al obtener entidades'
            };

            // Act
            service.getEntidadesFederativas().subscribe(response => {
                // Assert
                expect(response.code).toBe(500);
                expect(response.data).toEqual([]);
                expect(response.message).toBe('Error al obtener entidades');
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/entidad-federativa-list.json');
            req.flush(mockResponse);
        });
    });

    describe('getInstalacionesDatos', () => {
        it('debe obtener la lista de instalaciones', () => {
            // Arrange
            const mockResponse: ApiResponse<InstalacionesInterface> = {
                code: 200,
                data: [
                    {
                        entidadFederativa: 'Ciudad de México',
                        municipio: 'Cuauhtémoc',
                        direccion: 'Av. Instalación A 123'
                    },
                    {
                        entidadFederativa: 'Jalisco',
                        municipio: 'Guadalajara',
                        direccion: 'Calle Instalación B 456'
                    }
                ] as InstalacionesInterface[],
                message: 'Instalaciones obtenidas correctamente'
            };

            // Act
            service.getInstalacionesDatos().subscribe(response => {
                // Assert
                expect(response).toEqual(mockResponse);
                expect(response.data.length).toBe(2);
                expect(response.code).toBe(200);
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/instalaciones-list.json');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });

        it('debe manejar lista vacía de instalaciones', () => {
            // Arrange
            const mockResponse: ApiResponse<InstalacionesInterface> = {
                code: 200,
                data: [] as InstalacionesInterface[],
                message: 'No hay instalaciones disponibles'
            };

            // Act
            service.getInstalacionesDatos().subscribe(response => {
                // Assert
                expect(response.data).toEqual([]);
                expect(response.code).toBe(200);
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/instalaciones-list.json');
            req.flush(mockResponse);
        });
    });

    describe('getDomiciliosRegistrados', () => {
        it('debe obtener la lista de domicilios registrados', () => {
            // Arrange
            const mockResponse: ApiResponse<Catalogo> = {
                code: 200,
                data: [
                    { id: 1, descripcion: 'Domicilio Principal' },
                    { id: 2, descripcion: 'Sucursal Norte' }
                ],
                message: 'Domicilios obtenidos correctamente'
            };

            // Act
            service.getDomiciliosRegistrados().subscribe(response => {
                // Assert
                expect(response).toEqual(mockResponse);
                expect(response.data.length).toBe(2);
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/domicilios-registrados-list.json');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('getTipoInstalacion', () => {
        it('debe obtener los tipos de instalación', () => {
            // Arrange
            const mockResponse: ApiResponse<Catalogo> = {
                code: 200,
                data: [
                    { id: 1, descripcion: 'Almacén' },
                    { id: 2, descripcion: 'Oficina Administrativa' },
                    { id: 3, descripcion: 'Planta Industrial' }
                ],
                message: 'Tipos de instalación obtenidos'
            };

            // Act
            service.getTipoInstalacion().subscribe(response => {
                // Assert
                expect(response).toEqual(mockResponse);
                expect(response.data.length).toBe(3);
                expect(response.code).toBe(200);
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/tipo-Instalacion-list.json');
            expect(req.request.method).toBe('GET');
            req.flush(mockResponse);
        });
    });

    describe('empresaListaDeSelects', () => {
        it('debe obtener todas las listas de selects de empresa usando forkJoin', () => {
            // Arrange
            const mockEnSuCaracterDe: Catalogo[] = [
                { id: 1, descripcion: 'Propietario' },
                { id: 2, descripcion: 'Representante Legal' }
            ];
            const mockNacionalidad: Catalogo[] = [
                { id: 1, descripcion: 'Mexicana' },
                { id: 2, descripcion: 'Extranjera' }
            ];
            const mockTipoDePersona: Catalogo[] = [
                { id: 1, descripcion: 'Física' },
                { id: 2, descripcion: 'Moral' }
            ];

            // Act
            service.empresaListaDeSelects().subscribe(response => {
                // Assert
                expect(response.enSuCaracterDeList).toEqual(mockEnSuCaracterDe);
                expect(response.nacionalidadList).toEqual(mockNacionalidad);
                expect(response.tipoDePersonaList).toEqual(mockTipoDePersona);
                expect(response.enSuCaracterDeList.length).toBe(2);
                expect(response.nacionalidadList.length).toBe(2);
                expect(response.tipoDePersonaList.length).toBe(2);
            });

            // Assert HTTP requests
            const reqEnSuCaracterDe = httpMock.expectOne('assets/json/32605/en-su-caracter-de-list.json');
            const reqNacionalidad = httpMock.expectOne('assets/json/32605/nacionali-dad-list.json');
            const reqTipoDePersona = httpMock.expectOne('assets/json/32605/tipo-de-persona-list.json');

            expect(reqEnSuCaracterDe.request.method).toBe('GET');
            expect(reqNacionalidad.request.method).toBe('GET');
            expect(reqTipoDePersona.request.method).toBe('GET');

            reqEnSuCaracterDe.flush(mockEnSuCaracterDe);
            reqNacionalidad.flush(mockNacionalidad);
            reqTipoDePersona.flush(mockTipoDePersona);
        });

        it('debe manejar listas vacías en forkJoin para empresa', () => {
            // Arrange
            const mockEnSuCaracterDe: Catalogo[] = [];
            const mockNacionalidad: Catalogo[] = [];
            const mockTipoDePersona: Catalogo[] = [];

            // Act
            service.empresaListaDeSelects().subscribe(response => {
                // Assert
                expect(response.enSuCaracterDeList).toEqual([]);
                expect(response.nacionalidadList).toEqual([]);
                expect(response.tipoDePersonaList).toEqual([]);
            });

            // Assert HTTP requests
            const reqEnSuCaracterDe = httpMock.expectOne('assets/json/32605/en-su-caracter-de-list.json');
            const reqNacionalidad = httpMock.expectOne('assets/json/32605/nacionali-dad-list.json');
            const reqTipoDePersona = httpMock.expectOne('assets/json/32605/tipo-de-persona-list.json');

            reqEnSuCaracterDe.flush(mockEnSuCaracterDe);
            reqNacionalidad.flush(mockNacionalidad);
            reqTipoDePersona.flush(mockTipoDePersona);
        });

        it('debe manejar error en empresaListaDeSelects forkJoin', () => {
            // Act
            service.empresaListaDeSelects().subscribe({
                next: () => fail('Should have failed'),
                error: (error) => {
                    // Assert
                    expect(error.status).toBe(404);
                }
            });

            // Assert HTTP requests - only flush the failing request when using forkJoin
            const reqEnSuCaracterDe = httpMock.expectOne('assets/json/32605/en-su-caracter-de-list.json');
            const reqNacionalidad = httpMock.expectOne('assets/json/32605/nacionali-dad-list.json');
            const reqTipoDePersona = httpMock.expectOne('assets/json/32605/tipo-de-persona-list.json');

            // When one request in forkJoin fails, other requests are cancelled
            // So we only flush the failing request
            reqNacionalidad.flush('Not Found', { status: 404, statusText: 'Not Found' });
        });
    });

    describe('Integration Tests', () => {
        it('debe poder realizar múltiples llamadas simultaneas', () => {
            // Arrange
            const mockRecibirNotificaciones: RecibirNotificaciones[] = [];
            const mockEnlaceOperativo: EnlaceOperativo[] = [];

            // Act
            service.conseguirRecibirNotificaciones().subscribe();
            service.conseguirEnlaceOperativoDatos().subscribe();

            // Assert
            const reqNotificaciones = httpMock.expectOne('assets/json/32605/recibir-notificaciones.json');
            const reqEnlace = httpMock.expectOne('assets/json/32605/enlace-operativo-datos.json');

            expect(reqNotificaciones.request.method).toBe('GET');
            expect(reqEnlace.request.method).toBe('GET');

            reqNotificaciones.flush(mockRecibirNotificaciones);
            reqEnlace.flush(mockEnlaceOperativo);
        });

        it('debe mantener la consistencia del store a través de múltiples actualizaciones', () => {
            // Arrange
            const primerEstado: Partial<Solicitud32605State> = { representanteNombre: 'Juan' };
            const segundoEstado: Partial<Solicitud32605State> = { representanteRfc: 'RFC123' };

            // Act
            service.actualizarEstado(primerEstado as Solicitud32605State);
            service.actualizarEstado(segundoEstado as Solicitud32605State);

            // Assert
            expect(mockStore.actualizarEstado).toHaveBeenCalledTimes(2);
            expect(mockStore.actualizarEstado).toHaveBeenNthCalledWith(1, primerEstado);
            expect(mockStore.actualizarEstado).toHaveBeenNthCalledWith(2, segundoEstado);
        });
    });

    describe('Edge Cases and Error Handling', () => {
        it('debe manejar respuestas JSON malformadas', () => {
            // Act
            service.conseguirRecibirNotificaciones().subscribe({
                next: () => fail('Should have failed'),
                error: (error) => {
                    // Assert
                    expect(error).toBeDefined();
                }
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/recibir-notificaciones.json');
            req.error(new ErrorEvent('Invalid JSON'));
        });

        it('debe manejar timeout de peticiones HTTP', () => {
            // Act
            service.conseguirInventarios().subscribe({
                next: () => fail('Should have failed'),
                error: (error) => {
                    // Assert
                    expect(error.type).toBeDefined();
                }
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/inventarios-datos.json');
            req.error(new ErrorEvent('TimeoutError'), { status: 0, statusText: 'Timeout' });
        });

        it('debe manejar respuestas con códigos de estado HTTP diversos', () => {
            // Test para 401 Unauthorized
            service.conseguirRepresentanteLegalDatos().subscribe({
                next: () => fail('Should have failed'),
                error: (error) => {
                    expect(error.status).toBe(401);
                }
            });

            const req = httpMock.expectOne('assets/json/32605/representante-legal-datos.json');
            req.flush('Unauthorized', { status: 401, statusText: 'Unauthorized' });
        });

        it('debe manejar errores de red', () => {
            // Act
            service.conseguirSeccionSubcontratados().subscribe({
                next: () => fail('Should have failed'),
                error: (error) => {
                    // Assert
                    expect(error.type).toBeDefined();
                }
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/seccion-subcontratados.json');
            req.error(new ErrorEvent('Network error'));
        });

        it('debe manejar errores de CORS', () => {
            // Act
            service.guardarDatosFormulario().subscribe({
                next: () => fail('Should have failed'),
                error: (error) => {
                    // Assert
                    expect(error.status).toBe(0);
                }
            });

            // Assert HTTP request
            const req = httpMock.expectOne('assets/json/32605/guardar-datos-formulario.json');
            req.flush(null, { status: 0, statusText: 'Unknown Error' });
        });
    });

    describe('Service Public Properties', () => {
        it('debe exponer solicitud32605Store como propiedad pública', () => {
            // Assert
            expect(service.solicitud32605Store).toBeDefined();
            expect(service.solicitud32605Store).toBe(mockStore);
        });

        it('debe permitir acceso directo al store para actualizaciones externas', () => {
            // Arrange
            const testData: Partial<Solicitud32605State> = { sectorProductivo: 'Test' };

            // Act
            service.solicitud32605Store.actualizarEstado(testData as Solicitud32605State);

            // Assert
            expect(mockStore.actualizarEstado).toHaveBeenCalledWith(testData);
        });
    });
});
