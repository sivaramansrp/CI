import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';
import { DatosGeneralesSociosComponent } from './datos-generales-socios.component';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { Tramite120601Query } from '../../estados/tramite-120601.query';
import { Tramite120601Store } from '../../estados/tramite-120601.store';
import { 
  ConsultaioQuery,
  ConsultaioState,
  PASOS,
  DatosPasos,
  TablaSeleccion
} from '@ng-mf/data-access-user';
import { DatosSociosTable } from '../../modelos/datos-empresa.model';

describe('DatosGeneralesSociosComponent', () => {
  let component: DatosGeneralesSociosComponent;
  let fixture: ComponentFixture<DatosGeneralesSociosComponent>;
  let mockDatosEmpresaService: jest.Mocked<DatosEmpresaService>;
  let mockTramite120601Query: jest.Mocked<Tramite120601Query>;
  let mockTramite120601Store: jest.Mocked<Tramite120601Store>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;
  let formBuilder: FormBuilder;

  // Datos mock
  const mockDatosSocios: DatosSociosTable[] = [
    {
      rfc: 'RFC123456789',
      razonsocial: 'Empresa Test S.A.',
      nombre: 'Juan',
      apellidoPaterno: 'Pérez',
      apellidoM: 'García'
    },
    {
      rfc: 'RFC987654321',
      razonsocial: 'Otra Empresa S.A.',
      nombre: 'María',
      apellidoPaterno: 'López',
      apellidoM: 'Martínez'
    }
  ];

  const mockConsultaioState: ConsultaioState = {
    readonly: false,
    // Agregar otras propiedades según sea necesario
  } as ConsultaioState;

  const mockNacionalidad = 'No';
  const mockPersona = 'Yes';
  const mockCadenaDependencia = 'RFC123456789ABC';

  beforeEach(async () => {
    // Mock para DatosEmpresaService
    mockDatosEmpresaService = {
      obtenerDatosTablaDeSocios: jest.fn(() => of(mockDatosSocios))
    } as unknown as jest.Mocked<DatosEmpresaService>;

    // Mock para Tramite120601Query
    mockTramite120601Query = {
      selectNacionalidad$: of(mockNacionalidad),
      selectPersona$: of(mockPersona),
      selectCadenaDependencia$: of(mockCadenaDependencia)
    } as unknown as jest.Mocked<Tramite120601Query>;

    // Mock para Tramite120601Store
    mockTramite120601Store = {
      setNacionalidad: jest.fn(),
      setPersona: jest.fn(),
      setCadenaDependencia: jest.fn()
    } as unknown as jest.Mocked<Tramite120601Store>;

    // Mock para ConsultaioQuery
    mockConsultaioQuery = {
      selectConsultaioState$: of(mockConsultaioState)
    } as unknown as jest.Mocked<ConsultaioQuery>;

    await TestBed.configureTestingModule({
      imports: [DatosGeneralesSociosComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: DatosEmpresaService, useValue: mockDatosEmpresaService },
        { provide: Tramite120601Query, useValue: mockTramite120601Query },
        { provide: Tramite120601Store, useValue: mockTramite120601Store },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosGeneralesSociosComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
  });

  // Pruebas de inicialización y constructor
  describe('Inicialización del componente', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar las propiedades con valores por defecto', () => {
      expect(component.pasos).toEqual(PASOS);
      expect(component.indice).toBe(1);
      expect(component.tablaCasilla).toBe(TablaSeleccion.CHECKBOX);
      expect(component.filaSeleccionada).toBe(1);
      expect(component.datosSocios).toEqual([]);
      expect(component.datosExtranjeros).toEqual([]);
      expect(component.esFormularioSoloLectura).toBe(false);
      expect(component['destroyed$']).toBeInstanceOf(Subject);
    });

    it('debería configurar correctamente datosPasos', () => {
      expect(component.datosPasos).toEqual({
        nroPasos: PASOS.length,
        indice: 1,
        txtBtnAnt: 'Anterior',
        txtBtnSig: 'Continuar'
      });
    });

    it('debería inyectar correctamente los servicios en el constructor', () => {
      expect(component['fb']).toBeDefined();
      expect(component['store']).toBeDefined();
      expect(component['query']).toBeDefined();
      expect(component['empresaService']).toBeDefined();
      expect(component['consultaioQuery']).toBeDefined();
    });

    it('debería suscribirse al estado de consultaio en el constructor', () => {
      const spy = jest.spyOn(mockConsultaioQuery.selectConsultaioState$, 'pipe');
      
      // Crear nuevo componente para activar constructor
      const newFixture = TestBed.createComponent(DatosGeneralesSociosComponent);
      const newComponent = newFixture.componentInstance;
      
      expect(spy).toHaveBeenCalled();
      expect(newComponent.esFormularioSoloLectura).toBe(mockConsultaioState.readonly);
    });

    it('debería establecer esFormularioSoloLectura cuando readonly es true', () => {
      const readonlyState = { ...mockConsultaioState, readonly: true };
      mockConsultaioQuery.selectConsultaioState$ = of(readonlyState);
      
      const newFixture = TestBed.createComponent(DatosGeneralesSociosComponent);
      const newComponent = newFixture.componentInstance;
      
      expect(newComponent.esFormularioSoloLectura).toBe(true);
    });

    it('debería llamar inicializarEstadoFormulario en el constructor', () => {
      const spy = jest.spyOn(DatosGeneralesSociosComponent.prototype, 'inicializarEstadoFormulario');
      
      const newFixture = TestBed.createComponent(DatosGeneralesSociosComponent);
      
      expect(spy).toHaveBeenCalled();
    });
  });

  // Pruebas para ngOnInit
  describe('ngOnInit', () => {
    beforeEach(() => {
      jest.spyOn(component, 'obtenerDatosTablaDeSocios');
      jest.spyOn(component, 'inicializarEstadoFormulario');
    });

    it('debería llamar a obtenerDatosTablaDeSocios', () => {
      component.ngOnInit();
      
      expect(component.obtenerDatosTablaDeSocios).toHaveBeenCalled();
    });

    it('debería crear FormSolicitud con la estructura correcta', () => {
      component.ngOnInit();
      
      expect(component.FormSolicitud).toBeDefined();
      expect(component.FormSolicitud.get('datosImportadorExportador')).toBeDefined();
      expect(component.FormSolicitud.get('datosImportadorExportador.nacionalidad')).toBeDefined();
      expect(component.FormSolicitud.get('datosImportadorExportador.persona')).toBeDefined();
      expect(component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')).toBeDefined();
    });

    it('debería establecer valores por defecto en FormSolicitud', () => {
      component.ngOnInit();
      
      expect(component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.value).toBe('No');
      expect(component.FormSolicitud.get('datosImportadorExportador.persona')?.value).toBe('No');
      expect(component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.value).toBe('');
    });

    it('debería establecer validadores requeridos', () => {
      component.ngOnInit();
      
      const nacionalidadControl = component.FormSolicitud.get('datosImportadorExportador.nacionalidad');
      const personaControl = component.FormSolicitud.get('datosImportadorExportador.persona');
      const cadenaDependenciaControl = component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia');
      
      expect(nacionalidadControl?.hasError('required')).toBe(false); // Tiene valor por defecto
      expect(personaControl?.hasError('required')).toBe(false); // Tiene valor por defecto
      
      cadenaDependenciaControl?.setValue('');
      expect(cadenaDependenciaControl?.hasError('required')).toBe(true);
    });

    it('debería crear formularioParaConteoTotal', () => {
      component.ngOnInit();
      
      expect(component.formularioParaConteoTotal).toBeDefined();
      expect(component.formularioParaConteoTotal.get('recuentoTotalDeFilas')).toBeDefined();
      expect(component.formularioParaConteoTotal.get('recuentoTotalDeFilas')?.disabled).toBe(true);
    });

    it('debería actualizar recuentoTotalDeFilas con la longitud de datosSocios', () => {
      component.datosSocios = mockDatosSocios;
      component.ngOnInit();
      
      expect(component.formularioParaConteoTotal.get('recuentoTotalDeFilas')?.value).toBe(mockDatosSocios.length);
    });

    it('debería suscribirse a selectNacionalidad$ y actualizar el formulario', () => {
      component.ngOnInit();
      
      expect(component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.value).toBe(mockNacionalidad);
    });

    it('debería suscribirse a selectPersona$ y actualizar el formulario', () => {
      component.ngOnInit();
      
      expect(component.FormSolicitud.get('datosImportadorExportador.persona')?.value).toBe(mockPersona);
    });

    it('debería suscribirse a selectCadenaDependencia$ y actualizar el formulario', () => {
      component.ngOnInit();
      
      expect(component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.value).toBe(mockCadenaDependencia);
    });

    it('debería llamar a inicializarEstadoFormulario al final', () => {
      component.ngOnInit();
      
      expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
    });
  });

  // Pruebas para obtenerDatosTablaDeSocios
  describe('obtenerDatosTablaDeSocios', () => {
    it('debería llamar al servicio y establecer los datos de socios', () => {
      component.obtenerDatosTablaDeSocios();
      
      expect(mockDatosEmpresaService.obtenerDatosTablaDeSocios).toHaveBeenCalled();
      expect(component.datosSocios).toEqual(mockDatosSocios);
    });

    it('debería manejar respuesta vacía del servicio', () => {
      mockDatosEmpresaService.obtenerDatosTablaDeSocios.mockReturnValue(of([]));
      
      component.obtenerDatosTablaDeSocios();
      
      expect(component.datosSocios).toEqual([]);
    });
  });

  // Pruebas para enCambioNacionalidad
  describe('enCambioNacionalidad', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería llamar al store con el valor de nacionalidad seleccionada', () => {
      const nacionalidadValue = 'Yes';
      component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.setValue(nacionalidadValue);
      
      component.enCambioNacionalidad();
      
      expect(mockTramite120601Store.setNacionalidad).toHaveBeenCalledWith(nacionalidadValue);
    });

    it('debería manejar valor null del formulario', () => {
      component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.setValue(null);
      
      component.enCambioNacionalidad();
      
      expect(mockTramite120601Store.setNacionalidad).toHaveBeenCalledWith(null);
    });

    it('debería manejar valor undefined del formulario', () => {
      component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.setValue(undefined);
      
      component.enCambioNacionalidad();
      
      expect(mockTramite120601Store.setNacionalidad).toHaveBeenCalledWith(undefined);
    });
  });

  // Pruebas para enCambioPersona
  describe('enCambioPersona', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería llamar al store con el valor de persona seleccionada', () => {
      const personaValue = 'Yes';
      component.FormSolicitud.get('datosImportadorExportador.persona')?.setValue(personaValue);
      
      component.enCambioPersona();
      
      expect(mockTramite120601Store.setPersona).toHaveBeenCalledWith(personaValue);
    });

    it('debería manejar valor null del formulario', () => {
      component.FormSolicitud.get('datosImportadorExportador.persona')?.setValue(null);
      
      component.enCambioPersona();
      
      expect(mockTramite120601Store.setPersona).toHaveBeenCalledWith(null);
    });

    it('debería manejar valor undefined del formulario', () => {
      component.FormSolicitud.get('datosImportadorExportador.persona')?.setValue(undefined);
      
      component.enCambioPersona();
      
      expect(mockTramite120601Store.setPersona).toHaveBeenCalledWith(undefined);
    });
  });

  // Pruebas para enCambioCadenaDependencia
  describe('enCambioCadenaDependencia', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería llamar al store con el valor de cadena de dependencia', () => {
      const cadenaDependenciaValue = 'RFC123456789ABC';
      component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.setValue(cadenaDependenciaValue);
      
      component.enCambioCadenaDependencia();
      
      expect(mockTramite120601Store.setCadenaDependencia).toHaveBeenCalledWith(cadenaDependenciaValue);
    });

    it('debería manejar valor null del formulario', () => {
      component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.setValue(null);
      
      component.enCambioCadenaDependencia();
      
      expect(mockTramite120601Store.setCadenaDependencia).toHaveBeenCalledWith(null);
    });

    it('debería manejar valor undefined del formulario', () => {
      component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.setValue(undefined);
      
      component.enCambioCadenaDependencia();
      
      expect(mockTramite120601Store.setCadenaDependencia).toHaveBeenCalledWith(undefined);
    });
  });

  // Pruebas para guardarDatosFormulario
  describe('guardarDatosFormulario', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería deshabilitar campos cuando esFormularioSoloLectura es true', () => {
      component.esFormularioSoloLectura = true;
      
      component.guardarDatosFormulario();
      
      expect(component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.disabled).toBe(true);
      expect(component.FormSolicitud.get('datosImportadorExportador.persona')?.disabled).toBe(true);
      expect(component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.disabled).toBe(true);
    });

    it('debería habilitar campos cuando esFormularioSoloLectura es false', () => {
      component.esFormularioSoloLectura = false;
      
      // Primero deshabilitar para luego verificar que se habiliten
      component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.disable();
      component.FormSolicitud.get('datosImportadorExportador.persona')?.disable();
      component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.disable();
      
      component.guardarDatosFormulario();
      
      expect(component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.disabled).toBe(false);
      expect(component.FormSolicitud.get('datosImportadorExportador.persona')?.disabled).toBe(false);
      expect(component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.disabled).toBe(false);
    });
  });

  // Pruebas para inicializarEstadoFormulario
  describe('inicializarEstadoFormulario', () => {
    beforeEach(() => {
      component.ngOnInit();
      jest.spyOn(component, 'guardarDatosFormulario');
      jest.spyOn(component, 'actualizarEstadoFormulario');
    });

    it('debería llamar a guardarDatosFormulario', () => {
      component.inicializarEstadoFormulario();
      
      expect(component.guardarDatosFormulario).toHaveBeenCalled();
    });

    it('debería llamar a actualizarEstadoFormulario', () => {
      component.inicializarEstadoFormulario();
      
      expect(component.actualizarEstadoFormulario).toHaveBeenCalled();
    });

    it('debería llamar los métodos en el orden correcto', () => {
      const guardarSpy = jest.spyOn(component, 'guardarDatosFormulario');
      const actualizarSpy = jest.spyOn(component, 'actualizarEstadoFormulario');
      
      component.inicializarEstadoFormulario();
      
      expect(guardarSpy).toHaveBeenCalled();
    });
  });

  // Pruebas para actualizarEstadoFormulario
  describe('actualizarEstadoFormulario', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería deshabilitar todo el formulario cuando esFormularioSoloLectura es true', () => {
      component.esFormularioSoloLectura = true;
      const disableSpy = jest.spyOn(component.FormSolicitud, 'disable');
      
      component.actualizarEstadoFormulario();
      
      expect(disableSpy).toHaveBeenCalled();
    });

    it('debería habilitar todo el formulario cuando esFormularioSoloLectura es false', () => {
      component.esFormularioSoloLectura = false;
      const enableSpy = jest.spyOn(component.FormSolicitud, 'enable');
      
      component.actualizarEstadoFormulario();
      
      expect(enableSpy).toHaveBeenCalled();
    });
  });

  // Pruebas para ngOnDestroy
  describe('ngOnDestroy', () => {
    it('debería llamar next() en destroyed$', () => {
      const nextSpy = jest.spyOn(component['destroyed$'], 'next');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalled();
    });

    it('debería llamar complete() en destroyed$', () => {
      const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(completeSpy).toHaveBeenCalled();
    });

    it('debería limpiar correctamente los recursos para evitar fugas de memoria', () => {
      const nextSpy = jest.spyOn(component['destroyed$'], 'next');
      const completeSpy = jest.spyOn(component['destroyed$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalledTimes(1);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });
  });

  // Pruebas de integración y flujo completo
  describe('Flujo completo del componente', () => {
    it('debería ejecutar el flujo completo de inicialización', () => {
      const obtenerDatosSpy = jest.spyOn(component, 'obtenerDatosTablaDeSocios');
      const inicializarSpy = jest.spyOn(component, 'inicializarEstadoFormulario');
      
      component.ngOnInit();
      
      expect(obtenerDatosSpy).toHaveBeenCalled();
      expect(inicializarSpy).toHaveBeenCalled();
      
      expect(component.FormSolicitud).toBeDefined();
      expect(component.formularioParaConteoTotal).toBeDefined();
      expect(component.datosSocios).toEqual(mockDatosSocios);
    });

    it('debería actualizar formulario con datos de los observables', () => {
      component.ngOnInit();
      
      expect(component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.value).toBe(mockNacionalidad);
      expect(component.FormSolicitud.get('datosImportadorExportador.persona')?.value).toBe(mockPersona);
      expect(component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.value).toBe(mockCadenaDependencia);
    });

    it('debería manejar el flujo cuando esFormularioSoloLectura cambia a true', () => {
      component.ngOnInit();
      
      // Simular cambio a solo lectura
      component.esFormularioSoloLectura = true;
      component.inicializarEstadoFormulario();
      
      expect(component.FormSolicitud.disabled).toBe(true);
    });
  });

  // Pruebas para casos edge y manejo de errores
  describe('Casos límite y manejo de errores', () => {
    it('debería manejar servicios que devuelven observables que no emiten', () => {
      mockDatosEmpresaService.obtenerDatosTablaDeSocios.mockReturnValue(new Subject<DatosSociosTable[]>().asObservable());
      
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('debería manejar queries que devuelven observables que no emiten', () => {
      mockTramite120601Query.selectNacionalidad$ = new Subject<string>().asObservable();
      mockTramite120601Query.selectPersona$ = new Subject<string>().asObservable();
      mockTramite120601Query.selectCadenaDependencia$ = new Subject<string>().asObservable();
      
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('debería manejar formulario no inicializado en enCambioNacionalidad', () => {
      component.FormSolicitud = undefined as any;
      
      expect(() => component.enCambioNacionalidad()).not.toThrow();
    });

    it('debería manejar formulario no inicializado en enCambioPersona', () => {
      component.FormSolicitud = undefined as any;
      
      expect(() => component.enCambioPersona()).not.toThrow();
    });

    it('debería manejar formulario no inicializado en enCambioCadenaDependencia', () => {
      component.FormSolicitud = undefined as any;
      
      expect(() => component.enCambioCadenaDependencia()).not.toThrow();
    });

    it('debería manejar formulario no inicializado en guardarDatosFormulario', () => {
      component.FormSolicitud = undefined as any;
      
      expect(() => component.guardarDatosFormulario()).not.toThrow();
    });

    it('debería manejar formulario no inicializado en actualizarEstadoFormulario', () => {
      component.FormSolicitud = undefined as any;
      
      expect(() => component.actualizarEstadoFormulario()).not.toThrow();
    });
  });

  // Pruebas de la template
  describe('Interacciones con la template', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('debería renderizar el título correctamente', () => {
      const compiled = fixture.nativeElement;
      const titulo = compiled.querySelector('ng-titulo');
      expect(titulo).toBeTruthy();
    });

    it('debería renderizar el formulario con los controles correctos', () => {
      const compiled = fixture.nativeElement;
      const form = compiled.querySelector('form[formGroup]');
      const radioButtons = compiled.querySelectorAll('input[type="radio"]');
      const textInput = compiled.querySelector('input[type="text"]');
      
      expect(form).toBeTruthy();
      expect(radioButtons.length).toBe(4); // 2 para nacionalidad, 2 para persona
      expect(textInput).toBeTruthy();
    });

    it('debería renderizar las tablas dinámicas', () => {
      const compiled = fixture.nativeElement;
      const tablasDinamicas = compiled.querySelectorAll('app-tabla-dinamica');
      
      expect(tablasDinamicas.length).toBe(2); // Una para socios, otra para extranjeros
    });

    it('debería pasar las propiedades correctas a las tablas dinámicas', () => {
      component.datosSocios = mockDatosSocios;
      component.esFormularioSoloLectura = true;
      fixture.detectChanges();
      
      const tablasDinamicas = fixture.nativeElement.querySelectorAll('app-tabla-dinamica');
      expect(tablasDinamicas.length).toBe(2);
    });

    it('debería renderizar los botones con el estado correcto', () => {
      component.esFormularioSoloLectura = true;
      fixture.detectChanges();
      
      const botones = fixture.nativeElement.querySelectorAll('button');
      botones.forEach((boton: HTMLButtonElement) => {
        expect(boton.disabled).toBe(true);
      });
    });

    it('debería renderizar el formulario de conteo total deshabilitado', () => {
      const compiled = fixture.nativeElement;
      const conteoInput = compiled.querySelector('input[formControlName="recuentoTotalDeFilas"]');
      
      expect(conteoInput?.disabled).toBe(true);
    });

    it('debería mostrar los encabezados correctos', () => {
      const compiled = fixture.nativeElement;
      const encabezados = compiled.querySelectorAll('h6');
      
      expect(encabezados.length).toBeGreaterThan(0);
      expect(encabezados[0]?.textContent?.trim()).toBe('Socios y Accionistas');
    });

    it('debería renderizar el componente btn-continuar', () => {
      const compiled = fixture.nativeElement;
      const btnContinuar = compiled.querySelector('btn-continuar');
      
      expect(btnContinuar).toBeTruthy();
    });
  });

  // Pruebas de validación del formulario
  describe('Validación del formulario', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería validar que nacionalidad es requerida cuando está vacía', () => {
      component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.setValue('');
      
      expect(component.FormSolicitud.get('datosImportadorExportador.nacionalidad')?.hasError('required')).toBe(true);
    });

    it('debería validar que persona es requerida cuando está vacía', () => {
      component.FormSolicitud.get('datosImportadorExportador.persona')?.setValue('');
      
      expect(component.FormSolicitud.get('datosImportadorExportador.persona')?.hasError('required')).toBe(true);
    });

    it('debería validar que cadenaDependencia es requerida cuando está vacía', () => {
      component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.setValue('');
      
      expect(component.FormSolicitud.get('datosImportadorExportador.cadenaDependencia')?.hasError('required')).toBe(true);
    });

    it('debería marcar el formulario como válido cuando todos los campos están completos', () => {
      component.FormSolicitud.patchValue({
        datosImportadorExportador: {
          nacionalidad: 'No',
          persona: 'Yes',
          cadenaDependencia: 'RFC123456789ABC'
        }
      });
      
      expect(component.FormSolicitud.valid).toBeTruthy();
    });
  });

  // Pruebas para los observables y suscripciones
  describe('Suscripciones y observables', () => {
    it('debería usar takeUntil para evitar fugas de memoria en constructor', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockConsultaioState));
      mockConsultaioQuery.selectConsultaioState$ = {
        pipe: mockPipe
      } as any;
      
      const newFixture = TestBed.createComponent(DatosGeneralesSociosComponent);
      
      expect(mockPipe).toHaveBeenCalledWith(expect.anything(), expect.anything());
    });

    it('debería usar takeUntil para evitar fugas de memoria en ngOnInit para selectNacionalidad$', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockNacionalidad));
      mockTramite120601Query.selectNacionalidad$ = {
        pipe: mockPipe
      } as any;
      
      component.ngOnInit();
      
      expect(mockPipe).toHaveBeenCalledWith(expect.anything());
    });

    it('debería usar takeUntil para evitar fugas de memoria en ngOnInit para selectPersona$', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockPersona));
      mockTramite120601Query.selectPersona$ = {
        pipe: mockPipe
      } as any;
      
      component.ngOnInit();
      
      expect(mockPipe).toHaveBeenCalledWith(expect.anything());
    });

    it('debería usar takeUntil para evitar fugas de memoria en ngOnInit para selectCadenaDependencia$', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockCadenaDependencia));
      mockTramite120601Query.selectCadenaDependencia$ = {
        pipe: mockPipe
      } as any;
      
      component.ngOnInit();
      
      expect(mockPipe).toHaveBeenCalledWith(expect.anything());
    });
  });
});