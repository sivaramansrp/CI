import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsignacionComponent } from './asignacion.component';
import { CuposService } from '../services/cupos.service';
import { Tramite120403Store } from '../state/Tramite120403.store';
import { Tramite120403Query } from '../state/Tramite120403.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { of, ReplaySubject } from 'rxjs';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { CommonModule } from '@angular/common';

describe('AsignacionComponent', () => {
  let component: AsignacionComponent;
  let fixture: ComponentFixture<AsignacionComponent>;
  let cuposServiceMock: any;
  let storeMock: any;
  let queryMock: any;
  let validacionesServiceMock: any;
  let consultaioQueryMock: any;
  let destroyed$: ReplaySubject<boolean>;

  beforeEach(async () => {
    destroyed$ = new ReplaySubject(1);

    cuposServiceMock = {
      obtenerDatosAno: jest.fn().mockReturnValue(of([{ id: 1, descripcion: '2024' }])),
    };
    storeMock = {
      setAsignacionRadio: jest.fn(),
      setAsignacionsolitud: jest.fn(),
      setNumTramite: jest.fn(),
      setFechaFin: jest.fn(),
      setAmpliar: jest.fn(),
    };
    queryMock = {
      selectSolicitud$: of({
        asignacionRadio: 'vigencia',
        asignacionsolitud: 'solicitud',
        numTramite: '123',
        fechaFin: '2024-12-31',
        ampliar: '1000',
        valorSeleccionado: null,
      }),
    };
    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, CommonModule, AsignacionComponent],
      providers: [
        FormBuilder,
        { provide: CuposService, useValue: cuposServiceMock },
        { provide: Tramite120403Store, useValue: storeMock },
        { provide: Tramite120403Query, useValue: queryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize solicitudState and call donanteDomicilio, obtenerDatosEstado, inicializarEstadoFormulario on ngOnInit', () => {
    jest.spyOn(component, 'donanteDomicilio');
    jest.spyOn(component, 'obtenerDatosEstado');
    jest.spyOn(component, 'inicializarEstadoFormulario');
    component.ngOnInit();
    expect(component.solicitudState).toBeDefined();
    expect(component.donanteDomicilio).toHaveBeenCalled();
    expect(component.obtenerDatosEstado).toHaveBeenCalled();
    expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
  });

  it('should call guardarDatosFormulario if soloLectura in inicializarEstadoFormulario', () => {
    component.soloLectura = true;
    jest.spyOn(component, 'guardarDatosFormulario');
    component.inicializarEstadoFormulario();
    expect(component.guardarDatosFormulario).toHaveBeenCalled();
  });

  it('should call donanteDomicilio if not soloLectura in inicializarEstadoFormulario', () => {
    component.soloLectura = false;
    jest.spyOn(component, 'donanteDomicilio');
    component.inicializarEstadoFormulario();
    expect(component.donanteDomicilio).toHaveBeenCalled();
  });

  it('should set mostrarVigencia and mostrarMonto in buscar', () => {
    component.asignacionForm = new FormBuilder().group({
      asignacionRadio: ['vigencia'],
    });
    component.buscar();
    expect(component.mostrarVigencia).toBe(true);
    expect(component.mostrarMonto).toBe(false);

    component.asignacionForm.get('asignacionRadio')?.setValue('monto');
    component.buscar();
    expect(component.mostrarVigencia).toBe(false);
    expect(component.mostrarMonto).toBe(true);
  });

  it('should patch fechaFin and call setValoresStore in cambioFechaPago', () => {
    component.asignacionForm = new FormBuilder().group({
      fechaFin: [''],
    });
    jest.spyOn(component, 'setValoresStore');
    component.cambioFechaPago('2024-12-31');
    expect(component.asignacionForm.get('fechaFin')?.value).toBe('2024-12-31');
    expect(component.setValoresStore).toHaveBeenCalledWith(component.asignacionForm, 'fechaFin', 'setFechaFin');
  });

  it('should fetch ano catalogo in obtenerDatosEstado', () => {
    component.anoCatalogo = { catalogos: [] } as any;
    component.obtenerDatosEstado();
    expect(cuposServiceMock.obtenerDatosAno).toHaveBeenCalled();
    expect(component.anoCatalogo.catalogos).toEqual([{ id: 1, descripcion: '2024' }]);
  });

  it('should mark all as touched if form is invalid in validarDestinatarioFormulario', () => {
    component.asignacionForm = new FormBuilder().group({
      asignacionsolitud: ['', Validators.required],
    });
    jest.spyOn(component.asignacionForm, 'markAllAsTouched');
    component.asignacionForm.get('asignacionsolitud')?.setValue('');
    component.validarDestinatarioFormulario();
    expect(component.asignacionForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should call validacionesService.isValid in esValido', () => {
    const form = new FormBuilder().group({ campo: [''] });
    expect(component.esValido(form, 'campo')).toBe(true);
    expect(validacionesServiceMock.isValid).toHaveBeenCalledWith(form, 'campo');
  });

  it('should call store method in setValoresStore', () => {
    const form = new FormBuilder().group({ numTramite: ['123'] });
    component.setValoresStore(form, 'numTramite', 'setNumTramite');
    expect(storeMock.setNumTramite).toHaveBeenCalledWith('123');
  });

  it('should initialize asignacionForm in donanteDomicilio', () => {
    component.solicitudState = {
      asignacionRadio: 'vigencia',
      asignacionsolitud: 'solicitud',
      numTramite: '123',
      fechaFin: '2024-12-31',
      ampliar: '1000',
      valorSeleccionado: null,
    };
    component.donanteDomicilio();
    expect(component.asignacionForm.value).toEqual({
      asignacionRadio: 'vigencia',
      asignacionsolitud: 'solicitud',
      numTramite: '123',
      fechaFin: '2024-12-31',
      ampliar: '1000',
    });
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});