import { TestBed } from '@angular/core/testing';
import { SolicitudeDeArtificiosPirotecnicosService } from './solicitude-de-artificios-pirotecnicos.service';
import { HttpClient } from '@angular/common/http';
import { Tramite240308Store } from '../estados/tramite240308Store.store';
import { of } from 'rxjs';

describe('SolicitudeDeArtificiosPirotecnicosService', () => {
    let service: SolicitudeDeArtificiosPirotecnicosService;
    let httpMock: jest.Mocked<HttpClient>;
    let storeMock: jest.Mocked<Tramite240308Store>;

    beforeEach(() => {
        httpMock = {
            get: jest.fn()
        } as any;

        storeMock = {
            updateDatosDelTramiteFormState: jest.fn(),
            updateDestinatarioFinalTablaDatos: jest.fn(),
            updateJustificacionFormulario: jest.fn(),
            updateMercanciaTablaDatos: jest.fn(),
            updatePagoDerechosFormState: jest.fn(),
            updateProveedorTablaDatos: jest.fn()
        } as any;

        TestBed.configureTestingModule({
            providers: [
                SolicitudeDeArtificiosPirotecnicosService,
                { provide: HttpClient, useValue: httpMock },
                { provide: Tramite240308Store, useValue: storeMock }
            ]
        });

        service = TestBed.inject(SolicitudeDeArtificiosPirotecnicosService);
    });

    it('debería ser creado', () => {
        expect(service).toBeTruthy();
    });

    it('debería llamar a http.get y devolver un observable en obtenerDatos', (done) => {
        const mockResponse = { datosDelTramite: {}, destinatarioFinalTablaDatos: [], justificacionTramiteFormState: {}, merccancialTablaDatos: [], pagoDerechos: {}, proveedorTablaDatos: [] };
        httpMock.get.mockReturnValue(of(mockResponse));

        service.obtenerDatos().subscribe((result) => {
            expect(result).toBe(mockResponse);
            expect(httpMock.get).toHaveBeenCalledWith('./assets/json/240308/datos.json');
            done();
        });
    });

    it('debería actualizar todos los slices del store en establecerDatosDeLaSolicitud', () => {
        const mockData = {
            datosDelTramite: { a: 1 },
            destinatarioFinalTablaDatos: [{ b: 2 }],
            justificacionTramiteFormState: { c: 3 },
            merccancialTablaDatos: [{ d: 4 }],
            pagoDerechos: { e: 5 },
            proveedorTablaDatos: [{ f: 6 }]
        };

        service.establecerDatosDeLaSolicitud(mockData as any);

        expect(storeMock.updateDatosDelTramiteFormState).toHaveBeenCalledWith(mockData.datosDelTramite);
        expect(storeMock.updateDestinatarioFinalTablaDatos).toHaveBeenCalledWith(mockData.destinatarioFinalTablaDatos);
        expect(storeMock.updateJustificacionFormulario).toHaveBeenCalledWith(mockData.justificacionTramiteFormState);
        expect(storeMock.updateMercanciaTablaDatos).toHaveBeenCalledWith(mockData.merccancialTablaDatos);
        expect(storeMock.updatePagoDerechosFormState).toHaveBeenCalledWith(mockData.pagoDerechos);
        expect(storeMock.updateProveedorTablaDatos).toHaveBeenCalledWith(mockData.proveedorTablaDatos);
    });
});