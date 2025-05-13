import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CatalogoLista, CuposTablaDatos } from '../model/cancelaciones-certificado.model';
import { CancelacionCertificadosService } from './cancelacionCertificados.service';


describe('CancelacionCertificadosService', () => {
    let service: CancelacionCertificadosService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CancelacionCertificadosService],
        });

        service = TestBed.inject(CancelacionCertificadosService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch aduanero catalog', () => {
        const mockResponse: CatalogoLista = { datos: [] };

        service.obtenerAduanero().subscribe((response: any) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/140205/aduanero.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should fetch mecanismo catalog', () => {
        const mockResponse: CatalogoLista = { datos: [] };

        service.obtenerMecanismo().subscribe((response: any) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/140205/aduanero.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should fetch tratado catalog', () => {
        const mockResponse: CatalogoLista = { datos: [] };

        service.obtenerTratado().subscribe((response: any) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/140205/aduanero.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should fetch nombreProducto catalog', () => {
        const mockResponse: CatalogoLista = { datos: [] };

        service.obtenerNombreProducto().subscribe((response: any) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/140205/aduanero.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should fetch nombreSubProducto catalog', () => {
        const mockResponse: CatalogoLista = { datos: [] };

        service.obtenerNombreSubProducto().subscribe((response: any) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/140205/aduanero.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should fetch federal catalog', () => {
        const mockResponse: CatalogoLista = { datos: [] };

        service.obtenerFederal().subscribe((response: any) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/140205/aduanero.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });

    it('should fetch avisoTabla data', () => {
        const mockResponse: CuposTablaDatos = { datos: [] };

        service.obtenerAvisoTabla().subscribe((response: any) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('assets/json/140205/cupo-tabla.json');
        expect(req.request.method).toBe('GET');
        req.flush(mockResponse);
    });
});