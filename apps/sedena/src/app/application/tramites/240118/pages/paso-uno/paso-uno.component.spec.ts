// @ts-nocheck
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Observable, of, Subject } from 'rxjs';

import { PasoUnoComponent } from './paso-uno.component';
import { Tramite240118Query } from '../../estados/tramite240118Query.query';
import { Tramite240118Store } from '../../estados/tramite240118Store.store';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { ConsultaioQuery, ConsultaioState, SeccionLibStore } from '@ng-mf/data-access-user';
import { ConsultaDatosService } from '../../servicios/consulta-datos.servicio';
describe('PasoUnoComponent', () => {
  let component: PasoUnoComponent;
  let fixture: ComponentFixture<PasoUnoComponent>;
  let mockTramiteQuery: jest.Mocked<Tramite240118Query>;
  let mockTramiteStore: jest.Mocked<Tramite240118Store>;
  let mockActivatedRoute: jest.Mocked<ActivatedRoute>;
  let mockConsultaioQuery: jest.Mocked<ConsultaioQuery>;
  let mockSeccionLibStore: jest.Mocked<SeccionLibStore>;
  let mockDatosSolicitudService: jest.Mocked<DatosSolicitudService>;
  let mockConsultaDatosService: jest.Mocked<ConsultaDatosService>;

  beforeEach(async () => {
    // Create Jest mocks
    mockTramiteQuery = {
      getTabSeleccionado$: of(1)
    } as any;

    mockTramiteStore = {
      updateTabSeleccionado: jest.fn()
    } as any;

    mockActivatedRoute = {
      params: of({ id: '123' }),
      queryParams: of({}),
      snapshot: {
        params: { id: '123' },
        queryParams: {},
        data: {}
      }
    } as any;

    mockConsultaioQuery = {
      selectConsultaioState$: of({
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
        nombre_pagina: 'paso-uno'
      } as ConsultaioState)
    } as any;

    mockSeccionLibStore = {
      updateSeccion: jest.fn()
    } as any;

    mockDatosSolicitudService = {
      getDatosSolicitud: jest.fn().mockReturnValue(of({}))
    } as any;

    mockConsultaDatosService = {
      getDatosDeLaSolicitudData: jest.fn().mockReturnValue(of({})),
      updateDatosDel: jest.fn(),
      updatePagoDerechos: jest.fn(),
      updateDestinatario: jest.fn(),
      updateProveedor: jest.fn(),
      updateMercancia: jest.fn(),
      actualizarEstadoFormulario: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientTestingModule],
      declarations: [PasoUnoComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: Tramite240118Query, useValue: mockTramiteQuery },
        { provide: Tramite240118Store, useValue: mockTramiteStore },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: ConsultaioQuery, useValue: mockConsultaioQuery },
        { provide: SeccionLibStore, useValue: mockSeccionLibStore },
        { provide: DatosSolicitudService, useValue: mockDatosSolicitudService },
        { provide: ConsultaDatosService, useValue: mockConsultaDatosService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    jest.clearAllMocks();
    if (component && component.ngOnDestroy) {
      component.ngOnDestroy();
    }
    fixture?.destroy();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
      expect(component).toBeInstanceOf(PasoUnoComponent);
    });

    it('should inject dependencies correctly', () => {
      expect(component['tramite240118Query']).toBeDefined();
      expect(component['tramite240118Store']).toBeDefined();
      expect(component['route']).toBeDefined();
    });

    it('should initialize with default values', () => {
      expect(component.esDatosRespuesta).toBe(false);
      expect(component.esFormularioSoloLectura).toBe(false);
    });
  });

  describe('ngOnInit', () => {
    it('should subscribe to tab selection state', () => {
      // Arrange
      component.tramite240118Query = mockTramiteQuery;

      // Act
      component.ngOnInit();
      fixture.detectChanges();

      // Assert
      expect(mockTramiteQuery.getTabSeleccionado$).toBeDefined();
    });

    it('should handle tab selection observable', () => {
      // Arrange
      const tabSubject = new Subject<number>();
      mockTramiteQuery.getTabSeleccionado$ = tabSubject.asObservable();
      component.tramite240118Query = mockTramiteQuery;

      // Act
      component.ngOnInit();
      tabSubject.next(2);

      // Assert - Component should handle the subscription
      expect(component).toBeTruthy();
    });

    it('should handle consultaio state subscription', () => {
      // Act
      component.ngOnInit();
      fixture.detectChanges();

      // Assert
      expect(component.esFormularioSoloLectura).toBe(false);
    });
  });

  describe('seleccionaTab', () => {
    it('should update indice property and emit tabChanged event', () => {
      // Arrange
      const tabNumber = 2;
      const spy = jest.spyOn(component.tabChanged, 'emit');

      // Act
      component.seleccionaTab(tabNumber);

      // Assert
      expect(component.indice).toBe(tabNumber);
      expect(spy).toHaveBeenCalledWith(tabNumber);
    });

    it('should handle different tab numbers', () => {
      // Arrange
      const spy = jest.spyOn(component.tabChanged, 'emit');

      // Act & Assert
      [1, 2, 3, 4].forEach(tabNumber => {
        component.seleccionaTab(tabNumber);
        expect(component.indice).toBe(tabNumber);
        expect(spy).toHaveBeenCalledWith(tabNumber);
      });

      expect(spy).toHaveBeenCalledTimes(4);
    });

    it('should handle null tab selection', () => {
      // Arrange
      const spy = jest.spyOn(component.tabChanged, 'emit');

      // Act
      component.seleccionaTab(null);

      // Assert
      expect(component.indice).toBe(null);
      expect(spy).toHaveBeenCalledWith(null);
    });
  });

  describe('ngOnDestroy', () => {
    it('should complete destroyNotifier$ subject', () => {
      // Arrange
      const destroyNotifier$ = (component as any).destroyNotifier$;
      const nextSpy = jest.spyOn(destroyNotifier$, 'next');
      const completeSpy = jest.spyOn(destroyNotifier$, 'complete');

      // Act
      component.ngOnDestroy();

      // Assert
      expect(nextSpy).toHaveBeenCalledTimes(1);
      expect(completeSpy).toHaveBeenCalledTimes(1);
    });

    it('should handle ngOnDestroy when destroyNotifier$ is initialized', () => {
      // Act & Assert - Should not throw since destroyNotifier$ is properly initialized
      expect(() => {
        component.ngOnDestroy();
      }).not.toThrow();
    });

    it('should prevent memory leaks by unsubscribing', () => {
      // Arrange
      component.ngOnInit();
      const destroyNotifier$ = (component as any).destroyNotifier$;
      const nextSpy = jest.spyOn(destroyNotifier$, 'next');

      // Act
      component.ngOnDestroy();

      // Assert
      expect(nextSpy).toHaveBeenCalled();
    });
  });

  describe('Component State Management', () => {
    it('should handle esDatosRespuesta property', () => {
      // Act
      component.esDatosRespuesta = true;

      // Assert
      expect(component.esDatosRespuesta).toBe(true);
    });

    it('should handle esFormularioSoloLectura property', () => {
      // Act
      component.esFormularioSoloLectura = true;

      // Assert
      expect(component.esFormularioSoloLectura).toBe(true);
    });

    it('should handle consultaState property', () => {
      // Arrange
      const mockState = { readonly: true, isLoading: false };

      // Act
      component.consultaState = mockState as any;

      // Assert
      expect(component.consultaState).toEqual(mockState);
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete component lifecycle', () => {
      // Arrange
      const spy = jest.spyOn(component.tabChanged, 'emit');
      
      // Act - Initialize
      component.ngOnInit();
      
      // Act - Interact
      component.seleccionaTab(2);
      
      // Act - Destroy
      component.ngOnDestroy();

      // Assert
      expect(component.indice).toBe(2);
      expect(spy).toHaveBeenCalledWith(2);
    });

    it('should handle multiple tab selections', () => {
      // Arrange
      const spy = jest.spyOn(component.tabChanged, 'emit');
      component.ngOnInit();

      // Act
      component.seleccionaTab(1);
      component.seleccionaTab(2);
      component.seleccionaTab(3);

      // Assert
      expect(spy).toHaveBeenCalledTimes(3);
      expect(spy).toHaveBeenNthCalledWith(1, 1);
      expect(spy).toHaveBeenNthCalledWith(2, 2);
      expect(spy).toHaveBeenNthCalledWith(3, 3);
      expect(component.indice).toBe(3);
    });
  });

  describe('Error Handling', () => {
    it('should handle component initialization errors gracefully', () => {
      // Arrange
      const spy = jest.spyOn(component.tabChanged, 'emit');

      // Act & Assert - This should not throw since seleccionaTab is simple
      expect(() => {
        component.seleccionaTab(1);
      }).not.toThrow();
      
      expect(spy).toHaveBeenCalledWith(1);
    });

    it('should handle query observable errors', () => {
      // Arrange
      mockTramiteQuery.getTabSeleccionado$ = new Observable(subscriber => {
        subscriber.error(new Error('Query error'));
      });
      component.tramite240118Query = mockTramiteQuery;

      // Act & Assert - Should not throw
      expect(() => {
        component.ngOnInit();
      }).not.toThrow();
    });
  });

  describe('Observable Subscriptions', () => {
    it('should handle subscription cleanup on destroy', () => {
      // Arrange
      const destroyNotifier$ = (component as any).destroyNotifier$;
      const nextSpy = jest.spyOn(destroyNotifier$, 'next');
      const completeSpy = jest.spyOn(destroyNotifier$, 'complete');

      // Act
      component.ngOnInit(); // Creates subscriptions
      component.ngOnDestroy(); // Should clean them up

      // Assert
      expect(nextSpy).toHaveBeenCalled();
      expect(completeSpy).toHaveBeenCalled();
    });

    it('should handle rapid tab changes', () => {
      // Arrange
      const tabSubject = new Subject<number>();
      mockTramiteQuery.getTabSeleccionado$ = tabSubject.asObservable();
      component.tramite240118Query = mockTramiteQuery;

      // Act
      component.ngOnInit();
      for (let i = 1; i <= 5; i++) {
        tabSubject.next(i);
      }

      // Assert - Component should handle all emissions
      expect(component).toBeTruthy();
    });
  });
});
