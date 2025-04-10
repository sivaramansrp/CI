// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { TercerosRelacionadosVistaComponent } from './terceros-relacionados-vista.component';
import { Tramite230501Store } from '../../estados/stores/tramite230501Store.store';
import { Tramite230501Query } from '../../estados/queries/tramite230501Query.query';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable()
class MockMaterialesPeligrososService {
  obtenerRespuestaPorUrl = function() {};
  obtenerListaCodigosPostales = jest.fn().mockReturnValue(observableOf({}));
  obtenerListaPaises = jest.fn().mockReturnValue(observableOf({}));
  obtenerListaEstados = jest.fn().mockReturnValue(observableOf({}));
  obtenerListaMunicipios = jest.fn().mockReturnValue(observableOf({}));
  obtenerListaLocalidades = jest.fn().mockReturnValue(observableOf({}));
  obtenerListaColonias = jest.fn().mockReturnValue(observableOf({}));
}

@Injectable()
class MockTramite230501Store {}

@Injectable()
class MockTramite230501Query {}
@Injectable()
class MockRouter {
  navigate() {};
}



describe('TercerosRelacionadosVistaComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [ FormsModule, ReactiveFormsModule ],
  declarations: [],
        schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
        providers: [
          { provide: Tramite230501Query, useClass: MockTramite230501Query },
          { provide: Tramite230501Store, useClass: MockTramite230501Store },
          { provide: MaterialesPeligrososService, useClass: MockMaterialesPeligrososService },
          SeccionLibStore,
          SeccionLibQuery,
          FormBuilder,
          { provide: Router, useClass: MockRouter },
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
    component.tramiteQuery.getDestinatarioFinalTablaDatos$ = observableOf({});
    component.tramiteQuery.getRepresentanteTablaDatos$ = observableOf({});
    component.tramiteQuery.getUsuarioTablaDatos$ = observableOf({});
    component.ngOnInit();

  });

  it('should run #irAAcciones()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.irAAcciones({});
  });

  it('should run #modificarDestinatario()', async () => {
    component.irAAcciones = jest.fn();
    component.destinatarioFinalFilaSeleccionada = component.destinatarioFinalFilaSeleccionada || {};
    component.destinatarioFinalFilaSeleccionada = '0';
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.dataSubject = {
      next: function() {}
    };
    component.modificarDestinatario();
  });

  it('should run #modificarRepresentanteLegal()', async () => {
    component.irAAcciones = jest.fn();
    component.representanteFilaSeleccionada = component.representanteFilaSeleccionada || {};
    component.representanteFilaSeleccionada = '0';
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.dataSubject = {
      next: function() {}
    };
    component.modificarRepresentanteLegal();
  });

  it('should run #modificarUsuarioFinal()', async () => {
    component.irAAcciones = jest.fn();
    component.usoDeFilaSeleccionada = component.usoDeFilaSeleccionada || {};
    component.usoDeFilaSeleccionada = '0';
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.dataSubject = {
      next: function() {}
    };
    component.modificarUsuarioFinal();
  });

  it('should run #eliminarDestinatarioFinal()', async () => {
    component.destinatarioFinalFilaSeleccionada = component.destinatarioFinalFilaSeleccionada || {};
    component.destinatarioFinalFilaSeleccionada = '0';
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.eliminarDestinatarioFinal = jest.fn();
    component.eliminarDestinatarioFinal();
  });

  it('should run #eliminarRepresentanteLegal()', async () => {
    component.representanteFilaSeleccionada = component.representanteFilaSeleccionada || {};
    component.representanteFilaSeleccionada = '0';
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.eliminarRepresentanteLegal = jest.fn();
    component.eliminarRepresentanteLegal();
  });

  it('should run #eliminarUsuarioFinal()', async () => {
    component.usoDeFilaSeleccionada = component.usoDeFilaSeleccionada || {};
    component.usoDeFilaSeleccionada = '0';
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.eliminarUsuarioFinal = jest.fn();
    component.eliminarUsuarioFinal();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroy$ = component.destroy$ || {};
    component.destroy$.next = jest.fn();
    component.ngOnDestroy();
  });

});