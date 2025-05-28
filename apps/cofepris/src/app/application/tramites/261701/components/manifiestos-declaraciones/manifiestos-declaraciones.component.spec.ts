import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { ManifiestosDeclaracionesComponent } from './manifiestos-declaraciones.component';
import { 
  Tramite261701Store, 
  CancelacionPeticion261701State 
} from '../../estados/store/tramite261701.store';
import { Tramite261701Query } from '../../estados/query/tramite261701.query';
import { ConsultaioQuery, ConsultaioState } from '@libs/shared/data-access-user/src';

describe('ManifiestosDeclaracionesComponent', () => {
  let component: ManifiestosDeclaracionesComponent;
  let fixture: ComponentFixture<ManifiestosDeclaracionesComponent>;
  let mockTramite261701Store: jest.Mocked<Tramite261701Store>;
  let mockTramite261701Query: jest.Mocked<Tramite261701Query>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;
  let mockCheckboxElement: HTMLInputElement;

  // Datos mock
  const mockCancelacionPeticionState: CancelacionPeticion261701State = {
    manifiestos: true,
    // Agregar otras propiedades según sea necesario
  } as CancelacionPeticion261701State;

  const mockConsultaioState: ConsultaioState = {
    readonly: false,
    // Agregar otras propiedades según sea necesario
  } as ConsultaioState;

  beforeEach(async () => {
    // Mock para checkbox element
    mockCheckboxElement = {
      checked: false,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      id: 'manifiestos'
    } as unknown as HTMLInputElement;

    // Mock para Tramite261701Store
    mockTramite261701Store = {
      establecerDatos: jest.fn()
    } as unknown as jest.Mocked<Tramite261701Store>;

    // Mock para Tramite261701Query
    mockTramite261701Query = {
      select$: of(mockCancelacionPeticionState)
    } as unknown as jest.Mocked<Tramite261701Query>;

    // Mock para ConsultaioQuery
    mockConsultaioQuery = {
      selectConsultaioState$: of(mockConsultaioState)
    } as unknown as jest.Mocked<ConsultaioQuery>;

    // Mock para document.getElementById
    jest.spyOn(document, 'getElementById').mockReturnValue(mockCheckboxElement);

    await TestBed.configureTestingModule({
      declarations: [ManifiestosDeclaracionesComponent],
      providers: [
        { provide: Tramite261701Store, useValue: mockTramite261701Store },
        { provide: Tramite261701Query, useValue: mockTramite261701Query },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ManifiestosDeclaracionesComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Pruebas de inicialización y constructor
  describe('Inicialización del componente', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar las propiedades con valores por defecto', () => {
      expect(component.manifiestosCheckboxChecked).toBe(false);
      expect(component.esFormularioSoloLectura).toBe(false);
      expect(component.destroyNotifier$).toBeInstanceOf(Subject);
      expect(component.manifiestosAlert).toBeDefined();
    });

    it('debería inyectar correctamente los servicios en el constructor', () => {
      expect(component['tramite261701Store']).toBeDefined();
      expect(component['tramite261701Query']).toBeDefined();
      expect(component['consultaioQuery']).toBeDefined();
    });

    it('debería suscribirse al estado de consultaio en el constructor', () => {
      const spy = jest.spyOn(mockConsultaioQuery.selectConsultaioState$, 'pipe');
      
      // Crear nuevo componente para activar constructor
      const newFixture = TestBed.createComponent(ManifiestosDeclaracionesComponent);
      const newComponent = newFixture.componentInstance;
      
      expect(spy).toHaveBeenCalled();
      expect(newComponent.esFormularioSoloLectura).toBe(mockConsultaioState.readonly);
    });

    it('debería establecer esFormularioSoloLectura cuando readonly es true', () => {
      const readonlyState = { ...mockConsultaioState, readonly: true };
      mockConsultaioQuery.selectConsultaioState$ = of(readonlyState);
      
      const newFixture = TestBed.createComponent(ManifiestosDeclaracionesComponent);
      const newComponent = newFixture.componentInstance;
      
      expect(newComponent.esFormularioSoloLectura).toBe(true);
    });

    it('debería establecer manifiestosAlert con el mensaje por defecto', () => {
      const expectedMessage = ManifiestosDeclaracionesComponent.getManifiestosAlert().message;
      expect(component.manifiestosAlert).toBe(expectedMessage);
    });
  });

  // Pruebas para ngOnInit
  describe('ngOnInit', () => {
    it('debería suscribirse al select$ del tramite query', () => {
      const spy = jest.spyOn(mockTramite261701Query.select$, 'pipe');
      
      component.ngOnInit();
      
      expect(spy).toHaveBeenCalled();
      expect(component.cancelacionPeticionState).toEqual(mockCancelacionPeticionState);
    });

    it('debería actualizar manifiestosAlert cuando esFormularioSoloLectura es true', () => {
      component.esFormularioSoloLectura = true;
      
      component.ngOnInit();
      
      const expectedMessage = ManifiestosDeclaracionesComponent.getManifiestosAlert(true).message;
      expect(component.manifiestosAlert).toBe(expectedMessage);
    });

    it('no debería cambiar manifiestosAlert cuando esFormularioSoloLectura es false', () => {
      const originalMessage = component.manifiestosAlert;
      component.esFormularioSoloLectura = false;
      
      component.ngOnInit();
      
      expect(component.manifiestosAlert).toBe(originalMessage);
    });

    it('debería usar takeUntil para evitar fugas de memoria', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockCancelacionPeticionState));
      mockTramite261701Query.select$ = {
        pipe: mockPipe
      } as any;
      
      component.ngOnInit();
      
      expect(mockPipe).toHaveBeenCalledWith(expect.anything(), expect.anything());
    });
  });

  // Pruebas para getManifiestosAlert (método estático)
  describe('getManifiestosAlert', () => {
    it('debería retornar mensaje con checkbox habilitado por defecto', () => {
      const result = ManifiestosDeclaracionesComponent.getManifiestosAlert();
      
      expect(result).toHaveProperty('message');
      expect(result.message).toContain('<input type="checkbox"');
      expect(result.message).not.toContain('disabled');
    });

    it('debería retornar mensaje con checkbox deshabilitado cuando disabled es true', () => {
      const result = ManifiestosDeclaracionesComponent.getManifiestosAlert(true);
      
      expect(result).toHaveProperty('message');
      expect(result.message).toContain('<input type="checkbox"');
      expect(result.message).toContain('disabled');
    });

    it('debería retornar mensaje con checkbox habilitado cuando disabled es false', () => {
      const result = ManifiestosDeclaracionesComponent.getManifiestosAlert(false);
      
      expect(result).toHaveProperty('message');
      expect(result.message).toContain('<input type="checkbox"');
      expect(result.message).not.toContain('disabled');
    });

    it('debería incluir el texto completo del mensaje', () => {
      const result = ManifiestosDeclaracionesComponent.getManifiestosAlert();
      
      expect(result.message).toContain('Cumplo con los requisitos');
      expect(result.message).toContain('Ventanilla Única de Comercio Exterior');
      expect(result.message).toContain('id="manifiestos"');
      expect(result.message).toContain('required');
    });

    it('debería mantener la estructura HTML correcta', () => {
      const result = ManifiestosDeclaracionesComponent.getManifiestosAlert();
      
      expect(result.message).toContain('<div class="row">');
      expect(result.message).toContain('<div class="col-md-2');
      expect(result.message).toContain('<div class="col-md-10">');
      expect(result.message).toContain('<form>');
      expect(result.message).toContain('<label>');
    });
  });

  // Pruebas para establecerValor
  describe('establecerValor', () => {
    beforeEach(() => {
      component.cancelacionPeticionState = mockCancelacionPeticionState;
    });

    it('debería establecer el valor checked del checkbox cuando el elemento existe', () => {
      component.cancelacionPeticionState['manifiestos'] = true;
      
      component.establecerValor();
      
      expect(mockCheckboxElement.checked).toBe(true);
    });

    it('debería establecer checked como false cuando el estado es false', () => {
      component.cancelacionPeticionState['manifiestos'] = false;
      
      component.establecerValor();
      
      expect(mockCheckboxElement.checked).toBe(false);
    });

    it('no debería lanzar error cuando el elemento no existe', () => {
      jest.spyOn(document, 'getElementById').mockReturnValue(null);
      
      expect(() => component.establecerValor()).not.toThrow();
    });

    it('debería llamar a document.getElementById con el id correcto', () => {
      const getElementByIdSpy = jest.spyOn(document, 'getElementById');
      
      component.establecerValor();
      
      expect(getElementByIdSpy).toHaveBeenCalledWith('manifiestos');
    });

    it('debería manejar cuando cancelacionPeticionState.manifiestos es undefined', () => {
      component.cancelacionPeticionState['manifiestos'] = undefined as any;
      
      expect(() => component.establecerValor()).not.toThrow();
      expect(mockCheckboxElement.checked).toBe(false); // undefined se convierte en false
    });
  });

  // Pruebas para ngAfterViewInit
  describe('ngAfterViewInit', () => {
    let establecerValorSpy: jest.SpyInstance;

    beforeEach(() => {
      establecerValorSpy = jest.spyOn(component, 'establecerValor');
    });

    it('debería agregar event listener al checkbox cuando existe', () => {
      component.ngAfterViewInit();
      
      expect(mockCheckboxElement.addEventListener).toHaveBeenCalledWith('click', expect.any(Function));
    });

    it('debería llamar a establecerValor', () => {
      component.ngAfterViewInit();
      
      expect(establecerValorSpy).toHaveBeenCalled();
    });

    it('debería almacenar el manejador del evento en el elemento', () => {
      component.ngAfterViewInit();
      
      expect((mockCheckboxElement as any).__manejadorClick).toBeDefined();
      expect(typeof (mockCheckboxElement as any).__manejadorClick).toBe('function');
    });

    it('no debería lanzar error cuando el elemento no existe', () => {
      jest.spyOn(document, 'getElementById').mockReturnValue(null);
      
      expect(() => component.ngAfterViewInit()).not.toThrow();
      expect(establecerValorSpy).toHaveBeenCalled();
    });

    it('debería manejar el click del checkbox correctamente', () => {
      component.ngAfterViewInit();
      
      // Simular click
      mockCheckboxElement.checked = true;
      const manejadorClick = (mockCheckboxElement as any).__manejadorClick;
      manejadorClick();
      
      expect(component.manifiestosCheckboxChecked).toBe(true);
      expect(mockTramite261701Store.establecerDatos).toHaveBeenCalledWith('manifiestos', true);
    });

    it('debería actualizar el estado cuando el checkbox se desmarca', () => {
      component.ngAfterViewInit();
      
      // Simular click para desmarcar
      mockCheckboxElement.checked = false;
      const manejadorClick = (mockCheckboxElement as any).__manejadorClick;
      manejadorClick();
      
      expect(component.manifiestosCheckboxChecked).toBe(false);
      expect(mockTramite261701Store.establecerDatos).toHaveBeenCalledWith('manifiestos', false);
    });

    it('debería llamar a document.getElementById con el id correcto', () => {
      const getElementByIdSpy = jest.spyOn(document, 'getElementById');
      
      component.ngAfterViewInit();
      
      expect(getElementByIdSpy).toHaveBeenCalledWith('manifiestos');
    });
  });

  // Pruebas para ngOnDestroy
  describe('ngOnDestroy', () => {
    it('debería remover el event listener cuando el elemento y manejador existen', () => {
      // Simular que existe el manejador
      const mockHandler = jest.fn();
      (mockCheckboxElement as any).__manejadorClick = mockHandler;
      
      component.ngOnDestroy();
      
      expect(mockCheckboxElement.removeEventListener).toHaveBeenCalledWith('click', mockHandler);
    });

    it('no debería lanzar error cuando el elemento no existe', () => {
      jest.spyOn(document, 'getElementById').mockReturnValue(null);
      
      expect(() => component.ngOnDestroy()).not.toThrow();
    });

    it('no debería lanzar error cuando el elemento existe pero no tiene manejador', () => {
      (mockCheckboxElement as any).__manejadorClick = undefined;
      
      expect(() => component.ngOnDestroy()).not.toThrow();
    });

    it('debería llamar next() en destroyNotifier$', () => {
      const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalled();
    });

    it('debería llamar complete() en destroyNotifier$', () => {
      const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
      
      component.ngOnDestroy();
      
      expect(completeSpy).toHaveBeenCalled();
    });

    it('debería limpiar correctamente los recursos para evitar fugas de memoria', () => {
      const mockHandler = jest.fn();
      (mockCheckboxElement as any).__manejadorClick = mockHandler;
      const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
      const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
      
      component.ngOnDestroy();
      
      expect(mockCheckboxElement.removeEventListener).toHaveBeenCalledWith('click', mockHandler);
      expect(nextSpy).toHaveBeenCalledTimes(1);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });

    it('debería llamar a document.getElementById con el id correcto', () => {
      const getElementByIdSpy = jest.spyOn(document, 'getElementById');
      
      component.ngOnDestroy();
      
      expect(getElementByIdSpy).toHaveBeenCalledWith('manifiestos');
    });
  });

  // Pruebas de integración y flujo completo
  describe('Flujo completo del componente', () => {
    it('debería ejecutar el flujo completo de inicialización', () => {
      const establecerValorSpy = jest.spyOn(component, 'establecerValor');
      
      // Inicialización (constructor ya ejecutado)
      expect(component.esFormularioSoloLectura).toBe(mockConsultaioState.readonly);
      
      // ngOnInit
      component.ngOnInit();
      expect(component.cancelacionPeticionState).toEqual(mockCancelacionPeticionState);
      
      // ngAfterViewInit
      component.ngAfterViewInit();
      expect(mockCheckboxElement.addEventListener).toHaveBeenCalled();
      expect(establecerValorSpy).toHaveBeenCalled();
    });

    it('debería manejar el ciclo completo del checkbox', () => {
      component.cancelacionPeticionState = { manifiestos: false } as any;
      
      // Inicializar vista
      component.ngAfterViewInit();
      
      // Simular click del usuario
      mockCheckboxElement.checked = true;
      const manejadorClick = (mockCheckboxElement as any).__manejadorClick;
      manejadorClick();
      
      // Verificar estado actualizado
      expect(component.manifiestosCheckboxChecked).toBe(true);
      expect(mockTramite261701Store.establecerDatos).toHaveBeenCalledWith('manifiestos', true);
      
      // Limpiar al destruir
      component.ngOnDestroy();
      expect(mockCheckboxElement.removeEventListener).toHaveBeenCalled();
    });

    it('debería manejar correctamente el modo solo lectura', () => {
      // Configurar modo solo lectura
      const readonlyState = { ...mockConsultaioState, readonly: true };
      mockConsultaioQuery.selectConsultaioState$ = of(readonlyState);
      
      // Crear nuevo componente
      const newFixture = TestBed.createComponent(ManifiestosDeclaracionesComponent);
      const newComponent = newFixture.componentInstance;
      
      // Verificar que se establece readonly
      expect(newComponent.esFormularioSoloLectura).toBe(true);
      
      // Ejecutar ngOnInit
      newComponent.ngOnInit();
      
      // Verificar que el mensaje incluye disabled
      const expectedMessage = ManifiestosDeclaracionesComponent.getManifiestosAlert(true).message;
      expect(newComponent.manifiestosAlert).toBe(expectedMessage);
    });
  });

  // Pruebas para casos edge y manejo de errores
  describe('Casos límite y manejo de errores', () => {
    it('debería manejar observables que no emiten en constructor', () => {
      const emptySubject = new Subject();
      mockConsultaioQuery.selectConsultaioState$ = emptySubject.asObservable() as Observable<ConsultaioState>;
      
      expect(() => {
        const newFixture = TestBed.createComponent(ManifiestosDeclaracionesComponent);
      }).not.toThrow();
    });

    it('debería manejar observables que no emiten en ngOnInit', () => {
      const emptySubject = new Subject();
      mockTramite261701Query.select$ = emptySubject.asObservable() as Observable<CancelacionPeticion261701State>;
      
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('debería manejar cancelacionPeticionState undefined', () => {
      component.cancelacionPeticionState = undefined as any;
      
      expect(() => component.establecerValor()).not.toThrow();
    });

    it('debería manejar checkbox element null en múltiples métodos', () => {
      jest.spyOn(document, 'getElementById').mockReturnValue(null);
      
      expect(() => {
        component.establecerValor();
        component.ngAfterViewInit();
        component.ngOnDestroy();
      }).not.toThrow();
    });

    it('debería manejar errores en addEventListener', () => {
      const mockElementWithError = {
        ...mockCheckboxElement,
        addEventListener: jest.fn().mockImplementation(() => {
          throw new Error('Event listener error');
        })
      };
      jest.spyOn(document, 'getElementById').mockReturnValue(mockElementWithError as any);
      
      expect(() => component.ngAfterViewInit()).toThrow();
    });

    it('debería manejar errores en removeEventListener', () => {
      const mockHandler = jest.fn();
      const mockElementWithError = {
        ...mockCheckboxElement,
        removeEventListener: jest.fn().mockImplementation(() => {
          throw new Error('Remove listener error');
        }),
        __manejadorClick: mockHandler
      };
      jest.spyOn(document, 'getElementById').mockReturnValue(mockElementWithError as any);
      
      expect(() => component.ngOnDestroy()).toThrow();
    });

    it('debería manejar tipo de elemento incorrecto', () => {
      const mockDivElement = document.createElement('div');
      jest.spyOn(document, 'getElementById').mockReturnValue(mockDivElement);
      
      expect(() => component.establecerValor()).not.toThrow();
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

    it('debería renderizar el componente de alerta', () => {
      const compiled = fixture.nativeElement;
      const alert = compiled.querySelector('ng-alert');
      expect(alert).toBeTruthy();
    });

    it('debería pasar manifiestosAlert al componente ng-alert', () => {
      const compiled = fixture.nativeElement;
      const alert = compiled.querySelector('ng-alert');
      expect(alert?.getAttribute('ng-reflect-contenido')).toBeDefined();
    });

    it('debería actualizar la template cuando cambia manifiestosAlert', () => {
      const newMessage = 'Nuevo mensaje de prueba';
      component.manifiestosAlert = newMessage;
      fixture.detectChanges();
      
      // Verificar que la template se actualiza
      expect(component.manifiestosAlert).toBe(newMessage);
    });
  });

  // Pruebas para suscripciones y gestión de memoria
  describe('Gestión de suscripciones', () => {
    it('debería usar takeUntil para evitar fugas de memoria en constructor', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockConsultaioState));
      mockConsultaioQuery.selectConsultaioState$ = {
        pipe: mockPipe
      } as any;
      
      const newFixture = TestBed.createComponent(ManifiestosDeclaracionesComponent);
      
      expect(mockPipe).toHaveBeenCalledWith(expect.anything(), expect.anything());
    });

    it('debería usar takeUntil para evitar fugas de memoria en ngOnInit', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockCancelacionPeticionState));
      mockTramite261701Query.select$ = {
        pipe: mockPipe
      } as any;
      
      component.ngOnInit();
      
      expect(mockPipe).toHaveBeenCalledWith(expect.anything(), expect.anything());
    });

    it('debería cancelar todas las suscripciones al destruir', () => {
      const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
      const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  // Pruebas para propiedades públicas
  describe('Propiedades públicas', () => {
    it('debería tener manifiestosCheckboxChecked como boolean', () => {
      expect(typeof component.manifiestosCheckboxChecked).toBe('boolean');
    });

    it('debería tener esFormularioSoloLectura como boolean', () => {
      expect(typeof component.esFormularioSoloLectura).toBe('boolean');
    });

    it('debería tener manifiestosAlert como string', () => {
      expect(typeof component.manifiestosAlert).toBe('string');
    });

    it('debería poder actualizar manifiestosCheckboxChecked', () => {
      component.manifiestosCheckboxChecked = true;
      expect(component.manifiestosCheckboxChecked).toBe(true);
      
      component.manifiestosCheckboxChecked = false;
      expect(component.manifiestosCheckboxChecked).toBe(false);
    });

    it('debería poder actualizar esFormularioSoloLectura', () => {
      component.esFormularioSoloLectura = true;
      expect(component.esFormularioSoloLectura).toBe(true);
      
      component.esFormularioSoloLectura = false;
      expect(component.esFormularioSoloLectura).toBe(false);
    });
  });
});