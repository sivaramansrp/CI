import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CancelacionCertificadosComponent } from './cancelacion-certificados.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { CancelacionCertificadosService } from '../../services/cancelacionCertificados.service';
import { Tramite140205Store } from '../../../../estados/tramites/tramite140205.store';
import { Tramite140205Query } from '../../../../estados/queries/tramite140205.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';

describe('CancelacionCertificadosComponent', () => {
    let component: CancelacionCertificadosComponent;
    let fixture: ComponentFixture<CancelacionCertificadosComponent>;
    let cancelacionCertificadosServiceMock: any;
    let tramiteStoreMock: any;
    let tramiteQueryMock: any;
    let validacionesServiceMock: any;

    beforeEach(async () => {
        cancelacionCertificadosServiceMock = {
            obtenerAduanero: jest.fn().mockReturnValue(of({ datos: [] })),
            obtenerMecanismo: jest.fn().mockReturnValue(of({ datos: [] })),
            obtenerTratado: jest.fn().mockReturnValue(of({ datos: [] })),
            obtenerNombreProducto: jest.fn().mockReturnValue(of({ datos: [] })),
            obtenerNombreSubProducto: jest.fn().mockReturnValue(of({ datos: [] })),
            obtenerFederal: jest.fn().mockReturnValue(of({ datos: [] })),
            obtenerAvisoTabla: jest.fn().mockReturnValue(of({ datos: [] })),
        };

        tramiteStoreMock = {
            setGrupoCupo: jest.fn(),
            setGrupoDatalleCupo: jest.fn(),
            setGrupoFolio: jest.fn(),
        };

        tramiteQueryMock = {
            selectSolicitud$: of({}),
        };

        validacionesServiceMock = {
            isValid: jest.fn().mockReturnValue(true),
        };

        await TestBed.configureTestingModule({
            declarations: [],
            imports: [ReactiveFormsModule],
            providers: [
                FormBuilder,
                { provide: CancelacionCertificadosService, useValue: cancelacionCertificadosServiceMock },
                { provide: Tramite140205Store, useValue: tramiteStoreMock },
                { provide: Tramite140205Query, useValue: tramiteQueryMock },
                { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(CancelacionCertificadosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form on ngOnInit', () => {
        component.ngOnInit();
        expect(component.solicitudForm).toBeDefined();
    });

    it('should call cargarAduanero on ngOnInit', () => {
        const spy = jest.spyOn(component, 'cargarAduanero');
        component.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });

    it('should call cargarMecanismo on ngOnInit', () => {
        const spy = jest.spyOn(component, 'cargarMecanismo');
        component.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });

    it('should call cargarTratado on ngOnInit', () => {
        const spy = jest.spyOn(component, 'cargarTratado');
        component.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });

    it('should call cargarNombreProducto on ngOnInit', () => {
        const spy = jest.spyOn(component, 'cargarNombreProducto');
        component.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });

    it('should call cargarNombreSubproducto on ngOnInit', () => {
        const spy = jest.spyOn(component, 'cargarNombreSubproducto');
        component.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });

    it('should call cargarFederal on ngOnInit', () => {
        const spy = jest.spyOn(component, 'cargarFederal');
        component.ngOnInit();
        expect(spy).toHaveBeenCalled();
    });

    it('should call cargarCuposTabla when buscarCupos is invoked', () => {
        const spy = jest.spyOn(component, 'cargarCuposTabla');
        component.buscarCupos();
        expect(spy).toHaveBeenCalled();
    });

    it('should update the store when setValoresStore is called', () => {
        const form = component.solicitudForm;
        form.patchValue({ grupoCupo: { aduanero: 'testValue' } });
        component.setValoresStore(form, 'grupoCupo.aduanero', 'setGrupoCupo' as keyof Tramite140205Store);
        expect(tramiteStoreMock.setGrupoCupo).toHaveBeenCalledWith('testValue');
    });

    it('should validate a form field using isValid', () => {
        const isValid = component.isValid(component.solicitudForm, 'grupoFolio.montoAsignado');
        expect(isValid).toBe(true);
        expect(validacionesServiceMock.isValid).toHaveBeenCalled();
    });

    it('should clean up subscriptions on ngOnDestroy', () => {
        const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
        const destroyNotifierCompleteSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
        component.ngOnDestroy();
        expect(destroyNotifierSpy).toHaveBeenCalled();
        expect(destroyNotifierCompleteSpy).toHaveBeenCalled();
    });
});