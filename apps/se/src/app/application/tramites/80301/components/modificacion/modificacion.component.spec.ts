import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificacionComponent } from './modificacion.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { SolicitudService } from '../../services/solicitud.service';
import { Tramite80301Store } from '../../estados/tramite80301.store';
import { Tramite80301Query } from '../../estados/tramite80301.query';

describe('ModificacionComponent', () => {

    let component: ModificacionComponent;
    let fixture: ComponentFixture<ModificacionComponent>;
    let solicitudServiceMock: any;
    let tramite80301StoreMock: any;
    let tramite80301QueryMock: any;

    beforeEach(async () => {
        solicitudServiceMock = {
            getDatosModificacion: jest.fn().mockReturnValue(of({ rfc: 'RFC123', federal: true, tipo: 'Tipo1', programa: 'Programa1' })),
            getDatosTableData: jest.fn().mockReturnValue(of([{ id: 1, desEstatus: 'Baja' }]))
        };

        tramite80301StoreMock = {
            setDatosModificacion: jest.fn()
        };

        tramite80301QueryMock = {
            selectSolicitud$: of({ datosModificacion: { rfc: 'RFC123', federal: true, tipo: 'Tipo1', programa: 'Programa1' } })
        };

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, ModificacionComponent],
            declarations: [],
            providers: [
                FormBuilder,
        { provide: SolicitudService, useValue: solicitudServiceMock },
        { provide: Tramite80301Store, useValue: tramite80301StoreMock },
        { provide: Tramite80301Query, useValue: tramite80301QueryMock }
            ]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ModificacionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form on ngOnInit', () => {
        component.ngOnInit();
        expect(component.modificacionForm).toBeDefined();
        expect(component.modificacionForm.get('rfc')?.value).toBe('RFC123');
    });

    it('should load modification data and update the form', () => {
        component.loadDatosModificacion();
        expect(solicitudServiceMock.getDatosModificacion).toHaveBeenCalled();
    });

    it('should load table data', () => {
        component.loadDatosTablaData();
        expect(solicitudServiceMock.getDatosTableData).toHaveBeenCalled();
        expect(component.datosTabla).toEqual([{ id: 1, desEstatus: 'Baja' }]);
    });

    it('should toggle the status of a table row from "Activada" to "Baja"', () => {
        component.datosTabla = [
            { id: 2, desEstatus: 'Activada', codigoPostal: '12345', localidad: 'Localidad2', delegacionMunicipio: 'Delegacion2' },
        ];

        const event = {
            row: {
                id: 2,
                desEstatus: 'Activada',
                codigoPostal: '12345',
                localidad: 'Localidad2',
                delegacionMunicipio: 'Delegacion2',
            },
            column: ''
        };

        component.valorDeAlternancia(event);

        expect(component.datosTabla[0].desEstatus).toBe('Baja');
    });

    it('should clean up subscriptions on ngOnDestroy', () => {
        const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
        const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');

        component.ngOnDestroy();

        expect(nextSpy).toHaveBeenCalledTimes(1);
        expect(completeSpy).toHaveBeenCalledTimes(1);
    });
});

