import { TestBed } from '@angular/core/testing';
import { CertificadoOrigenComponent } from './certificado-origen.component';
import { FormBuilder } from '@angular/forms';
import { Tramite110207Store } from '../../state/Tramite110207.store';
import { Tramite110207Query } from '../../state/Tramite110207.query';
import { RegistroService } from '../../services/registro.service';
import { ToastrService } from 'ngx-toastr';
import { SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, Subject } from 'rxjs';
import { Catalogo } from '@libs/shared/data-access-user/src';
import { Mercancia } from '../../../../shared/models/modificacion.enum';
import { CertificadoDeOrigenComponent } from '../../../../shared/components/certificado-de-origen/certificado-de-origen.component';

describe('CertificadoOrigenComponent', () => {
    let component: CertificadoOrigenComponent;
    let fixture: any;
    let storeSpy: jest.Mocked<Tramite110207Store>;
    let registroServiceSpy: jest.Mocked<RegistroService>;
    let toastrSpy: jest.Mocked<ToastrService>;
    let seccionQuerySpy: jest.Mocked<SeccionLibQuery>;
    let consultaQuerySpy: jest.Mocked<ConsultaioQuery>;
    let querySpy: jest.Mocked<Tramite110207Query>;

    beforeEach(async () => {
        storeSpy = {
            setFormCertificadoGenric: jest.fn(),
            setDisponsiblesDatos: jest.fn(),
            setEstado: jest.fn(),
            setBloque: jest.fn(),
            setmercanciaTabla: jest.fn(),
            setFormValida: jest.fn()
        } as any;
        registroServiceSpy = {
            buscarMercanciasCert: jest.fn()
        } as any;
        toastrSpy = {
            error: jest.fn()
        } as any;
        seccionQuerySpy = {
            selectSeccionState$: of({ readonly: false })
        } as any;
        consultaQuerySpy = {
            selectConsultaioState$: of({ readonly: false })
        } as any;
        querySpy = {
            selectSolicitud$: of({
                mercanciaTabla: [],
                disponiblesDatos: []
            }),
            formCertificado$: of({})
        } as any;

        await TestBed.configureTestingModule({
            imports: [CertificadoOrigenComponent],
            providers: [
                FormBuilder,
                { provide: Tramite110207Store, useValue: storeSpy },
                { provide: Tramite110207Query, useValue: querySpy },
                { provide: RegistroService, useValue: registroServiceSpy },
                { provide: ToastrService, useValue: toastrSpy },
                { provide: SeccionLibQuery, useValue: seccionQuerySpy },
                { provide: ConsultaioQuery, useValue: consultaQuerySpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(CertificadoOrigenComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('ngOnInit', () => {
        it('should subscribe to seccionQuery and set esFormularioSoloLectura', () => {
            component.ngOnInit();
            expect(component.esFormularioSoloLectura).toBe(false);
        });

        it('should subscribe to query.selectSolicitud$ and set datosTabla$ and datosTablaUno', () => {
            component.ngOnInit();
            expect(component.datosTabla$).toEqual([]);
            expect(component.datosTablaUno).toEqual([]);
        });

        it('should subscribe to query.formCertificado$ and set formCertificado', () => {
            component.ngOnInit();
            expect(component.formCertificado).toBeDefined();
        });
    });

    describe('setValoresStore', () => {
        it('should call store.setFormCertificadoGenric with correct params', () => {
            const event = { formGroupName: 'test', campo: 'campo', valor: undefined, storeStateName: 'state' };
            component.setValoresStore(event);
            expect(storeSpy.setFormCertificadoGenric).toHaveBeenCalledWith({ campo: 'valor' });
        });
    });

    describe('tipoEstadoSeleccion', () => {
        it('should call store.setEstado', () => {
            const estado: Catalogo = { id: 1, descripcion: 'Estado' };
            component.tipoEstadoSeleccion(estado);
            expect(storeSpy.setEstado).toHaveBeenCalledWith(estado);
        });
    });

    describe('tipoSeleccion', () => {
        it('should call store.setBloque', () => {
            const estado: Catalogo = { id: 2, descripcion: 'Bloque' };
            component.tipoSeleccion(estado);
            expect(storeSpy.setBloque).toHaveBeenCalledWith([estado]);
        });
    });

    describe('emitmercaniasDatos', () => {
        it('should call store.setmercanciaTabla with array', () => {
            const mercancia: Mercancia = { id: 1 } as Mercancia;
            component.emitmercaniasDatos(mercancia);
            expect(storeSpy.setmercanciaTabla).toHaveBeenCalledWith([mercancia]);
        });
    });

    describe('guardarClicado', () => {
        it('should set datosTabla$', () => {
            const mercancias: Mercancia[] = [{ id: 1 } as Mercancia];
            component.guardarClicado(mercancias);
            expect(component.datosTabla$).toEqual(mercancias);
        });
    });

    describe('setFormValida', () => {
        it('should call store.setFormValida', () => {
            component.setFormValida(true);
            expect(storeSpy.setFormValida).toHaveBeenCalledWith({ certificado: true });
        });
    });

    describe('abrirModificarModal', () => {
        it('should set datosSeleccionados and fromMercanciasDisponibles', () => {
            const mercancia: Mercancia = { id: 1 } as Mercancia;
            component.modalInstance = { show: jest.fn() } as any;
            component.abrirModificarModal(mercancia, true);
            expect(component.datosSeleccionados).toBe(mercancia);
            expect(component.fromMercanciasDisponibles).toBeTruthy();
            expect(component.modalInstance.show).toHaveBeenCalled();
        });
    });

    describe('cerrarModificarModal', () => {
        it('should set tablaSeleccionEvent and call modalInstance.hide', () => {
            component.modalInstance = { hide: jest.fn() } as any;
            component.cerrarModificarModal();
            expect(component.tablaSeleccionEvent).toBeTruthy();
            expect(component.modalInstance.hide).toHaveBeenCalled();
        });
    });

    describe('validateAll', () => {
        it('should validate child form and update store', () => {
            component.certificadoDeOrigenComponent = {
                validarFormularios: () => true
            } as CertificadoDeOrigenComponent;
            const result = component.validateAll();
            expect(result).toBeTruthy();
            expect(storeSpy.setFormValida).toHaveBeenCalledWith(true);
        });

        it('should return false if child form is invalid', () => {
            component.certificadoDeOrigenComponent = {
                validarFormularios: () => false
            } as CertificadoDeOrigenComponent;
            const result = component.validateAll();
            expect(result).toBeFalsy();
            expect(storeSpy.setFormValida).toHaveBeenCalledWith(false);
        });
    });

    describe('ngOnDestroy', () => {
        it('should complete destroyNotifier$', () => {
            const spyNext = jest.spyOn((component as any).destroyNotifier$, 'next');
            const spyComplete = jest.spyOn((component as any).destroyNotifier$, 'complete');
            component.ngOnDestroy();
            expect(spyNext).toHaveBeenCalled();
            expect(spyComplete).toHaveBeenCalled();
        });
    });

    describe('conseguirDisponiblesDatos', () => {
        it('should call registroService.buscarMercanciasCert and setDisponsiblesDatos on success', () => {
            component.formCertificado = { entidadFederativa: 1, bloque: 'MX' };
            const response = {
                datos: [
                    {
                        idMercancia: 1,
                        fraccionArancelaria: 'FA',
                        numeroRegistro: 'NR',
                        fechaExpedicion: 'FE',
                        fechaVencimiento: 'FV',
                        nombreTecnico: 'NT',
                        nombreComercial: 'NC',
                        fraccionNALADIClave: 'NALADI',
                        fraccionNALADSA93Clave: 'SA93',
                        fraccionNALADISA96Clave: 'SA96',
                        fraccionNALADISA02Clave: 'SA02',
                        criterioOrigen: 'CO',
                        porcentajeContenidoRegional: 'PCR',
                        tratadoAplicable: { nombreTratado: 'Tratado' },
                        unidadMedida: 'UM'
                    }
                ]
            };
            component.conseguirDisponiblesDatos();
            expect(registroServiceSpy.buscarMercanciasCert).toHaveBeenCalled();
            expect(storeSpy.setDisponsiblesDatos).toHaveBeenCalled();
        });

        it('should call toastr.error on error', () => {
            component.formCertificado = { entidadFederativa: 1, bloque: 'MX' };
            registroServiceSpy.buscarMercanciasCert.mockReturnValue({
                pipe: () => ({
                    subscribe: (handlers: any) => handlers.error()
                })
            } as any);
            component.conseguirDisponiblesDatos();
            expect(toastrSpy.error).toHaveBeenCalledWith('Error al buscar Mercancia');
        });
    });
});