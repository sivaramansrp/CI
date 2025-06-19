import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Subject, Subscription } from 'rxjs';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import { Tramite120601Query } from '../../estados/tramite-120601.query';
import { Tramite120601Store } from '../../estados/tramite-120601.store';
import { 
  Catalogo, 
  ConsultaioQuery,
  ConsultaioState 
} from '@ng-mf/data-access-user';

describe('DatosDeLaSolicitudComponent', () => {
  let component: DatosDeLaSolicitudComponent;
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let mockDatosEmpresaService: jest.Mocked<DatosEmpresaService>;
  let mockTramite120601Query: jest.Mocked<Tramite120601Query>;
  let mockTramite120601Store: jest.Mocked<Tramite120601Store>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;
  let formBuilder: FormBuilder;

  // Datos mock
  const mockTipoDeEmpresa: Catalogo[] = [
    { id: 1, descripcion: 'Persona Física'},
    { id: 2, descripcion: 'Persona Moral' },
  ];

  const mockConsultaioState: ConsultaioState = {
    readonly: false,
    // Agregar otras propiedades según sea necesario
  } as ConsultaioState;

  const mockTipoEmpresaSeleccionado: Catalogo = {
    id: 1,
    descripcion: 'Tipo Empresa Seleccionado',
  };

  const mockActividadEconomicaClave = 'ACT123456';

  beforeEach(async () => {
    // Mock para DatosEmpresaService
    mockDatosEmpresaService = {
      obtenerEstado: jest.fn(() => of(mockTipoDeEmpresa))
    } as unknown as jest.Mocked<DatosEmpresaService>;

    // Mock para Tramite120601Query
    mockTramite120601Query = {
      selectTipoDeEmpresa$: of(mockTipoEmpresaSeleccionado),
      selectActividadEconomicaClave$: of(mockActividadEconomicaClave)
    } as unknown as jest.Mocked<Tramite120601Query>;

    // Mock para Tramite120601Store
    mockTramite120601Store = {
      setTipoDeEmpresa: jest.fn()
    } as unknown as jest.Mocked<Tramite120601Store>;

    // Mock para ConsultaioQuery
    mockConsultaioQuery = {
      selectConsultaioState$: of(mockConsultaioState)
    } as unknown as jest.Mocked<ConsultaioQuery>;

    await TestBed.configureTestingModule({
      imports: [DatosDeLaSolicitudComponent, ReactiveFormsModule],
      providers: [
        FormBuilder,
        { provide: DatosEmpresaService, useValue: mockDatosEmpresaService },
        { provide: Tramite120601Query, useValue: mockTramite120601Query },
        { provide: Tramite120601Store, useValue: mockTramite120601Store },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
  });

  // Pruebas de inicialización y constructor
  describe('Inicialización del componente', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar las propiedades con valores por defecto', () => {
      expect(component.esFormularioSoloLectura).toBe(false);
      expect(component['destroyed$']).toBeInstanceOf(Subject);
    });

    it('debería inyectar correctamente los servicios en el constructor', () => {
      expect(component['fb']).toBeDefined();
      expect(component['store']).toBeDefined();
      expect(component['query']).toBeDefined();
      expect(component['service']).toBeDefined();
      expect(component['consultaioQuery']).toBeDefined();
    });

    it('debería suscribirse al estado de consultaio en el constructor', () => {
      const spy = jest.spyOn(mockConsultaioQuery.selectConsultaioState$, 'pipe');
      
      // Crear nuevo componente para activar constructor
      const newFixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
      const newComponent = newFixture.componentInstance;
      
      expect(spy).toHaveBeenCalled();
      expect(newComponent.esFormularioSoloLectura).toBe(mockConsultaioState.readonly);
    });

    it('debería establecer esFormularioSoloLectura cuando readonly es true', () => {
      const readonlyState = { ...mockConsultaioState, readonly: true };
      mockConsultaioQuery.selectConsultaioState$ = of(readonlyState);
      
      const newFixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
      const newComponent = newFixture.componentInstance;
      
      expect(newComponent.esFormularioSoloLectura).toBe(true);
    });
  });

  // Pruebas para ngOnInit
  describe('ngOnInit', () => {
    beforeEach(() => {
      jest.spyOn(component, 'crearFormulario');
      jest.spyOn(component, 'getTipoDeEmpresa');
    });

    it('debería llamar a crearFormulario', () => {
      component.ngOnInit();
      
      expect(component.crearFormulario).toHaveBeenCalled();
    });

    it('debería llamar a getTipoDeEmpresa', () => {
      component.ngOnInit();
      
      expect(component.getTipoDeEmpresa).toHaveBeenCalled();
    });

    it('debería suscribirse a selectTipoDeEmpresa$ y actualizar el formulario', () => {
      component.ngOnInit();
      
      expect(component.solicitudForm.get('tipoDeEmpresa')?.value).toEqual(mockTipoEmpresaSeleccionado);
    });

    it('debería suscribirse a selectActividadEconomicaClave$ y actualizar el formulario', () => {
      component.ngOnInit();
      
      expect(component.solicitudForm.get('actividadEconomicaClave')?.value).toBe(mockActividadEconomicaClave);
    });

    it('debería deshabilitar campos cuando esFormularioSoloLectura es true', () => {
      component.esFormularioSoloLectura = true;
      
      component.ngOnInit();
      
      expect(component.solicitudForm.get('tipoDeEmpresa')?.disabled).toBe(true);
      expect(component.solicitudForm.get('actividadEconomicaClave')?.disabled).toBe(true);
    });

    it('debería habilitar campos cuando esFormularioSoloLectura es false', () => {
      component.esFormularioSoloLectura = false;
      
      component.ngOnInit();
      
      expect(component.solicitudForm.get('tipoDeEmpresa')?.disabled).toBe(false);
      expect(component.solicitudForm.get('actividadEconomicaClave')?.disabled).toBe(false);
    });
  });

  // Pruebas para crearFormulario
  describe('crearFormulario', () => {
    it('debería crear el formulario con los controles correctos', () => {
      component.crearFormulario();
      
      expect(component.solicitudForm).toBeDefined();
      expect(component.solicitudForm.get('tipoDeEmpresa')).toBeDefined();
      expect(component.solicitudForm.get('denominacionExposicion')).toBeDefined();
      expect(component.solicitudForm.get('actividadEconomicaClave')).toBeDefined();
      expect(component.solicitudForm.get('actividadEconomicaDescripcion')).toBeDefined();
    });

    it('debería establecer validación requerida para tipoDeEmpresa', () => {
      component.crearFormulario();
      
      const tipoEmpresaControl = component.solicitudForm.get('tipoDeEmpresa');
      expect(tipoEmpresaControl?.hasError('required')).toBe(true);
      
      tipoEmpresaControl?.setValue('valor');
      expect(tipoEmpresaControl?.hasError('required')).toBe(false);
    });

    it('debería establecer validación requerida para actividadEconomicaClave', () => {
      component.crearFormulario();
      
      const actividadControl = component.solicitudForm.get('actividadEconomicaClave');
      expect(actividadControl?.hasError('required')).toBe(true);
      
      actividadControl?.setValue('ACT123');
      expect(actividadControl?.hasError('required')).toBe(false);
    });

    it('debería establecer maxLength para denominacionExposicion', () => {
      component.crearFormulario();
      
      const denominacionControl = component.solicitudForm.get('denominacionExposicion');
      const longText = 'a'.repeat(121); // 121 caracteres
      denominacionControl?.setValue(longText);
      
      expect(denominacionControl?.hasError('maxlength')).toBe(true);
      
      denominacionControl?.setValue('Texto corto');
      expect(denominacionControl?.hasError('maxlength')).toBe(false);
    });

    it('debería deshabilitar denominacionExposicion por defecto', () => {
      component.crearFormulario();
      
      const denominacionControl = component.solicitudForm.get('denominacionExposicion');
      expect(denominacionControl?.disabled).toBe(true);
    });

    it('debería deshabilitar actividadEconomicaDescripcion por defecto', () => {
      component.crearFormulario();
      
      const descripcionControl = component.solicitudForm.get('actividadEconomicaDescripcion');
      expect(descripcionControl?.disabled).toBe(true);
    });

    it('debería establecer valores por defecto vacíos', () => {
      component.crearFormulario();
      
      expect(component.solicitudForm.get('tipoDeEmpresa')?.value).toBe('');
      expect(component.solicitudForm.get('denominacionExposicion')?.value).toBe('');
      expect(component.solicitudForm.get('actividadEconomicaClave')?.value).toBe('');
      expect(component.solicitudForm.get('actividadEconomicaDescripcion')?.value).toBe('');
    });
  });

  // Pruebas para getTipoDeEmpresa
  describe('getTipoDeEmpresa', () => {
    it('debería llamar al servicio y establecer los tipos de empresa', () => {
      component.getTipoDeEmpresa();
      
      expect(mockDatosEmpresaService.obtenerEstado).toHaveBeenCalled();
      expect(component.tipoDeEmpresa).toEqual(mockTipoDeEmpresa);
    });

    it('debería manejar respuesta vacía del servicio', () => {
      mockDatosEmpresaService.obtenerEstado.mockReturnValue(of([]));
      
      component.getTipoDeEmpresa();
      
      expect(component.tipoDeEmpresa).toEqual([]);
    });

    it('debería manejar respuesta null del servicio', () => {
      mockDatosEmpresaService.obtenerEstado.mockReturnValue(of(null as any));
      
      component.getTipoDeEmpresa();
      
      expect(component.tipoDeEmpresa).toBeNull();
    });
  });

  // Pruebas para docSeleccionado
  describe('docSeleccionado', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería llamar al store con el valor del tipo de empresa seleccionado', () => {
      const mockEvent = new Event('change');
      const tipoEmpresaValue = mockTipoDeEmpresa[0];
      component.solicitudForm.get('tipoDeEmpresa')?.setValue(tipoEmpresaValue);
      
      component.docSeleccionado(mockEvent);
      
      expect(mockTramite120601Store.setTipoDeEmpresa).toHaveBeenCalledWith(tipoEmpresaValue);
    });

    it('debería manejar valor null del formulario', () => {
      const mockEvent = new Event('change');
      component.solicitudForm.get('tipoDeEmpresa')?.setValue(null);
      
      component.docSeleccionado(mockEvent);
      
      expect(mockTramite120601Store.setTipoDeEmpresa).toHaveBeenCalledWith(null);
    });

    it('debería manejar valor undefined del formulario', () => {
      const mockEvent = new Event('change');
      component.solicitudForm.get('tipoDeEmpresa')?.setValue(undefined);
      
      component.docSeleccionado(mockEvent);
      
      expect(mockTramite120601Store.setTipoDeEmpresa).toHaveBeenCalledWith(undefined);
    });

    it('debería aceptar cualquier tipo de evento', () => {
      const mockEvent = new MouseEvent('click');
      const tipoEmpresaValue = mockTipoDeEmpresa[1];
      component.solicitudForm.get('tipoDeEmpresa')?.setValue(tipoEmpresaValue);
      
      expect(() => component.docSeleccionado(mockEvent)).not.toThrow();
      expect(mockTramite120601Store.setTipoDeEmpresa).toHaveBeenCalledWith(tipoEmpresaValue);
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
      const crearFormularioSpy = jest.spyOn(component, 'crearFormulario');
      const getTipoEmpresaSpy = jest.spyOn(component, 'getTipoDeEmpresa');
      
      component.ngOnInit();
      
      expect(crearFormularioSpy).toHaveBeenCalled();
      expect(getTipoEmpresaSpy).toHaveBeenCalled();
      
      expect(component.solicitudForm).toBeDefined();
      expect(component.tipoDeEmpresa).toEqual(mockTipoDeEmpresa);
    });

    it('debería actualizar formulario con datos de los observables', () => {
      component.ngOnInit();
      
      expect(component.solicitudForm.get('tipoDeEmpresa')?.value).toEqual(mockTipoEmpresaSeleccionado);
      expect(component.solicitudForm.get('actividadEconomicaClave')?.value).toBe(mockActividadEconomicaClave);
    });

    it('debería manejar el flujo cuando esFormularioSoloLectura es true', () => {
      component.esFormularioSoloLectura = true;
      
      component.ngOnInit();
      
      expect(component.solicitudForm.get('tipoDeEmpresa')?.disabled).toBe(true);
      expect(component.solicitudForm.get('actividadEconomicaClave')?.disabled).toBe(true);
    });

    it('debería manejar el flujo cuando esFormularioSoloLectura es false', () => {
      component.esFormularioSoloLectura = false;
      
      component.ngOnInit();
      
      expect(component.solicitudForm.get('tipoDeEmpresa')?.disabled).toBe(false);
      expect(component.solicitudForm.get('actividadEconomicaClave')?.disabled).toBe(false);
    });
  });

  // Pruebas para casos edge y manejo de errores
  describe('Casos límite y manejo de errores', () => {
    it('debería manejar servicios que devuelven observables que no emiten', () => {
      mockDatosEmpresaService.obtenerEstado.mockReturnValue(new Subject<Catalogo[]>().asObservable());
      
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('debería manejar queries que devuelven observables que no emiten', () => {
      mockTramite120601Query.selectTipoDeEmpresa$ = new Subject<string>().asObservable();
      mockTramite120601Query.selectActividadEconomicaClave$ = new Subject<string>().asObservable();
      
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('debería manejar formulario no inicializado en docSeleccionado', () => {
      component.solicitudForm = undefined as any;
      const mockEvent = new Event('change');
      
      expect(() => component.docSeleccionado(mockEvent)).not.toThrow();
    });

    it('debería manejar estado undefined en consultaState', () => {
      mockConsultaioQuery.selectConsultaioState$ = of(undefined as any);
      
      expect(() => {
        const newFixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
      }).not.toThrow();
    });

    it('debería manejar error en suscripción del constructor', () => {
      const errorSubject = new Subject();
      
      expect(() => {
        const newFixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
        errorSubject.error(new Error('Test error'));
      }).not.toThrow();
    });

    it('debería manejar formulario undefined en ngOnInit', () => {
      component.solicitudForm = undefined as any;
      
      expect(() => component.ngOnInit()).not.toThrow();
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
      const form = compiled.querySelector('form');
      const catalogoSelects = compiled.querySelectorAll('app-catalogo-select');
      
      expect(form).toBeTruthy();
      expect(catalogoSelects.length).toBeGreaterThan(0);
    });

    it('debería pasar las propiedades correctas al selector de tipo de empresa', () => {
      component.tipoDeEmpresa = mockTipoDeEmpresa;
      fixture.detectChanges();
      
      const tipoEmpresaSelect = fixture.nativeElement.querySelector('app-catalogo-select[formControlName="tipoDeEmpresa"]');
      expect(tipoEmpresaSelect).toBeTruthy();
    });

    it('debería tener el formGroup configurado correctamente', () => {
      expect(fixture.nativeElement.querySelector('form[formGroup]')).toBeTruthy();
    });
  });

  // Pruebas de validación del formulario
  describe('Validación del formulario', () => {
    beforeEach(() => {
      component.ngOnInit();
    });

    it('debería marcar el formulario como inválido cuando tipoDeEmpresa está vacío', () => {
      component.solicitudForm.get('tipoDeEmpresa')?.setValue('');
      component.solicitudForm.get('actividadEconomicaClave')?.setValue('ACT123');
      
      expect(component.solicitudForm.valid).toBeFalsy();
      expect(component.solicitudForm.get('tipoDeEmpresa')?.hasError('required')).toBe(true);
    });

    it('debería marcar el formulario como inválido cuando actividadEconomicaClave está vacío', () => {
      component.solicitudForm.get('tipoDeEmpresa')?.setValue(mockTipoDeEmpresa[0]);
      component.solicitudForm.get('actividadEconomicaClave')?.setValue('');
      
      expect(component.solicitudForm.valid).toBeFalsy();
      expect(component.solicitudForm.get('actividadEconomicaClave')?.hasError('required')).toBe(true);
    });

    it('debería marcar el formulario como válido cuando campos requeridos están completos', () => {
      component.solicitudForm.get('tipoDeEmpresa')?.setValue(mockTipoDeEmpresa[0]);
      component.solicitudForm.get('actividadEconomicaClave')?.setValue('ACT123456');
      
      expect(component.solicitudForm.valid).toBeTruthy();
    });

    it('debería validar maxLength en denominacionExposicion', () => {
      component.solicitudForm.get('tipoDeEmpresa')?.setValue(mockTipoDeEmpresa[0]);
      component.solicitudForm.get('actividadEconomicaClave')?.setValue('ACT123');
      
      const longText = 'a'.repeat(121);
      component.solicitudForm.get('denominacionExposicion')?.setValue(longText);
      
      expect(component.solicitudForm.get('denominacionExposicion')?.hasError('maxlength')).toBe(true);
    });

    it('debería permitir denominacionExposicion hasta 120 caracteres', () => {
      const maxText = 'a'.repeat(120);
      component.solicitudForm.get('denominacionExposicion')?.setValue(maxText);
      
      expect(component.solicitudForm.get('denominacionExposicion')?.hasError('maxlength')).toBe(false);
    });

    it('no debería validar campos deshabilitados', () => {
      const denominacionControl = component.solicitudForm.get('denominacionExposicion');
      const descripcionControl = component.solicitudForm.get('actividadEconomicaDescripcion');
      
      expect(denominacionControl?.disabled).toBe(true);
      expect(descripcionControl?.disabled).toBe(true);
      
      // Los campos deshabilitados no afectan la validación del formulario
      component.solicitudForm.get('tipoDeEmpresa')?.setValue(mockTipoDeEmpresa[0]);
      component.solicitudForm.get('actividadEconomicaClave')?.setValue('ACT123');
      
      expect(component.solicitudForm.valid).toBeTruthy();
    });
  });

  // Pruebas para los observables y suscripciones
  describe('Suscripciones y observables', () => {
    it('debería usar takeUntil para evitar fugas de memoria en constructor', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockConsultaioState));
      mockConsultaioQuery.selectConsultaioState$ = {
        pipe: mockPipe
      } as any;
      
      const newFixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
      
      expect(mockPipe).toHaveBeenCalledWith(expect.anything(), expect.anything());
    });

    it('debería usar takeUntil para evitar fugas de memoria en ngOnInit para selectTipoDeEmpresa$', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockTipoEmpresaSeleccionado));
      mockTramite120601Query.selectTipoDeEmpresa$ = {
        pipe: mockPipe
      } as any;
      
      component.ngOnInit();
      
      expect(mockPipe).toHaveBeenCalledWith(expect.anything());
    });

    it('debería usar takeUntil para evitar fugas de memoria en ngOnInit para selectActividadEconomicaClave$', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockActividadEconomicaClave));
      mockTramite120601Query.selectActividadEconomicaClave$ = {
        pipe: mockPipe
      } as any;
      
      component.ngOnInit();
      
      expect(mockPipe).toHaveBeenCalledWith(expect.anything());
    });
    
    it('debería manejar múltiples emisiones de los observables', () => {
      const tipoEmpresaSubject = new Subject<Catalogo>();
      const actividadSubject = new Subject<string>();
      
      mockTramite120601Query.selectTipoDeEmpresa$ = tipoEmpresaSubject.asObservable() as any;
      mockTramite120601Query.selectActividadEconomicaClave$ = actividadSubject.asObservable();
      
      component.ngOnInit();
      
      // Primera emisión
      tipoEmpresaSubject.next(mockTipoDeEmpresa[0]);
      actividadSubject.next('ACT001');
      
      expect(component.solicitudForm.get('tipoDeEmpresa')?.value).toEqual(mockTipoDeEmpresa[0]);
      expect(component.solicitudForm.get('actividadEconomicaClave')?.value).toBe('ACT001');
      
      // Segunda emisión
      tipoEmpresaSubject.next(mockTipoDeEmpresa[1]);
      actividadSubject.next('ACT002');
      
      expect(component.solicitudForm.get('tipoDeEmpresa')?.value).toEqual(mockTipoDeEmpresa[1]);
      expect(component.solicitudForm.get('actividadEconomicaClave')?.value).toBe('ACT002');
    });
  });

  // Pruebas específicas para habilitación/deshabilitación de campos
  describe('Control de estado de campos', () => {
    beforeEach(() => {
      component.crearFormulario();
    });

    it('debería deshabilitar tipoDeEmpresa cuando esFormularioSoloLectura es true en ngOnInit', () => {
      component.esFormularioSoloLectura = true;
      component.ngOnInit();
      
      expect(component.solicitudForm.get('tipoDeEmpresa')?.disabled).toBe(true);
    });

    it('debería deshabilitar actividadEconomicaClave cuando esFormularioSoloLectura es true en ngOnInit', () => {
      component.esFormularioSoloLectura = true;
      component.ngOnInit();
      
      expect(component.solicitudForm.get('actividadEconomicaClave')?.disabled).toBe(true);
    });

    it('debería habilitar tipoDeEmpresa cuando esFormularioSoloLectura es false en ngOnInit', () => {
      component.esFormularioSoloLectura = false;
      component.ngOnInit();
      
      expect(component.solicitudForm.get('tipoDeEmpresa')?.disabled).toBe(false);
    });

    it('debería habilitar actividadEconomicaClave cuando esFormularioSoloLectura es false en ngOnInit', () => {
      component.esFormularioSoloLectura = false;
      component.ngOnInit();
      
      expect(component.solicitudForm.get('actividadEconomicaClave')?.disabled).toBe(false);
    });

    it('denominacionExposicion debería estar siempre deshabilitado', () => {
      component.esFormularioSoloLectura = false;
      component.ngOnInit();
      
      expect(component.solicitudForm.get('denominacionExposicion')?.disabled).toBe(true);
      
      component.esFormularioSoloLectura = true;
      component.ngOnInit();
      
      expect(component.solicitudForm.get('denominacionExposicion')?.disabled).toBe(true);
    });

    it('actividadEconomicaDescripcion debería estar siempre deshabilitado', () => {
      component.esFormularioSoloLectura = false;
      component.ngOnInit();
      
      expect(component.solicitudForm.get('actividadEconomicaDescripcion')?.disabled).toBe(true);
      
      component.esFormularioSoloLectura = true;
      component.ngOnInit();
      
      expect(component.solicitudForm.get('actividadEconomicaDescripcion')?.disabled).toBe(true);
    });
  });
});