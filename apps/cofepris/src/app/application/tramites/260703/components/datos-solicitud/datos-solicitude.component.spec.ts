import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';
import { DatosSolitudeComponent } from './datos-solicitude.component';
import { Tramite260703Store } from '../../estados/store/tramite260703.store';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { OPCIONES_DE_BOTON_DE_RADIO_INFORMACION_CONFIDENCIAL } from '../../enum/solicitud-permiso.enum';

describe('DatosSolitudeComponent', () => {
  let component: DatosSolitudeComponent;
  let fixture: ComponentFixture<DatosSolitudeComponent>;
  let mockTramite260703Store: jest.Mocked<Tramite260703Store>;
  let mockTramite260703Query: jest.Mocked<Tramite260703Query>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;
  let formBuilder: FormBuilder;

  // Datos mock
  const mockSolicitudPermisoState = {
    preOperativFormState: {
      ideGenerica1: 'Alta',
      observaciones: 'Observación de prueba'
    },
    datosDelEstablecimientoFormState: {
      razonSocial: 'Empresa de Prueba',
      correoElectronico: 'prueba@correo.com'
    },
    manifiestosFormState: {},
    representanteLegalFormState: {},
    domicilloDelEstablecimientoFormState: {}
  };

  const mockConsultaioState = {
    readonly: false
  };

  beforeEach(async () => {
    // Mock para Tramite260703Store
    mockTramite260703Store = {
      actualizarEstadoFormularioPreOperativo: jest.fn()
    } as unknown as jest.Mocked<Tramite260703Store>;

    // Mock para Tramite260703Query
    mockTramite260703Query = {
      selectSolicitudPermiso$: of(mockSolicitudPermisoState)
    } as unknown as jest.Mocked<Tramite260703Query>;

    // Mock para ConsultaioQuery
    mockConsultaioQuery = {
      selectConsultaioState$: of(mockConsultaioState)
    } as unknown as jest.Mocked<ConsultaioQuery>;

    await TestBed.configureTestingModule({
      declarations: [DatosSolitudeComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite260703Store, useValue: mockTramite260703Store },
        { provide: Tramite260703Query, useValue: mockTramite260703Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosSolitudeComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    
    // Spy en los métodos del componente
    jest.spyOn(component, 'crearFormularioOperativo');
    jest.spyOn(component, 'guardarDatosFormulario');
    jest.spyOn(component, 'setValoresStore');
    
    fixture.detectChanges();
  });

  // Pruebas de inicialización y constructor
  describe('Inicialización del componente', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar radioOptions con el valor correcto', () => {
      expect(component.radioOptions).toEqual(OPCIONES_DE_BOTON_DE_RADIO_INFORMACION_CONFIDENCIAL);
    });

    it('debería crear el Subject destruirNotificacion$', () => {
      expect(component.destruirNotificacion$).toBeInstanceOf(Subject);
    });

    it('debería inyectar correctamente los servicios en el constructor', () => {
      // Accedemos a las propiedades privadas con casting
      const componentAny = component as any;
      expect(componentAny.formBuilder).toBeDefined();
      expect(componentAny.tramite260703Store).toBeDefined();
      expect(componentAny.tramite260703Query).toBeDefined();
      expect(componentAny.consultaioQuery).toBeDefined();
    });

    it('debería suscribirse al estado de consultaio en el constructor', () => {
      const mockPipeFn = jest.fn().mockReturnValue(of(mockConsultaioState));
      const mockSelectConsultaioState$ = {
        pipe: mockPipeFn
      };
      
      mockConsultaioQuery.selectConsultaioState$ = mockSelectConsultaioState$ as any;
      
      // Crear nuevo componente para activar constructor
      const newComponent = new DatosSolitudeComponent(
        formBuilder,
        mockTramite260703Store,
        mockTramite260703Query,
        mockConsultaioQuery
      );
      
      expect(newComponent.esFormularioSoloLectura).toBe(mockConsultaioState.readonly);
    });

    it('debería establecer esFormularioSoloLectura cuando readonly es true', () => {
      const readonlyState = { readonly: true };
      mockConsultaioQuery.selectConsultaioState$ = of(readonlyState) as any;
      
      // Crear nuevo componente para activar constructor
      const newComponent = new DatosSolitudeComponent(
        formBuilder,
        mockTramite260703Store,
        mockTramite260703Query,
        mockConsultaioQuery
      );
      
      expect(newComponent.esFormularioSoloLectura).toBe(true);
    });
  });

  // Pruebas para ngOnInit
  describe('ngOnInit', () => {
    it('debería suscribirse a selectSolicitudPermiso$ y guardar el estado', () => {
      const mockPipeFn = jest.fn().mockReturnValue(of(mockSolicitudPermisoState));
      const mockSelectSolicitudPermiso$ = {
        pipe: mockPipeFn
      };
      
      mockTramite260703Query.selectSolicitudPermiso$ = mockSelectSolicitudPermiso$ as any;
      
      // Limpiamos el efecto de beforeEach que ya llamó a ngOnInit
      component.solicitudPermisoState = undefined as any;
      
      // Llamamos a ngOnInit manualmente
      component.ngOnInit();
      
      expect(component.solicitudPermisoState).toEqual(mockSolicitudPermisoState);
    });

    it('debería llamar a crearFormularioOperativo', () => {
      // Limpiamos el efecto de beforeEach
      (component.crearFormularioOperativo as jest.Mock).mockClear();
      
      component.ngOnInit();
      
      expect(component.crearFormularioOperativo).toHaveBeenCalled();
    });

    it('debería llamar a guardarDatosFormulario', () => {
      // Limpiamos el efecto de beforeEach
      (component.guardarDatosFormulario as jest.Mock).mockClear();
      
      component.ngOnInit();
      
      expect(component.guardarDatosFormulario).toHaveBeenCalled();
    });
  });

  // Pruebas para crearFormularioOperativo
  describe('crearFormularioOperativo', () => {
    it('debería crear el formulario reactivo con la estructura correcta', () => {
      // Resetear el formulario
      component.preOperativeForm = undefined as any;
      
      // Espiar el método group del formBuilder
      const formBuilderSpy = jest.spyOn(formBuilder, 'group');
      
      component.crearFormularioOperativo();
      
      expect(formBuilderSpy).toHaveBeenCalled();
      expect(component.preOperativeForm).toBeDefined();
      expect(component.preOperativeForm.get('ideGenerica1')).toBeDefined();
      expect(component.preOperativeForm.get('observaciones')).toBeDefined();
    });

    it('debería inicializar los valores del formulario con el estado actual', () => {
      // Configurar el estado de la solicitud
      component.solicitudPermisoState = {
        preOperativFormState: {
          ideGenerica1: 'Modificación',
          observaciones: 'Observación modificada'
        }
      } as any;
      
      component.crearFormularioOperativo();
      
      expect(component.preOperativeForm.get('ideGenerica1')?.value).toBe('Modificación');
      expect(component.preOperativeForm.get('observaciones')?.value).toBe('Observación modificada');
    });

    it('debería aplicar validadores requeridos al campo observaciones', () => {
      component.crearFormularioOperativo();
      
      // Limpiar el campo para activar validador
      component.preOperativeForm.get('observaciones')?.setValue('');
      
      expect(component.preOperativeForm.get('observaciones')?.valid).toBe(false);
      expect(component.preOperativeForm.get('observaciones')?.hasError('required')).toBe(true);
    });
  });

  // Pruebas para setValoresStore
  describe('setValoresStore', () => {
    it('debería llamar a actualizarEstadoFormularioPreOperativo con el valor de ideGenerica1', () => {
      component.preOperativeForm.get('ideGenerica1')?.setValue('Baja');
      
      component.setValoresStore('ideGenerica1');
      
      expect(mockTramite260703Store.actualizarEstadoFormularioPreOperativo).toHaveBeenCalledWith({
        ideGenerica1: 'Baja'
      });
    });

    it('debería llamar a actualizarEstadoFormularioPreOperativo con el valor de observaciones', () => {
      component.preOperativeForm.get('observaciones')?.setValue('Nueva observación');
      
      component.setValoresStore('observaciones');
      
      expect(mockTramite260703Store.actualizarEstadoFormularioPreOperativo).toHaveBeenCalledWith({
        observaciones: 'Nueva observación'
      });
    });

    it('debería manejar campos inválidos o inexistentes', () => {
      component.setValoresStore('campoInexistente');
      
      expect(mockTramite260703Store.actualizarEstadoFormularioPreOperativo).toHaveBeenCalledWith({
        campoInexistente: undefined
      });
    });
  });

  // Pruebas para guardarDatosFormulario
  describe('guardarDatosFormulario', () => {
    it('debería deshabilitar campos cuando esFormularioSoloLectura es true', () => {
      // Configurar spies en los getters del formulario
      const ideGenericaSpy = jest.spyOn(component.preOperativeForm.get('ideGenerica1') as any, 'disable');
      const observacionesSpy = jest.spyOn(component.preOperativeForm.get('observaciones') as any, 'disable');
      
      component.esFormularioSoloLectura = true;
      component.guardarDatosFormulario();
      
      expect(ideGenericaSpy).toHaveBeenCalled();
      expect(observacionesSpy).toHaveBeenCalled();
    });

    it('debería habilitar campos cuando esFormularioSoloLectura es false', () => {
      // Configurar spies en los getters del formulario
      const ideGenericaSpy = jest.spyOn(component.preOperativeForm.get('ideGenerica1') as any, 'enable');
      const observacionesSpy = jest.spyOn(component.preOperativeForm.get('observaciones') as any, 'enable');
      
      component.esFormularioSoloLectura = false;
      component.guardarDatosFormulario();
      
      expect(ideGenericaSpy).toHaveBeenCalled();
      expect(observacionesSpy).toHaveBeenCalled();
    });

    it('debería verificar que los campos están deshabilitados cuando esFormularioSoloLectura es true', () => {
      component.esFormularioSoloLectura = true;
      component.guardarDatosFormulario();
      
      expect(component.preOperativeForm.get('ideGenerica1')?.disabled).toBe(true);
      expect(component.preOperativeForm.get('observaciones')?.disabled).toBe(true);
    });

    it('debería verificar que los campos están habilitados cuando esFormularioSoloLectura es false', () => {
      // Primero deshabilitamos
      component.preOperativeForm.get('ideGenerica1')?.disable();
      component.preOperativeForm.get('observaciones')?.disable();
      
      component.esFormularioSoloLectura = false;
      component.guardarDatosFormulario();
      
      expect(component.preOperativeForm.get('ideGenerica1')?.enabled).toBe(true);
      expect(component.preOperativeForm.get('observaciones')?.enabled).toBe(true);
    });
  });

  // Pruebas para ngOnDestroy
  describe('ngOnDestroy', () => {
    it('debería llamar next() en destruirNotificacion$', () => {
      const nextSpy = jest.spyOn(component.destruirNotificacion$, 'next');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalled();
    });

    it('debería llamar complete() en destruirNotificacion$', () => {
      const completeSpy = jest.spyOn(component.destruirNotificacion$, 'complete');
      
      component.ngOnDestroy();
      
      expect(completeSpy).toHaveBeenCalled();
    });

    it('debería limpiar correctamente los recursos para evitar fugas de memoria', () => {
      const nextSpy = jest.spyOn(component.destruirNotificacion$, 'next');
      const completeSpy = jest.spyOn(component.destruirNotificacion$, 'complete');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalledTimes(1);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });
  });

  // Pruebas de integración y flujo completo
  describe('Flujo completo del componente', () => {
    it('debería ejecutar el flujo completo de inicialización', () => {
      // Este test se ejecuta después de beforeEach, que ya llamó a fixture.detectChanges() e inicializó el componente
      expect(component.solicitudPermisoState).toEqual(mockSolicitudPermisoState);
      expect(component.preOperativeForm).toBeDefined();
      expect(component.esFormularioSoloLectura).toBe(false);
    });

    it('debería reaccionar a cambios en el estado readonly', () => {
      // Simulamos un cambio en el estado de solo lectura
      const readonlyState = { readonly: true };
      mockConsultaioQuery.selectConsultaioState$ = of(readonlyState) as any;
      
      // Creamos una nueva instancia para que se suscriba al nuevo observable
      const newComponent = new DatosSolitudeComponent(
        formBuilder,
        mockTramite260703Store,
        mockTramite260703Query,
        mockConsultaioQuery
      );
      
      // Configuramos el formulario
      newComponent.solicitudPermisoState = mockSolicitudPermisoState as any;
      newComponent.crearFormularioOperativo();
      newComponent.guardarDatosFormulario();
      
      expect(newComponent.esFormularioSoloLectura).toBe(true);
      expect(newComponent.preOperativeForm.get('ideGenerica1')?.disabled).toBe(true);
      expect(newComponent.preOperativeForm.get('observaciones')?.disabled).toBe(true);
    });

    it('debería actualizar el store cuando cambia un valor del formulario', () => {
      // Simulamos un cambio en el formulario
      component.preOperativeForm.get('ideGenerica1')?.setValue('Modificación');
      component.setValoresStore('ideGenerica1');
      
      expect(mockTramite260703Store.actualizarEstadoFormularioPreOperativo).toHaveBeenCalledWith({
        ideGenerica1: 'Modificación'
      });
    });
  });

  // Pruebas para casos edge y manejo de errores
  describe('Casos límite y manejo de errores', () => {
    it('debería manejar subscripción a observable que no emite', () => {
      mockTramite260703Query.selectSolicitudPermiso$ = new Subject().asObservable() as any;
      
      component.ngOnInit();
      
      // Si llegamos aquí, no hubo excepción
      expect(true).toBe(true);
    });

    it('debería manejar formulario no inicializado en setValoresStore', () => {
      component.preOperativeForm = undefined as any;
      
      expect(() => {
        component.setValoresStore('ideGenerica1');
      }).not.toThrow();
    });

    it('debería manejar formulario no inicializado en guardarDatosFormulario', () => {
      component.preOperativeForm = undefined as any;
      
      expect(() => {
        component.guardarDatosFormulario();
      }).not.toThrow();
    });

    it('debería manejar un campo inexistente en setValoresStore', () => {
      expect(() => {
        component.setValoresStore('campoInexistente');
      }).not.toThrow();
    });
  });

  // Pruebas de interacción con la vista
  describe('Interacciones con la template', () => {
    it('debería deshabilitar el campo observaciones cuando ideGenerica1 no es "Modificación"', () => {
      component.preOperativeForm.get('ideGenerica1')?.setValue('Alta');
      fixture.detectChanges();
      
      const textarea = fixture.nativeElement.querySelector('textarea#observaciones');
      expect(textarea.disabled).toBe(true);
    });

    it('debería habilitar el campo observaciones cuando ideGenerica1 es "Modificación"', () => {
      component.preOperativeForm.get('ideGenerica1')?.setValue('Modificación');
      fixture.detectChanges();
      
      const textarea = fixture.nativeElement.querySelector('textarea#observaciones');
      expect(textarea.disabled).toBe(false);
    });

    it('debería mostrar el mensaje de error cuando observaciones está vacío y es tocado', () => {
      // Establecer valor vacío
      component.preOperativeForm.get('observaciones')?.setValue('');
      
      // Marcar como tocado
      component.preOperativeForm.get('observaciones')?.markAsTouched();
      
      fixture.detectChanges();
      
      const mensajeError = fixture.nativeElement.querySelector('.invalid-feedback span');
      expect(mensajeError).toBeTruthy();
      expect(mensajeError.textContent).toContain('Favor de seleccionar el Motivo observaciones');
    });

    it('debería actualizar el store cuando cambia el valor de ideGenerica1', () => {
      const inputRadio = fixture.nativeElement.querySelector('app-input-radio');
      
      // Simulamos el evento change
      inputRadio.dispatchEvent(new Event('change'));
      
      expect(component.setValoresStore).toHaveBeenCalledWith('ideGenerica1');
    });

    it('debería actualizar el store cuando cambia el valor de observaciones', () => {
      const textarea = fixture.nativeElement.querySelector('textarea#observaciones');
      
      // Simulamos el evento change
      textarea.dispatchEvent(new Event('change'));
      
      expect(component.setValoresStore).toHaveBeenCalledWith('observaciones');
    });
  });

  // Pruebas de los observables y suscripciones
  describe('Suscripciones y observables', () => {
    it('debería usar takeUntil para evitar fugas de memoria', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockSolicitudPermisoState));
      mockTramite260703Query.selectSolicitudPermiso$ = {
        pipe: mockPipe
      } as any;
      
      component.ngOnInit();
      
      // Verificamos que se llamó a pipe con takeUntil
      expect(mockPipe).toHaveBeenCalled();
      const firstArg = mockPipe.mock.calls[0][0];
      expect(firstArg.name).toBe('takeUntil');
    });

    it('debería completar suscripciones en ngOnDestroy', () => {
      const destroySpy = jest.spyOn(component.destruirNotificacion$, 'next');
      const completeSpy = jest.spyOn(component.destruirNotificacion$, 'complete');
      
      component.ngOnDestroy();
      
      expect(destroySpy).toHaveBeenCalledTimes(1);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });
  });
});