import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, of, Subject } from 'rxjs';

import { PagoDeDerechosContenedoraComponent } from './pago-de-derechos-contenedora.component';
import { Tramite240118Query } from '../../estados/tramite240118Query.query';
import { Tramite240118Store } from '../../estados/tramite240118Store.store';
import { ConsultaioQuery, ConsultaioState } from '@ng-mf/data-access-user';
import { PagoDerechosFormState } from '../../../../shared/models/pago-de-derechos.model';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';

describe('PagoDeDerechosContenedoraComponent', () => {
  let component: PagoDeDerechosContenedoraComponent;
  let fixture: ComponentFixture<PagoDeDerechosContenedoraComponent>;
  let mockTramiteQuery: jest.Mocked<Tramite240118Query>;
  let mockTramiteStore: jest.Mocked<Tramite240118Store>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;
  let mockDatosSolicitudService: jest.Mocked<DatosSolicitudService>;

  const mockPagoDerechosState: PagoDerechosFormState = {
    claveReferencia: 'REF123456789',
    cadenaDependencia: 'CADENA123',
    banco: 'Banco Test',
    llavePago: 'LLAVE123',
    fechaPago: '05/06/2025',
    importePago: '1500.50'
  };

  const mockConsultaioState: ConsultaioState = {
    procedureId: '240118',
    parameter: 'test-param',
    department: 'SEDENA',
    folioTramite: 'FOL123456',
    tipoDeTramite: 'Solicitud de permiso',
    estadoDeTramite: 'En proceso',
    readonly: false,
    create: true,
    update: false,
    consultaioSolicitante: null,
    action_id: 'ACT001',
    current_user: 'test-user',
    id_solicitud: 'SOL123',
    nombre_pagina: 'pago-derechos'
  };

  beforeEach(async () => {
    // Create Jest mocks
    mockTramiteQuery = {
      getPagoDerechos$: of(mockPagoDerechosState)
    } as any;

    mockTramiteStore = {
      updatePagoDerechosFormState: jest.fn()
    } as any;

    mockConsultaioQuery = {
      selectConsultaioState$: of(mockConsultaioState)
    } as any;

    mockDatosSolicitudService = {
      obtenerBancoCatalogo: jest.fn().mockReturnValue(of([])),
      obtenerBancos: jest.fn().mockReturnValue(of([])),
      // Add other methods that might be needed by the service
    } as any;

    await TestBed.configureTestingModule({
      imports: [CommonModule, PagoDeDerechosContenedoraComponent],
      providers: [
        { provide: Tramite240118Query, useValue: mockTramiteQuery },
        { provide: Tramite240118Store, useValue: mockTramiteStore },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: DatosSolicitudService, useValue: mockDatosSolicitudService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PagoDeDerechosContenedoraComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
    if (fixture) {
      fixture.destroy();
    }
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component).toBeInstanceOf(PagoDeDerechosContenedoraComponent);
    });

    it('should initialize with default values', () => {
      expect(component.esFormularioSoloLectura).toBe(false);
      expect(component.campoObligatorio).toBe(false);
      expect(component.idProcedimiento).toBeDefined();
    });

    it('should inject dependencies correctly', () => {
      expect(component['tramiteQuery']).toBeDefined();
      expect(component['tramiteStore']).toBeDefined();
      expect(component['consultaioQuery']).toBeDefined();
    });
  });

  describe('ngOnInit', () => {
    it('should subscribe to pago derechos state and update component state', () => {
      // Act
      component.ngOnInit();
      fixture.detectChanges();

      // Assert
      expect(component.pagoDerechoFormState).toEqual(mockPagoDerechosState);
    });

    it('should subscribe to consultaio state and update readonly flag', () => {
      // Arrange - Create a new observable with the readonly state
      const readonlyState = { ...mockConsultaioState, readonly: true };
      
      // Completely replace the mock with the new observable
      component['consultaioQuery'].selectConsultaioState$ = of(readonlyState);

      // Act
      component.ngOnInit();
      
      // Give Angular time to process subscriptions
      fixture.detectChanges();
      
      // Assert
      expect(component.esFormularioSoloLectura).toBe(true);
    });

    it('should handle empty pago derechos state', () => {
      // Arrange
      mockTramiteQuery.getPagoDerechos$ = of({} as PagoDerechosFormState);

      // Act
      component.ngOnInit();
      fixture.detectChanges();

      // Assert
      expect(component.pagoDerechoFormState).toEqual({});
    });

    it('should handle consultaio state changes', () => {
      // Arrange
      const stateSubject = new Subject<ConsultaioState>();
      
      // Replace the mock with the Subject
      component['consultaioQuery'].selectConsultaioState$ = stateSubject.asObservable();

      // Act
      component.ngOnInit();
      fixture.detectChanges();

      // Initial state
      stateSubject.next({ ...mockConsultaioState, readonly: false });
      fixture.detectChanges();
      expect(component.esFormularioSoloLectura).toBe(false);

      // State change
      stateSubject.next({ ...mockConsultaioState, readonly: true });
      fixture.detectChanges();
      expect(component.esFormularioSoloLectura).toBe(true);
    });
  });

  describe('updatePagoDerechos', () => {
    it('should call tramiteStore.updatePagoDerechosFormState with provided data', () => {
      // Arrange
      const testData: PagoDerechosFormState = {
        ...mockPagoDerechosState,
        importePago: '2000.75'
      };

      // Act
      component.updatePagoDerechos(testData);

      // Assert
      expect(mockTramiteStore.updatePagoDerechosFormState).toHaveBeenCalledTimes(1);
      expect(mockTramiteStore.updatePagoDerechosFormState).toHaveBeenCalledWith(testData);
    });

    it('should handle null data', () => {
      // Act
      component.updatePagoDerechos(null as any);

      // Assert
      expect(mockTramiteStore.updatePagoDerechosFormState).toHaveBeenCalledTimes(1);
      expect(mockTramiteStore.updatePagoDerechosFormState).toHaveBeenCalledWith(null);
    });

    it('should handle partial data updates', () => {
      // Arrange
      const partialData = {
        claveReferencia: 'NEW_REF',
        importePago: '500.00'
      } as Partial<PagoDerechosFormState>;

      // Act
      component.updatePagoDerechos(partialData as PagoDerechosFormState);

      // Assert
      expect(mockTramiteStore.updatePagoDerechosFormState).toHaveBeenCalledWith(partialData);
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete destroyNotifier$ subject', () => {
      // Arrange
      const nextSpy = jest.spyOn(component['destroyNotifier$'], 'next');
      const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

      // Act
      component.ngOnDestroy();

      // Assert
      expect(nextSpy).toHaveBeenCalledTimes(1);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });

    it('should unsubscribe from observables to prevent memory leaks', () => {
      // Arrange
      component.ngOnInit();
      const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');

      // Act
      component.ngOnDestroy();

      // Assert
      expect(destroyNotifierSpy).toHaveBeenCalled();
    });
  });

  describe('Input Properties', () => {
    it('should accept esFormularioSoloLectura input', () => {
      // Arrange - Component should start with default false value
      expect(component.esFormularioSoloLectura).toBe(false);

      // Act - Set the input property
      component.esFormularioSoloLectura = true;

      // Assert - Property should be updated
      expect(component.esFormularioSoloLectura).toBe(true);
    });

    it('should have correct idProcedimiento value', () => {
      // Assert - ID_PROCEDIMIENTO should be imported from constants
      expect(component.idProcedimiento).toBeDefined();
      expect(typeof component.idProcedimiento).toBe('number');
    });

    it('should have campoObligatorio set to false by default', () => {
      // Assert
      expect(component.campoObligatorio).toBe(false);
    });
  });

  describe('Component Integration', () => {
    it('should handle complete workflow: init -> update -> destroy', () => {
      // Arrange
      const updatedData: PagoDerechosFormState = {
        ...mockPagoDerechosState,
        claveReferencia: 'UPDATED_REF'
      };

      // Act - Initialize
      component.ngOnInit();
      fixture.detectChanges();

      // Act - Update
      component.updatePagoDerechos(updatedData);

      // Act - Destroy
      component.ngOnDestroy();

      // Assert
      expect(component.pagoDerechoFormState).toEqual(mockPagoDerechosState);
      expect(mockTramiteStore.updatePagoDerechosFormState).toHaveBeenCalledWith(updatedData);
    });

    it('should maintain state consistency between query updates', () => {
      // Arrange
      const stateSubject = new Subject<PagoDerechosFormState>();
      mockTramiteQuery.getPagoDerechos$ = stateSubject.asObservable();

      // Act
      component.ngOnInit();

      // Emit first state
      stateSubject.next(mockPagoDerechosState);
      expect(component.pagoDerechoFormState).toEqual(mockPagoDerechosState);

      // Emit updated state
      const updatedState = { ...mockPagoDerechosState, importePago: '3000.00' };
      stateSubject.next(updatedState);
      expect(component.pagoDerechoFormState).toEqual(updatedState);
    });
  });

  describe('Error Handling', () => {
    it('should handle store update errors gracefully', () => {
      // Arrange
      mockTramiteStore.updatePagoDerechosFormState.mockImplementation(() => {
        throw new Error('Store error');
      });

      // Act & Assert
      expect(() => {
        component.updatePagoDerechos(mockPagoDerechosState);
      }).toThrow('Store error');
    });

    it('should handle observable errors in ngOnInit', () => {
      // Arrange
      mockTramiteQuery.getPagoDerechos$ = new Observable(subscriber => {
        subscriber.error(new Error('Observable error'));
      });

      // Act & Assert - Should not throw
      expect(() => {
        component.ngOnInit();
      }).not.toThrow();
    });
  });

  describe('Observable Subscriptions', () => {
    it('should unsubscribe when destroyNotifier$ emits', () => {
      // Arrange
      const destroyNotifierSpy = jest.spyOn(component['destroyNotifier$'], 'next');
      const completeSpy = jest.spyOn(component['destroyNotifier$'], 'complete');

      // Act
      component.ngOnInit();
      fixture.detectChanges();
      component.ngOnDestroy();

      // Assert - Verify that ngOnDestroy calls the proper cleanup methods
      expect(destroyNotifierSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });

    it('should handle multiple rapid state updates', () => {
      // Arrange
      const stateSubject = new Subject<PagoDerechosFormState>();
      mockTramiteQuery.getPagoDerechos$ = stateSubject.asObservable();

      // Act
      component.ngOnInit();

      // Emit multiple rapid updates
      for (let i = 0; i < 5; i++) {
        stateSubject.next({ ...mockPagoDerechosState, importePago: `${i * 100}.00` });
      }

      // Assert - Should have the latest value
      expect(component.pagoDerechoFormState.importePago).toBe('400.00');
    });
  });
});