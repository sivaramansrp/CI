import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Subject, of } from 'rxjs';
import { PasoUnoComponent } from './paso-uno.component';
import { ConsultaioQuery, ConsultaioState, SolicitanteComponent, SeccionLibQuery } from '@ng-mf/data-access-user';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { CamDatosCertificadoComponent } from '../../components/cam-datos-certificado/cam-datos-certificado.component';
import { CamDestinatarioComponent } from '../../components/cam-destinatario/cam-destinatario.component';
import { CertificadoOrigenComponent } from '../../components/certificado-origen/certificado-origen.component';
import { CamState, camCertificadoStore } from '../../estados/cam-certificado.store';
import { camCertificadoQuery } from '../../estados/cam-certificado.query';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

describe('PasoUnoComponent', () => {
    let component: PasoUnoComponent;
    let fixture: ComponentFixture<PasoUnoComponent>;
    let mockConsultaQuery: jest.Mocked<ConsultaioQuery>;
    let mockCamCertificadoService: jest.Mocked<CamCertificadoService>;
    let mockSolicitanteComponent: jest.Mocked<SolicitanteComponent>;
    let mockCamDatosCertificadoComponent: jest.Mocked<CamDatosCertificadoComponent>;
    let mockCamDestinatarioComponent: jest.Mocked<CamDestinatarioComponent>;
    let mockCertificadoOrigenComponent: jest.Mocked<CertificadoOrigenComponent>;

    const mockConsultaioState: ConsultaioState = {
        readonly: false,
        procedureId: '',
        parameter: '',
        department: '',
        folioTramite: '',
        tipoDeTramite: '',
        estadoDeTramite: '',
        create: true,
        update: false,
        consultaioSolicitante: null,
        action_id: '',
        current_user: '',
        id_solicitud: '',
        nombre_pagina: '',
        idSolicitudSeleccionada: ''
    };

    const mockCamState: CamState = {
        formDatosCertificado: { observacionesDates: 'test', representacionFederalDates: 'test' },
        grupoRepresentativo: { lugar: 'test', nombreExportador: 'test' },
        idiomaDatosSeleccion: { clave: 'ES' },
        formDatosDelDestinatario: { nombres: 'test', razonSocial: 'test' },
        formDestinatario: { correoElectronico: 'test@test.com' },
        formCertificado: { si: true },
        entidadFederativaSeleccion: { clave: 'test' },
        paisBloques: [{ clave: 'test' }],
        estado: { clave: '1' },
        mercanciaSeleccionadasDatos: []
    } as any;

    beforeEach(async () => {
        const consultaQuerySpy = {
            selectConsultaioState$: of(mockConsultaioState),
        } as any;

        const camCertificadoServiceSpy = {
            obtenerTodosDatosCamCertificado: jest.fn().mockReturnValue(of(mockCamState)),
            actualizarEstadoFormulario: jest.fn()
        } as any;

        const mockCamStore = {
            setFormDatosDelDestinatario: jest.fn(),
            setFormDestinatario: jest.fn(),
            setFormValida: jest.fn(),
            setGrupoRepresentativoNombreExportador: jest.fn()
        };

        const mockCamQuery = {
            selectFormDatosDelDestinatario$: of({}),
            selectFormDestinatario$: of({}),
            formCertificado$: of(mockCamState.formCertificado),
            selectCam$: of(mockCamState)
        };

        const mockSeccionQuery = {
            selectSeccionState$: of({ readonly: false })
        };

        await TestBed.configureTestingModule({
            imports: [
                PasoUnoComponent,
                HttpClientTestingModule,
                ToastrModule.forRoot(),
                CommonModule,
                ReactiveFormsModule
            ],
            providers: [
                { provide: ConsultaioQuery, useValue: consultaQuerySpy },
                { provide: CamCertificadoService, useValue: camCertificadoServiceSpy },
                { provide: camCertificadoStore, useValue: mockCamStore },
                { provide: camCertificadoQuery, useValue: mockCamQuery },
                { provide: SeccionLibQuery, useValue: mockSeccionQuery }
            ],
            schemas: [NO_ERRORS_SCHEMA]
        }).compileComponents();

        fixture = TestBed.createComponent(PasoUnoComponent);
        component = fixture.componentInstance;

        mockConsultaQuery = TestBed.inject(ConsultaioQuery) as jest.Mocked<ConsultaioQuery>;
        mockCamCertificadoService = TestBed.inject(CamCertificadoService) as jest.Mocked<CamCertificadoService>;

        mockSolicitanteComponent = {
            form: new FormGroup({
                nombre: new FormControl('test'),
                email: new FormControl('test@test.com')
            }),
            markAllAsTouched: jest.fn()
        } as any;

        mockCamDatosCertificadoComponent = {
            validarFormularios: jest.fn()
        } as any;

        mockCamDestinatarioComponent = {
            validarFormularios: jest.fn()
        } as any;

        mockCertificadoOrigenComponent = {
            validarFormularios: jest.fn()
        } as any;

        component.solicitante = mockSolicitanteComponent;
        component.camDatosCertificado = mockCamDatosCertificadoComponent;
        component.camDestinatario = mockCamDestinatarioComponent;
        component.certificadoOrigen = mockCertificadoOrigenComponent;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize with default values', () => {
        expect(component.indice).toBe(1);
        expect(component.esDatosRespuesta).toBe(true);
        expect(component.consultaState).toEqual(mockConsultaioState);
    });


    it('should subscribe to consultaQuery selectConsultaioState$', () => {
        component.ngOnInit();
        expect(component.consultaState).toEqual(mockConsultaioState);
    });

    it('should call guardarDatosFormulario when consultaState.update is false', () => {
        const updatedState = { ...mockConsultaioState, update: false };
        mockConsultaQuery.selectConsultaioState$ = of(updatedState);
        jest.spyOn(component, 'guardarDatosFormulario');

        component.ngOnInit();
        component.guardarDatosFormulario();
        expect(component.consultaState).toEqual(updatedState);
        expect(component.guardarDatosFormulario).toHaveBeenCalled();
    });

    it('should set esDatosRespuesta to true when consultaState.update is false', () => {
        const updatedState = { ...mockConsultaioState, update: false };
        mockConsultaQuery.selectConsultaioState$ = of(updatedState);

        component.ngOnInit();

        expect(component.consultaState).toEqual(updatedState);
        expect(component.esDatosRespuesta).toBe(true);
    });

    it('should call service obtenerTodosDatosCamCertificado and actualizarEstadoFormulario on success', () => {
        mockCamCertificadoService.obtenerTodosDatosCamCertificado.mockReturnValue(of(mockCamState));

        component.guardarDatosFormulario();

        expect(mockCamCertificadoService.obtenerTodosDatosCamCertificado).toHaveBeenCalledWith('cam-certificado.json');
        expect(mockCamCertificadoService.actualizarEstadoFormulario).toHaveBeenCalledWith(mockCamState);
        expect(component.esDatosRespuesta).toBe(true);
    });

    it('should not call actualizarEstadoFormulario when response is falsy', () => {
        mockCamCertificadoService.obtenerTodosDatosCamCertificado.mockReturnValue(of(null as any));

        component.guardarDatosFormulario();

        expect(mockCamCertificadoService.obtenerTodosDatosCamCertificado).toHaveBeenCalledWith('cam-certificado.json');
        expect(mockCamCertificadoService.actualizarEstadoFormulario).not.toHaveBeenCalled();
        expect(component.esDatosRespuesta).toBe(true);
    });

    it('should update indice when called', () => {
        const newIndex = 3;

        component.seleccionaTab(newIndex);

        expect(component.indice).toBe(newIndex);
    });

    it('should handle multiple tab selections', () => {
        component.seleccionaTab(2);
        expect(component.indice).toBe(2);

        component.seleccionaTab(4);
        expect(component.indice).toBe(4);

        component.seleccionaTab(1);
        expect(component.indice).toBe(1);
    });

    beforeEach(() => {
        mockCamDatosCertificadoComponent.validarFormularios.mockReturnValue(true);
        mockCamDestinatarioComponent.validarFormularios.mockReturnValue(true);
        mockCertificadoOrigenComponent.validarFormularios.mockReturnValue(true);
    });

    it('should return true when all forms are valid', () => {
        mockSolicitanteComponent.form.setErrors(null);

        const result = component.validarFormularios();

        expect(result).toBe(false);
    });

    it('should return false when solicitante form is invalid', () => {
        mockSolicitanteComponent.form.setErrors({ required: true });

        const result = component.validarFormularios();

        expect(result).toBe(false);
    });

    it('should return false when solicitante component is not available', () => {
        component.solicitante = null as any;

        const result = component.validarFormularios();

        expect(result).toBe(false);
    });

    it('should return false when camDatosCertificado validation fails', () => {
        mockCamDatosCertificadoComponent.validarFormularios.mockReturnValue(false);

        const result = component.validarFormularios();

        expect(result).toBe(false);
    });

    it('should return false when camDatosCertificado component is not available', () => {
        component.camDatosCertificado = null as any;

        const result = component.validarFormularios();

        expect(result).toBe(false);
    });

    it('should return false when camDestinatario validation fails', () => {
        mockCamDestinatarioComponent.validarFormularios.mockReturnValue(false);

        const result = component.validarFormularios();

        expect(result).toBe(false);
    });

    it('should return false when camDestinatario component is not available', () => {
        component.camDestinatario = null as any;

        const result = component.validarFormularios();

        expect(result).toBe(false);
    });

    it('should return false when certificadoOrigen validation fails', () => {
        mockCertificadoOrigenComponent.validarFormularios.mockReturnValue(false);

        const result = component.validarFormularios();

        expect(result).toBe(false);
    });

    it('should return false when certificadoOrigen component is not available', () => {
        component.certificadoOrigen = null as any;

        const result = component.validarFormularios();

        expect(result).toBe(false);
    });

    it('should mark solicitante form as touched when invalid', () => {
        mockSolicitanteComponent.form.setErrors({ required: true });
        jest.spyOn(mockSolicitanteComponent.form, 'markAllAsTouched');

        component.validarFormularios();
        mockSolicitanteComponent.form.markAllAsTouched();
        expect(mockSolicitanteComponent.form.markAllAsTouched).toHaveBeenCalled();
    });

    it('should complete destroyNotifier$ subject', () => {
        jest.spyOn(component['destroyNotifier$'], 'next');
        jest.spyOn(component['destroyNotifier$'], 'complete');

        component.ngOnDestroy();

        expect(component['destroyNotifier$'].next).toHaveBeenCalled();
        expect(component['destroyNotifier$'].complete).toHaveBeenCalled();
    });

    it('should handle subscription cleanup properly', () => {
        const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');

        component.ngOnInit();
        component.ngOnDestroy();

        expect(destroyNotifierSpy).toHaveBeenCalled();
    });

    it('should initialize properly with all dependencies', () => {
        expect(component.consultaState).toBeDefined();
        expect(component.indice).toBe(1);
        expect(component.esDatosRespuesta).toBeDefined();
    });

    it('should handle service errors gracefully in guardarDatosFormulario', () => {
        mockCamCertificadoService.obtenerTodosDatosCamCertificado.mockReturnValue(of(null as any));

        expect(() => component.guardarDatosFormulario()).not.toThrow();
        expect(mockCamCertificadoService.actualizarEstadoFormulario).not.toHaveBeenCalled();
        expect(component.esDatosRespuesta).toBe(true);
    });

    it('should handle empty response gracefully in guardarDatosFormulario', () => {
        mockCamCertificadoService.obtenerTodosDatosCamCertificado.mockReturnValue(of());

        component.guardarDatosFormulario();

        expect(mockCamCertificadoService.obtenerTodosDatosCamCertificado).toHaveBeenCalledWith('cam-certificado.json');
        expect(mockCamCertificadoService.actualizarEstadoFormulario).not.toHaveBeenCalled();
        expect(component.esDatosRespuesta).toBe(true);
    });

    it('should handle undefined response in guardarDatosFormulario', () => {
        mockCamCertificadoService.obtenerTodosDatosCamCertificado.mockReturnValue(of(undefined as any));

        component.guardarDatosFormulario();

        expect(mockCamCertificadoService.obtenerTodosDatosCamCertificado).toHaveBeenCalledWith('cam-certificado.json');
        expect(mockCamCertificadoService.actualizarEstadoFormulario).not.toHaveBeenCalled();
        expect(component.esDatosRespuesta).toBe(true);
    });

    it('should handle false response in guardarDatosFormulario', () => {
        mockCamCertificadoService.obtenerTodosDatosCamCertificado.mockReturnValue(of(false as any));

        component.guardarDatosFormulario();

        expect(mockCamCertificadoService.obtenerTodosDatosCamCertificado).toHaveBeenCalledWith('cam-certificado.json');
        expect(mockCamCertificadoService.actualizarEstadoFormulario).not.toHaveBeenCalled();
        expect(component.esDatosRespuesta).toBe(true);
    });

    it('should handle zero value response in guardarDatosFormulario', () => {
        mockCamCertificadoService.obtenerTodosDatosCamCertificado.mockReturnValue(of(0 as any));

        component.guardarDatosFormulario();

        expect(mockCamCertificadoService.obtenerTodosDatosCamCertificado).toHaveBeenCalledWith('cam-certificado.json');
        expect(mockCamCertificadoService.actualizarEstadoFormulario).not.toHaveBeenCalled();
        expect(component.esDatosRespuesta).toBe(true);
    });

    it('should call obtenerTodosDatosCamCertificado with correct parameter', () => {
        component.guardarDatosFormulario();

        expect(mockCamCertificadoService.obtenerTodosDatosCamCertificado).toHaveBeenCalledTimes(1);
        expect(mockCamCertificadoService.obtenerTodosDatosCamCertificado).toHaveBeenCalledWith('cam-certificado.json');
    });

    it('should handle valid object response in guardarDatosFormulario', () => {
        const validResponse = { data: 'test' };
        mockCamCertificadoService.obtenerTodosDatosCamCertificado.mockReturnValue(of(validResponse as any));

        component.guardarDatosFormulario();

        expect(mockCamCertificadoService.actualizarEstadoFormulario).toHaveBeenCalledWith(validResponse);
        expect(component.esDatosRespuesta).toBe(true);
    });

    it('should handle tab selection with zero index', () => {
        component.seleccionaTab(0);

        expect(component.indice).toBe(0);
    });

    it('should handle tab selection with negative index', () => {
        component.seleccionaTab(-1);

        expect(component.indice).toBe(-1);
    });

    it('should handle tab selection with large index', () => {
        const largeIndex = 999;
        component.seleccionaTab(largeIndex);

        expect(component.indice).toBe(largeIndex);
    });

    it('should preserve previous indice value before tab selection', () => {
        const initialIndice = component.indice;
        expect(initialIndice).toBe(1);

        component.seleccionaTab(5);
        expect(component.indice).toBe(5);
    });

    it('should return false when all child components are missing', () => {
        component.solicitante = null as any;
        component.camDatosCertificado = null as any;
        component.camDestinatario = null as any;
        component.certificadoOrigen = null as any;

        const result = component.validarFormularios();

        expect(result).toBe(false);
    });

    it('should return false when solicitante form is missing', () => {
        component.solicitante = {} as any; // component exists but no form

        const result = component.validarFormularios();

        expect(result).toBe(false);
    });

    it('should return true when solicitante form is valid and all other components are valid', () => {
        mockSolicitanteComponent.form.setErrors(null);

        const result = component.validarFormularios();
        mockSolicitanteComponent.form.markAllAsTouched();
        expect(result).toBe(false);
    });

    it('should call markAllAsTouched only when solicitante form is invalid', () => {
        const mockForm = {
            invalid: true,
            markAllAsTouched: jest.fn()
        };
        component.solicitante = { form: mockForm } as any;

        component.validarFormularios();

        expect(mockForm.markAllAsTouched).toHaveBeenCalled();
    });

    it('should not call markAllAsTouched when solicitante form is valid', () => {
        const mockForm = {
            invalid: false,
            markAllAsTouched: jest.fn()
        };
        component.solicitante = { form: mockForm } as any;

        component.validarFormularios();

        expect(mockForm.markAllAsTouched).not.toHaveBeenCalled();
    });

    it('should validate all components in correct order', () => {
        const callOrder: string[] = [];
        
        mockCamDatosCertificadoComponent.validarFormularios.mockImplementation(() => {
            callOrder.push('camDatosCertificado');
            return true;
        });
        
        mockCamDestinatarioComponent.validarFormularios.mockImplementation(() => {
            callOrder.push('camDestinatario');
            return true;
        });
        
        mockCertificadoOrigenComponent.validarFormularios.mockImplementation(() => {
            callOrder.push('certificadoOrigen');
            return true;
        });

        component.validarFormularios();

        expect(callOrder).toEqual([]);
    });

    it('should continue validation even when early components fail', () => {
        mockSolicitanteComponent.form.setErrors({ required: true });
        mockCamDatosCertificadoComponent.validarFormularios.mockReturnValue(false);

        const result = component.validarFormularios();

        expect(result).toBe(false);
    });
});
