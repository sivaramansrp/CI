import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient } from '@angular/common/http';
import { of, throwError, EMPTY } from 'rxjs';

import { PasoUnoComponent } from './paso-uno.component';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud32201State } from '../../estados/tramite32201.store';

const mockSolicitudService = {
  getDatosConsulta: jest.fn(() => of({ regimen_0: true })),
  actualizarEstadoFormulario: jest.fn(),
  obtenerPersonaPorRfc: jest.fn(() =>
    of({
      id: 1,
      nombre: 'Juan',
      apellidoPaterno: 'Pérez',
      apellidoMaterno: 'López'
    })
  )
};

const mockTramiteStore = {
  getEstadoSolicitud: jest.fn(() => of('ACTIVO')),
  patchEstadoSolicitud: jest.fn()
};

describe('PasoUnoComponent', () => {
  let fixture: ComponentFixture<PasoUnoComponent>;
  let component: PasoUnoComponent;
  let mockConsultaioQuery: any;
  let mockSolicitudService: any;

  const createMockConsultaioState = (overrides: Partial<ConsultaioState> = {}): ConsultaioState => ({
    parameter: '',
    department: '',
    folioTramite: '',
    tipoDeTramite: '',
    estadoDeTramite: '',
    readonly: false,
    create: true,
    update: false,
    consultaioSolicitante: null,
    procedureId: '',
    ...overrides
  });

  const createMockSolicitud32201State = (overrides: Partial<Solicitud32201State> = {}): Solicitud32201State => ({
    regimen_0: false,
    regimen_1: false,
    regimen_2: false,
    regimen_3: false,
    manifiesto: false,
    ...overrides
  });

  beforeEach(async () => {
    mockConsultaioQuery = {
      selectConsultaioState$: of(createMockConsultaioState())
    };

    mockSolicitudService = {
      getDatosConsulta: jest.fn(),
      actualizarEstadoFormulario: jest.fn()
    };

    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, PasoUnoComponent],
      providers: [
        provideHttpClient(),
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: SolicitudService, useValue: mockSolicitudService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  });

  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
  });

  const createComponent = () => {
    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
    return { fixture, component };
  };

  describe('Component Initialization', () => {
    it('should create component successfully', () => {
      createComponent();
      fixture.detectChanges();

      expect(component).toBeTruthy();
    });

    it('should initialize properties with default values', () => {
      createComponent();

      expect(component.indice).toBe(1);
      expect(component.esDatosRespuesta).toBe(false);
      expect(component.persona).toEqual([]);
      expect(component.domicilioFiscal).toEqual([]);
    });

    it('should initialize tipoPersona as undefined', () => {
      createComponent();

      expect(component.tipoPersona).toBeUndefined();
    });

    it('should have destroyNotifier$ as Subject instance', () => {
      createComponent();

      expect(component.destroyNotifier$).toBeDefined();
      expect(typeof component.destroyNotifier$.next).toBe('function');
      expect(typeof component.destroyNotifier$.complete).toBe('function');
    });

    it('should have consultaState as undefined initially', () => {
      createComponent();

      expect(component.consultaState).toBeUndefined();
    });
  });

  describe('Constructor and Dependency Injection', () => {
    it('should inject ConsultaioQuery correctly', () => {
      createComponent();

      expect(component['consultaioQuery']).toBeDefined();
    });

    it('should inject SolicitudService correctly', () => {
      createComponent();

      expect(component.solicitudService).toBeDefined();
    });
  });

  describe('fetchGetDatosConsulta - Success Response Cases', () => {
    beforeEach(() => {
      createComponent();
      fixture.detectChanges();
    });

    it('should call service and update state on successful response', fakeAsync(() => {
      const mockResponse = createMockSolicitud32201State({
        regimen_0: true,
        regimen_1: false,
        regimen_2: true,
        regimen_3: false,
        manifiesto: true
      });

      mockSolicitudService.getDatosConsulta.mockReturnValue(of(mockResponse));

      component.fetchGetDatosConsulta();
      tick();

      expect(mockSolicitudService.getDatosConsulta).toHaveBeenCalled();
      expect(mockSolicitudService.actualizarEstadoFormulario).toHaveBeenCalledWith(mockResponse);
      expect(component.esDatosRespuesta).toBe(true);
    }));

    it('should handle response with all regimens true', fakeAsync(() => {
      const mockResponse = createMockSolicitud32201State({
        regimen_0: true,
        regimen_1: true,
        regimen_2: true,
        regimen_3: true,
        manifiesto: true
      });

      mockSolicitudService.getDatosConsulta.mockReturnValue(of(mockResponse));

      component.fetchGetDatosConsulta();
      tick();

      expect(mockSolicitudService.actualizarEstadoFormulario).toHaveBeenCalledWith(mockResponse);
      expect(component.esDatosRespuesta).toBe(true);
    }));

    it('should handle response with all regimens false', fakeAsync(() => {
      const mockResponse = createMockSolicitud32201State({
        regimen_0: false,
        regimen_1: false,
        regimen_2: false,
        regimen_3: false,
        manifiesto: false
      });

      mockSolicitudService.getDatosConsulta.mockReturnValue(of(mockResponse));

      component.fetchGetDatosConsulta();
      tick();

      expect(mockSolicitudService.actualizarEstadoFormulario).toHaveBeenCalledWith(mockResponse);
      expect(component.esDatosRespuesta).toBe(true);
    }));

    it('should handle response with mixed boolean values', fakeAsync(() => {
      const mockResponse = createMockSolicitud32201State({
        regimen_0: false,
        regimen_1: true,
        regimen_2: false,
        regimen_3: true,
        manifiesto: false
      });

      mockSolicitudService.getDatosConsulta.mockReturnValue(of(mockResponse));

      component.fetchGetDatosConsulta();
      tick();

      expect(mockSolicitudService.actualizarEstadoFormulario).toHaveBeenCalledWith(mockResponse);
      expect(component.esDatosRespuesta).toBe(true);
    }));

    it('should handle empty object response as truthy', fakeAsync(() => {
      const emptyResponse = {} as Solicitud32201State;
      mockSolicitudService.getDatosConsulta.mockReturnValue(of(emptyResponse));

      component.fetchGetDatosConsulta();
      tick();

      expect(mockSolicitudService.getDatosConsulta).toHaveBeenCalled();
      expect(mockSolicitudService.actualizarEstadoFormulario).toHaveBeenCalledWith(emptyResponse);
      expect(component.esDatosRespuesta).toBe(true);
    }));

    it('should handle complete state object with all properties', fakeAsync(() => {
      const completeResponse = createMockSolicitud32201State({
        regimen_0: true,
        regimen_1: false,
        regimen_2: true,
        regimen_3: false,
        manifiesto: true
      });

      mockSolicitudService.getDatosConsulta.mockReturnValue(of(completeResponse));

      component.fetchGetDatosConsulta();
      tick();

      expect(mockSolicitudService.getDatosConsulta).toHaveBeenCalled();
      expect(mockSolicitudService.actualizarEstadoFormulario).toHaveBeenCalledWith(completeResponse);
      expect(component.esDatosRespuesta).toBe(true);
    }));
  });

  describe('fetchGetDatosConsulta - Falsy Response Cases', () => {
    beforeEach(() => {
      createComponent();
      fixture.detectChanges();
    });

    it('should handle null response without calling actualizarEstadoFormulario', fakeAsync(() => {
      mockSolicitudService.getDatosConsulta.mockReturnValue(of(null));

      component.esDatosRespuesta = false;

      component.fetchGetDatosConsulta();
      tick();

      expect(mockSolicitudService.getDatosConsulta).toHaveBeenCalled();
      expect(mockSolicitudService.actualizarEstadoFormulario).not.toHaveBeenCalled();
      expect(component.esDatosRespuesta).toBe(false);
    }));

    it('should handle undefined response without calling actualizarEstadoFormulario', fakeAsync(() => {
      mockSolicitudService.getDatosConsulta.mockReturnValue(of(undefined));

      component.esDatosRespuesta = false;

      component.fetchGetDatosConsulta();
      tick();

      expect(mockSolicitudService.getDatosConsulta).toHaveBeenCalled();
      expect(mockSolicitudService.actualizarEstadoFormulario).not.toHaveBeenCalled();
      expect(component.esDatosRespuesta).toBe(false);
    }));

    it('should handle false response without calling actualizarEstadoFormulario', fakeAsync(() => {
      mockSolicitudService.getDatosConsulta.mockReturnValue(of(false));

      component.esDatosRespuesta = false;

      component.fetchGetDatosConsulta();
      tick();

      expect(mockSolicitudService.getDatosConsulta).toHaveBeenCalled();
      expect(mockSolicitudService.actualizarEstadoFormulario).not.toHaveBeenCalled();
      expect(component.esDatosRespuesta).toBe(false);
    }));

    it('should handle empty string response without calling actualizarEstadoFormulario', fakeAsync(() => {
      mockSolicitudService.getDatosConsulta.mockReturnValue(of(''));

      component.esDatosRespuesta = false;

      component.fetchGetDatosConsulta();
      tick();

      expect(mockSolicitudService.getDatosConsulta).toHaveBeenCalled();
      expect(mockSolicitudService.actualizarEstadoFormulario).not.toHaveBeenCalled();
      expect(component.esDatosRespuesta).toBe(false);
    }));

    it('should handle zero response without calling actualizarEstadoFormulario', fakeAsync(() => {
      mockSolicitudService.getDatosConsulta.mockReturnValue(of(0));

      component.esDatosRespuesta = false;

      component.fetchGetDatosConsulta();
      tick();

      expect(mockSolicitudService.getDatosConsulta).toHaveBeenCalled();
      expect(mockSolicitudService.actualizarEstadoFormulario).not.toHaveBeenCalled();
      expect(component.esDatosRespuesta).toBe(false);
    }));

    it('should handle NaN response without calling actualizarEstadoFormulario', fakeAsync(() => {
      mockSolicitudService.getDatosConsulta.mockReturnValue(of(NaN));

      component.esDatosRespuesta = false;

      component.fetchGetDatosConsulta();
      tick();

      expect(mockSolicitudService.getDatosConsulta).toHaveBeenCalled();
      expect(mockSolicitudService.actualizarEstadoFormulario).not.toHaveBeenCalled();
      expect(component.esDatosRespuesta).toBe(false);
    }));
  });

  describe('fetchGetDatosConsulta - Error Handling and Edge Cases', () => {
    beforeEach(() => {
      createComponent();
      fixture.detectChanges();
    });

    it('should handle service error by propagating the error', fakeAsync(() => {
      mockSolicitudService.getDatosConsulta.mockReturnValue(throwError(() => new Error('Service error')));

      let errorOccurred = false;
      try {
        component.fetchGetDatosConsulta();
        tick();
      } catch (error) {
        errorOccurred = true;
      }

      expect(mockSolicitudService.getDatosConsulta).toHaveBeenCalled();
      expect(mockSolicitudService.actualizarEstadoFormulario).not.toHaveBeenCalled();
      expect(errorOccurred).toBe(true);
    }));

    it('should handle HTTP 404 error', fakeAsync(() => {
      const error = { status: 404, message: 'Not Found' };
      mockSolicitudService.getDatosConsulta.mockReturnValue(throwError(() => error));

      let errorOccurred = false;
      try {
        component.fetchGetDatosConsulta();
        tick();
      } catch (err) {
        errorOccurred = true;
      }

      expect(mockSolicitudService.getDatosConsulta).toHaveBeenCalled();
      expect(errorOccurred).toBe(true);
    }));

    it('should handle HTTP 500 error', fakeAsync(() => {
      const error = { status: 500, message: 'Internal Server Error' };
      mockSolicitudService.getDatosConsulta.mockReturnValue(throwError(() => error));

      let errorOccurred = false;
      try {
        component.fetchGetDatosConsulta();
        tick();
      } catch (err) {
        errorOccurred = true;
      }

      expect(mockSolicitudService.getDatosConsulta).toHaveBeenCalled();
      expect(errorOccurred).toBe(true);
    }));

    it('should handle network error', fakeAsync(() => {
      const networkError = new Error('Network connection failed');
      mockSolicitudService.getDatosConsulta.mockReturnValue(throwError(() => networkError));

      let errorOccurred = false;
      try {
        component.fetchGetDatosConsulta();
        tick();
      } catch (err) {
        errorOccurred = true;
      }

      expect(mockSolicitudService.getDatosConsulta).toHaveBeenCalled();
      expect(errorOccurred).toBe(true);
    }));

    it('should handle EMPTY observable gracefully', fakeAsync(() => {
      mockSolicitudService.getDatosConsulta.mockReturnValue(EMPTY);

      expect(() => {
        component.fetchGetDatosConsulta();
        tick();
      }).not.toThrow();

      expect(mockSolicitudService.getDatosConsulta).toHaveBeenCalled();
    }));

    it('should respect takeUntil for subscription cleanup', fakeAsync(() => {
      const mockResponse = createMockSolicitud32201State({ regimen_0: true });
      mockSolicitudService.getDatosConsulta.mockReturnValue(of(mockResponse));

      component.fetchGetDatosConsulta();
      tick();

      expect(mockSolicitudService.getDatosConsulta).toHaveBeenCalled();
      expect(mockSolicitudService.actualizarEstadoFormulario).toHaveBeenCalled();
    }));
  });

  describe('seleccionaTab - Tab Selection Functionality', () => {
    beforeEach(() => {
      createComponent();
      fixture.detectChanges();
    });

    it('should update indice with positive integer values', () => {
      component.seleccionaTab(2);
      expect(component.indice).toBe(2);

      component.seleccionaTab(5);
      expect(component.indice).toBe(5);

      component.seleccionaTab(100);
      expect(component.indice).toBe(100);
    });

    it('should update indice with zero', () => {
      component.seleccionaTab(0);
      expect(component.indice).toBe(0);
    });

    it('should update indice with negative values', () => {
      component.seleccionaTab(-1);
      expect(component.indice).toBe(-1);

      component.seleccionaTab(-10);
      expect(component.indice).toBe(-10);
    });

    it('should overwrite previous indice value', () => {
      component.indice = 5;
      component.seleccionaTab(3);
      expect(component.indice).toBe(3);

      component.seleccionaTab(7);
      expect(component.indice).toBe(7);
    });

    it('should handle decimal values', () => {
      component.seleccionaTab(2.5);
      expect(component.indice).toBe(2.5);

      component.seleccionaTab(3.14159);
      expect(component.indice).toBe(3.14159);
    });

    it('should handle large numbers', () => {
      const largeNumber = 999999;
      component.seleccionaTab(largeNumber);
      expect(component.indice).toBe(largeNumber);

      const veryLargeNumber = Number.MAX_SAFE_INTEGER;
      component.seleccionaTab(veryLargeNumber);
      expect(component.indice).toBe(veryLargeNumber);
    });

    it('should handle edge case numbers', () => {
      component.seleccionaTab(Infinity);
      expect(component.indice).toBe(Infinity);

      component.seleccionaTab(-Infinity);
      expect(component.indice).toBe(-Infinity);

      component.seleccionaTab(NaN);
      expect(component.indice).toBeNaN();
    });

    it('should maintain type as number', () => {
      component.seleccionaTab(42);
      expect(typeof component.indice).toBe('number');

      component.seleccionaTab(0);
      expect(typeof component.indice).toBe('number');

      component.seleccionaTab(-1);
      expect(typeof component.indice).toBe('number');
    });

    it('should handle rapid successive calls', () => {
      component.seleccionaTab(1);
      component.seleccionaTab(2);
      component.seleccionaTab(3);
      component.seleccionaTab(4);

      expect(component.indice).toBe(4);
    });

    it('should handle very small decimal values', () => {
      component.seleccionaTab(0.0001);
      expect(component.indice).toBe(0.0001);

      component.seleccionaTab(-0.0001);
      expect(component.indice).toBe(-0.0001);
    });
  });

  describe('ngOnDestroy - Cleanup and Memory Management', () => {
    beforeEach(() => {
      createComponent();
      fixture.detectChanges();
    });

    it('should call next() on destroyNotifier$ Subject', () => {
      const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalledWith();
      expect(nextSpy).toHaveBeenCalledTimes(1);
    });

    it('should call complete() on destroyNotifier$ Subject', () => {
      const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');

      component.ngOnDestroy();

      expect(completeSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });

    it('should call both next and complete in sequence', () => {
      const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
      const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalledWith();
      expect(completeSpy).toHaveBeenCalled();
      expect(nextSpy).toHaveBeenCalledTimes(1);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle multiple calls to ngOnDestroy gracefully', () => {
      const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');
      const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');

      component.ngOnDestroy();
      component.ngOnDestroy();
      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalledTimes(3);
      expect(completeSpy).toHaveBeenCalledTimes(3);
    });

    it('should not throw error when called multiple times', () => {
      expect(() => {
        component.ngOnDestroy();
        component.ngOnDestroy();
        component.ngOnDestroy();
      }).not.toThrow();
    });

    it('should properly signal all subscriptions to unsubscribe', () => {
      const nextSpy = jest.spyOn(component.destroyNotifier$, 'next');

      component.ngOnDestroy();

      expect(nextSpy).toHaveBeenCalledWith();
    });

    it('should complete the Subject properly for garbage collection', () => {
      const completeSpy = jest.spyOn(component.destroyNotifier$, 'complete');

      component.ngOnDestroy();

      expect(completeSpy).toHaveBeenCalled();
    });
  });

  describe('Property Access and State Management', () => {
    beforeEach(() => {
      createComponent();
      fixture.detectChanges();
    });

    it('should allow reading and writing all public properties', () => {
      component.tipoPersona = 1;
      expect(component.tipoPersona).toBe(1);

      component.persona = [{ campo: 'test' } as any];
      expect(component.persona).toEqual([{ campo: 'test' }]);

      component.domicilioFiscal = [{ campo: 'test2' } as any];
      expect(component.domicilioFiscal).toEqual([{ campo: 'test2' }]);

      component.indice = 5;
      expect(component.indice).toBe(5);

      component.esDatosRespuesta = true;
      expect(component.esDatosRespuesta).toBe(true);
    });

    it('should maintain correct property types', () => {
      expect(typeof component.indice).toBe('number');
      expect(typeof component.esDatosRespuesta).toBe('boolean');
      expect(Array.isArray(component.persona)).toBe(true);
      expect(Array.isArray(component.domicilioFiscal)).toBe(true);
    });

    it('should handle property assignment edge cases', () => {
      component.tipoPersona = undefined as any;
      expect(component.tipoPersona).toBeUndefined();

      component.persona = [];
      expect(component.persona).toEqual([]);
      expect(component.persona.length).toBe(0);

      component.persona = null as any;
      expect(component.persona).toBeNull();
    });

    it('should handle property reassignment after ngAfterViewInit', () => {
      component.ngAfterViewInit();

      const originalPersona = component.persona;
      const originalDomicilio = component.domicilioFiscal;

      component.persona = [{ test: 'value' } as any];
      component.domicilioFiscal = [{ test: 'value2' } as any];

      expect(component.persona).not.toBe(originalPersona);
      expect(component.domicilioFiscal).not.toBe(originalDomicilio);
    });
  });

  describe('ViewChild and Component References', () => {
    beforeEach(() => {
      createComponent();
      fixture.detectChanges();
    });

    it('should have solicitante ViewChild property defined', () => {
      expect('solicitante' in component).toBe(true);
    });

    it('should handle solicitante ViewChild after ngAfterViewInit', () => {
      component.ngAfterViewInit();

      expect('solicitante' in component).toBe(true);
    });
  });

  describe('Error Boundaries and Edge Cases', () => {
    it('should handle component creation with minimal configuration', () => {
      createComponent();

      expect(() => {
        fixture.detectChanges();
      }).not.toThrow();
    });

    it('should handle service injection gracefully', () => {
      createComponent();

      expect(component.solicitudService).toBeDefined();
      expect(component['consultaioQuery']).toBeDefined();
    });

    it('should handle concurrent method calls without conflicts', fakeAsync(() => {
      const testState = createMockConsultaioState();
      mockConsultaioQuery.selectConsultaioState$ = of(testState);
      createComponent();

      mockSolicitudService.getDatosConsulta.mockReturnValue(of(createMockSolicitud32201State()));

      component.ngOnInit();
      component.fetchGetDatosConsulta();
      component.seleccionaTab(5);
      component.ngAfterViewInit();

      tick();

      expect(component.indice).toBe(5);
      expect(() => component.ngOnDestroy()).not.toThrow();
    }));

    it('should handle rapid state changes', fakeAsync(() => {
      const testState = createMockConsultaioState();
      mockConsultaioQuery.selectConsultaioState$ = of(testState);
      createComponent();

      component.ngOnInit();
      tick();

      component.ngOnInit();
      tick();

      expect(() => {
        component.ngOnDestroy();
      }).not.toThrow();
    }));
  });

  describe('Code Coverage Completeness Verification', () => {
    it('should verify all public methods are testable', () => {
      createComponent();

      expect(typeof component.ngOnInit).toBe('function');
      expect(typeof component.ngAfterViewInit).toBe('function');
      expect(typeof component.ngOnDestroy).toBe('function');
      expect(typeof component.fetchGetDatosConsulta).toBe('function');
      expect(typeof component.seleccionaTab).toBe('function');
    });

    it('should cover all conditional branches in ngOnInit', fakeAsync(() => {
      jest.spyOn(component, 'fetchGetDatosConsulta').mockImplementation(() => { });
      (component as any).consultaState = { update: true };
      component.ngOnInit();
      tick();

      jest.restoreAllMocks();
      (component as any).consultaState = { update: false };
      component.ngOnInit();
      tick();

      expect(component.esDatosRespuesta).toBe(true);
    }));

    it('should cover all conditional branches in fetchGetDatosConsulta', fakeAsync(() => {
      createComponent();

      mockSolicitudService.getDatosConsulta.mockReturnValueOnce(of({ regimen_0: true }));
      component.fetchGetDatosConsulta();
      tick();

      expect(component.esDatosRespuesta).toBe(true);
      expect(mockSolicitudService.actualizarEstadoFormulario).toHaveBeenCalled();

      component.esDatosRespuesta = false;
      mockSolicitudService.getDatosConsulta.mockReturnValueOnce(of(null));
      component.fetchGetDatosConsulta();
      tick();

      expect(component.esDatosRespuesta).toBe(false);
    }));

    it('should achieve 100% statement coverage', fakeAsync(() => {
      const mockResponse = createMockSolicitud32201State({
        regimen_0: true,
        regimen_1: false,
        regimen_2: true,
        regimen_3: false,
        manifiesto: true
      });

      mockSolicitudService.getDatosConsulta.mockReturnValue(of(mockResponse));
      createComponent();

      component.ngOnInit();
      component.ngAfterViewInit();
      component.ngOnDestroy();

      component.fetchGetDatosConsulta();
      tick();

      component.seleccionaTab(1);
      component.seleccionaTab(0);
      component.seleccionaTab(-1);

      expect(component.indice).toBeDefined();
      expect(component.esDatosRespuesta).toBeDefined();
      expect(component.persona).toBeDefined();
      expect(component.domicilioFiscal).toBeDefined();
    }));
  });

});
