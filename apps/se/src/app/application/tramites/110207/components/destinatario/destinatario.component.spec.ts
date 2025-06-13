import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DestinatarioComponent } from './destinatario.component';
import { RegistroService } from '../../services/registro.service';
import { Tramite110207Store } from '../../state/Tramite110207.store';
import { Tramite110207Query } from '../../state/Tramite110207.query';
import { ValidacionesFormularioService, Catalogo, CatalogosSelect, ConsultaioQuery } from '@ng-mf/data-access-user';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { of, ReplaySubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('DestinatarioComponent', () => {
  let component: DestinatarioComponent;
  let fixture: ComponentFixture<DestinatarioComponent>;
  let registroServiceMock: any;
  let tramiteStoreMock: any;
  let tramiteQueryMock: any;
  let validacionesServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    registroServiceMock = {
      getPaisDestino: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 1, nombre: 'Pais' }] })),
      getTransporte: jest.fn().mockReturnValue(of({ code: 200, data: [{ id: 2, nombre: 'Transporte' }] })),
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
      imports: [ReactiveFormsModule, DestinatarioComponent],
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

    fixture = TestBed.createComponent(DestinatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should mark all as touched if registroForm is invalid in validarDestinatarioFormulario', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({
        nacion: ['', Validators.required]
      })
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

  it('should call getPaisDestino, getTransporte, inicializarEstadoFormulario, donanteDomicilio on ngOnInit', () => {
    jest.spyOn(component, 'getPaisDestino');
    jest.spyOn(component, 'getTransporte');
    jest.spyOn(component, 'inicializarEstadoFormulario');
    jest.spyOn(component, 'donanteDomicilio');
    component.ngOnInit();
    expect(component.getPaisDestino).toHaveBeenCalled();
    expect(component.getTransporte).toHaveBeenCalled();
    expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
    expect(component.donanteDomicilio).toHaveBeenCalled();
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

  it('should call registroService.getPaisDestino and set options in getPaisDestino', () => {
    component.getPaisDestino();
    expect(registroServiceMock.getPaisDestino).toHaveBeenCalled();
    expect(component.options).toBeDefined();
  });

  it('should call registroService.getTransporte and set options in getTransporte', () => {
    component.getTransporte();
    expect(registroServiceMock.getTransporte).toHaveBeenCalled();
    expect(component.options).toBeDefined();
  });

  it('should not throw on onSubmit if form is valid', () => {
    component.registroForm = new FormBuilder().group({
      validacionForm: new FormBuilder().group({})
    });
    component.registroForm.setErrors(null);
    expect(() => component.onSubmit()).not.toThrow();
  });

  it('should call validacionesService.isValid in isValid', () => {
    const form = new FormBuilder().group({ campo: [''] });
    expect(component.isValid(form, 'campo')).toBe(true);
    expect(validacionesServiceMock.isValid).toHaveBeenCalled();
  });

  it('should call store method in setValoresStore', () => {
    const storeMethod = jest.fn();
    component['store'] = { setNacion: storeMethod } as any;
    const form = new FormBuilder().group({ nacion: ['MX'] });
    component.setValoresStore(form, 'nacion', 'setNacion');
    expect(storeMethod).toHaveBeenCalledWith('MX');
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