import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of, Subject } from 'rxjs';
import { PasoUnoComponent } from './paso-uno.component';
import { DatosEmpresaService } from '../../services/datos-empresa.service';
import {
  ConsultaioQuery,
  ConsultaioState,
} from '@libs/shared/data-access-user/src';
import { DatosEmpresa } from '../../modelos/datos-empresa.model';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let mockDatosEmpresaService: jest.Mocked<DatosEmpresaService>;
  let mockConsultaQuery: jest.Mocked<ConsultaioQuery>;
  let mockConsultaioState: ConsultaioState;
  let mockDatosEmpresa: DatosEmpresa;

  beforeEach(async () => {
    // Mock para ConsultaioState
    mockConsultaioState = {
      update: false,
      // Agregar otras propiedades según sea necesario para ConsultaioState
    } as ConsultaioState;

    // Mock para DatosEmpresa
    mockDatosEmpresa = {
      solicitudForm: {
        tipoDeEmpresa: { id: 1, label: 'Física', value: 'Física' },
        denominacionExposicion: 'Test Empresa',
        actividadEconomicaClave: '123456',
        actividadEconomicaDescripcion: 'Actividad de prueba'
      },
      FormSolicitud: {
        datosImportadorExportador: {
          nacionalidad: 'Mexicana',
          persona: 'Física',
          cadenaDependencia: 'Independiente'
        }
      },
      formularioParaConteoTotal: {
        recuentoTotalDeFilas: 10
      },
      domicilioFiscal: {
        calle: 'Calle Test',
        numeroExterior: '123',
        numeroInterior: 'A',
        colonia: 'Colonia Test',
        codigoPostal: '12345',
        municipio: 'Municipio Test',
        estado: 'Estado Test',
        pais: 'México'
      },
      representacionFederal: {
        estado: { id: 1, label: 'Estado Test', value: 'Estado Test' },
        representacion: { id: 1, descripcion: 'Representación Test' }
      },
      socios: [],
      sociosExtranjeros: [],
      representacionFederalTabla: []
    } as DatosEmpresa;

    // Mock para DatosEmpresaService
    mockDatosEmpresaService = {
      getRegistroTomaMuestrasMercanciasData: jest.fn(),
      actualizarEstadoFormulario: jest.fn(),
    } as unknown as jest.Mocked<DatosEmpresaService>;

    // Mock para ConsultaioQuery
    mockConsultaQuery = {
      selectConsultaioState$: of(mockConsultaioState),
    } as unknown as jest.Mocked<ConsultaioQuery>;

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent],
      providers: [
        { provide: DatosEmpresaService, useValue: mockDatosEmpresaService },
        { provide: ConsultaioQuery, useValue: mockConsultaQuery },
      ],
      schemas: [NO_ERRORS_SCHEMA], // Para ignorar componentes hijos no declarados
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
  });

  // Pruebas de inicialización y constructor
  describe('Inicialización del componente', () => {
    it('debería crear el componente', () => {
      expect(component).toBeTruthy();
    });

    it('debería inicializar las propiedades con valores por defecto', () => {
      expect(component.indice).toBe(1);
      expect(component.esDatosRespuesta).toBe(false);
      expect(component['destroyNotifier$']).toBeInstanceOf(Subject);
    });

    it('debería inyectar correctamente los servicios en el constructor', () => {
      expect(component['datosEmpresaService']).toBeDefined();
      expect(component['consultaQuery']).toBeDefined();
    });
  });

  // Pruebas para ngOnInit
  describe('ngOnInit', () => {
    it('debería suscribirse al estado de consulta y actualizar consultaState', () => {
      const spy = jest.spyOn(mockConsultaQuery.selectConsultaioState$, 'pipe');
      
      component.ngOnInit();
      
      expect(spy).toHaveBeenCalled();
      expect(component.consultaState).toEqual(mockConsultaioState);
    });

    it('debería llamar guardarDatosFormulario cuando consultaState.update es true', () => {
      // Configurar mock para que update sea true
      mockConsultaioState.update = true;
      mockConsultaQuery.selectConsultaioState$ = of(mockConsultaioState);
      
      const guardarDatosSpy = jest.spyOn(component, 'guardarDatosFormulario').mockImplementation(() => {});
      
      component.ngOnInit();
      
      expect(guardarDatosSpy).toHaveBeenCalled();
    });

    it('debería establecer esDatosRespuesta como true cuando consultaState.update es false', () => {
      // Configurar mock para que update sea false
      mockConsultaioState.update = false;
      mockConsultaQuery.selectConsultaioState$ = of(mockConsultaioState);
      
      const guardarDatosSpy = jest.spyOn(component, 'guardarDatosFormulario').mockImplementation(() => {});
      
      component.ngOnInit();
      
      expect(guardarDatosSpy).not.toHaveBeenCalled();
      expect(component.esDatosRespuesta).toBe(true);
    });
  });

  // Pruebas para guardarDatosFormulario
  describe('guardarDatosFormulario', () => {
    beforeEach(() => {
      fixture.detectChanges(); // Para activar ngOnInit
    });

    it('debería llamar al servicio getRegistroTomaMuestrasMercanciasData', () => {
      mockDatosEmpresaService.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(mockDatosEmpresa));
      
      component.guardarDatosFormulario();
      
      expect(mockDatosEmpresaService.getRegistroTomaMuestrasMercanciasData).toHaveBeenCalled();
    });

    it('debería actualizar esDatosRespuesta y llamar actualizarEstadoFormulario cuando resp tiene datos', () => {
      const mockResponse = mockDatosEmpresa;
      mockDatosEmpresaService.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(mockResponse));
      
      component.esDatosRespuesta = false;
      component.guardarDatosFormulario();
      
      expect(component.esDatosRespuesta).toBe(true);
      expect(mockDatosEmpresaService.actualizarEstadoFormulario).toHaveBeenCalledWith(mockResponse);
    });

    it('no debería actualizar esDatosRespuesta ni llamar actualizarEstadoFormulario cuando resp es falsy', () => {
      mockDatosEmpresaService.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(null as any));
      
      component.esDatosRespuesta = false;
      component.guardarDatosFormulario();
      
      expect(component.esDatosRespuesta).toBe(false);
      expect(mockDatosEmpresaService.actualizarEstadoFormulario).not.toHaveBeenCalled();
    });

    it('debería usar takeUntil para evitar fugas de memoria', () => {
      const mockPipe = jest.fn().mockReturnValue(of(mockDatosEmpresa));
      mockDatosEmpresaService.getRegistroTomaMuestrasMercanciasData.mockReturnValue({
        pipe: mockPipe
      } as any);
      
      component.guardarDatosFormulario();
      
      expect(mockPipe).toHaveBeenCalledWith(expect.anything()); // takeUntil
    });
  });

  // Pruebas para seleccionaTab
  describe('seleccionaTab', () => {
    it('debería actualizar el índice con el valor proporcionado', () => {
      component.indice = 1;
      
      component.seleccionaTab(2);
      
      expect(component.indice).toBe(2);
    });

    it('debería actualizar el índice a 1', () => {
      component.indice = 2;
      
      component.seleccionaTab(1);
      
      expect(component.indice).toBe(1);
    });

    it('debería manejar números negativos', () => {
      component.seleccionaTab(-1);
      
      expect(component.indice).toBe(-1);
    });

    it('debería manejar números grandes', () => {
      component.seleccionaTab(999);
      
      expect(component.indice).toBe(999);
    });
  });

  // Pruebas para ngOnDestroy
  describe('ngOnDestroy', () => {
    it('debería llamar next() en destroyNotifier$', () => {
      const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalled();
    });

    it('debería llamar complete() en destroyNotifier$', () => {
      const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(completeSpy).toHaveBeenCalled();
    });

    it('debería limpiar correctamente los recursos para evitar fugas de memoria', () => {
      const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
      const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalledTimes(1);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });
  });

  // Pruebas de integración y flujo completo
  describe('Flujo completo del componente', () => {
    it('debería ejecutar el flujo completo cuando update es true', () => {
      // Configurar el estado inicial
      mockConsultaioState.update = true;
      mockConsultaQuery.selectConsultaioState$ = of(mockConsultaioState);
      const mockResponse = mockDatosEmpresa;
      mockDatosEmpresaService.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(mockResponse));
      
      // Espiar métodos
      const guardarDatosSpy = jest.spyOn(component, 'guardarDatosFormulario');
      
      // Ejecutar ngOnInit
      component.ngOnInit();
      
      // Verificar el flujo
      expect(component.consultaState).toEqual(mockConsultaioState);
      expect(guardarDatosSpy).toHaveBeenCalled();
      expect(component.esDatosRespuesta).toBe(true);
      expect(mockDatosEmpresaService.actualizarEstadoFormulario).toHaveBeenCalledWith(mockResponse);
    });

    it('debería ejecutar el flujo cuando update es false', () => {
      // Configurar el estado inicial
      mockConsultaioState.update = false;
      mockConsultaQuery.selectConsultaioState$ = of(mockConsultaioState);
      
      // Espiar métodos
      const guardarDatosSpy = jest.spyOn(component, 'guardarDatosFormulario');
      
      // Ejecutar ngOnInit
      component.ngOnInit();
      
      // Verificar el flujo
      expect(component.consultaState).toEqual(mockConsultaioState);
      expect(guardarDatosSpy).not.toHaveBeenCalled();
      expect(component.esDatosRespuesta).toBe(true);
    });
  });

  // Pruebas para casos edge
  describe('Casos límite y manejo de errores', () => {
    it('debería manejar errores en la suscripción de guardarDatosFormulario', () => {
      const errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
      mockDatosEmpresaService.getRegistroTomaMuestrasMercanciasData.mockReturnValue(
        new Subject<DatosEmpresa>().asObservable()
      );
      
      expect(() => component.guardarDatosFormulario()).not.toThrow();
      
      errorSpy.mockRestore();
    });

    it('debería manejar estado undefined en consultaState', () => {
      mockConsultaQuery.selectConsultaioState$ = of(undefined as any);
      
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('debería manejar múltiples llamadas a seleccionaTab', () => {
      component.seleccionaTab(1);
      component.seleccionaTab(2);
      component.seleccionaTab(1);
      
      expect(component.indice).toBe(1);
    });
  });

  // Pruebas de la template
  describe('Interacciones con la template', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('debería mostrar las pestañas correctamente', () => {
      const compiled = fixture.nativeElement;
      const tabs = compiled.querySelectorAll('li');
      
      expect(tabs.length).toBe(2);
    });

    it('debería aplicar la clase active correctamente según el índice', () => {
      component.indice = 1;
      fixture.detectChanges();
      
      const firstTab = fixture.nativeElement.querySelector('li:first-child');
      expect(firstTab.className).toContain('active');
    });

    it('debería cambiar de pestaña al hacer click', () => {
      const secondTabLink = fixture.nativeElement.querySelector('li:last-child a');
      
      secondTabLink.click();
      
      expect(component.indice).toBe(2);
    });

    it('debería cambiar de pestaña con eventos de teclado (Enter)', () => {
      const secondTabLink = fixture.nativeElement.querySelector('li:last-child a');
      const enterEvent = new KeyboardEvent('keydown', { key: 'Enter' });
      
      secondTabLink.dispatchEvent(enterEvent);
      
      expect(component.indice).toBe(2);
    });

    it('debería cambiar de pestaña con eventos de teclado (Space)', () => {
      const secondTabLink = fixture.nativeElement.querySelector('li:last-child a');
      const spaceEvent = new KeyboardEvent('keydown', { key: ' ' });
      
      secondTabLink.dispatchEvent(spaceEvent);
      
      expect(component.indice).toBe(2);
    });

    it('debería mostrar el componente datos-empresa cuando indice es 2 y esDatosRespuesta es true', () => {
      component.indice = 2;
      component.esDatosRespuesta = true;
      fixture.detectChanges();
      
      const datosEmpresaComponent = fixture.nativeElement.querySelector('app-datos-empresa');
      expect(datosEmpresaComponent).toBeTruthy();
    });

    it('no debería mostrar el componente datos-empresa cuando esDatosRespuesta es false', () => {
      component.indice = 2;
      component.esDatosRespuesta = false;
      fixture.detectChanges();
      
      const datosEmpresaComponent = fixture.nativeElement.querySelector('app-datos-empresa');
      expect(datosEmpresaComponent).toBeFalsy();
    });

    it('debería mostrar el componente solicitante cuando indice es 1', () => {
      component.indice = 1;
      fixture.detectChanges();
      
      const solicitanteComponent = fixture.nativeElement.querySelector('solicitante');
      expect(solicitanteComponent).toBeTruthy();
    });
  });
});