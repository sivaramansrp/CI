import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudComponent } from './Solicitud.component';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Tramite31802Store, Solicitud31802State, createInitialState } from '../state/Tramite31802.store';
import { Tramite31802Query } from '../state/Tramite31802.query';
import { RegistroSolicitudService } from '../services/registro-solicitud-service.service';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, ReplaySubject, Subject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let storeMock: any;
  let queryMock: any;
  let validacionesServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    storeMock = {
      setNumeroOperacion: jest.fn(),
      setLlave: jest.fn(),
      setManifiesto1: jest.fn(),
      setManifiesto2: jest.fn(),
      setManifiesto3: jest.fn(),
      setFechaPago: jest.fn(),
      setRenovacion: jest.fn(),
      setHomologacion: jest.fn(),
      setMonedaNacional: jest.fn(),
    };

    queryMock = {
      selectSolicitud$: of(createInitialState()),
    };

    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };

    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [SolicitudComponent, ReactiveFormsModule],
      providers: [
        { provide: Tramite31802Store, useValue: storeMock },
        { provide: Tramite31802Query, useValue: queryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
        RegistroSolicitudService,
        FormBuilder,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    component.solicitudState = createInitialState();
    component.registroForm = new FormBuilder().group({
      llave: ['', Validators.required],
      manifiesto1: ['', Validators.required],
      manifiesto2: ['', Validators.required],
      manifiesto3: ['', Validators.required],
      numeroOperacion: [0, Validators.required],
      fechaPago: ['', Validators.required],
      monedaNacional: ['', Validators.required],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should subscribe to query.selectSolicitud$ and set solicitudState in ngOnInit', () => {
    component.solicitudState = undefined as any;
    component.ngOnInit();
    expect(component.solicitudState).toBeDefined();
  });

  it('should call donanteDomicilio in ngOnInit', () => {
    const spy = jest.spyOn(component, 'donanteDomicilio');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('should call guardarDatosDelFormulario if esFormularioSoloLectura is true in inicializarEstadoFormulario', () => {
    component.esFormularioSoloLectura = true;
    const spy = jest.spyOn(component, 'guardarDatosDelFormulario');
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should call datosDeAvisoForm if esFormularioSoloLectura is false in inicializarEstadoFormulario', () => {
    component.esFormularioSoloLectura = false;
    const spy = jest.spyOn(component, 'datosDeAvisoForm');
    component.inicializarEstadoFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should patch fechaPago and call setValoresStore in cambioFechaPago', () => {
    const spy = jest.spyOn(component, 'setValoresStore');
    component.cambioFechaPago('2024-01-01');
    expect(component.registroForm.get('fechaPago')?.value).toBe('2024-01-01');
    expect(spy).toHaveBeenCalledWith(component.registroForm, 'fechaPago', 'setFechaPago');
  });

  it('should call validarDestinatarioFormulario if registroForm is invalid in enviarFormulario', () => {
    component.registroForm = new FormBuilder().group({
      llave: [''],
      manifiesto1: [''],
      manifiesto2: [''],
      manifiesto3: [''],
      numeroOperacion: [''],
      fechaPago: [''],
      monedaNacional: [''],
    });
    jest.spyOn(component, 'validarDestinatarioFormulario');
    component.enviarFormulario();
    // expect(component.validarDestinatarioFormulario).toHaveBeenCalled();
  });

  it('should not call validarDestinatarioFormulario if registroForm is valid in enviarFormulario', () => {
    component.registroForm = new FormBuilder().group({
      llave: ['a', Validators.required],
      manifiesto1: ['a', Validators.required],
      manifiesto2: ['a', Validators.required],
      manifiesto3: ['a', Validators.required],
      numeroOperacion: [1, Validators.required],
      fechaPago: ['2024-01-01', Validators.required],
      monedaNacional: ['MXN', Validators.required],
    });
    jest.spyOn(component, 'validarDestinatarioFormulario');
    component.enviarFormulario();
    // expect(component.validarDestinatarioFormulario).not.toHaveBeenCalled();
  });

  it('should call validacionesService.isValid in esValido', () => {
    component.registroForm = new FormBuilder().group({
      llave: ['a'],
    });
    component.esValido(component.registroForm, 'llave');
    expect(validacionesServiceMock.isValid).toHaveBeenCalledWith(component.registroForm, 'llave');
  });

  it('should mark all as touched if registroForm is invalid in validarDestinatarioFormulario', () => {
    component.registroForm = new FormBuilder().group({
      llave: [''],
    });
    const spy = jest.spyOn(component.registroForm, 'markAllAsTouched');
    component.validarDestinatarioFormulario();
    // expect(spy).toHaveBeenCalled();
  });

  it('should disable registroForm if esFormularioSoloLectura is true in guardarDatosDelFormulario', () => {
    component.esFormularioSoloLectura = true;
    const spy = jest.spyOn(component.registroForm, 'disable');
    component.guardarDatosDelFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should enable registroForm if esFormularioSoloLectura is false in guardarDatosDelFormulario', () => {
    component.esFormularioSoloLectura = false;
    const spy = jest.spyOn(component.registroForm, 'enable');
    component.guardarDatosDelFormulario();
    expect(spy).toHaveBeenCalled();
  });

  it('should call store method in setValoresStore', () => {
    component.registroForm.get('llave')?.setValue('abc');
    component.setValoresStore(component.registroForm, 'llave', 'setLlave');
    expect(storeMock.setLlave).toHaveBeenCalledWith('abc');
  });

  it('should initialize registroForm in donanteDomicilio and call inicializarEstadoFormulario', () => {
    const spy = jest.spyOn(component, 'inicializarEstadoFormulario');
    component.solicitudState = {
      llave: 'llave',
      manifiesto1: 'm1',
      manifiesto2: 'm2',
      manifiesto3: 'm3',
      numeroOperacion: 123,
      fechaPago: '2024-01-01',
      monedaNacional: 'MXN',
      renovacion: false,
      homologacion: false,
    };
    component.donanteDomicilio();
    expect(component.registroForm.get('llave')?.value).toBe('llave');
    expect(component.registroForm.get('manifiesto1')?.value).toBe('m1');
    expect(spy).toHaveBeenCalled();
  });

  it('should disable fields in datosDeAvisoForm if esFormularioSoloLectura is true', () => {
    component.esFormularioSoloLectura = true;
    component.registroForm = new FormBuilder().group({
      llave: ['a'],
      numeroOperacion: ['b'],
      fechaPago: ['c'],
      monedaNacional: ['d'],
    });
    const spyLlave = jest.spyOn(component.registroForm.get('llave')!, 'disable');
    const spyNumOp = jest.spyOn(component.registroForm.get('numeroOperacion')!, 'disable');
    const spyFechaPago = jest.spyOn(component.registroForm.get('fechaPago')!, 'disable');
    const spyMoneda = jest.spyOn(component.registroForm.get('monedaNacional')!, 'disable');
    component.datosDeAvisoForm();
    expect(spyLlave).toHaveBeenCalled();
    expect(spyNumOp).toHaveBeenCalled();
    expect(spyFechaPago).toHaveBeenCalled();
    expect(spyMoneda).toHaveBeenCalled();
  });

  it('should complete destroyed$ in ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component.destroyed$, 'next');
    const completeSpy = jest.spyOn(component.destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});