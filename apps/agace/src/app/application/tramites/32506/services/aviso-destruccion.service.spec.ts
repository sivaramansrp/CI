import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AvisoDestruccionService } from './aviso-destruccion.service';
import { CatalogoLista, AvisoTablaDatos, PedimentoTablaDatos, DatosSolicitante } from '../models/aviso-destruccion.model';

describe('AvisoTrasladoService', () => {
    let service: AvisoDestruccionService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AvisoDestruccionService],
        });

        service = TestBed.inject(AvisoDestruccionService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('debería crearse el servicio', () => {
        expect(service).toBeTruthy();
    });


    it('debería obtener los datos del solicitante', () => {
        const mockResponse: DatosSolicitante = {
            "rfc": "AAL0409235E6",
            "denominacion": "AGRICOLA ALPE S DE RL DE CV",
            "actividadEconomica": "Siembra, cultivo y cosecha de otros cultivos",
            "correoElectronico": "caguileram@ultrasist.com.mx",
            "pais": "ESTADOSUNIDOSMEXICANOS",
            "codigoPostal": "34078",
            "entidadFederativa": "DURANGO",
            "municipio": "DURANGO",
            "localidad": "VICTORIADEDURANGO",
            "colonia": "LOSSAUCES",
            "calle": "PRIV.PINOPIÑON",
            "nExt": "703",
            "nInt": "",
            "lada": "",
            "telefono": "",
            "adace": "Occidente",
            "horaDestruccion": "10:00",
            "fechaDestruccion": "2023-10-10"

        };

        service.obtenerDatosSolicitante().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/32506/datosSolicitante.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('debería obtener la lista de entidades federativas', () => {
        const mockResponse: CatalogoLista = { datos: [{ id: 1, descripcion: 'Entidad 1' }] };

        service.obtenerFederativa().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/32506/entidad-federativa.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('debería obtener la lista de municipios', () => {
        const mockResponse: CatalogoLista = { datos: [{ id: 1, descripcion: 'Municipio 1' }] };

        service.obtenerMunicipio().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/32506/entidad-federativa.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('debería obtener la lista de colonias', () => {
        const mockResponse: CatalogoLista = { datos: [{ id: 1, descripcion: 'Colonia 1' }] };

        service.obtenerColonias().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/32506/entidad-federativa.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('debería obtener los datos de la tabla de aviso', () => {
        const mockResponse: AvisoTablaDatos = {
            datos: [{
                "id": 1,
                "nombreComercial": "NOMBRE COMERCIAL",
                "entidadFederativa": "ENTIDAD FEDERATIVA",
                "alcaldioOMuncipio": "ALCALDIA O MUNICIPIO",
                "colonia": "COLONIA",
                "horaDestruccion": "",
                "fechaDestruccion": "",
            },]
        };

        service.obtenerAvisoTabla().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/32506/aviso-tabla.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('debería obtener los datos de la tabla de mercancías', () => {
        const mockResponse: PedimentoTablaDatos = {
            datos: [{
                id: 1,
                patenteAutorizacion: "",
                pedimento: "",
                claveAduanaPedimento: "",
                claveFraccionArancelariaPedimento: "",
                claveUnidadMedidaPedimento: "",
                cantidadPedimento: "",
                nicoPedimento: "",
            }]
        };

        service.obtenerPedimentoTabla().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/32506/pedimento-tabla.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('debería obtener la lista de fracciones arancelarias', () => {
        const mockResponse: CatalogoLista = { datos: [{ id: 1, descripcion: 'Fracción 1' }] };

        service.obtenerFraccionArancelaria().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/32506/entidad-federativa.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('debería obtener la lista de unidades de medida', () => {
        const mockResponse: CatalogoLista = { datos: [{ id: 1, descripcion: 'Unidad 1' }] };

        service.obtenerUnidadMedida().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/32506/entidad-federativa.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });
});