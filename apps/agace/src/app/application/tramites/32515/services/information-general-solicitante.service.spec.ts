import { TestBed } from '@angular/core/testing';
import { InformationGeneralSolicitanteService } from './information-general-solicitante.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Tramite32515Store } from '../estados/tramite32515.store';
import { InformationGeneralSolicitanteState } from '../estados/tramite32515.store';

describe('InformationGeneralSolicitanteService', () => {
    let service: InformationGeneralSolicitanteService;
    let httpClientMock: any;
    let tramite32515StoreMock: any;

    beforeEach(() => {
        httpClientMock = {
            get: jest.fn()
        };
        tramite32515StoreMock = {
            update: jest.fn()
        };

        TestBed.configureTestingModule({
            providers: [
                InformationGeneralSolicitanteService,
                { provide: HttpClient, useValue: httpClientMock },
                { provide: Tramite32515Store, useValue: tramite32515StoreMock }
            ]
        });

        service = TestBed.inject(InformationGeneralSolicitanteService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('getEntidadFederativa should call http.get with correct URL', () => {
        const mockResponse = [{ id: 1, descripcion: 'Entidad' }];
        httpClientMock.get.mockReturnValue(of(mockResponse));

        service.getEntidadFederativa().subscribe((data) => {
            expect(data).toEqual(mockResponse);
        });

        expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/32515/entidadFederativa.json');
    });

    it('getMunicipio should call http.get with correct URL', () => {
        const mockResponse = [{ id: 2, descripcion: 'Municipio' }];
        httpClientMock.get.mockReturnValue(of(mockResponse));

        service.getMunicipio().subscribe((data) => {
            expect(data).toEqual(mockResponse);
        });

        expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/32515/municion.json');
    });

    it('getColonia should call http.get with correct URL', () => {
        const mockResponse = [{ id: 3, descripcion: 'Colonia' }];
        httpClientMock.get.mockReturnValue(of(mockResponse));

        service.getColonia().subscribe((data) => {
            expect(data).toEqual(mockResponse);
        });

        expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/32515/colonia.json');
    });

    it('getRegistroTomaMuestrasMercanciasData should call http.get with correct URL', () => {
        const mockResponse = { some: 'state' };
        httpClientMock.get.mockReturnValue(of(mockResponse));

        service.getRegistroTomaMuestrasMercanciasData().subscribe((data) => {
            expect(data).toEqual(mockResponse);
        });

        expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/32515/datos-previos.json');
    });

    it('actualizarEstadoFormulario should call tramite32515Store.update with merged state', () => {
        const initialState = { a: 1, b: 2 };
        const updateState = { b: 3, c: 4 };
        tramite32515StoreMock.update.mockImplementation((fn: (state: InformationGeneralSolicitanteState) => InformationGeneralSolicitanteState) => fn(initialState));

        service.actualizarEstadoFormulario(updateState as InformationGeneralSolicitanteState);

        expect(tramite32515StoreMock.update).toHaveBeenCalled();
        const updateFn = tramite32515StoreMock.update.mock.calls[0][0];
        expect(updateFn(initialState)).toEqual({ a: 1, b: 3, c: 4 });
    });
});