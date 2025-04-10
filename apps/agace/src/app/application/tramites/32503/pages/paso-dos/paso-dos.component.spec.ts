import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasoDosComponent } from './paso-dos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { Tramite32503Query } from '../../../../estados/queries/tramite32503.query';
import { Tramite32503Store } from '../../../../estados/tramites/tramite32503.store';
import { AvisoTrasladoService } from '../../services/aviso-traslado.service';
import { TipoDocumento } from '../../models/aviso-traslado.model';

describe('PasoDosComponent', () => {
    let component: PasoDosComponent;
    let fixture: ComponentFixture<PasoDosComponent>;
    let tramiteQueryMock: any;
    let tramiteStoreMock: any;
    let avisoTrasladoServiceMock: any;

    beforeEach(async () => {
        tramiteQueryMock = {
            selectSolicitud$: of({
                tipoTablaDatos: [],
                tipoDocumento: '',
            }),
        };

        tramiteStoreMock = {
            setTipoTablaDatos: jest.fn(),
            setTipoDocumento: jest.fn(),
        };

        avisoTrasladoServiceMock = {
            obtenerTipoDocumento: jest.fn().mockReturnValue(of({ datos: [{ id: 1, descripcion: 'Documento 1' }] })),
        };

        await TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, PasoDosComponent],
            declarations: [],
            providers: [
                { provide: Tramite32503Query, useValue: tramiteQueryMock },
                { provide: Tramite32503Store, useValue: tramiteStoreMock },
                { provide: AvisoTrasladoService, useValue: avisoTrasladoServiceMock },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(PasoDosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form on ngOnInit', () => {
        component.ngOnInit();
        expect(component.requisitosOpcionalesFormulario).toBeDefined();
        expect(component.requisitosOpcionalesFormulario.get('tipoDocumento')).toBeDefined();
    });

    it('should call cargarTipoDocumento on ngOnInit', () => {
        const cargarTipoDocumentoSpy = jest.spyOn(component, 'cargarTipoDocumento');
        component.ngOnInit();
        expect(cargarTipoDocumentoSpy).toHaveBeenCalled();
    });

    it('should call avisoTrasladoService.obtenerTipoDocumento when cargarTipoDocumento is called', () => {
        component.cargarTipoDocumento();
        expect(avisoTrasladoServiceMock.obtenerTipoDocumento).toHaveBeenCalled();
        expect(component.tipoDocumento.catalogos).toEqual([{ id: 1, descripcion: 'Documento 1' }]);
    });

    it('should call setTipoTablaDatos when seleccionarFila is called', () => {
        const setTipoTablaDatosSpy = jest.spyOn(component, 'setTipoTablaDatos');
        const mockTipoDocumento: TipoDocumento = { id: 1, descripcion: 'Documento 1', controlarCaja: false };
        component.tablaDatos = [mockTipoDocumento];
        component.seleccionarFila(mockTipoDocumento);
        expect(mockTipoDocumento.controlarCaja).toBe(true);
        expect(setTipoTablaDatosSpy).toHaveBeenCalled();
    });

    it('should call setTipoTablaDatos when seleccionarFilaTodo is called', () => {
        const setTipoTablaDatosSpy = jest.spyOn(component, 'setTipoTablaDatos');
        const mockEvent = { target: { checked: true } } as unknown as Event;
        component.tablaDatos = [
            { id: 1, descripcion: 'Documento 1', controlarCaja: false },
            { id: 2, descripcion: 'Documento 2', controlarCaja: false },
        ];
        component.seleccionarFilaTodo(mockEvent);
        expect(component.tablaDatos.every((el) => el.controlarCaja)).toBe(true);
        expect(setTipoTablaDatosSpy).toHaveBeenCalled();
    });

    it('should remove selected rows when eliminarFilaSeleccionada is called', () => {
        component.tablaDatos = [
            { id: 1, descripcion: 'Documento 1', controlarCaja: true },
            { id: 2, descripcion: 'Documento 2', controlarCaja: false },
        ];
        component.eliminarFilaSeleccionada();
        expect(component.tablaDatos).toEqual([{ id: 2, descripcion: 'Documento 2', controlarCaja: false }]);
    });

    it('should add a new row when agregarFila is called', () => {
        component.tipoDocumento.catalogos = [{ id: 1, descripcion: 'Documento 1' }];
        component.requisitosOpcionalesFormulario.get('tipoDocumento')?.setValue('1');
        component.agregarFila();
        expect(component.tablaDatos).toEqual([{ id: 1, descripcion: 'Documento 1', controlarCaja: false }]);
    });

    it('should validate the form when validarRequisitosOpcionalesFormulario is called', () => {
        const markAllAsTouchedSpy = jest.spyOn(component.requisitosOpcionalesFormulario, 'markAllAsTouched');
        component.validarRequisitosOpcionalesFormulario();
        expect(markAllAsTouchedSpy).toHaveBeenCalled();
    });

    it('should complete destroyNotifier$ on ngOnDestroy', () => {
        const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
        const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
        component.ngOnDestroy();
        expect(nextSpy).toHaveBeenCalled();
        expect(completeSpy).toHaveBeenCalled();
    });
});