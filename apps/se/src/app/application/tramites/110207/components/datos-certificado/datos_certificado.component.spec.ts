import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosCertificadoComponent } from './datos_certificado.component';
import { RegistroService } from '../../services/registro.service';
import { Tramite110207Store } from '../../state/Tramite110207.store';
import { Tramite110207Query } from '../../state/Tramite110207.query';
import { ValidacionesFormularioService, Catalogo, CatalogosSelect, ConsultaioQuery } from '@ng-mf/data-access-user';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { of, ReplaySubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('DatosCertificadoComponent', () => {
  let component: DatosCertificadoComponent;
  let fixture: ComponentFixture<DatosCertificadoComponent>;
  let registroServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;
  let validacionesServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    registroServiceMock = {
      getIdioma: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'Español' }] })),
      getEntidad: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 8, nombre: 'DURANGO' }] })),
      getRepresentacion: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'Rep' }] })),
    };
    tramiteStoreMock = {
      setEntidad: jest.fn(),
      setIdioma: jest.fn(),
      setRepresentacion: jest.fn(),
      setObservaciones: jest.fn(),
      setPresica: jest.fn(),
      setPresenta: jest.fn(),
      setCheckbox: jest.fn(),
      setJustificacion: jest.fn(),
    };
    tramiteQueryMock = {
      selectSolicitud$: of({}),
    };
    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, DatosCertificadoComponent],
      providers: [
        FormBuilder,
        { provide: RegistroService, useValue: registroServiceMock },
        { provide: Tramite110207Store, useValue: tramiteStoreMock },
        { provide: Tramite110207Query, useValue: tramiteQueryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark all as touched if registroForm is invalid in validarDestinatarioFormulario', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        idioma: ['', Validators.required]
      })
    });
    jest.spyOn(component.registroForm, 'markAllAsTouched');
    component.registroForm.setErrors({ invalid: true });
    component.validarDestinatarioFormulario();
    expect(component.registroForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should call getIdioma, getEntidad, getRepresentacion, inicializarEstadoFormulario, donanteDomicilio on ngOnInit', () => {
    jest.spyOn(component, 'getIdioma');
    jest.spyOn(component, 'getEntidad');
    jest.spyOn(component, 'getRepresentacion');
    jest.spyOn(component, 'inicializarEstadoFormulario');
    jest.spyOn(component, 'donanteDomicilio');
    component.entidadFederativaData = 'DURANGO';
    component.entidadDescripcion = ['8'];
    component.ngOnInit();
    expect(component.getIdioma).toHaveBeenCalled();
    expect(component.getEntidad).toHaveBeenCalled();
    expect(component.getRepresentacion).toHaveBeenCalled();
    expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
    expect(component.donanteDomicilio).toHaveBeenCalled();
    expect(component.isJustificacion).toBe(true);
  });

  it('should set isJustificacion to false if entidadDescripcion does not include 8 or entidadFederativaData is not DURANGO', () => {
    component.entidadFederativaData = 'OTRO';
    component.entidadDescripcion = ['1'];
    component.ngOnInit();
    expect(component.isJustificacion).toBe(false);
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

  it('should call donanteDomicilio and enable/disable form in guardarDatosFormulario', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({})
    });
    component.soloLectura = true;
    jest.spyOn(component.registroForm, 'disable');
    jest.spyOn(component, 'donanteDomicilio');
    component.guardarDatosFormulario();
    expect(component.donanteDomicilio).toHaveBeenCalled();
    expect(component.registroForm.disable).toHaveBeenCalled();

    component.soloLectura = false;
    jest.spyOn(component.registroForm, 'enable');
    component.guardarDatosFormulario();
    expect(component.registroForm.enable).toHaveBeenCalled();
  });

  it('should call registroService.getIdioma and set optionsIdioma in getIdioma', () => {
    component.getIdioma();
    expect(registroServiceMock.getIdioma).toHaveBeenCalled();
    expect(component.optionsIdioma).toBeDefined();
  });

  it('should call registroService.getEntidad and set optionsEntidad in getEntidad', () => {
    component.getEntidad();
    expect(registroServiceMock.getEntidad).toHaveBeenCalled();
    expect(component.optionsEntidad).toBeDefined();
  });

  it('should call registroService.getRepresentacion and set optionsRepresentacion in getRepresentacion', () => {
    component.getRepresentacion();
    expect(registroServiceMock.getRepresentacion).toHaveBeenCalled();
    expect(component.optionsRepresentacion).toBeDefined();
  });

  it('should call validacionesService.isValid in isValid', () => {
    const form = new FormBuilder().group({ campo: [''] });
    expect(component.isValid(form, 'campo')).toBe(true);
    expect(validacionesServiceMock.isValid).toHaveBeenCalled();
  });

  it('should call store method in setValoresStore and set isJustificacion', () => {
    const storeMethod = jest.fn();
    component.store = { setEntidad: storeMethod } as any;
    const form = new FormBuilder().group({ entidad: [8] });
    component.entidadFederativaData = 'DURANGO';
    component.setValoresStore(form, 'entidad', 'setEntidad');
    expect(storeMethod).toHaveBeenCalledWith(8);
    expect(component.isJustificacion).toBe(true);

    component.entidadFederativaData = 'OTRO';
    component.setValoresStore(form, 'entidad', 'setEntidad');
    expect(component.isJustificacion).toBe(false);
  });

  it('should return validacionForm', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({})
    });
    expect(component.validacionForm).toBeTruthy();
  });

  it('should set up forms in donanteDomicilio', () => {
    component.solicitudState = {} as any;
    component.donanteDomicilio();
    expect(component.registroForm).toBeTruthy();
  });

  it('should complete destroyed$ on ngOnDestroy', () => {
    const nextSpy = jest.spyOn(component['destroyed$'], 'next');
    const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});