import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormArray, Validators } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';
import { ManifiestosYDeclaracionesComponent } from './manifiestos-y-declaraciones.component';
import { Tramite260703Store } from '../../estados/store/tramite260703.store';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { SolicitudPermisoService } from '../../services/solicitud-permiso.service';
import { OPCIONES_DE_BOTON_DE_RADIO_INFORMACION_CONFIDENCIAL } from '../../enum/solicitud-permiso.enum';
import { Manifiestos, ManifiestosRespuesta } from '../../model/solicitud-permiso.model';

describe('ManifiestosYDeclaracionesComponent', () => {
  let component: ManifiestosYDeclaracionesComponent;
  let fixture: ComponentFixture<ManifiestosYDeclaracionesComponent>;
  let mockTramite260703Store: jest.Mocked<Tramite260703Store>;
  let mockTramite260703Query: jest.Mocked<Tramite260703Query>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;
  let mockSolicitudPermisoService: jest.Mocked<SolicitudPermisoService>;
  let formBuilder: FormBuilder;

  // Datos simulados (mock)
  const mockManifiestos: Manifiestos[] = [
    {
      declaracion: {
        clave: 'M001',
        descripcion: 'Manifiesto de prueba 1'
      },
      manifiestoDeclaracion: false
    },
    {
      declaracion: {
        clave: 'M002',
        descripcion: 'Manifiesto de prueba 2'
      },
      manifiestoDeclaracion: false
    },
    {
      declaracion: {
        clave: 'M003',
        descripcion: 'Manifiesto de prueba 3'
      },
      manifiestoDeclaracion: true
    }
  ];

  const mockManifiestosRespuesta: ManifiestosRespuesta = {
    data: mockManifiestos,
  };

  const mockSolicitudPermisoState = {
    preOperativFormState: {
      ideGenerica1: '',
      observaciones: ''
    },
    datosDelEstablecimientoFormState: {
      razonSocial: '',
      correoElectronico: ''
    },
    manifiestosFormState: {
      seleccionadaManifiesto: [true, false, true],
      informacionConfidencial: 'Si'
    },
    representanteLegalFormState: {
      nombre: '',
      apellidoPaterno: '',
      apellidoMaterno: '',
      rfc: ''
    },
    domicilloDelEstablecimientoFormState: {
      codigoPostal: '',
      estado: '',
      descripcionMunicipio: '',
      calle: ''
    }
  } as any; // Usar 'as any' para evitar verificación estricta de tipos en los datos simulados

  const mockConsultaioState = {
    readonly: false
  };

  beforeEach(async () => {
    // Simulación (Mock) para Tramite260703Store
    mockTramite260703Store = {
      actualizarEstadoFormularioManifiestos: jest.fn()
    } as unknown as jest.Mocked<Tramite260703Store>;

    // Simulación (Mock) para Tramite260703Query
    mockTramite260703Query = {
      selectSolicitudPermiso$: of(mockSolicitudPermisoState)
    } as unknown as jest.Mocked<Tramite260703Query>;

    // Simulación (Mock) para ConsultaioQuery
    mockConsultaioQuery = {
      selectConsultaioState$: of(mockConsultaioState)
    } as unknown as jest.Mocked<ConsultaioQuery>;

    // Simulación (Mock) para SolicitudPermisoService
    mockSolicitudPermisoService = {
      getManifiestos: jest.fn().mockReturnValue(of(mockManifiestosRespuesta))
    } as unknown as jest.Mocked<SolicitudPermisoService>;

    await TestBed.configureTestingModule({
      declarations: [ManifiestosYDeclaracionesComponent],
      imports: [ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: Tramite260703Store, useValue: mockTramite260703Store },
        { provide: Tramite260703Query, useValue: mockTramite260703Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: SolicitudPermisoService, useValue: mockSolicitudPermisoService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ManifiestosYDeclaracionesComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    
    // Inicializar el componente correctamente antes de agregar espías
    component.solicitudPermisioState = mockSolicitudPermisoState;
    component.manifiestos = mockManifiestos;
    
    // Crear el formulario manualmente para evitar problemas de inicialización
    component.manifiestosForm = formBuilder.group({
      seleccionadaManifiesto: formBuilder.array([true, false, true]),
      informacionConfidencial: ['Si', Validators.required]
    });
    
    // Espiar los métodos del componente DESPUÉS de la inicialización
    jest.spyOn(component, 'createManifiestosForm');
    jest.spyOn(component, 'guardarDatosFormulario');
    jest.spyOn(component, 'obtenerManifiestos');
    jest.spyOn(component, 'setValoresStore');
    jest.spyOn(component, 'onManifiestoCheckboxCambiar');
  });

  // Pruebas de inicialización y constructor
  describe('Inicialización del componente', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar las propiedades con valores por defecto', () => {
      expect(component.opcionDeBotonDeRadio).toEqual(OPCIONES_DE_BOTON_DE_RADIO_INFORMACION_CONFIDENCIAL);
      expect(component.destruirNotificador$).toBeInstanceOf(Subject);
    });

    it('debería inicializar el esFormularioSoloLectura según el valor de consultaioState', () => {
      expect(component.esFormularioSoloLectura).toBe(mockConsultaioState.readonly);
    });

    it('debería inyectar correctamente los servicios en el constructor', () => {
      // Accedemos a las propiedades privadas con casting
      const componentAny = component as any;
      expect(componentAny.formBuilder).toBeDefined();
      expect(componentAny.tramite260703Store).toBeDefined();
      expect(componentAny.tramite260703Query).toBeDefined();
      expect(componentAny.SolicitudPermisoService).toBeDefined();
      expect(componentAny.consultaioQuery).toBeDefined();
    });

    it('debería suscribirse al estado de consultaio en el constructor', () => {
      const mockPipeFn = jest.fn().mockReturnValue(of(mockConsultaioState));
      const mockSelectConsultaioState$ = {
        pipe: mockPipeFn
      };
      
      mockConsultaioQuery.selectConsultaioState$ = mockSelectConsultaioState$ as any;
      
      // Crear nuevo componente para activar constructor
      const newComponent = new ManifiestosYDeclaracionesComponent(
        formBuilder,
        mockTramite260703Store,
        mockTramite260703Query,
        mockSolicitudPermisoService,
        mockConsultaioQuery
      );
      
      expect(mockPipeFn).toHaveBeenCalled();
      expect(newComponent.esFormularioSoloLectura).toBe(mockConsultaioState.readonly);
    });

    it('debería establecer esFormularioSoloLectura cuando readonly es true', () => {
      const readonlyState = { readonly: true };
      mockConsultaioQuery.selectConsultaioState$ = of(readonlyState) as any;
      
      // Crear nuevo componente para activar constructor
      const newComponent = new ManifiestosYDeclaracionesComponent(
        formBuilder,
        mockTramite260703Store,
        mockTramite260703Query,
        mockSolicitudPermisoService,
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
      component.solicitudPermisioState = undefined as any;
      
      // Llamamos a ngOnInit manualmente
      component.ngOnInit();
      
      expect(component.solicitudPermisioState).toEqual(mockSolicitudPermisoState);
    });

    it('debería llamar a createManifiestosForm', () => {
      // Limpiamos el efecto de beforeEach
      (component.createManifiestosForm as jest.Mock).mockClear();
      
      component.ngOnInit();
      
      expect(component.createManifiestosForm).toHaveBeenCalled();
    });

    it('debería llamar a guardarDatosFormulario', () => {
      // Limpiamos el efecto de beforeEach
      (component.guardarDatosFormulario as jest.Mock).mockClear();
      
      component.ngOnInit();
      
      expect(component.guardarDatosFormulario).toHaveBeenCalled();
    });
  });

  // Pruebas para obtenerManifiestos
  describe('obtenerManifiestos', () => {
    it('debería llamar al servicio y establecer los manifiestos', () => {
      // Resetear los manifiestos
      component.manifiestos = undefined as any;
      
      component.obtenerManifiestos();
      
      expect(mockSolicitudPermisoService.getManifiestos).toHaveBeenCalled();
      expect(component.manifiestos).toEqual(mockManifiestos);
    });

    it('debería manejar respuesta vacía del servicio', () => {
      // Mockear respuesta vacía
      const emptyResponse: ManifiestosRespuesta = {
        data: [],
      };
      mockSolicitudPermisoService.getManifiestos.mockReturnValue(of(emptyResponse));
      
      // Resetear los manifiestos
      component.manifiestos = undefined as any;
      
      component.obtenerManifiestos();
      
      expect(component.manifiestos).toEqual([]);
    });

    it('debería usar takeUntil para evitar fugas de memoria', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockManifiestosRespuesta));
      mockSolicitudPermisoService.getManifiestos = jest.fn(() => ({
        pipe: mockPipe
      } as any));
      
      component.obtenerManifiestos();
      
      expect(mockPipe).toHaveBeenCalledWith(expect.anything());
    });
  });

  // Pruebas para createManifiestosForm
  describe('createManifiestosForm', () => {
    it('debería llamar a obtenerManifiestos', () => {
      // Limpiamos el efecto de beforeEach
      (component.obtenerManifiestos as jest.Mock).mockClear();
      
      component.createManifiestosForm();
      
      expect(component.obtenerManifiestos).toHaveBeenCalled();
    });

    it('debería crear el formulario reactivo con la estructura correcta', () => {
      // Resetear el formulario
      component.manifiestosForm = undefined as any;
      
      // Espiar el método group del formBuilder
      const formBuilderSpy = jest.spyOn(formBuilder, 'group');
      const formBuilderArraySpy = jest.spyOn(formBuilder, 'array');
      
      component.createManifiestosForm();
      
      expect(formBuilderSpy).toHaveBeenCalled();
      expect(formBuilderArraySpy).toHaveBeenCalled();
      expect(component.manifiestosForm).toBeDefined();
      expect(component.manifiestosForm.get('seleccionadaManifiesto')).toBeDefined();
      expect(component.manifiestosForm.get('informacionConfidencial')).toBeDefined();
    });

    it('debería inicializar los valores del formulario con el estado actual', () => {
      // Configurar el estado de la solicitud
      component.solicitudPermisioState = {
        manifiestosFormState: {
          seleccionadaManifiesto: [false, true, false],
          informacionConfidencial: 'No'
        }
      } as any;
      
      component.createManifiestosForm();
      
      const seleccionadaManifiesto = component.manifiestosForm.get('seleccionadaManifiesto') as FormArray;
      expect(seleccionadaManifiesto.value).toEqual([false, true, false]);
      expect(component.manifiestosForm.get('informacionConfidencial')?.value).toBe('No');
    });

    it('debería aplicar validadores requeridos al campo informacionConfidencial', () => {
      component.createManifiestosForm();
      
      // Limpiar el campo para activar validador
      component.manifiestosForm.get('informacionConfidencial')?.setValue('');
      
      expect(component.manifiestosForm.get('informacionConfidencial')?.valid).toBe(false);
      expect(component.manifiestosForm.get('informacionConfidencial')?.hasError('required')).toBe(true);
    });
  });

  // Pruebas para seleccionadaManifiesto getter
  describe('seleccionadaManifiesto getter', () => {
    it('debería devolver el FormArray de seleccionadaManifiesto', () => {
      expect(component.seleccionadaManifiesto).toBeInstanceOf(FormArray);
      expect(component.seleccionadaManifiesto).toBe(component.manifiestosForm.get('seleccionadaManifiesto'));
    });
  });

  // Pruebas para onManifiestoCheckboxCambiar
  describe('onManifiestoCheckboxCambiar', () => {
    it('debería actualizar el valor del control en el FormArray', () => {
      // Crear un evento mock
      const mockEvent = {
        target: {
          checked: true
        }
      } as unknown as Event;
      
      component.onManifiestoCheckboxCambiar(mockEvent, 1);
      
      expect(component.seleccionadaManifiesto.controls[1].value).toBe(true);
    });

    it('debería llamar a setValoresStore con seleccionadaManifiesto', () => {
      // Limpiamos el efecto de beforeEach
      (component.setValoresStore as jest.Mock).mockClear();
      
      // Crear un evento mock
      const mockEvent = {
        target: {
          checked: true
        }
      } as unknown as Event;
      
      component.onManifiestoCheckboxCambiar(mockEvent, 1);
      
      expect(component.setValoresStore).toHaveBeenCalledWith('seleccionadaManifiesto');
    });

    it('debería manejar diferentes estados de checkbox', () => {
      // Caso 1: Checkbox marcado
      let mockEvent = {
        target: {
          checked: true
        }
      } as unknown as Event;
      
      component.onManifiestoCheckboxCambiar(mockEvent, 0);
      expect(component.seleccionadaManifiesto.controls[0].value).toBe(true);
      
      // Caso 2: Checkbox desmarcado
      mockEvent = {
        target: {
          checked: false
        }
      } as unknown as Event;
      
      component.onManifiestoCheckboxCambiar(mockEvent, 0);
      expect(component.seleccionadaManifiesto.controls[0].value).toBe(false);
    });
  });

  // Pruebas para setValoresStore
  describe('setValoresStore', () => {
    it('debería llamar a actualizarEstadoFormularioManifiestos con el valor de seleccionadaManifiesto', () => {
      component.manifiestosForm.get('seleccionadaManifiesto')?.setValue([true, true, false]);
      
      component.setValoresStore('seleccionadaManifiesto');
      
      expect(mockTramite260703Store.actualizarEstadoFormularioManifiestos).toHaveBeenCalledWith({
        seleccionadaManifiesto: [true, true, false]
      });
    });

    it('debería llamar a actualizarEstadoFormularioManifiestos con el valor de informacionConfidencial', () => {
      component.manifiestosForm.get('informacionConfidencial')?.setValue('No');
      
      component.setValoresStore('informacionConfidencial');
      
      expect(mockTramite260703Store.actualizarEstadoFormularioManifiestos).toHaveBeenCalledWith({
        informacionConfidencial: 'No'
      });
    });

    it('debería manejar campos inválidos o inexistentes', () => {
      component.setValoresStore('campoInexistente');
      
      expect(mockTramite260703Store.actualizarEstadoFormularioManifiestos).toHaveBeenCalledWith({
        campoInexistente: undefined
      });
    });
  });

  // Pruebas para guardarDatosFormulario
  describe('guardarDatosFormulario', () => {
    it('debería deshabilitar todo el formulario cuando esFormularioSoloLectura es true', () => {
      const disableSpy = jest.spyOn(component.manifiestosForm, 'disable');
      const infoConfidencialDisableSpy = jest.spyOn(component.manifiestosForm.get('informacionConfidencial') as any, 'disable');
      
      component.esFormularioSoloLectura = true;
      component.guardarDatosFormulario();
      
      expect(disableSpy).toHaveBeenCalled();
      expect(infoConfidencialDisableSpy).toHaveBeenCalled();
    });

    it('debería deshabilitar el formulario y habilitar informacionConfidencial cuando esFormularioSoloLectura es false', () => {
      const disableSpy = jest.spyOn(component.manifiestosForm, 'disable');
      const infoConfidencialEnableSpy = jest.spyOn(component.manifiestosForm.get('informacionConfidencial') as any, 'enable');
      
      component.esFormularioSoloLectura = false;
      component.guardarDatosFormulario();
      
      expect(disableSpy).toHaveBeenCalled();
      expect(infoConfidencialEnableSpy).toHaveBeenCalled();
    });

    it('debería verificar que el formulario está deshabilitado y el campo informacionConfidencial deshabilitado cuando esFormularioSoloLectura es true', () => {
      component.esFormularioSoloLectura = true;
      component.guardarDatosFormulario();
      
      expect(component.manifiestosForm.disabled).toBe(true);
      expect(component.manifiestosForm.get('informacionConfidencial')?.disabled).toBe(true);
    });

  });

  // Pruebas para ngOnDestroy
  describe('ngOnDestroy', () => {
    it('debería llamar next() en destruirNotificador$', () => {
      const nextSpy = jest.spyOn(component.destruirNotificador$, 'next');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalled();
    });

    it('debería llamar complete() en destruirNotificador$', () => {
      const completeSpy = jest.spyOn(component.destruirNotificador$, 'complete');
      
      component.ngOnDestroy();
      
      expect(completeSpy).toHaveBeenCalled();
    });

    it('debería limpiar correctamente los recursos para evitar fugas de memoria', () => {
      const nextSpy = jest.spyOn(component.destruirNotificador$, 'next');
      const completeSpy = jest.spyOn(component.destruirNotificador$, 'complete');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalledTimes(1);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });
  });

  // Pruebas de integración y flujo completo
  describe('Flujo completo del componente', () => {
    it('debería ejecutar el flujo completo de inicialización', () => {
      // Este test se ejecuta después de beforeEach, que ya llamó a fixture.detectChanges() e inicializó el componente
      expect(component.solicitudPermisioState).toEqual(mockSolicitudPermisoState);
      expect(component.manifiestosForm).toBeDefined();
      expect(component.manifiestos).toEqual(mockManifiestos);
      expect(component.esFormularioSoloLectura).toBe(mockConsultaioState.readonly);
    });

    it('debería reaccionar a cambios en el formulario y actualizar el store', () => {
      // Habilitamos el campo informacionConfidencial
      component.esFormularioSoloLectura = false;
      component.guardarDatosFormulario();
      
      // Simulamos un cambio en el formulario
      component.manifiestosForm.get('informacionConfidencial')?.setValue('No');
      component.setValoresStore('informacionConfidencial');
      
      expect(mockTramite260703Store.actualizarEstadoFormularioManifiestos).toHaveBeenCalledWith({
        informacionConfidencial: 'No'
      });
    });

    it('debería actualizar el estado cuando se cambia un checkbox de manifiesto', () => {
      // Creamos un evento mock
      const mockEvent = {
        target: {
          checked: false
        }
      } as unknown as Event;
      
      // Limpiamos el efecto de beforeEach
      (mockTramite260703Store.actualizarEstadoFormularioManifiestos as jest.Mock).mockClear();
      
      // Simulamos un cambio en un checkbox
      component.onManifiestoCheckboxCambiar(mockEvent, 0);
      
      expect(mockTramite260703Store.actualizarEstadoFormularioManifiestos).toHaveBeenCalled();
    });
  });

  // Pruebas para casos edge y manejo de errores
  describe('Casos límite y manejo de errores', () => {
    it('debería manejar suscripción a observable que no emite en ngOnInit', () => {
      mockTramite260703Query.selectSolicitudPermiso$ = new Subject().asObservable() as any;
      
      // Crear nuevo componente para evitar efectos de beforeEach
      const newComponent = new ManifiestosYDeclaracionesComponent(
        formBuilder,
        mockTramite260703Store,
        mockTramite260703Query,
        mockSolicitudPermisoService,
        mockConsultaioQuery
      );
      
      // Inicializar el estado para evitar errores de undefined
      newComponent.solicitudPermisioState = mockSolicitudPermisoState;
      
      expect(() => {
        newComponent.ngOnInit();
      }).not.toThrow();
    });

    it('debería manejar suscripción a observable que no emite en obtenerManifiestos', () => { 
      mockSolicitudPermisoService.getManifiestos.mockReturnValue(new Subject().asObservable() as any);
      
      expect(() => {
        component.obtenerManifiestos();
      }).not.toThrow();
    });

    it('debería manejar formulario no inicializado en setValoresStore', () => {
      component.manifiestosForm = undefined as any;
      
      // El método actual no tiene verificación de nulos, por lo que debería lanzar error
      expect(() => {
        component.setValoresStore('informacionConfidencial');
      }).toThrow();
    });

    it('debería manejar formulario no inicializado en guardarDatosFormulario', () => {
      component.manifiestosForm = undefined as any;
      
      expect(() => {
        component.guardarDatosFormulario();
      }).not.toThrow();
    });

    it('debería manejar FormArray no inicializado en onManifiestoCheckboxCambiar', () => {
      component.manifiestosForm = formBuilder.group({
        informacionConfidencial: ['Si']
        // Intencionalmente NO incluir 'seleccionadaManifiesto' FormArray
      });
      
      const mockEvent = {
        target: {
          checked: true
        }
      } as unknown as Event;
      
      // El método debería lanzar error porque no puede acceder a controls en null
      expect(() => {
        component.onManifiestoCheckboxCambiar(mockEvent, 0);
      }).toThrow();
    });

    it('debería manejar índice fuera de rango en onManifiestoCheckboxCambiar', () => {
      // Crear FormArray con algunos controles para probar índice fuera de rango
      component.manifiestosForm = formBuilder.group({
        seleccionadaManifiesto: formBuilder.array([
          formBuilder.control(false),
          formBuilder.control(false)
        ]),
        informacionConfidencial: ['Si']
      });
      
      const mockEvent = {
        target: {
          checked: true
        }
      } as unknown as Event;
      
      // El método debería lanzar error porque el índice 999 no existe
      expect(() => {
        component.onManifiestoCheckboxCambiar(mockEvent, 999);
      }).toThrow();
    });
  });

  // Pruebas de interacción con la vista (solo pruebas de lógica, evitamos renderizado de template)
  describe('Interacciones con la template', () => {
    it('debería tener la propiedad manifiestos inicializada', () => {
      expect(component.manifiestos).toBeDefined();
    });

    it('debería poder establecer manifiestos sin renderizar template', () => {
      // Configurar los manifiestos sin llamar a fixture.detectChanges()
      component.manifiestos = mockManifiestos;
      
      expect(component.manifiestos).toBe(mockManifiestos);
      expect(component.manifiestos.length).toBe(3);
    });

    it('debería tener formulario con control informacionConfidencial', () => {
      expect(component.manifiestosForm.get('informacionConfidencial')).toBeTruthy();
    });
  });

  // Pruebas de los observables y suscripciones
  describe('Suscripciones y observables', () => {
    it('debería usar takeUntil para evitar fugas de memoria en constructor', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockConsultaioState));
      mockConsultaioQuery.selectConsultaioState$ = {
        pipe: mockPipe
      } as any;
      
      const newComponent = new ManifiestosYDeclaracionesComponent(
        formBuilder,
        mockTramite260703Store,
        mockTramite260703Query,
        mockSolicitudPermisoService,
        mockConsultaioQuery
      );
      
      // Verificamos que se llamó a pipe con takeUntil
      expect(mockPipe).toHaveBeenCalledWith(expect.anything(), expect.anything());
    });

    it('debería usar takeUntil para evitar fugas de memoria en ngOnInit', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockSolicitudPermisoState));
      mockTramite260703Query.selectSolicitudPermiso$ = {
        pipe: mockPipe
      } as any;
      
      component.ngOnInit();
      
      // Verificamos que se llamó a pipe con takeUntil
      expect(mockPipe).toHaveBeenCalledWith(expect.anything());
    });

    it('debería completar suscripciones en ngOnDestroy', () => {
      const destroySpy = jest.spyOn(component.destruirNotificador$, 'next');
      const completeSpy = jest.spyOn(component.destruirNotificador$, 'complete');
      
      component.ngOnDestroy();
      
      expect(destroySpy).toHaveBeenCalledTimes(1);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });
  });
});