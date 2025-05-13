import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AutorizacionImportacionService } from './autorizacion-importacion.service';
import { Catalogo, CatalogoLista, DatosSolicitante, SolicitudTabla, SolicitudTablaDatos } from "../models/retorno-de-partes.model";


describe('AvisoTrasladoService', () => {
    let service: AutorizacionImportacionService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AutorizacionImportacionService],
        });

        service = TestBed.inject(AutorizacionImportacionService);
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

        const req = httpMock.expectOne('assets/json/6403/datosSolicitante.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('debería obtener la lista de entidades federativas', () => {
        const mockResponse: CatalogoLista = { datos: [{ id: 1, descripcion: 'Entidad 1' }] };

        service.obtenerFederativa().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/6403/entidad-federativa.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('debería obtener la lista de municipios', () => {
        const mockResponse: CatalogoLista = { datos: [{ id: 1, descripcion: 'Municipio 1' }] };

        service.obtenerAduanas().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/6403/aduanas.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('debería obtener la lista de colonias', () => {
        const mockResponse: CatalogoLista = { datos: [{ id: 1, descripcion: 'Colonia 1' }] };

        service.obtenerAduaneras().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/6403/aduaneras.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('debería obtener los datos de la tabla de aviso', () => {
        const mockResponse: SolicitudTablaDatos = {
            datos: [{
                "id": 1,
                "marca": "xyz",
                "modelo": "abc",
                "numeroDeSerie": "123456789",
                "tipo": "xyz",
                "descripcionMercancia": "abc"
            }]
        };

        service.obtenerSolicitudTabla().subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/6403/autorizacion-tabla.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

});