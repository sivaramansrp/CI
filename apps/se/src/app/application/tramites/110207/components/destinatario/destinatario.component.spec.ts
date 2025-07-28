import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinatarioComponent } from './destinatario.component';
import { FormBuilder, ReactiveFormsModule, FormsModule, Validators, FormGroup } from '@angular/forms';
import { of, ReplaySubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RegistroService } from '../../services/registro.service';
import { Tramite110207Store } from '../../state/Tramite110207.store';
import { Tramite110207Query } from '../../state/Tramite110207.query';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

describe('DestinatarioComponent', () => {
  let component: DestinatarioComponent;
  let fixture: ComponentFixture<DestinatarioComponent>;
  let registroServiceMock: any;
  let tramiteStoreMock: any;
  let queryMock: any;
  let validacionesServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    registroServiceMock = {
      getPaisDestino: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
      getTransporte: jest.fn().mockReturnValue(of({ code: 200, data: [] })),
    };
    tramiteStoreMock = {
      setNacion: jest.fn(),
      setTransporte: jest.fn(),
      setNombre: jest.fn(),
      setApellidoPrimer: jest.fn(),
      setApellidoSegundo: jest.fn(),
      setNumeroFiscal: jest.fn(),
      setRazonSocial: jest.fn(),
      setCiudad: jest.fn(),
      setCalle: jest.fn(),
      setNumeroLetra: jest.fn(),
      setLada: jest.fn(),
      setTelefono: jest.fn(),
      setFax: jest.fn(),
      setCorreoElectronico: jest.fn(),
      setRutaCompleta: jest.fn(),
      setPuertoEmbarque: jest.fn(),
      setPuertoDesembarque: jest.fn(),
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
      imports: [ReactiveFormsModule, FormsModule,DestinatarioComponent],
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

    fixture = TestBed.createComponent(DestinatarioComponent);
    component = fixture.componentInstance;
    component.solicitudState = {} as any;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call donanteDomicilio and enable/disable form in guardarDatosFormulario', () => {
  const mockFormGroup = new FormBuilder().group({});
  const disableSpy = jest.spyOn(mockFormGroup, 'disable');
  const enableSpy = jest.spyOn(mockFormGroup, 'enable');

  const donanteSpy = jest
    .spyOn(component, 'donanteDomicilio')
    .mockImplementation(() => {
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


  it('should mark all as touched if registroForm is invalid in validarDestinatarioFormulario', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({})
    });
    jest.spyOn(component.registroForm, 'markAllAsTouched');
    component.registroForm.setErrors({ invalid: true });
    component.validarDestinatarioFormulario();
    expect(component.registroForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should set isDisabled to true on onClick', () => {
    component.isDisabled = false;
    component.onClick();
    expect(component.isDisabled).toBe(true);
  });

  it('should call getPaisDestino, getTransporte, inicializarEstadoFormulario, donanteDomicilio in ngOnInit', () => {
    const paisSpy = jest.spyOn(component, 'getPaisDestino');
    const transporteSpy = jest.spyOn(component, 'getTransporte');
    const inicializarSpy = jest.spyOn(component, 'inicializarEstadoFormulario');
    const donanteSpy = jest.spyOn(component, 'donanteDomicilio');
    component.ngOnInit();
    expect(paisSpy).toHaveBeenCalled();
    expect(transporteSpy).toHaveBeenCalled();
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

  it('should update options in getPaisDestino', () => {
    component.getPaisDestino();
    expect(registroServiceMock.getPaisDestino).toHaveBeenCalled();
    expect(component.options).toEqual([]);
  });

  it('should update options in getTransporte', () => {
    component.getTransporte();
    expect(registroServiceMock.getTransporte).toHaveBeenCalled();
    expect(component.options).toEqual([]);
  });

  it('should run onSubmit with valid form', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({})
    });
    component.registroForm.markAllAsTouched();
    component.onSubmit();
  });

  it('should call validacionesService.isValid in isValid', () => {
    const form = new FormBuilder().group({ campo: [''] });
    expect(component.isValid(form, 'campo')).toBe(true);
    expect(validacionesServiceMock.isValid).toHaveBeenCalled();
  });

  it('should call store method in setValoresStore', () => {
    const storeMethod = jest.fn();
    component.store = { setNacion: storeMethod } as any;
    const form = new FormBuilder().group({ nacion: ['valor'] });
    component.setValoresStore(form, 'nacion', 'setNacion');
    expect(storeMethod).toHaveBeenCalledWith('valor');
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