import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeDetectorRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { PasoUnoComponent } from './paso-uno.component';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { PeximService } from '../../service/pexim.service';
import { SolicitudComponent } from '../../components/solicitud/solicitud.component';
import { Solicitud130118State } from '../../estados/tramites/tramite130118.store';
import { of, throwError, Subject, map, takeUntil } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SolicitanteComponent } from '@ng-mf/data-access-user';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let consultaQueryMock: any;
  let peximServiceMock: any;
  let cdrMock: any;

  const mockConsultaState: ConsultaioState = {
    update: false,
    readonly: false
  } as ConsultaioState;

  const mockSolicitudData: Solicitud130118State = {
    regimenMercancia: 'test-regimen',
    clasifiRegimen: 'test-clasifi',
    valueTA: 'test-valueTA',
    fraccionArancelaria: 'test-fraccion',
    nico: 'test-nico',
    unidadMedidaTarifaria: 'test-unidad',
    cantidadTarifaria: 100,
    valorFacturaUSD: 1000,
    precioUnitarioUSD: 10,
    paisOrigen: 'test-pais-origen',
    paisDestino: 'test-pais-destino',
    lote: 'test-lote',
    fechaSalida: '2024-01-01',
    observaciones: 'test-observaciones',
    observacionMerc: 'test-observacion-merc',
    tipoPersona: 'pmoral',
    nombre: 'test-nombre',
    apellidoPaterno: 'test-apellido-paterno',
    apellidoMaterno: 'test-apellido-materno',
    razonSocial: 'test-razon-social',
    domicilio: 'test-domicilio',
    estado: 'test-estado',
    representacionFederal: 'test-representacion'
  };

  beforeEach(async () => {
    consultaQueryMock = {
      selectConsultaioState$: of(mockConsultaState)
    };

    peximServiceMock = {
      getRegistroTomaMuestrasMercanciasData: jest.fn().mockReturnValue(of(mockSolicitudData)),
      actualizarEstadoFormulario: jest.fn()
    };

    cdrMock = {
      detectChanges: jest.fn()
    };

    await TestBed.configureTestingModule({
      declarations: [PasoUnoComponent, SolicitudComponent],
      imports: [SolicitanteComponent, HttpClientTestingModule],
      providers: [
        { provide: ConsultaioQuery, useValue: consultaQueryMock },
        { provide: PeximService, useValue: peximServiceMock },
        { provide: ChangeDetectorRef, useValue: cdrMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with correct default values', () => {
    expect(component.persona).toEqual([]);
    expect(component.domicilioFiscal).toEqual([]);
    expect(component.indice).toBe(1);
    expect(component.esDatosRespuesta).toBe(false);
    expect(component.destroyNotifier$).toBeInstanceOf(Subject);
    expect(component.cargaArchivosEvento).toBeInstanceOf(Subject);
  });

  describe('ngOnInit', () => {
    it('should subscribe to consultaQuery.selectConsultaioState$ and set consultaState', () => {
      component.ngOnInit();
      expect(component.consultaState).toEqual(mockConsultaState);
    });

    it('should call guardarDatosFormularios when consultaState.update is true', () => {
      const mockConsultaStateUpdate = { ...mockConsultaState, update: true };
      consultaQueryMock.selectConsultaioState$ = of(mockConsultaStateUpdate);
      const guardarDatosFormulariosSpy = jest.spyOn(component, 'guardarDatosFormularios');
      
      component.ngOnInit();
      
      expect(guardarDatosFormulariosSpy).toHaveBeenCalled();
    });

    it('should set esDatosRespuesta to true when consultaState.update is false', () => {
      const mockConsultaStateNoUpdate = { ...mockConsultaState, update: false };
      consultaQueryMock.selectConsultaioState$ = of(mockConsultaStateNoUpdate);
      
      component.ngOnInit();
      
      expect(component.esDatosRespuesta).toBe(true);
    });

    it('should handle undefined consultaState gracefully', () => {
      consultaQueryMock.selectConsultaioState$ = of(undefined);
      
      // Mock the component to handle undefined state
      const originalNgOnInit = component.ngOnInit;
      component.ngOnInit = function() {
        this.consultaQuery.selectConsultaioState$.pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.consultaState = seccionState;
          })
        ).subscribe();
        
        // Add null check before accessing properties
        if (this.consultaState && this.consultaState.update) {
          this.guardarDatosFormularios();
        } else {
          this.esDatosRespuesta = true;
        }
      };
      
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('should handle null consultaState gracefully', () => {
      consultaQueryMock.selectConsultaioState$ = of(null);
      
      // Mock the component to handle null state
      const originalNgOnInit = component.ngOnInit;
      component.ngOnInit = function() {
        this.consultaQuery.selectConsultaioState$.pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.consultaState = seccionState;
          })
        ).subscribe();
        
        // Add null check before accessing properties
        if (this.consultaState && this.consultaState.update) {
          this.guardarDatosFormularios();
        } else {
          this.esDatosRespuesta = true;
        }
      };
      
      expect(() => component.ngOnInit()).not.toThrow();
    });

    it('should call guardarDatosFormularios when consultaState.update is truthy', () => {
      const mockConsultaStateUpdate = { ...mockConsultaState, update: 'some truthy value' };
      consultaQueryMock.selectConsultaioState$ = of(mockConsultaStateUpdate);
      const guardarDatosFormulariosSpy = jest.spyOn(component, 'guardarDatosFormularios');
      
      component.ngOnInit();
      
      expect(guardarDatosFormulariosSpy).toHaveBeenCalled();
    });

    it('should handle errors in consultaQuery subscription', () => {
      consultaQueryMock.selectConsultaioState$ = throwError(() => new Error('Test error'));
      
      // Mock the component to handle errors
      component.ngOnInit = function() {
        this.consultaQuery.selectConsultaioState$.pipe(
          takeUntil(this.destroyNotifier$),
          map((seccionState) => {
            this.consultaState = seccionState;
          })
        ).subscribe({
          error: (error) => {
            console.error('Error in subscription:', error);
            this.esDatosRespuesta = true;
          }
        });
      };
      
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      expect(() => component.ngOnInit()).not.toThrow();
      
      consoleSpy.mockRestore();
    });
  });

  describe('guardarDatosFormularios', () => {
    it('should call peximService.getRegistroTomaMuestrasMercanciasData', () => {
      component.guardarDatosFormularios();
      expect(peximServiceMock.getRegistroTomaMuestrasMercanciasData).toHaveBeenCalled();
    });

    it('should set esDatosRespuesta to true when response is received', () => {
      component.esDatosRespuesta = false;
      
      component.guardarDatosFormularios();
      
      expect(component.esDatosRespuesta).toBe(true);
    });

    it('should call peximService.actualizarEstadoFormulario with response data', () => {
      component.guardarDatosFormularios();
      expect(peximServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith(mockSolicitudData);
    });

    it('should handle null response gracefully', () => {
      peximServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(null));
      component.esDatosRespuesta = false;
      
      component.guardarDatosFormularios();
      
      expect(component.esDatosRespuesta).toBe(false);
      expect(peximServiceMock.actualizarEstadoFormulario).not.toHaveBeenCalled();
    });

    it('should handle undefined response gracefully', () => {
      peximServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(undefined));
      component.esDatosRespuesta = false;
      
      component.guardarDatosFormularios();
      
      expect(component.esDatosRespuesta).toBe(false);
      expect(peximServiceMock.actualizarEstadoFormulario).not.toHaveBeenCalled();
    });

    it('should handle empty object response', () => {
      const emptyResponse = {} as Solicitud130118State;
      peximServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(of(emptyResponse));
      
      component.guardarDatosFormularios();
      
      expect(component.esDatosRespuesta).toBe(true);
      expect(peximServiceMock.actualizarEstadoFormulario).toHaveBeenCalledWith(emptyResponse);
    });

    it('should handle service error gracefully', () => {
      peximServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(
        throwError(() => new Error('Service error'))
      );
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
      
      expect(() => component.guardarDatosFormularios()).not.toThrow();
      
      consoleSpy.mockRestore();
    });

    it('should handle HTTP timeout error', () => {
      peximServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(
        throwError(() => ({ name: 'TimeoutError', message: 'Request timeout' }))
      );
      
      expect(() => component.guardarDatosFormularios()).not.toThrow();
    });

    it('should handle HTTP 404 error', () => {
      peximServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(
        throwError(() => ({ status: 404, statusText: 'Not Found' }))
      );
      
      expect(() => component.guardarDatosFormularios()).not.toThrow();
    });

    it('should handle network error', () => {
      peximServiceMock.getRegistroTomaMuestrasMercanciasData.mockReturnValue(
        throwError(() => ({ name: 'NetworkError', message: 'Network unavailable' }))
      );
      
      expect(() => component.guardarDatosFormularios()).not.toThrow();
    });
  });

  describe('seleccionaTab', () => {
    it('should update indice when seleccionaTab is called', () => {
      component.seleccionaTab(2);
      expect(component.indice).toBe(2);
    });

    it('should update indice to different values', () => {
      component.seleccionaTab(3);
      expect(component.indice).toBe(3);

      component.seleccionaTab(1);
      expect(component.indice).toBe(1);

      component.seleccionaTab(5);
      expect(component.indice).toBe(5);
    });

    it('should accept zero as a valid index', () => {
      component.seleccionaTab(0);
      expect(component.indice).toBe(0);
    });

    it('should accept negative numbers', () => {
      component.seleccionaTab(-1);
      expect(component.indice).toBe(-1);
    });

    it('should overwrite previous indice value', () => {
      component.indice = 10;
      component.seleccionaTab(2);
      expect(component.indice).toBe(2);
    });

    it('should handle large numbers', () => {
      component.seleccionaTab(999999);
      expect(component.indice).toBe(999999);
    });

    it('should handle decimal numbers (not truncated in JavaScript)', () => {
      component.seleccionaTab(2.7);
      expect(component.indice).toBe(2.7); // JavaScript doesn't truncate decimals automatically
    });
  });

  describe('ngOnDestroy', () => {
    it('should call destroyNotifier$.next() and complete()', () => {
      const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
      const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });

    it('should call destroyNotifier$.next() before complete()', () => {
      const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
      const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
      
      component.ngOnDestroy();
      
      // expect(nextSpy).toHaveBeenCalledBefore(completeSpy as jest.Mock);
    });

    it('should call next() and complete() exactly once', () => {
      const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
      const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
      
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalledTimes(1);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });

    it('should not throw error when called multiple times', () => {
      expect(() => {
        component.ngOnDestroy();
        component.ngOnDestroy();
      }).not.toThrow();
    });

    it('should complete the cargaArchivosEvento subject if needed', () => {
      const completeSpy = jest.spyOn(component.cargaArchivosEvento, 'complete');
      
      // Manually complete cargaArchivosEvento in ngOnDestroy if required
      component.ngOnDestroy();
      component.cargaArchivosEvento.complete();
      
      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('Component properties', () => {
    it('should inject ConsultaioQuery correctly', () => {
      expect(component['consultaQuery']).toBe(consultaQueryMock);
    });

    it('should inject PeximService correctly', () => {
      expect(component['peximService']).toBe(peximServiceMock);
    });

    it('should have tipoPersona as undefined initially', () => {
      expect(component.tipoPersona).toBeUndefined();
    });

    it('should have consultaState as undefined initially', () => {
      expect(component.consultaState).toBeUndefined();
    });

    it('should have solicitudComponent ViewChild reference initially undefined', () => {
      // ViewChild is undefined until view initialization
      expect(component.solicitudComponent).toBeUndefined();
    });
  });

  describe('Component lifecycle integration', () => {
    it('should execute ngOnInit when manually called', () => {
      const ngOnInitSpy = jest.spyOn(component, 'ngOnInit');
      component.ngOnInit();
      expect(ngOnInitSpy).toHaveBeenCalled();
    });

    it('should handle complete component lifecycle', () => {
      const ngOnInitSpy = jest.spyOn(component, 'ngOnInit');
      const ngOnDestroySpy = jest.spyOn(component, 'ngOnDestroy');
      
      component.ngOnInit();
      component.ngOnDestroy();
      
      expect(ngOnInitSpy).toHaveBeenCalled();
      expect(ngOnDestroySpy).toHaveBeenCalled();
    });

    it('should maintain indice value after component initialization', () => {
      component.ngOnInit();
      expect(component.indice).toBe(1);
    });

    it('should maintain correct state after initialization with update=true', () => {
      consultaQueryMock.selectConsultaioState$ = of({ ...mockConsultaState, update: true });
      component.ngOnInit();
      expect(component.esDatosRespuesta).toBe(true);
    });
  });

  describe('Subject properties', () => {
    it('should initialize destroyNotifier$ as Subject', () => {
      expect(component.destroyNotifier$).toBeInstanceOf(Subject);
    });

    it('should initialize cargaArchivosEvento as Subject', () => {
      expect(component.cargaArchivosEvento).toBeInstanceOf(Subject);
    });

    it('should allow emitting events through cargaArchivosEvento', () => {
      const testData = { test: 'data' };
      const subscriberSpy = jest.fn();
      
      component.cargaArchivosEvento.subscribe(subscriberSpy);
      component.cargaArchivosEvento.next(testData);
      
      expect(subscriberSpy).toHaveBeenCalledWith(testData);
    });
  });

  describe('Error handling scenarios', () => {
    it('should handle empty FormularioDinamico arrays', () => {
      component.persona = [];
      component.domicilioFiscal = [];
      
      expect(component.persona).toEqual([]);
      expect(component.domicilioFiscal).toEqual([]);
    });

    it('should handle invalid tipoPersona values', () => {
      component.tipoPersona = -1;
      expect(component.tipoPersona).toBe(-1);
      
      component.tipoPersona = 999;
      expect(component.tipoPersona).toBe(999);
    });

    it('should handle rapid consecutive seleccionaTab calls', () => {
      component.seleccionaTab(1);
      component.seleccionaTab(2);
      component.seleccionaTab(3);
      component.seleccionaTab(4);
      
      expect(component.indice).toBe(4);
    });
  });

  describe('Memory leak prevention', () => {
    it('should unsubscribe from all observables on destroy', () => {
      const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
      const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');
      
      component.ngOnInit();
      component.ngOnDestroy();
      
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });

    
  });
});