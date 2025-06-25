import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';
import { RepresentanteLegalComponent } from './representante-legal.component';
import { Tramite260703Store } from '../../estados/store/tramite260703.store';
import { Tramite260703Query } from '../../estados/query/tramite260703.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { SolicitudPermisoService } from '../../services/solicitud-permiso.service';

describe('RepresentanteLegalComponent', () => {
  let component: RepresentanteLegalComponent;
  let fixture: ComponentFixture<RepresentanteLegalComponent>;
  let mockTramite260703Store: jest.Mocked<Tramite260703Store>;
  let mockTramite260703Query: jest.Mocked<Tramite260703Query>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;
  let mockSolicitudPermisoService: jest.Mocked<SolicitudPermisoService>;
  let formBuilder: FormBuilder;

  // Datos mock
  const mockSolicitudPermisoState = {
    representanteLegalFormState: {
      rfc: 'LEQI810131457',
      nombreOrazonsocial: 'MISAEL',
      apellidoPaterno: 'BARRAGAN',
      apellidoMaterno: 'RUIZ'
    }
  };

  const mockConsultaioState = {
    readonly: false
  };

  beforeEach(async () => {
    // Mock para Tramite260703Store
    mockTramite260703Store = {
      actualizarEstadoFormularioRepresentanteLegal: jest.fn()
    } as unknown as jest.Mocked<Tramite260703Store>;

    // Mock para Tramite260703Query
    mockTramite260703Query = {
      selectSolicitudPermiso$: of(mockSolicitudPermisoState)
    } as unknown as jest.Mocked<Tramite260703Query>;

    // Mock para ConsultaioQuery
    mockConsultaioQuery = {
      selectConsultaioState$: of(mockConsultaioState)
    } as unknown as jest.Mocked<ConsultaioQuery>;

    // Mock para SolicitudPermisoService
    mockSolicitudPermisoService = {} as unknown as jest.Mocked<SolicitudPermisoService>;

    await TestBed.configureTestingModule({
      declarations: [RepresentanteLegalComponent],
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

    fixture = TestBed.createComponent(RepresentanteLegalComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    
    // Spy en los métodos del componente
    jest.spyOn(component, 'crearFormulario');
    jest.spyOn(component, 'guardarDatosFormulario');
    jest.spyOn(component, 'setValoresStore');
    
    fixture.detectChanges();
  });

  // Pruebas de inicialización y constructor
  describe('Inicialización del componente', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar destruirNotificador$ como un Subject', () => {
      // Accedemos a la propiedad privada con casting
      const componentAny = component as any;
      expect(componentAny.destruirNotificador$).toBeInstanceOf(Subject);
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
      expect(componentAny.solicitudPermisoService).toBeDefined();
      expect(componentAny.consultaioQuery).toBeDefined();
    });

    it('debería suscribirse al estado de consultaio en el constructor', () => {
      const mockPipeFn = jest.fn().mockReturnValue(of(mockConsultaioState));
      const mockSelectConsultaioState$ = {
        pipe: mockPipeFn
      };
      
      mockConsultaioQuery.selectConsultaioState$ = mockSelectConsultaioState$ as any;
      
      // Crear nuevo componente para activar constructor
      const newComponent = new RepresentanteLegalComponent(
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
      const newComponent = new RepresentanteLegalComponent(
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
      component.solicitudPermisoState = undefined as any;
      
      // Llamamos a ngOnInit manualmente
      component.ngOnInit();
      
      expect(component.solicitudPermisoState).toEqual(mockSolicitudPermisoState);
    });

    it('debería llamar a crearFormulario', () => {
      // Limpiamos el efecto de beforeEach
      (component.crearFormulario as jest.Mock).mockClear();
      
      component.ngOnInit();
      
      expect(component.crearFormulario).toHaveBeenCalled();
    });

    it('debería llamar a guardarDatosFormulario', () => {
      // Limpiamos el efecto de beforeEach
      (component.guardarDatosFormulario as jest.Mock).mockClear();
      
      component.ngOnInit();
      
      expect(component.guardarDatosFormulario).toHaveBeenCalled();
    });
  });

  // Pruebas para crearFormulario
  describe('crearFormulario', () => {
    it('debería crear el formulario reactivo con la estructura correcta', () => {
      // Resetear el formulario
      component.representanteLegalForm = undefined as any;
      
      // Espiar el método group del formBuilder
      const formBuilderSpy = jest.spyOn(formBuilder, 'group');
      
      component.crearFormulario();
      
      expect(formBuilderSpy).toHaveBeenCalled();
      expect(component.representanteLegalForm).toBeDefined();
      expect(component.representanteLegalForm.get('rfc')).toBeDefined();
      expect(component.representanteLegalForm.get('nombreOrazonsocial')).toBeDefined();
      expect(component.representanteLegalForm.get('apellidoPaterno')).toBeDefined();
      expect(component.representanteLegalForm.get('apellidoMaterno')).toBeDefined();
    });

    it('debería inicializar los valores del formulario con el estado actual', () => {
      // Configurar el estado de la solicitud
      component.solicitudPermisoState = {
        representanteLegalFormState: {
          rfc: 'TEST123456789',
          nombreOrazonsocial: 'NOMBRE PRUEBA',
          apellidoPaterno: 'APELLIDO PRUEBA',
          apellidoMaterno: 'MATERNO PRUEBA'
        }
      } as any;
      
      component.crearFormulario();
      
      expect(component.representanteLegalForm.get('rfc')?.value).toBe('TEST123456789');
      expect(component.representanteLegalForm.get('nombreOrazonsocial')?.value).toBe('NOMBRE PRUEBA');
      expect(component.representanteLegalForm.get('apellidoPaterno')?.value).toBe('APELLIDO PRUEBA');
      expect(component.representanteLegalForm.get('apellidoMaterno')?.value).toBe('MATERNO PRUEBA');
    });

    it('debería deshabilitar los campos nombreOrazonsocial, apellidoPaterno y apellidoMaterno', () => {
      component.crearFormulario();
      
      expect(component.representanteLegalForm.get('nombreOrazonsocial')?.disabled).toBe(true);
      expect(component.representanteLegalForm.get('apellidoPaterno')?.disabled).toBe(true);
      expect(component.representanteLegalForm.get('apellidoMaterno')?.disabled).toBe(true);
    });

    it('debería aplicar validadores requeridos a los campos rfc y nombreOrazonsocial', () => {
      component.crearFormulario();
      
      // Limpiar el campo para activar validador
      component.representanteLegalForm.get('rfc')?.setValue('');
      
      expect(component.representanteLegalForm.get('rfc')?.valid).toBe(false);
      expect(component.representanteLegalForm.get('rfc')?.hasError('required')).toBe(true);
      
      // Para nombreOrazonsocial no podemos probar directamente porque está deshabilitado
      // pero podemos verificar que el validador está presente
      const nombreControl = component.representanteLegalForm.get('nombreOrazonsocial');
      nombreControl?.enable();
      nombreControl?.setValue('');
      
      expect(nombreControl?.valid).toBe(false);
      expect(nombreControl?.hasError('required')).toBe(true);
    });

    it('debería aplicar validador maxLength(13) al campo rfc', () => {
      component.crearFormulario();
      
      // Intentar establecer un valor más largo que el permitido
      component.representanteLegalForm.get('rfc')?.setValue('12345678901234');
      
      expect(component.representanteLegalForm.get('rfc')?.valid).toBe(false);
      expect(component.representanteLegalForm.get('rfc')?.hasError('maxlength')).toBe(true);
      
      // Ahora con un valor válido
      component.representanteLegalForm.get('rfc')?.setValue('1234567890123');
      
      expect(component.representanteLegalForm.get('rfc')?.valid).toBe(true);
    });
  });

  // Pruebas para setValoresStore
  describe('setValoresStore', () => {
    it('debería llamar a actualizarEstadoFormularioRepresentanteLegal con el valor de rfc', () => {
      component.representanteLegalForm.get('rfc')?.setValue('NUEVA123456789');
      
      component.setValoresStore('rfc');
      
      expect(mockTramite260703Store.actualizarEstadoFormularioRepresentanteLegal).toHaveBeenCalledWith({
        rfc: 'NUEVA123456789'
      });
    });

    it('debería manejar campos inválidos o inexistentes', () => {
      component.setValoresStore('campoInexistente');
      
      expect(mockTramite260703Store.actualizarEstadoFormularioRepresentanteLegal).toHaveBeenCalledWith({
        campoInexistente: undefined
      });
    });
  });

  // Pruebas para guardarDatosFormulario
  describe('guardarDatosFormulario', () => {
    it('debería deshabilitar todo el formulario cuando esFormularioSoloLectura es true', () => {
      const disableSpy = jest.spyOn(component.representanteLegalForm, 'disable');
      
      component.esFormularioSoloLectura = true;
      component.guardarDatosFormulario();
      
      expect(disableSpy).toHaveBeenCalled();
    });

    it('debería habilitar todo el formulario cuando esFormularioSoloLectura es false', () => {
      const enableSpy = jest.spyOn(component.representanteLegalForm, 'enable');
      
      component.esFormularioSoloLectura = false;
      component.guardarDatosFormulario();
      
      expect(enableSpy).toHaveBeenCalled();
    });

    it('debería verificar que el formulario está deshabilitado cuando esFormularioSoloLectura es true', () => {
      component.esFormularioSoloLectura = true;
      component.guardarDatosFormulario();
      
      expect(component.representanteLegalForm.disabled).toBe(true);
    });

    it('debería verificar que el formulario está habilitado cuando esFormularioSoloLectura es false', () => {
      // Primero deshabilitamos
      component.representanteLegalForm.disable();
      
      component.esFormularioSoloLectura = false;
      component.guardarDatosFormulario();
      
      expect(component.representanteLegalForm.enabled).toBe(true);
    });
  });

  // Pruebas para ngOnDestroy
  describe('ngOnDestroy', () => {
    it('debería llamar next() en destruirNotificador$', () => {
      // Accedemos a la propiedad privada con casting
      const componentAny = component as any;
      const nextSpy = jest.spyOn(componentAny.destruirNotificador$, 'next');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalled();
    });

    it('debería llamar complete() en destruirNotificador$', () => {
      // Accedemos a la propiedad privada con casting
      const componentAny = component as any;
      const completeSpy = jest.spyOn(componentAny.destruirNotificador$, 'complete');
      
      component.ngOnDestroy();
      
      expect(completeSpy).toHaveBeenCalled();
    });

    it('debería limpiar correctamente los recursos para evitar fugas de memoria', () => {
      // Accedemos a la propiedad privada con casting
      const componentAny = component as any;
      const nextSpy = jest.spyOn(componentAny.destruirNotificador$, 'next');
      const completeSpy = jest.spyOn(componentAny.destruirNotificador$, 'complete');
      
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
      expect(component.representanteLegalForm).toBeDefined();
      expect(component.esFormularioSoloLectura).toBe(mockConsultaioState.readonly);
    });

    it('debería reaccionar a cambios en el formulario y actualizar el store', () => {
      // Habilitamos el campo rfc
      component.esFormularioSoloLectura = false;
      component.guardarDatosFormulario();
      
      // Simulamos un cambio en el formulario
      component.representanteLegalForm.get('rfc')?.setValue('NUEVO123456789');
      component.setValoresStore('rfc');
      
      expect(mockTramite260703Store.actualizarEstadoFormularioRepresentanteLegal).toHaveBeenCalledWith({
        rfc: 'NUEVO123456789'
      });
    });
  });

  // Pruebas para casos edge y manejo de errores
  describe('Casos límite y manejo de errores', () => {
    it('debería manejar suscripción a observable que no emite en ngOnInit', () => {
      mockTramite260703Query.selectSolicitudPermiso$ = new Subject().asObservable() as any;
      
      // Crear nuevo componente para evitar efectos de beforeEach
      const newComponent = new RepresentanteLegalComponent(
        formBuilder,
        mockTramite260703Store,
        mockTramite260703Query,
        mockSolicitudPermisoService,
        mockConsultaioQuery
      );
      
      expect(() => {
        newComponent.ngOnInit();
      }).not.toThrow();
    });

    it('debería manejar formulario no inicializado en setValoresStore', () => {
      component.representanteLegalForm = undefined as any;
      
      expect(() => {
        component.setValoresStore('rfc');
      }).not.toThrow();
    });

    it('debería manejar formulario no inicializado en guardarDatosFormulario', () => {
      component.representanteLegalForm = undefined as any;
      
      expect(() => {
        component.guardarDatosFormulario();
      }).not.toThrow();
    });

    it('debería manejar estado undefined en crearFormulario', () => {
      component.solicitudPermisoState = undefined as any;
      
      expect(() => {
        component.crearFormulario();
      }).not.toThrow();
    });
  });

  // Pruebas de interacción con la vista
  describe('Interacciones con la template', () => {
    it('debería renderizar el título correctamente', () => {
      const compiled = fixture.nativeElement;
      const titulo = compiled.querySelector('ng-titulo');
      expect(titulo).toBeTruthy();
    });

    it('debería renderizar el formulario con los campos correctos', () => {
      const compiled = fixture.nativeElement;
      const form = compiled.querySelector('form');
      const inputs = compiled.querySelectorAll('input');
      
      expect(form).toBeTruthy();
      expect(inputs.length).toBe(4); // rfc, nombreOrazonsocial, apellidoPaterno, apellidoMaterno
    });

    it('debería deshabilitar el botón Buscar cuando esFormularioSoloLectura es true', () => {
      component.esFormularioSoloLectura = true;
      fixture.detectChanges();
      
      const button = fixture.nativeElement.querySelector('button#consultarIDC');
      expect(button.disabled).toBe(true);
    });

    it('debería actualizar el store cuando cambia el valor de rfc', () => {
      // Habilitamos el campo rfc
      component.esFormularioSoloLectura = false;
      component.guardarDatosFormulario();
      fixture.detectChanges();
      
      const rfcInput = fixture.nativeElement.querySelector('input#representanteLegalRFC');
      
      // Simulamos el evento change
      rfcInput.dispatchEvent(new Event('change'));
      
      expect(component.setValoresStore).toHaveBeenCalledWith('rfc');
    });
  });

  // Pruebas de los observables y suscripciones
  describe('Suscripciones y observables', () => {
    it('debería usar takeUntil para evitar fugas de memoria en constructor', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockConsultaioState));
      mockConsultaioQuery.selectConsultaioState$ = {
        pipe: mockPipe
      } as any;
      
      const newComponent = new RepresentanteLegalComponent(
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
      // Accedemos a la propiedad privada con casting
      const componentAny = component as any;
      const destroySpy = jest.spyOn(componentAny.destruirNotificador$, 'next');
      const completeSpy = jest.spyOn(componentAny.destruirNotificador$, 'complete');
      
      component.ngOnDestroy();
      
      expect(destroySpy).toHaveBeenCalledTimes(1);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });
  });

  // Pruebas de validación del formulario
  describe('Validación del formulario', () => {
    beforeEach(() => {
      // Habilitamos el formulario para pruebas
      component.esFormularioSoloLectura = false;
      component.guardarDatosFormulario();
    });

    it('debería validar que rfc es requerido cuando está vacío', () => {
      component.representanteLegalForm.get('rfc')?.setValue('');
      
      expect(component.representanteLegalForm.get('rfc')?.hasError('required')).toBe(true);
    });

    it('debería validar que rfc no excede la longitud máxima', () => {
      component.representanteLegalForm.get('rfc')?.setValue('12345678901234');
      
      expect(component.representanteLegalForm.get('rfc')?.hasError('maxlength')).toBe(true);
    });

    it('debería validar que nombreOrazonsocial es requerido cuando está habilitado y vacío', () => {
      const nombreControl = component.representanteLegalForm.get('nombreOrazonsocial');
      nombreControl?.enable();
      nombreControl?.setValue('');
      
      expect(nombreControl?.hasError('required')).toBe(true);
    });

    it('debería marcar rfc como válido con un valor correcto', () => {
      component.representanteLegalForm.get('rfc')?.setValue('LEQI810131457');
      
      expect(component.representanteLegalForm.get('rfc')?.valid).toBe(true);
    });
  });
});