// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { TercerosRelacionadosVistaComponent } from './terceros-relacionados-vista.component';
import { Tramite260302Store } from '../../estados/tramite260302Store.store';
import { Tramite260302Query } from '../../estados/tramite260302Query.query';
import { Router, ActivatedRoute } from '@angular/router';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { TIPO_ACTUALIZACION } from '../../../../shared/constantes/datos-solicitud.enum';
import { TIPO_TABLA_DATOS } from '../../constants/exporticon-estupefacientes.enum';

@Injectable()
class MockTramite260302Store {
  updateSeleccionadoDestinatarioDatos = jest.fn();
  updateDestinatarioTablaDatos = jest.fn();
  updateSeleccionadoOtrosDatos = jest.fn();
  updateOtrosTablaDatos = jest.fn();
}

@Injectable()
class MockTramite260302Query {
  getdestinatarioTablaDatos$ = observableOf([]);
  getOtrasTablaDatos$ = observableOf([]);
}

@Injectable()
class MockRouter {
  navigate = jest.fn();
}

@Injectable()
class MockConsultaioQuery {
  selectConsultaioState$ = observableOf({
    create: false,
    procedureId: '260302',
    readonly: true
  });
}

describe('TercerosRelacionadosVistaComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],

      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Tramite260302Store, useClass: MockTramite260302Store },
        { provide: Tramite260302Query, useClass: MockTramite260302Query },
        { provide: Router, useClass: MockRouter },
        { provide: ConsultaioQuery, useClass: MockConsultaioQuery },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {url: 'url', params: {}, queryParams: {}, data: {}},
            url: observableOf('url'),
            params: observableOf({}),
            queryParams: observableOf({}),
            fragment: observableOf('fragment'),
            data: observableOf({})
          }
        }
      ]
    }).overrideComponent(TercerosRelacionadosVistaComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(TercerosRelacionadosVistaComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.tramiteQuery = component.tramiteQuery || {};
    component.tramiteQuery.getdestinatarioTablaDatos$ = observableOf([]);
    component.tramiteQuery.getOtrasTablaDatos$ = observableOf([]);
    component.ngOnInit();
    expect(component.destinatarioTablaDatos$).toBeDefined();
    expect(component.otrasTablaDatos$).toBeDefined();
    expect(component.seleccionarFilaNotificacion).toBeDefined();
  });

  it('should run #navigate()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.activatedROute = { relativeTo: {} };
    component.navigate('test-tipo');
    expect(component.router.navigate).toHaveBeenCalledWith(['..', 'agregar-datos-generales', 'test-tipo'], {
      relativeTo: component.activatedROute,
    });
  });

  it('should run #navigateOtros()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.activatedROute = { relativeTo: {} };
    component.navigateOtros();
    expect(component.router.navigate).toHaveBeenCalledWith(['..', 'agregar-otros'], {
      relativeTo: component.activatedROute,
    });
  });

  it('should run #modificarDestinatario() with valid selection', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateSeleccionadoDestinatarioDatos = jest.fn();
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.activatedROute = { relativeTo: {} };
    component.seleccionadaDestinatario = [{ id: 1, nombre: 'Test' }];
    
    component.modificarDestinatario();
    
    expect(component.tramiteStore.updateSeleccionadoDestinatarioDatos).toHaveBeenCalledWith(component.seleccionadaDestinatario);
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('should run #modificarDestinatario() with no selection', async () => {
    component.seleccionadaDestinatario = null;
    component.modificarDestinatario();
    expect(component.mostrarAlerta).toBe(true);
  });

  it('should run #eliminarDestinatario() with valid selection', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateDestinatarioTablaDatos = jest.fn();
    component.seleccionadaDestinatario = [{ id: 1, nombre: 'Test' }];
    
    component.eliminarDestinatario();
    
    expect(component.tramiteStore.updateDestinatarioTablaDatos).toHaveBeenCalledWith(
      component.seleccionadaDestinatario,
      TIPO_ACTUALIZACION.ELIMINAR
    );
  });

  it('should run #eliminarDestinatario() with no selection', async () => {
    component.seleccionadaDestinatario = null;
    component.eliminarDestinatario();
    expect(component.mostrarAlerta).toBe(true);
  });

  it('should run #onFilaDestinatarioSeleccionada()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateDestinatarioTablaDatos = jest.fn();
    const filaSeleccionada = [{ id: 1, nombre: 'Test' }];
    
    component.onFilaDestinatarioSeleccionada(filaSeleccionada);
    
    expect(component.tramiteStore.updateDestinatarioTablaDatos).toHaveBeenCalledWith(filaSeleccionada);
  });

  it('should run #modificarOtros() with valid selection', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateSeleccionadoOtrosDatos = jest.fn();
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.activatedROute = { relativeTo: {} };
    component.seleccionadaOtros = [{ id: 1, nombre: 'Test' }];
    
    component.modificarOtros();
    
    expect(component.tramiteStore.updateSeleccionadoOtrosDatos).toHaveBeenCalledWith(component.seleccionadaOtros);
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('should run #modificarOtros() with no selection', async () => {
    component.seleccionadaOtros = null;
    component.modificarOtros();
    expect(component.mostrarAlerta).toBe(true);
  });

  it('should run #eliminarOtros() with valid selection', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateOtrosTablaDatos = jest.fn();
    component.seleccionadaOtros = [{ id: 1, nombre: 'Test' }];
    
    component.eliminarOtros();
    
    expect(component.tramiteStore.updateOtrosTablaDatos).toHaveBeenCalledWith(
      component.seleccionadaOtros,
      TIPO_ACTUALIZACION.ELIMINAR
    );
  });

  it('should run #eliminarOtros() with no selection', async () => {
    component.seleccionadaOtros = null;
    component.eliminarOtros();
    expect(component.mostrarAlerta).toBe(true);
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroy$ = component.destroy$ || {};
    component.destroy$.next = jest.fn();
    component.destroy$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroy$.next).toHaveBeenCalled();
    expect(component.destroy$.complete).toHaveBeenCalled();
  });

});