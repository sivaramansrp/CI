import { EvaluarComponent } from './evaluar.component';
import { Router } from '@angular/router';
import { ConsultaioStore, ConsultaioQuery, FECHA_DE_INICIO } from '@ng-mf/data-access-user';
import { SolicitudRequerimientoQuery } from '@libs/shared/data-access-user/src/core/queries/requerimientos.query';
import { LISTA_TRIMITES } from '../core/enums/lista-trimites.enums';
import { Subject, of } from 'rxjs';

describe('EvaluarComponent', () => {
    let component: EvaluarComponent;
    let router: Router;
    let consultaioStore: ConsultaioStore;
    let consultaioQuery: ConsultaioQuery;
    let solicitudRequerimientoQuery: SolicitudRequerimientoQuery;

    beforeEach(() => {
        router = { navigate: jest.fn() } as any;
        consultaioStore = {
            solicitanteConsultaio: jest.fn(),
            establecerConsultaio: jest.fn()
        } as any;
        consultaioQuery = {
            selectConsultaioState$: of({ procedureId: 1, folioTramite: 'FOLIO', estadoDeTramite: 'ESTADO', department: 'DEP' })
        } as any;
        solicitudRequerimientoQuery = {
            selectSolicitud$: of({ idTipoRequerimiento: 1 })
        } as any;
        // Mock the additional dependencies required by the constructor
        const evaluarSolicitudService = { } as any;
        const activatedRoute = { } as any;
        const store = { } as any;
        const fb = { } as any;
        component = new EvaluarComponent(
            router,
            consultaioStore,
            consultaioQuery,
            solicitudRequerimientoQuery,
            evaluarSolicitudService,
            activatedRoute,
            store,
            fb
        );
        component.guardarDatos = { procedureId: 1, folioTramite: 'FOLIO', estadoDeTramite: 'ESTADO', department: 'DEP' } as any;
        component.requerimientoState = { idTipoRequerimiento: 1 } as any;
        component.slectTramite = LISTA_TRIMITES[0];
    });


    it('should change tab index', () => {
        component.seleccionaTab(2);
        expect(component.indice).toBe(2);
    });

    it('should change dictamen tab index', () => {
        component.seleccionaTabRequerimiento(3);
        expect(component.indiceDictamen).toBe(3);
    });

    it('should handle cancelar event', () => {
        component.indice = 0;
        component.enviarEvento({ events: 'cancelar', datos: {} });
        expect(component.indice).toBe(1);
    });

    it('should continue and change dictamen index', () => {
        component.indiceDictamen = 1;
        component.requerimientoState.idTipoRequerimiento = '1';
        component.continuar();
        expect(component.indiceDictamen).toBe(2);
    });

    it('should navigate on obtieneFirma', () => {
        component.obtieneFirma('firma');
        expect(router.navigate).toHaveBeenCalledWith(['bandeja-de-tareas-pendientes']);
    });

    it('should reset indices on cancelar', () => {
        component.indice = 5;
        component.indiceDictamen = 5;
        component.cancelar();
        expect(component.indice).toBe(1);
        expect(component.indiceDictamen).toBe(1);
    });

    it('should clean up on destroy', () => {
        const spyNext = jest.spyOn(component['destroyNotifier$'], 'next');
        const spyComplete = jest.spyOn(component['destroyNotifier$'], 'complete');
        component.ngOnDestroy();
        expect(spyNext).toHaveBeenCalled();
        expect(spyComplete).toHaveBeenCalled();
        expect(consultaioStore.solicitanteConsultaio).toHaveBeenCalledWith(null);
        expect(consultaioStore.establecerConsultaio).toHaveBeenCalled();
    });
});