import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SolicitudComponent } from './Solicitud.component';
import { FormBuilder, ReactiveFormsModule, FormGroup, Validators } from '@angular/forms';
import { Tramite30506Store, Solicitud30506State, createInitialState, Catalogo } from '../state/Tramite30506.store';
import { Tramite30506Query } from '../state/Tramite30506.query';
import { RegistroService } from '../services/registro.service';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { of, ReplaySubject } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('SolicitudComponent', () => {
  let component: SolicitudComponent;
  let fixture: ComponentFixture<SolicitudComponent>;
  let storeMock: any;
  let queryMock: any;
  let registroServiceMock: any;
  let validacionesServiceMock: any;
  let consultaioQueryMock: any;

  beforeEach(async () => {
    storeMock = {
      setBanco: jest.fn(),
      setNumeroOperacion: jest.fn(),
      setLlave: jest.fn(),
      setManifiesto1: jest.fn(),
      setManifiesto2: jest.fn(),
      setFechaPago: jest.fn(),
      setFechaInicio: jest.fn(),
      setFechaFinal: jest.fn(),
    };

    queryMock = {
      selectSolicitud$: of(createInitialState()),
    };

    registroServiceMock = {
      obtenerDatosBanco: jest.fn().mockReturnValue(of([
        { id: 1, descripcion: 'Banco 1' },
        { id: 2, descripcion: 'Banco 2' }
      ])),
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
        { provide: Tramite30506Store, useValue: storeMock },
        { provide: Tramite30506Query, useValue: queryMock },
        { provide: RegistroService, useValue: registroServiceMock },
        { provide: ValidacionesFormularioService, useValue: validacionesServiceMock },
        { provide: ConsultaioQuery, useValue: consultaioQueryMock },
        FormBuilder,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.componentInstance;
    component.solicitudState = createInitialState();
    component.registroForm = new FormBuilder().group({
      banco: ['', Validators.required],
      llave: ['', Validators.required],
      manifiesto1: ['', Validators.required],
      manifiesto2: ['', Validators.required],
      numeroOperacion: ['', Validators.required],
      fechaPago: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFinal: ['', Validators.required],
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct default values', () => {
    expect(component.fechaInicialInput).toBeDefined();
    expect(component.fechaFinalInput).toBeDefined();
    expect(component.fechaPagoInput).toBeDefined();
    expect(component.solicitudEnum).toBeDefined();
    expect(component.esFormularioSoloLectura).toBe(false);
    expect(component.destroyNotifier$).toBeInstanceOf(ReplaySubject);
    expect(component.bancoCatalogo.labelNombre).toBe('Banco');
    expect(component.bancoCatalogo.required).toBe(false);
    expect(component.bancoCatalogo.primerOpcion).toBe('Selecciona un valor');
  });

  describe('ngOnInit', () => {
    it('should call obtenerDatosBanco on ngOnInit', () => {
      const spy = jest.spyOn(component, 'obtenerDatosBanco');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });

    it('should call donanteDomicilio on ngOnInit', () => {
      const spy = jest.spyOn(component, 'donanteDomicilio');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });

    it('should subscribe to query.selectSolicitud$ and set solicitudState', () => {
      component.solicitudState = undefined as any;
      component.ngOnInit();
      expect(component.solicitudState).toBeDefined();
    });
  });

  describe('inicializarEstadoFormulario', () => {
    it('should call guardarDatosDelFormulario if esFormularioSoloLectura is true', () => {
      component.esFormularioSoloLectura = true;
      const spy = jest.spyOn(component, 'guardarDatosDelFormulario');
      component.inicializarEstadoFormulario();
      expect(spy).toHaveBeenCalled();
    });

    it('should call datosDeAvisoForm if esFormularioSoloLectura is false', () => {
      component.esFormularioSoloLectura = false;
      const spy = jest.spyOn(component, 'datosDeAvisoForm');
      component.inicializarEstadoFormulario();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('cambioFechaPago', () => {
    it('should patch fechaPago value and call setValoresStore', () => {
      const spy = jest.spyOn(component, 'setValoresStore');
      const nuevaFecha = '2024-01-01';
      
      component.cambioFechaPago(nuevaFecha);
      
      expect(component.registroForm.get('fechaPago')?.value).toBe(nuevaFecha);
      expect(spy).toHaveBeenCalledWith(component.registroForm, 'fechaPago', 'setFechaPago');
    });

    it('should handle empty string fecha', () => {
      const spy = jest.spyOn(component, 'setValoresStore');
      component.cambioFechaPago('');
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('obtenerDatosBanco', () => {
    it('should call registroService.obtenerDatosBanco and update bancoCatalogo', () => {
      const mockBancos: Catalogo[] = [
        { id: 1, descripcion: 'Banco Test 1' },
        { id: 2, descripcion: 'Banco Test 2' }
      ];
      registroServiceMock.obtenerDatosBanco.mockReturnValue(of(mockBancos));
      
      component.obtenerDatosBanco();
      
      expect(registroServiceMock.obtenerDatosBanco).toHaveBeenCalled();
      expect(component.bancoCatalogo.catalogos).toEqual(mockBancos);
    });

    it('should handle empty banco response', () => {
      registroServiceMock.obtenerDatosBanco.mockReturnValue(of([]));
      
      component.obtenerDatosBanco();
      
      expect(component.bancoCatalogo.catalogos).toEqual([]);
    });
  });

  describe('enviarFormulario', () => {
    it('should not throw error when registroForm is valid', () => {
      component.registroForm = new FormBuilder().group({
        banco: ['banco1', Validators.required],
        llave: ['llave1', Validators.required],
        manifiesto1: ['m1', Validators.required],
        manifiesto2: ['m2', Validators.required],
        numeroOperacion: ['123', Validators.required],
        fechaPago: ['2024-01-01', Validators.required],
        fechaInicio: ['2024-01-01', Validators.required],
        fechaFinal: ['2024-12-31', Validators.required],
      });
      
      expect(() => component.enviarFormulario()).not.toThrow();
    });

    it('should not execute logic when registroForm is invalid', () => {
      component.registroForm = new FormBuilder().group({
        banco: ['', Validators.required],
      });
      
      expect(() => component.enviarFormulario()).not.toThrow();
    });
  });

  describe('esValido', () => {
    it('should call validacionesService.isValid', () => {
      const form = new FormBuilder().group({ test: ['test'] });
      
      component.esValido(form, 'test');
      
      expect(validacionesServiceMock.isValid).toHaveBeenCalledWith(form, 'test');
    });

    it('should return false when validacionesService.isValid returns false', () => {
      validacionesServiceMock.isValid.mockReturnValue(false);
      const form = new FormBuilder().group({ test: [''] });
      
      const result = component.esValido(form, 'test');
      
      expect(result).toBe(false);
    });
  });

  describe('validarDestinatarioFormulario', () => {
    it('should mark all as touched if registroForm is invalid', () => {
      component.registroForm = new FormBuilder().group({
        banco: ['', Validators.required],
      });
      const spy = jest.spyOn(component.registroForm, 'markAllAsTouched');
      
      component.validarDestinatarioFormulario();
      
      expect(spy).toHaveBeenCalled();
    });

    it('should not mark all as touched if registroForm is valid', () => {
      component.registroForm = new FormBuilder().group({
        banco: ['banco1', Validators.required],
      });
      const spy = jest.spyOn(component.registroForm, 'markAllAsTouched');
      
      component.validarDestinatarioFormulario();
      
      expect(spy).not.toHaveBeenCalled();
    });
  });

  describe('setValoresStore', () => {
    it('should call store method with form field value', () => {
      component.registroForm.get('banco')?.setValue('banco123');
      
      component.setValoresStore(component.registroForm, 'banco', 'setBanco');
      
      expect(storeMock.setBanco).toHaveBeenCalledWith('banco123');
    });

    it('should call different store methods based on metodoNombre', () => {
      component.registroForm.get('llave')?.setValue('llave123');
      
      component.setValoresStore(component.registroForm, 'llave', 'setLlave');
      
      expect(storeMock.setLlave).toHaveBeenCalledWith('llave123');
    });

    it('should handle undefined form field value', () => {
      component.setValoresStore(component.registroForm, 'nonexistent', 'setBanco');
      
      expect(storeMock.setBanco).toHaveBeenCalledWith(undefined);
    });
  });

  describe('guardarDatosDelFormulario', () => {
    it('should disable registroForm if esFormularioSoloLectura is true', () => {
      component.esFormularioSoloLectura = true;
      const spy = jest.spyOn(component.registroForm, 'disable');
      
      component.guardarDatosDelFormulario();
      
      expect(spy).toHaveBeenCalled();
    });

    it('should enable registroForm if esFormularioSoloLectura is false', () => {
      component.esFormularioSoloLectura = false;
      const spy = jest.spyOn(component.registroForm, 'enable');
      
      component.guardarDatosDelFormulario();
      
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('donanteDomicilio', () => {
    it('should initialize registroForm with solicitudState values', () => {
      component.solicitudState = {
        banco: 'banco1',
        llave: 'llave1',
        manifiesto1: 'm1',
        manifiesto2: 'm2',
        numeroOperacion: '123',
        fechaPago: '2024-01-01',
        fechaInicio: '2024-01-01',
        fechaFinal: '2024-12-31',
      };
      
      component.donanteDomicilio();
      
      expect(component.registroForm.get('banco')?.value).toBe('banco1');
      expect(component.registroForm.get('llave')?.value).toBe('llave1');
      expect(component.registroForm.get('manifiesto1')?.value).toBe('m1');
      expect(component.registroForm.get('manifiesto2')?.value).toBe('m2');
      expect(component.registroForm.get('numeroOperacion')?.value).toBe('123');
      expect(component.registroForm.get('fechaPago')?.value).toBe('2024-01-01');
      expect(component.registroForm.get('fechaInicio')?.value).toBe('2024-01-01');
      expect(component.registroForm.get('fechaFinal')?.value).toBe('2024-12-31');
    });

    it('should call inicializarEstadoFormulario after form initialization', () => {
      const spy = jest.spyOn(component, 'inicializarEstadoFormulario');
      
      component.donanteDomicilio();
      
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('datosDeAvisoForm', () => {
    it('should disable form fields if esFormularioSoloLectura is true', () => {
      component.esFormularioSoloLectura = true;
      component.registroForm = new FormBuilder().group({
        banco: ['test'],
        manifiesto1: ['test'],
        manifiesto2: ['test'],
        llave: ['test'],
        numeroOperacion: ['test'],
        fechaPago: ['test'],
        monedaNacional: ['test'],
      });
      
      const spyBanco = jest.spyOn(component.registroForm.get('banco')!, 'disable');
      const spyManifiesto1 = jest.spyOn(component.registroForm.get('manifiesto1')!, 'disable');
      const spyManifiesto2 = jest.spyOn(component.registroForm.get('manifiesto2')!, 'disable');
      const spyLlave = jest.spyOn(component.registroForm.get('llave')!, 'disable');
      const spyNumeroOperacion = jest.spyOn(component.registroForm.get('numeroOperacion')!, 'disable');
      const spyFechaPago = jest.spyOn(component.registroForm.get('fechaPago')!, 'disable');
      const spyMonedaNacional = jest.spyOn(component.registroForm.get('monedaNacional')!, 'disable');
      
      component.datosDeAvisoForm();
      
      expect(spyBanco).toHaveBeenCalled();
      expect(spyManifiesto1).toHaveBeenCalled();
      expect(spyManifiesto2).toHaveBeenCalled();
      expect(spyLlave).toHaveBeenCalled();
      expect(spyNumeroOperacion).toHaveBeenCalled();
      expect(spyFechaPago).toHaveBeenCalled();
      expect(spyMonedaNacional).toHaveBeenCalled();
    });

    it('should not disable form fields if esFormularioSoloLectura is false', () => {
      component.esFormularioSoloLectura = false;
      component.registroForm = new FormBuilder().group({
        banco: ['test'],
        manifiesto1: ['test'],
      });
      
      const spyBanco = jest.spyOn(component.registroForm.get('banco')!, 'disable');
      
      component.datosDeAvisoForm();
      
      expect(spyBanco).not.toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete destroyNotifier$', () => {
      const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
      const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalledWith(true);
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('Constructor', () => {
    it('should initialize consultaioQuery subscription', () => {
      expect(component.consultaDatos).toBeDefined();
      expect(component.esFormularioSoloLectura).toBe(false);
    });
    
  });
});