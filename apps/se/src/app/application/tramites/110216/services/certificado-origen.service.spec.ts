import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CertificadosOrigenService } from './certificado-origen.service';
import { CatalogoLista, DisponiblesTabla, SeleccionadasTabla, ProductorExportador, RespuestaConsulta } from '../models/certificado-origen.model';

describe('CertificadosOrigenService', () => {
    let service: CertificadosOrigenService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CertificadosOrigenService],
        });

        service = TestBed.inject(CertificadosOrigenService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch idiomas', () => {
        const mockResponse: CatalogoLista = {
            datos: [{ id: 1, descripcion: 'Español' }, { id: 2, descripcion: 'Inglés' }],
        };

        service.obtenerIdioma().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/110216/idioma.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should fetch entidades federativas', () => {
        const mockResponse: CatalogoLista = {
            datos: [{ id: 1, descripcion: 'Entidad 1' }, { id: 2, descripcion: 'Entidad 2' }],
        };

        service.obtenerEntidadFederativa().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/110216/entidad-federativa.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should fetch representaciones federales', () => {
        const mockResponse: CatalogoLista = {
            datos: [{ id: 1, descripcion: 'Representación 1' }, { id: 2, descripcion: 'Representación 2' }],
        };

        service.obtenerRepresentacionFederal().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/110216/representacion-federal.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should fetch productores/exportadores', () => {
        const mockResponse: ProductorExportador = {
            datos: [
                {
                    id: 1,
                    nombreProductor: 'Productor 1',
                    numeroRegistroFiscal: '12345',
                    direccion: 'Dirección 1',
                    correoElectronico: 'correo1@example.com',
                    telefono: '1234567890',
                    fax: '0987654321',
                },
            ],
        };

        service.obtenerProductorPorExportador().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/110216/productor-exportador.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should fetch mercancías disponibles', () => {
        const mockResponse: DisponiblesTabla[] = [
            {
                fraccionArancelaria: '12345678',
                nombreTecnico: 'Producto Técnico',
                nombreComercial: 'Producto Comercial',
                numeroRegistroProductos: 'REG123',
                fechaExpedicion: '2025-01-01',
                fechaVencimiento: '2025-12-31',
            },
        ];

        service.obtenerMercanciasDisponibles().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/110216/mercancia-disponsible.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should fetch mercancías seleccionadas', () => {
        const mockResponse: SeleccionadasTabla[] = [
            {
                id: 1,
                fraccionArancelaria: '12345678',
                cantidad: '100',
                unidadMedida: 'Caja',
                valorMercancia: '1000',
                tipoFactura: 'Manual',
                numFactura: '12345',
                complementoDescripcion: 'Descripción',
                fechaFactura: '2025-01-01',
            },
        ];

        service.obtenerMercanciasSeleccionadas().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/110216/mercancias-seleccionadas.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should fetch tratados', () => {
        const mockResponse: CatalogoLista = {
            datos: [{ id: 1, descripcion: 'Tratado 1' }, { id: 2, descripcion: 'Tratado 2' }],
        };

        service.obtenerTratado().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/110216/pais.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should fetch países', () => {
        const mockResponse: CatalogoLista = {
            datos: [{ id: 1, descripcion: 'País 1' }, { id: 2, descripcion: 'País 2' }],
        };

        service.obtenerPais().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/110216/pais.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });
    it('should fetch data for consulta', () => {
        const mockResponse: RespuestaConsulta = {
            "success": true,
            "message": "",
            "datos": {
                "tercerOperador": true,
                "grupoOperador": {
                    "nombre": "Nombre",
                    "apellidoPrimer": "Primer",
                    "apellidoSegundo": "Segundo",
                    "numeroFiscal": "fiscal",
                    "razonSocial": "https://www.google.com"
                },
                "grupoTratado": {
                    "tratado": "0",
                    "pais": "5",
                    "fraccionArancelaria": "1",
                    "numeroRegistro": "producto",
                    "nombreComercial": "comercial",
                    "fechaFinalInput": "05/06/2025",
                    "fechaInicialInput": "05/06/2025"
                },
                "grupoDeDomicilio": {
                    "pais": "4",
                    "ciudad": "provincia",
                    "calle": "Calle",
                    "numeroLetra": "letra",
                    "lada": "11",
                    "telefono": "123456789",
                    "fax": "12345",
                    "correoElectronico": "test@gmail.com"
                },
                "mercanciaSeleccionadasTablaDatos": [
                    {
                        "id": 0,
                        "fraccionArancelaria": "08888888",
                        "cantidad": "100.00",
                        "unidadMedida": "Caja",
                        "valorMercancia": "100.00",
                        "tipoFactura": "Manual",
                        "numFactura": "1122232",
                        "complementoDescripcion": "CAJA ROJA GRANDE",
                        "fechaFactura": "2015-03-01"
                    }
                ],
                "mercanciaDisponsiblesTablaDatos": [
                    {
                        "fraccionArancelaria": "34029002",
                        "nombreTecnico": "Composiciones constituidas por polialquifenol-formaldehido oxietilado y/o polioxipropileno oxietilado, aunque contengan solventes orgánicos, para la fabricación de de hulsificantes para la industria petrolera.",
                        "nombreComercial": "PRUEBA DE LA FIRMA DE ORIGEN",
                        "numeroRegistroProductos": "254023028918",
                        "fechaVencimiento": "2033-04-26",
                        "fechaExpedicion": "2033-03-23"
                    }
                ],
                "observaciones": "Observaciones",
                "idioma": "1",
                "entidadFederativa": "7",
                "representacionFederal": "1",
                "grupoReceptor": {
                    "nombre": "Nombre",
                    "apellidoPrimer": "Primer ",
                    "apellidoSegundo": "Segundo",
                    "numeroFiscal": "fiscal",
                    "razonSocial": "https://www.google.com"
                },
                "grupoDeDirecciones": {
                    "ciudad": "provincia",
                    "calle": "Calle",
                    "numeroLetra": "letra",
                    "lada": "11",
                    "telefono": "123456789",
                    "fax": "12345",
                    "correoElectronico": "test@gmail.com"
                },
                "grupoRepresentativo": {
                    "lugar": "Lugar",
                    "nombreExportador": "exportador",
                    "empresa": "Empresa",
                    "cargo": "Cargo",
                    "lada": "11",
                    "telefono": "123456789",
                    "fax": "12345",
                    "correoElectronico": "test@gmail.com"
                },
                "grupoDeTransporte": {
                    "puertoEmbarque": "Embarque",
                    "puertoDesembarque": "Desembarque",
                    "puertoTransito": "Transito",
                    "nombreEmbarcacion": "Embarcacion",
                    "numeroVuelo": "Vuelo"
                },
                "datosConfidencialesProductor": true,
                "productorMismoExportador": true,
                "productoresExportador": [
                    {
                        "id": 0,
                        "nombreProductor": "LAURA CONTRERAS",
                        "numeroRegistroFiscal": "AEVL621207B95",
                        "direccion": "SAN GABRIEL 144 DURANGO",
                        "correoElectronico": "laura2992@hotmail.com",
                        "telefono": "044-6182999535",
                        "fax": "6182999535"
                    }
                ]
            }
        }

        service.getDatosConsulta().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/110216/consulta-110216.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse); // Simulate the HTTP response
    });
});