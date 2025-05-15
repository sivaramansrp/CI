import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudComponent } from './solicitud.component';
import { Tramite130401Store } from '../../../../estados/tramites/tramite130401.store';
import { Tramite130401Query } from '../../../../estados/queries/tramite130401.query';
import { ModificacionDescripcionService } from '../../services/modificacion-descripcion.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { DatosArancelaria, SolicitudTablaDatos } from '../../models/modificacion-descripcion.model';
import { ConfiguracionColumna } from '@libs/shared/data-access-user/src';

describe('SolicitudComponent', () => {
    let component: SolicitudComponent;
    let fixture: ComponentFixture<SolicitudComponent>;
    let storeMock: any;
    let queryMock: any;
    let modificacionDescripcionServiceMock: any;

    beforeEach(async () => {
        storeMock = {
            setSolicitud: jest.fn(),
        };

        queryMock = {
            selectSolicitud$: of({
                datosSolicitud: {
                    numeroFolioTramiteOriginal: '12345',
                    solicitud: 'Solicitud 1',
                    regimen: 'Régimen 1',
                    clasificacionRegimen: 'Clasificación 1',
                    condicionMercancia: 'Nuevo',
                    mercanciaDescripcion: 'Descripción de la mercancía',
                    fraccionArancelaria: '1234.56.78',
                    unidadMedidaComercial: 'UMC',
                    unidadesAutorizadas: '10',
                    importeFacturaAutorizadoUSD: '1000',
                },
            }),
        };

        modificacionDescripcionServiceMock = {
            obtenerPartidas: jest.fn().mockReturnValue(of({ datos: [] })),
            obtenerarancelaria: jest.fn().mockReturnValue(of({ datos: [] })),
            obtenerSolicitud: jest.fn().mockReturnValue(of({ datos: {} })),
        };

        await TestBed.configureTestingModule({
            declarations: [],
            imports: [ReactiveFormsModule, SolicitudComponent],
            providers: [
                { provide: Tramite130401Store, useValue: storeMock },
                { provide: Tramite130401Query, useValue: queryMock },
                { provide: ModificacionDescripcionService, useValue: modificacionDescripcionServiceMock },
                FormBuilder,
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(SolicitudComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('debería crear el componente', () => {
        expect(component).toBeTruthy();
    });

    it('debería definir correctamente las columnas de la tabla de solicitud', () => {
        const encabezados: ConfiguracionColumna<SolicitudTablaDatos>[] = component.solicitudTablaEncabezados;

        expect(encabezados.length).toBe(5);

        expect(encabezados[0].encabezado).toBe('');
        expect(encabezados[0].clave({ id: 1 } as SolicitudTablaDatos)).toBe(1);
        expect(encabezados[0].orden).toBe(1);

        expect(encabezados[1].encabezado).toBe('Cantidad');
        expect(encabezados[1].clave({ cantidad: '10' } as SolicitudTablaDatos)).toBe('10');
        expect(encabezados[1].orden).toBe(2);

        expect(encabezados[2].encabezado).toBe('Descripción');
        expect(encabezados[2].clave({ descripcion: 'Producto A' } as SolicitudTablaDatos)).toBe('Producto A');
        expect(encabezados[2].orden).toBe(3);

        expect(encabezados[3].encabezado).toBe('Precio unitario USD');
        expect(encabezados[3].clave({ precioUnitarioUSD: '100' } as SolicitudTablaDatos)).toBe('100');
        expect(encabezados[3].orden).toBe(4);

        expect(encabezados[4].encabezado).toBe('Total USD');
        expect(encabezados[4].clave({ totalUSD: '1000' } as SolicitudTablaDatos)).toBe('1000');
        expect(encabezados[4].orden).toBe(5);
    });

    it('debería definir correctamente las columnas de la tabla de fracciones arancelarias', () => {
        const encabezados: ConfiguracionColumna<DatosArancelaria>[] = component.arancelariaTablaEncabezados;

        expect(encabezados.length).toBe(3);

        expect(encabezados[0].encabezado).toBe('');
        expect(encabezados[0].clave({ id: 1 } as DatosArancelaria)).toBe(1);
        expect(encabezados[0].orden).toBe(1);

        expect(encabezados[1].encabezado).toBe('Fracción arancelaria');
        expect(encabezados[1].clave({ fraccionArancelaria: '1234.56.78' } as DatosArancelaria)).toBe('1234.56.78');
        expect(encabezados[1].orden).toBe(2);

        expect(encabezados[2].encabezado).toBe('Descripción');
        expect(encabezados[2].clave({ descripcion: 'Fracción A' } as DatosArancelaria)).toBe('Fracción A');
        expect(encabezados[2].orden).toBe(3);
    });

    it('debería llamar a cargarSolicitud si numeroFolioTramiteOriginal está definido', () => {
        component.tramiteState = {
            datosSolicitud: {
                numeroFolioTramiteOriginal: null,
            },
        } as any;
        const spy = jest.spyOn(component, 'cargarSolicitud');
        if (!component.tramiteState?.datosSolicitud?.numeroFolioTramiteOriginal) {
            component.cargarSolicitud();
        }
        expect(spy).toHaveBeenCalled();
    });

    it('no debería llamar a cargarSolicitud si numeroFolioTramiteOriginal está definido', () => {
        component.tramiteState = {
            datosSolicitud: {
                numeroFolioTramiteOriginal: '12345',
            },
        } as any;
        const cargarSolicitudSpy = jest.spyOn(component, 'cargarSolicitud');
        component.ngOnInit();
        expect(cargarSolicitudSpy).not.toHaveBeenCalled();
    });

    it('debería inicializar el formulario y cargar los datos del estado en ngOnInit', () => {
        component.ngOnInit();
        expect(component.tramiteState.datosSolicitud.numeroFolioTramiteOriginal).toBe('12345');
        expect(component.solicitudFormulario.get('numeroFolioTramiteOriginal')?.value).toBe('12345');
    });

    it('debería cargar las partidas desde el servicio', () => {
        const mockPartidas = { datos: [{ id: 1, cantidad: '10', descripcion: 'Partida 1' }] };
        modificacionDescripcionServiceMock.obtenerPartidas.mockReturnValue(of(mockPartidas));
        component.cargarPartidas();
        expect(modificacionDescripcionServiceMock.obtenerPartidas).toHaveBeenCalled();
        expect(component.solicitudTablaDatos).toEqual(mockPartidas.datos);
    });

    it('debería cargar las fracciones arancelarias desde el servicio', () => {
        const mockArancelarias = { datos: [{ id: 1, fraccionArancelaria: '1234.56.78', descripcion: 'Fracción 1' }] };
        modificacionDescripcionServiceMock.obtenerarancelaria.mockReturnValue(of(mockArancelarias));
        component.cargararancelaria();
        expect(modificacionDescripcionServiceMock.obtenerarancelaria).toHaveBeenCalled();
        expect(component.arancelariaTablaDatos).toEqual(mockArancelarias.datos);
    });

    it('debería cargar los datos de la solicitud desde el servicio', () => {
        const mockSolicitud = { datos: { numeroFolioTramiteOriginal: '67890' } };
        modificacionDescripcionServiceMock.obtenerSolicitud.mockReturnValue(of(mockSolicitud));
        component.cargarSolicitud();
        expect(modificacionDescripcionServiceMock.obtenerSolicitud).toHaveBeenCalled();
        expect(storeMock.setSolicitud).toHaveBeenCalledWith(mockSolicitud.datos);
    });

    it('debería verificar si un campo del formulario es válido', () => {
        const isValid = component.isValid(component.solicitudFormulario, 'numeroFolioTramiteOriginal');
        expect(isValid).toBe(false);
    });

    it('debería completar destroyNotifier$ al destruir el componente', () => {
        const destroySpy = jest.spyOn(component.destroyNotifier$, 'next');
        const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
        component.ngOnDestroy();
        expect(destroySpy).toHaveBeenCalled();
        expect(completeSpy).toHaveBeenCalled();
    });
});