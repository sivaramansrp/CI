import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, Subject } from 'rxjs';
import { RepresentanteLegalComponent } from './representante-legal.component';
import { Tramite260215Store, Solicitud260215State } from '../../estados/tramites/tramite260215.store';
import { Tramite260215Query } from '../../estados/queries/tramite260215.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { ServiciosPermisoSanitarioService } from '../../services/servicios-permiso-sanitario.service';

describe('RepresentanteLegalComponent', () => {
  let component: RepresentanteLegalComponent;
  let fixture: ComponentFixture<RepresentanteLegalComponent>;
  let mockTramite260215Store: any;
  let mockTramite260215Query: any;
  let mockConsultaioQuery: any;
  let mockValidacionesService: any;
  let mockService: any;
  let formBuilder: FormBuilder;

  const mockSolicitudState: Solicitud260215State = {
    claveDeReferencia: 'REF123',
    cadenaDependencia: 'CADENA123',
    banco: 'BANCO_TEST',
    llaveDePago: 'LLAVE123',
    fechaPago: '2024-01-15',
    importePago: '1000',
    rfcDel: 'RFC123456',
    denominacion: 'Test Company'
  } as Solicitud260215State;

  const mockRepresentanteData = {
    nombre: 'Juan',
    apellidoPaterno: 'Pérez',
    apellidoMaterno: 'García'
  };

  beforeEach(async () => {
    mockTramite260215Store = {
      setClaveDeReferencia: jest.fn(),
      setCadenaDependencia: jest.fn(),
      setBanco: jest.fn(),
      setLlaveDePago: jest.fn(),
      setFechaPago: jest.fn(),
      setImportePago: jest.fn()
    };

    mockTramite260215Query = {
      selectSolicitud$: of(mockSolicitudState)
    };

    mockConsultaioQuery = {
      selectConsultaioState$: of({ readonly: false })
    };

    mockValidacionesService = {
      isValid: jest.fn().mockReturnValue(true)
    };

    mockService = {
      ObtenerReprestantanteData: jest.fn().mockReturnValue(of(mockRepresentanteData))
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RepresentanteLegalComponent],
      providers: [
        FormBuilder,
        { provide: Tramite260215Store, useValue: mockTramite260215Store },
        { provide: Tramite260215Query, useValue: mockTramite260215Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: ValidacionesFormularioService, useValue: mockValidacionesService },
        { provide: ServiciosPermisoSanitarioService, useValue: mockService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RepresentanteLegalComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('debe crearse', () => {
    expect(component).toBeTruthy();
  });

  describe('Inicialización del Componente', () => {
    it('debe inicializarse con los valores predeterminados correctos', () => {
      fixture.detectChanges();
      expect(component.solicitudState).toEqual(mockSolicitudState);
      expect(component.esFormularioSoloLectura).toBe(false);
      expect(component.representante).toBeDefined();
    });

    it('debe llamar a inicializarEstadoFormulario en ngOnInit', () => {
      const spy = jest.spyOn(component, 'inicializarEstadoFormulario');
      component.ngOnInit();
      expect(spy).toHaveBeenCalled();
    });

    it('debe suscribirse a consultaioQuery en el constructor', () => {
      fixture.detectChanges();
      expect(component.esFormularioSoloLectura).toBe(false);
    });
  });

  describe('Inicialización del Formulario', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    // it('should initialize form with correct structure and validators', () => {
    //   expect(component.representante).toBeDefined();
    //   expect(component.representante.get('rfc')).toBeTruthy();
    //   expect(component.representante.get('nombre')).toBeTruthy();
    //   expect(component.representante.get('apellidoPaterno')).toBeTruthy();
    //   expect(component.representante.get('apellidoMaterno')).toBeTruthy();
      
    //   // Check required validators
    //   expect(component.representante.get('rfc')?.hasError('required')).toBeFalsy();
    //   expect(component.representante.get('nombre')?.hasError('required')).toBeTruthy();
    //   expect(component.representante.get('apellidoPaterno')?.hasError('required')).toBeTruthy();
    // });

    it('debe inicializar los campos deshabilitados correctamente', () => {
      expect(component.representante.get('nombre')?.disabled).toBe(true);
      expect(component.representante.get('apellidoPaterno')?.disabled).toBe(true);
      expect(component.representante.get('apellidoMaterno')?.disabled).toBe(true);
      expect(component.representante.get('rfc')?.disabled).toBe(false);
    });

    // it('should set form values from solicitudState', () => {
    //   expect(component.representante.get('rfc')?.value).toBe(mockSolicitudState.rfc);
    // });
  });

  describe('Gestión del Estado del Formulario', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('debe deshabilitar el formulario cuando esFormularioSoloLectura es verdadero', () => {
      component.esFormularioSoloLectura = true;
      component.guardarDatosFormulario();
      expect(component.representante.disabled).toBe(true);
    });

    it('debe habilitar el formulario cuando esFormularioSoloLectura es falso', () => {
      component.esFormularioSoloLectura = false;
      component.representante.disable();
      component.guardarDatosFormulario();
      expect(component.representante.enabled).toBe(true);
    });

    it('debe llamar a guardarDatosFormulario cuando esFormularioSoloLectura es verdadero en inicializarEstadoFormulario', () => {
      const spy = jest.spyOn(component, 'guardarDatosFormulario');
      component.esFormularioSoloLectura = true;
      component.inicializarEstadoFormulario();
      expect(spy).toHaveBeenCalled();
    });

    it('debe llamar a inicializarFormulario cuando esFormularioSoloLectura es falso en inicializarEstadoFormulario', () => {
      const spy = jest.spyOn(component, 'inicializarFormulario');
      component.esFormularioSoloLectura = false;
      component.inicializarEstadoFormulario();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('Métodos de Validación', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('debe llamar a validacionesService.isValid en el método esValido', () => {
      const result = component.esValido('rfc');
      expect(mockValidacionesService.isValid).toHaveBeenCalledWith(component.representante, 'rfc');
      expect(result).toBe(true);
    });

    it('debe devolver false cuando validacionesService.isValid devuelve false', () => {
      mockValidacionesService.isValid.mockReturnValue(false);
      const result = component.esValido('rfc');
      expect(result).toBe(false);
    });

    it('debe manejar undefined como retorno de validacionesService', () => {
      mockValidacionesService.isValid.mockReturnValue(undefined);
      const result = component.esValido('rfc');
      expect(result).toBe(false);
    });
  });

  describe('Interacciones con el Servicio', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('debe llamar al servicio cuando buscar se ejecuta con un RFC válido', () => {
      component.representante.patchValue({ rfc: 'VALID_RFC' });
      component.buscar();
      expect(mockService.ObtenerReprestantanteData).toHaveBeenCalled();
    });

    it('debe marcar RFC como tocado cuando buscar se llama con RFC vacío', () => {
      component.representante.patchValue({ rfc: '' });
      const markAllAsTouchedSpy = jest.spyOn(component.representante.get('rfc')!, 'markAllAsTouched');
      component.buscar();
      expect(markAllAsTouchedSpy).toHaveBeenCalled();
      expect(mockService.ObtenerReprestantanteData).not.toHaveBeenCalled();
    });
  });

  describe('Integración con el Store', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('debe llamar al método del store en setValoresStore', () => {
      component.representante.patchValue({ rfc: 'TEST_RFC' });
      component.setValoresStore(component.representante, 'rfc', 'setClaveDeReferencia');
      expect(mockTramite260215Store.setClaveDeReferencia).toHaveBeenCalledWith('TEST_RFC');
    });

    it('debe manejar diferentes métodos del store', () => {
      component.representante.patchValue({ rfc: 'TEST_RFC' });
      component.setValoresStore(component.representante, 'rfc', 'setCadenaDependencia');
      expect(mockTramite260215Store.setCadenaDependencia).toHaveBeenCalledWith('TEST_RFC');
    });
  });

  describe('Métodos de Datos de Prueba', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('debe establecer valores de prueba en el método obtenerValor', () => {
      component.obtenerValor();
      expect(component.representante.get('nombre')?.value).toBe(47875);
      expect(component.representante.get('apellidoPaterno')?.value).toBe('Paterno');
      expect(component.representante.get('apellidoMaterno')?.value).toBe('Materno');
    });
  });

  describe('Ciclo de Vida del Componente', () => {
    it('debe completar destroyNotifier$ en ngOnDestroy', () => {
      const componentAny = component as any;
      const nextSpy = jest.spyOn(componentAny.destroyNotifier$, 'next');
      const completeSpy = jest.spyOn(componentAny.destroyNotifier$, 'complete');
      component.ngOnDestroy();
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });

    it('debe desuscribirse de los observables al destruir', () => {
      const componentAny = component as any;
      const destroySubject = componentAny.destroyNotifier$ as Subject<void>;
      const nextSpy = jest.spyOn(destroySubject, 'next');
      fixture.detectChanges();
      component.ngOnDestroy();
      expect(nextSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('Manejo del Estado Solo Lectura', () => {
    it('debe manejar los cambios de estado solo lectura desde consultaioQuery', () => {
      mockConsultaioQuery.selectConsultaioState$ = of({ readonly: true });
      // Recreate component to test constructor subscription
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule, RepresentanteLegalComponent],
        providers: [
          FormBuilder,
          { provide: Tramite260215Store, useValue: mockTramite260215Store },
          { provide: Tramite260215Query, useValue: mockTramite260215Query },
          { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
          { provide: ValidacionesFormularioService, useValue: mockValidacionesService },
          { provide: ServiciosPermisoSanitarioService, useValue: mockService }
        ]
      });

      fixture = TestBed.createComponent(RepresentanteLegalComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      expect(component.esFormularioSoloLectura).toBe(true);
    });
  });

  describe('Casos Límite de Validación de Formulario', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('debe manejar nombres de campos inválidos en esValido', () => {
      const result = component.esValido('nonexistentField');
      expect(mockValidacionesService.isValid).toHaveBeenCalledWith(component.representante, 'nonexistentField');
    });

    it('debe manejar controles de formulario nulos', () => {
      component.representante = formBuilder.group({});
      const result = component.esValido('rfc');
      expect(mockValidacionesService.isValid).toHaveBeenCalledWith(component.representante, 'rfc');
    });
  });

  describe('Manejo de Errores', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('debe manejar errores del servicio correctamente', () => {
      mockService.ObtenerReprestantanteData.mockReturnValue(of(null));
      component.representante.patchValue({ rfc: 'VALID_RFC' });
      expect(() => component.buscar()).not.toThrow();
    });

    it('debe manejar errores de métodos del store', () => {
      mockTramite260215Store.setClaveDeReferencia.mockImplementation(() => {
        throw new Error('Store error');
      });
      expect(() => {
        component.setValoresStore(component.representante, 'rfc', 'setClaveDeReferencia');
      }).toThrow('Store error');
    });
  });
});