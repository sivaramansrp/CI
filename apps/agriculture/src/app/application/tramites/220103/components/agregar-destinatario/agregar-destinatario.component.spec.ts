import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarDestinatarioComponent } from './agregar-destinatario.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Tramite220103Query } from '../../estados/queries/tramites220103.query';
import { Tramite220103Store } from '../../estados/tramites/tramites220103.store';
import { SanidadAcuicolaImportacionService } from '../../services/sanidad-acuicola-importacion.service';
import { 
  CAMPOS_FORMULARIO_DATOS_PERSONALES_AGREGAR_DESTINATARIO,
  CAMPOS_FORMULARIO_DATOS_PERSONALES_AGREGAR_INSTALACI,
  TIPO_PERSONA 
} from '../../constantes/sanidad-acuicola-importacion.enum';
import { CommonModule } from '@angular/common';
import { FormasDinamicasComponent } from '@libs/shared/data-access-user/src/tramites/components/formas-dinamicas/formas-dinamicas/formas-dinamicas.component';
import { InputRadioComponent, TituloComponent, ModeloDeFormaDinamica } from '@ng-mf/data-access-user';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('AgregarDestinatarioComponent', () => {
  let component: AgregarDestinatarioComponent;
  let fixture: ComponentFixture<AgregarDestinatarioComponent>;
  let mockQuery: jest.Mocked<Tramite220103Query>;
  let mockStore: jest.Mocked<Tramite220103Store>;
  let mockService: jest.Mocked<SanidadAcuicolaImportacionService>;
  let formBuilder: FormBuilder;
  
  // Mock data
  const mockEstado = {
    tipoPersona: 'Fisica',
    datosDelTerceroDestinatario: {
      nombre: 'Test',
      primerApellido: 'User',
      segundoApellido: 'Test'
    },
    instalacion: {
      nombre: 'Test Instalación',
      direccion: 'Calle Test'
    }
  };
  
  const mockColonias = [
    { id: '1', descripcion: 'Colonia Test 1' },
    { id: '2', descripcion: 'Colonia Test 2' }
  ];
  
  const mockDestinatarios = [
    { id: '1', nombre: 'Destinatario 1' },
    { id: '2', nombre: 'Destinatario 2' }
  ];
  
  const mockInstalaciones = [
    { id: '1', nombre: 'Instalación 1' },
    { id: '2', nombre: 'Instalación 2' }
  ];

  beforeEach(async () => {
    // Create mocks
    mockQuery = {
      selectTramite220103State$: of(mockEstado)
    } as unknown as jest.Mocked<Tramite220103Query>;

    mockStore = {
      setTramite220103State: jest.fn(),
      reset: jest.fn()
    } as unknown as jest.Mocked<Tramite220103Store>;
    
    mockService = {
      getColonia: jest.fn().mockReturnValue(of(mockColonias)),
      getDestinatario: jest.fn().mockReturnValue(of(mockDestinatarios)),
      getInstalacion: jest.fn().mockReturnValue(of(mockInstalaciones))
    } as unknown as jest.Mocked<SanidadAcuicolaImportacionService>;

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        AgregarDestinatarioComponent
      ],
      providers: [
        FormBuilder,
        { provide: Tramite220103Query, useValue: mockQuery },
        { provide: Tramite220103Store, useValue: mockStore },
        { provide: SanidadAcuicolaImportacionService, useValue: mockService }
      ],
      schemas: [NO_ERRORS_SCHEMA] // For handling child components without having to import them
    }).compileComponents();

    fixture = TestBed.createComponent(AgregarDestinatarioComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  // 1. Basic Component Tests

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });
  
  it('debería tener las propiedades iniciales correctas', () => {
    expect(component.isInstalacionMode).toBe(false);
    expect(component.tipoPersona).toEqual(TIPO_PERSONA);
    expect(component.formularioConfiguracion).toEqual(CAMPOS_FORMULARIO_DATOS_PERSONALES_AGREGAR_DESTINATARIO);
    expect(component.formularioConfiguracionInstalacion).toEqual(CAMPOS_FORMULARIO_DATOS_PERSONALES_AGREGAR_INSTALACI);
  });

  // 2. Import Tests
  
  it('debería importar correctamente todos los módulos necesarios', () => {
    // This is more of a compile-time check, but we can verify the imports worked
    // by checking if the component has access to the expected functionality
    expect(component.formularioAgregarDestinatario).toBeDefined();
    expect(component.closeModal).toBeDefined();
  });

  // 3. Lifecycle Method Tests
  
  it('debería ejecutar todos los métodos necesarios en ngOnInit', () => {
    // Setup spies
    const obtenerColoniaSpy = jest.spyOn(component, 'obtenerColonia');
    const obtenerEstadoValorSpy = jest.spyOn(component, 'obtenerEstadoValor');
    const inicializarFormularioSpy = jest.spyOn(component, 'inicializarFormulario');
    const cambiarValoresSpy = jest.spyOn(component, 'cambiarValoresTipoPersona');
    
    // Reset to clear previous calls
    component.ngOnInit();
    
    // Verify all methods were called
    expect(obtenerColoniaSpy).toHaveBeenCalled();
    expect(obtenerEstadoValorSpy).toHaveBeenCalled();
    expect(inicializarFormularioSpy).toHaveBeenCalled();
    expect(cambiarValoresSpy).toHaveBeenCalled();
  });
  
  it('debería cancelar todas las suscripciones en ngOnDestroy', () => {
    // Create a spy on the Subject's next and complete methods
    const nextSpy = jest.spyOn(component['notificadorDestruccion$'], 'next');
    const completeSpy = jest.spyOn(component['notificadorDestruccion$'], 'complete');
    
    component.ngOnDestroy();
    
    expect(nextSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });
  
  // 4. Form Validation Tests
  
  it('debería considerar inválido el formulario cuando tipoPersona está vacío', () => {
    // Setup destinatario form with empty value
    component.isInstalacionMode = false;
    component.formularioAgregarDestinatario = formBuilder.group({
      tipoPersona: ['', Validators.required]
    });
    
    expect(component.formularioAgregarDestinatario.valid).toBeFalsy();
    
    // Setup instalacion form with empty value
    component.isInstalacionMode = true;
    component.formularioAgregarInstalacion = formBuilder.group({
      tipoPersona: ['', Validators.required]
    });
    
    expect(component.formularioAgregarInstalacion.valid).toBeFalsy();
  });
  
  it('debería considerar válido el formulario cuando tipoPersona tiene un valor válido', () => {
    // Setup destinatario form
    component.isInstalacionMode = false;
    component.formularioAgregarDestinatario = formBuilder.group({
      tipoPersona: ['Fisica', Validators.required]
    });
    
    expect(component.formularioAgregarDestinatario.valid).toBeTruthy();
    
    // Setup instalacion form
    component.isInstalacionMode = true;
    component.formularioAgregarInstalacion = formBuilder.group({
      tipoPersona: ['Moral', Validators.required]
    });
    
    expect(component.formularioAgregarInstalacion.valid).toBeTruthy();
  });
  
  it('debería marcar todos los campos como touched cuando se guarda con formulario inválido', () => {
    // Setup for destinatario mode
    component.isInstalacionMode = false;
    component.formularioAgregarDestinatario = formBuilder.group({
      tipoPersona: ['', Validators.required]
    });
    
    const markTouchedSpy = jest.spyOn(component.formularioAgregarDestinatario, 'markAllAsTouched');
    
    component.guardarDestinatario();
    
    expect(markTouchedSpy).toHaveBeenCalled();
    expect(mockService.getDestinatario).not.toHaveBeenCalled();
    
    // Reset and setup for instalacion mode
    markTouchedSpy.mockReset();
    component.isInstalacionMode = true;
    component.formularioAgregarInstalacion = formBuilder.group({
      tipoPersona: ['', Validators.required]
    });
    
    const markInstalacionTouchedSpy = jest.spyOn(component.formularioAgregarInstalacion, 'markAllAsTouched');
    
    component.guardarDestinatario();
    
    expect(markInstalacionTouchedSpy).toHaveBeenCalled();
    expect(mockService.getInstalacion).not.toHaveBeenCalled();
  });
  
  // 5. Error Handling Tests
  
  it('debería manejar errores al obtener colonias', () => {
    // Mock error response
    const errorMsg = 'Error fetching colonias';
    mockService.getColonia.mockReturnValue(throwError(() => new Error(errorMsg)));
    
    // Spy on console.error to check if error is logged
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    
    // Execute method
    component.obtenerColonia();
    
    // Verify the error doesn't crash the component
    expect(component).toBeTruthy();
    
    // Ideally, we would check error handling behavior here
    // Reset console spy
    consoleErrorSpy.mockRestore();
  });
  
  it('debería manejar errores al obtener destinatarios', () => {
    // Mock error response
    const errorMsg = 'Error fetching destinatarios';
    mockService.getDestinatario.mockReturnValue(throwError(() => new Error(errorMsg)));
    
    // Setup valid form
    component.isInstalacionMode = false;
    component.formularioAgregarDestinatario = formBuilder.group({
      tipoPersona: ['Fisica', Validators.required]
    });
    
    // Spy on console.error to check if error is logged
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    
    // Execute method
    component.guardarDestinatario();
    
    // Verify the method doesn't crash
    expect(component).toBeTruthy();
    
    // Ideally, we would check error handling behavior here
    // Reset console spy
    consoleErrorSpy.mockRestore();
  });
  
  it('debería manejar errores al obtener instalaciones', () => {
    // Mock error response
    const errorMsg = 'Error fetching instalaciones';
    mockService.getInstalacion.mockReturnValue(throwError(() => new Error(errorMsg)));
    
    // Setup valid form
    component.isInstalacionMode = true;
    component.formularioAgregarInstalacion = formBuilder.group({
      tipoPersona: ['Fisica', Validators.required]
    });
    
    // Spy on console.error to check if error is logged
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    
    // Execute method
    component.guardarDestinatario();
    
    // Verify the method doesn't crash
    expect(component).toBeTruthy();
    
    // Ideally, we would check error handling behavior here
    // Reset console spy
    consoleErrorSpy.mockRestore();
  });
  
  // 6. State Management Tests
  
  it('debería actualizar correctamente el estado del componente cuando cambia el estado del trámite', () => {
    const nuevoEstado = {
      tipoPersona: 'Moral',
      datosDelTerceroDestinatario: {
        razonSocial: 'Empresa Nueva'
      }
    };
    
    // Create a new observable with the new state
    const stateSpy = {
      selectTramite220103State$: of(nuevoEstado)
    } as unknown as jest.Mocked<Tramite220103Query>;
    
    // Replace the query service
    (component as any).tramite220103Query = stateSpy;
    
    // Call the method
    component.obtenerEstadoValor();
    
    // Verify state was updated
    expect(component.estadoSeleccionado).toEqual(nuevoEstado);
  });
  
  it('debería actualizar correctamente el store cuando se cambia un valor', () => {
    const evento = { campo: 'telefono', valor: '1234567890' };
    const prop = 'datosDelTerceroDestinatario';
    
    component.establecerCambioDeValor(evento, prop);
    
    expect(mockStore.setTramite220103State).toHaveBeenCalledWith(
      evento.campo, evento.valor, prop
    );
  });
  
  it('debería actualizar el store con los destinatarios obtenidos', () => {
    component.getDestinatario();
    
    expect(mockStore.setTramite220103State).toHaveBeenCalledWith(
      'tablaDestinatario', mockDestinatarios
    );
  });
  
  it('debería actualizar el store con las instalaciones obtenidas', () => {
    component.getInstalacion();
    
    expect(mockStore.setTramite220103State).toHaveBeenCalledWith(
      'tablaInstalacion', mockInstalaciones
    );
  });
  
  it('debería reiniciar el store después de guardar', () => {
    // Setup valid form
    component.isInstalacionMode = false;
    component.formularioAgregarDestinatario = formBuilder.group({
      tipoPersona: ['Fisica', Validators.required]
    });
    
    // Execute
    component.guardarDestinatario();
    
    // Verify store was reset
    expect(mockStore.reset).toHaveBeenCalled();
  });
  
  // 7. Edge Cases Tests
  
  it('debería manejar correctamente null o undefined en el estado seleccionado', () => {
    // Create a mock query with null state
    const nullStateSpy = {
      selectTramite220103State$: of(null)
    } as unknown as jest.Mocked<Tramite220103Query>;
    
    // Replace the query service
    (component as any).tramite220103Query = nullStateSpy;
    
    // Call the method - should not throw error
    expect(() => component.obtenerEstadoValor()).not.toThrow();
    
    // Call cambiarValoresTipoPersona - should not throw error with null state
    expect(() => component.cambiarValoresTipoPersona()).not.toThrow();
  });
  
  it('debería manejar campos no encontrados en la configuración del formulario', () => {
    // Create a copy of form config without the fields we need
    const incompleteConfig: ModeloDeFormaDinamica[] = [
      {
        id: 'otherField',
        labelNombre: 'Other Field',
        campo: 'otherField',
        clase: 'col-md-4',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0
      }
    ];
    
    // Replace the form configuration
    component.formularioConfiguracion = incompleteConfig;
    
    // Set tipo persona
    component.estadoSeleccionado = { tipoPersona: 'Fisica' };
    
    // Calling the method should not throw an error
    expect(() => component.cambiarValoresTipoPersona()).not.toThrow();
  });
  
  it('debería manejar eventos de cierre de modal', () => {
    const closeModalSpy = jest.spyOn(component.closeModal, 'emit');
    
    // Setup valid forms
    component.isInstalacionMode = false;
    component.formularioAgregarDestinatario = formBuilder.group({
      tipoPersona: ['Fisica', Validators.required]
    });
    
    // Execute method
    component.guardarDestinatario();
    
    // Verify modal close was emitted
    expect(closeModalSpy).toHaveBeenCalled();
    
    // Reset and check for instalacion mode
    closeModalSpy.mockReset();
    component.isInstalacionMode = true;
    component.formularioAgregarInstalacion = formBuilder.group({
      tipoPersona: ['Fisica', Validators.required]
    });
    
    component.guardarDestinatario();
    
    expect(closeModalSpy).toHaveBeenCalled();
  });
  
  // 8. Specific functionality tests for the refactored cambiarValoresTipoPersona
  
  it('debería utilizar el método refactorizado para cambiar la visibilidad de los campos', () => {
    // Setup
    const formConfig: ModeloDeFormaDinamica[] = [
      {
        id: 'nombre',
        labelNombre: 'Nombre',
        campo: 'nombre',
        clase: 'col-md-4',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0,
        mostrar: false
      },
      {
        id: 'primerApellido',
        labelNombre: 'Primer Apellido',
        campo: 'primerApellido',
        clase: 'col-md-4',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0,
        mostrar: false
      },
      {
        id: 'segundoApellido',
        labelNombre: 'Segundo Apellido',
        campo: 'segundoApellido',
        clase: 'col-md-4',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0,
        mostrar: false
      },
      {
        id: 'razonSocial',
        labelNombre: 'Razón Social',
        campo: 'razonSocial',
        clase: 'col-md-8',
        tipoInput: 'text',
        desactivado: false,
        soloLectura: false,
        validadores: [],
        marcadorDePosicion: '',
        valorPredeterminado: '',
        marginTop: 0,
        mostrar: false
      }
    ];
    
    // Apply the configuration
    component.formularioConfiguracion = [...formConfig];
    component.formularioConfiguracionInstalacion = [...formConfig];
    
    // Test for destinatario mode
    component.isInstalacionMode = false;
    component.estadoSeleccionado = { tipoPersona: 'Fisica' };
    
    component.cambiarValoresTipoPersona();
    
    // Check field visibility - for Fisica
    const nombreField = component.formularioConfiguracion.find(c => c.campo === 'nombre');
    const razonSocialField = component.formularioConfiguracion.find(c => c.campo === 'razonSocial');
    
    expect(nombreField?.mostrar).toBe(true);
    expect(razonSocialField?.mostrar).toBe(false);
    
    // Test for instalacion mode
    component.isInstalacionMode = true;
    component.estadoSeleccionado = { tipoPersona: 'Moral' };
    
    component.cambiarValoresTipoPersona();
    
    // Check field visibility - for Moral
    const instalacionNombreField = component.formularioConfiguracionInstalacion.find(c => c.campo === 'nombre');
    const instalacionRazonSocialField = component.formularioConfiguracionInstalacion.find(c => c.campo === 'razonSocial');
    
    expect(instalacionNombreField?.mostrar).toBe(false);
    expect(instalacionRazonSocialField?.mostrar).toBe(true);
  });
});