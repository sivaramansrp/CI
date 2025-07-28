import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DatosCertificadoComponent } from './datos_certificado.component';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators, FormGroup } from '@angular/forms';
import { of, ReplaySubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RegistroService } from '../../services/registro.service';
import { Tramite110207Store } from '../../state/Tramite110207.store';
import { Tramite110207Query } from '../../state/Tramite110207.query';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

describe('DatosCertificadoComponent', () => {
  let component: DatosCertificadoComponent;
  let fixture: ComponentFixture<DatosCertificadoComponent>;
  let registroServiceMock: any;
  let tramiteStoreMock: any;
  let queryMock: any;
  let validacionesServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    registroServiceMock = {
      getIdioma: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getEntidad: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getRepresentacion: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
    };
    tramiteStoreMock = {
      setIdioma: jest.fn(),
      setEntidad: jest.fn(),
      setRepresentacion: jest.fn(),
      setObservaciones: jest.fn(),
      setPresica: jest.fn(),
      setPresenta: jest.fn(),
      setJustificacion: jest.fn(),
      setCheckbox: jest.fn(),
    };
    queryMock = {
      selectSolicitud$: of({}),
    };
    validacionesServiceMock = {
      isValid: jest.fn().mockReturnValue(true),
    };
    consultaioQueryMock = {
      selectConsultaioState$: of({ readonly: false }),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [ReactiveFormsModule, FormsModule,DatosCertificadoComponent],
      providers: [
        FormBuilder,
        { provide: RegistroService, useValue: registroServiceMock },
        { provide: Tramite110207Store, useValue: tramiteStoreMock },
        { provide: Tramite110207Query, useValue: queryMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(DatosCertificadoComponent);
    component = fixture.componentInstance;
    component.solicitudState = {} as any;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark all as touched if registroForm is invalid in validarDestinatarioFormulario', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({})
    });
    jest.spyOn(component.registroForm, 'markAllAsTouched');
    component.registroForm.setErrors({ invalid: true });
    component.validarDestinatarioFormulario();
    expect(component.registroForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should call getIdioma, getEntidad, getRepresentacion, inicializarEstadoFormulario, donanteDomicilio in ngOnInit', () => {
    const idiomaSpy = jest.spyOn(component, 'getIdioma');
    const entidadSpy = jest.spyOn(component, 'getEntidad');
    const representacionSpy = jest.spyOn(component, 'getRepresentacion');
    const inicializarSpy = jest.spyOn(component, 'inicializarEstadoFormulario');
    const donanteSpy = jest.spyOn(component, 'donanteDomicilio');
    component.ngOnInit();
    expect(idiomaSpy).toHaveBeenCalled();
    expect(entidadSpy).toHaveBeenCalled();
    expect(representacionSpy).toHaveBeenCalled();
    expect(inicializarSpy).toHaveBeenCalled();
    expect(donanteSpy).toHaveBeenCalled();
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
  const formBuilder = new FormBuilder();
  const mockFormGroup = formBuilder.group({ validacionForm: formBuilder.group({}) });

  const disableSpy = jest.spyOn(mockFormGroup, 'disable');
  const enableSpy = jest.spyOn(mockFormGroup, 'enable');

  const donanteSpy = jest.spyOn(component, 'donanteDomicilio').mockImplementation(() => {
    component.registroForm = mockFormGroup;
  });

  component.soloLectura = true;
  component.guardarDatosFormulario();

  expect(donanteSpy).toHaveBeenCalled();
  expect(disableSpy).toHaveBeenCalled();

  component.soloLectura = false;
  component.guardarDatosFormulario();

  expect(enableSpy).toHaveBeenCalled();
});


  it('should update optionsIdioma in getIdioma', () => {
    component.getIdioma();
    expect(registroServiceMock.getIdioma).toHaveBeenCalled();
    expect(component.optionsIdioma).toEqual([]);
  });

  it('should update optionsEntidad in getEntidad', () => {
    component.getEntidad();
    expect(registroServiceMock.getEntidad).toHaveBeenCalled();
    expect(component.optionsEntidad).toEqual([]);
  });

  it('should update optionsRepresentacion in getRepresentacion', () => {
    component.getRepresentacion();
    expect(registroServiceMock.getRepresentacion).toHaveBeenCalled();
    expect(component.optionsRepresentacion).toEqual([]);
  });

  it('should call validacionesService.isValid in isValid', () => {
    const form = new FormBuilder().group({ campo: [''] });
    expect(component.isValid(form, 'campo')).toBe(true);
    expect(validacionesServiceMock.isValid).toHaveBeenCalled();
  });

  it('should call store method in setValoresStore', () => {
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

  it('should get validacionForm', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({})
    });
    expect(component.validacionForm).toBeDefined();
  });

  it('should create the form in donanteDomicilio', () => {
    component.solicitudState = {} as any;
    component.soloLectura = false;
    component.donanteDomicilio();
    expect(component.registroForm).toBeDefined();
    expect(component.registroForm.get('validacionForm')).toBeDefined();
  });

  it('should complete destroyed$ in ngOnDestroy', () => {
    const nextSpy = jest.spyOn((component as any).destroyed$, 'next');
    const completeSpy = jest.spyOn((component as any).destroyed$, 'complete');
    component.ngOnDestroy();
    expect(nextSpy).toHaveBeenCalledWith(true);
    expect(completeSpy).toHaveBeenCalled();
  });
});