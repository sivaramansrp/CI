import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificacionMercanciaComponent } from './modificacion-mercancia.component';
import { Tramite130401Store } from '../../../../estados/tramites/tramite130401.store';
import { Tramite130401Query } from '../../../../estados/queries/tramite130401.query';
import { ModificacionDescripcionService } from '../../services/modificacion-descripcion.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { MercanciaTablaDatos } from '../../models/modificacion-descripcion.model';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';

describe('ModificacionMercanciaComponent', () => {
    let component: ModificacionMercanciaComponent;
    let fixture: ComponentFixture<ModificacionMercanciaComponent>;
    let storeMock: any;
    let queryMock: any;
    let modificacionDescripcionServiceMock: any;

    beforeEach(async () => {
        storeMock = {
            setMercancia: jest.fn(),
            setDescripcionModificacion: jest.fn(),
        };

        queryMock = {
            selectSolicitud$: of({
                mercancia: {
                    numeroFolioResolucion: '12345',
                    cantidadLibreMercancia: '10',
                    descripcion: 'Descripción original',
                    descripcionModificacion: 'Descripción modificada',
                },
            }),
        };

        modificacionDescripcionServiceMock = {
            obtenerMercancia: jest.fn().mockReturnValue(of({ datos: [] })),
            obtenerMercanciaTabla: jest.fn().mockReturnValue(of({ datos: [] })),
        };

        await TestBed.configureTestingModule({
            declarations: [],
            imports: [ReactiveFormsModule, ModificacionMercanciaComponent],
            providers: [
                { provide: Tramite130401Store, useValue: storeMock },
                { provide: Tramite130401Query, useValue: queryMock },
                { provide: ModificacionDescripcionService, useValue: modificacionDescripcionServiceMock },
                FormBuilder,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(ModificacionMercanciaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debería crear el componente', () => {
        expect(component).toBeTruthy();
    });
    it('debería definir correctamente las columnas de la tabla de mercancías', () => {
        const encabezados: ConfiguracionColumna<MercanciaTablaDatos>[] = component.mercanciaTablaEncabezados;

        expect(encabezados.length).toBe(6);

        expect(encabezados[0].encabezado).toBe('');
        expect(encabezados[0].clave({ id: 1 } as MercanciaTablaDatos)).toBe(1);
        expect(encabezados[0].orden).toBe(1);

        expect(encabezados[1].encabezado).toBe('Cantidad');
        expect(encabezados[1].clave({ cantidad: '10' } as MercanciaTablaDatos)).toBe('10');
        expect(encabezados[1].orden).toBe(2);

        expect(encabezados[2].encabezado).toBe('Descripción autorizada');
        expect(encabezados[2].clave({ descripcionAutorizada: 'Producto A' } as MercanciaTablaDatos)).toBe('Producto A');
        expect(encabezados[2].orden).toBe(3);

        expect(encabezados[3].encabezado).toBe('Descripción solicitada');
        expect(encabezados[3].clave({ descripcionSolicitada: 'Producto B' } as MercanciaTablaDatos)).toBe('Producto B');
        expect(encabezados[3].orden).toBe(4);

        expect(encabezados[4].encabezado).toBe('Precio unitario USD');
        expect(encabezados[4].clave({ precioUnitarioUSD: '100' } as MercanciaTablaDatos)).toBe('100');
        expect(encabezados[4].orden).toBe(5);

        expect(encabezados[5].encabezado).toBe('Total USD');
        expect(encabezados[5].clave({ totalUSD: '1000' } as MercanciaTablaDatos)).toBe('1000');
        expect(encabezados[5].orden).toBe(6);
    });

    it('debería llamar a cargarMercancia si numeroFolioResolucion está definido', () => {
        component.tramiteState = {
            mercancia: {
                numeroFolioResolucion: null,
            },
        } as any;
        const cargarMercanciaSpy = jest.spyOn(component, 'cargarMercancia');
        if (!component.tramiteState?.mercancia?.numeroFolioResolucion) {
            component.cargarMercancia();
        }
        expect(cargarMercanciaSpy).toHaveBeenCalled();
    });

    it('no debería llamar a cargarMercancia si numeroFolioResolucion está definido', () => {
        component.tramiteState = {
            mercancia: {
                numeroFolioResolucion: '12345',
            },
        } as any;
        const cargarMercanciaSpy = jest.spyOn(component, 'cargarMercancia');
        component.ngOnInit();
        expect(cargarMercanciaSpy).not.toHaveBeenCalled();
    });

    it('debería inicializar el formulario y cargar los datos del estado en ngOnInit', () => {
        component.ngOnInit();
        expect(component.tramiteState.mercancia.numeroFolioResolucion).toBe('12345');
        expect(component.mercanciaFormulario.get('numeroFolioResolucion')?.value).toBe('12345');
    });

    it('debería cargar los datos de la mercancía desde el servicio', () => {
        const mockMercancia = { datos: [{ numeroFolioResolucion: '67890' }] };
        modificacionDescripcionServiceMock.obtenerMercancia.mockReturnValue(of(mockMercancia));
        component.cargarMercancia();
        expect(modificacionDescripcionServiceMock.obtenerMercancia).toHaveBeenCalled();
        expect(storeMock.setMercancia).toHaveBeenCalledWith(mockMercancia.datos);
    });

    it('debería cargar los datos de la tabla de mercancías desde el servicio', () => {
        const mockTablaDatos = { datos: [{ id: 1, cantidad: '10', descripcionAutorizada: 'Partida 1' }] };
        modificacionDescripcionServiceMock.obtenerMercanciaTabla.mockReturnValue(of(mockTablaDatos));
        component.cargarMercanciaTabla();
        expect(modificacionDescripcionServiceMock.obtenerMercanciaTabla).toHaveBeenCalled();
        expect(component.mercanciaTablaDatos).toEqual([]);
    });

    it('debería verificar si un campo del formulario es válido', () => {
        const isValid = component.isValid(component.mercanciaFormulario, 'descripcionModificacion');
        expect(isValid).toBe(false);
    });

    it('debería manejar la selección de filas en la tabla de mercancías', () => {
        const mockSeleccion = [{
            "id": 1,
            "cantidad": "100",
            "descripcionSolicitada": "PRUEBA QA",
            "descripcionAutorizada": "PRUEBA QA",
            "precioUnitarioUSD": "1",
            "totalUSD": "100"
        }];
        component.seleccionDeFilas(mockSeleccion);
        expect(component.mercanciaSeleccionadasFila).toEqual(mockSeleccion);
    });

    it('debería establecer valores en el store desde el formulario', () => {
        const form = component.mercanciaFormulario;
        form.get('descripcionModificacion')?.setValue('Nueva descripción');
        component.setValoresStore(form, 'descripcionModificacion', 'setDescripcionModificacion');
        expect(storeMock.setDescripcionModificacion).toHaveBeenCalledWith('Nueva descripción');
    });

    it('debería completar destroyNotifier$ al destruir el componente', () => {
        const destroySpy = jest.spyOn(component.destroyNotifier$, 'next');
        const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
        component.ngOnDestroy();
        expect(destroySpy).toHaveBeenCalled();
        expect(completeSpy).toHaveBeenCalled();
    });
    it('should disable descripcionModificacion field when soloLectura is true', () => {
        component.soloLectura = true;
        component.inicializarEstadoFormulario();
        expect(component.mercanciaFormulario.get('descripcionModificacion')?.disabled).toBe(true);
    });

    it('should enable descripcionModificacion field when soloLectura is false', () => {
        component.soloLectura = false;
        component.inicializarEstadoFormulario();
        expect(component.mercanciaFormulario.get('descripcionModificacion')?.enabled).toBe(true);
    });
});