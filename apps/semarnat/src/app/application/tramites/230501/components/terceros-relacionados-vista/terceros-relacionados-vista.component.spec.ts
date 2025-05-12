// @ts-nocheck
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Injectable, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { Component } from '@angular/core';
import { TercerosRelacionadosVistaComponent } from './terceros-relacionados-vista.component';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { MaterialesPeligrososService } from '../../services/materiales-peligrosos.service';
import { Tramite230501Store } from '../../estados/stores/tramite230501Store.store';
import { Tramite230501Query } from '../../estados/queries/tramite230501Query.query';
import { SeccionLibQuery, SeccionLibStore } from '@libs/shared/data-access-user/src';
import { ActivatedRoute, Router } from '@angular/router';


@Injectable()
class MockMaterialesPeligrososService {
  obtenerRespuestaPorUrl = function () { };
  obtenerListaCodigosPostales = jest.fn().mockReturnValue(observableOf({}));
  obtenerListaPaises = jest.fn().mockReturnValue(observableOf({}));
  obtenerListaEstados = jest.fn().mockReturnValue(observableOf({}));
  obtenerListaMunicipios = jest.fn().mockReturnValue(observableOf({}));
  obtenerListaLocalidades = jest.fn().mockReturnValue(observableOf({}));
  obtenerListaColonias = jest.fn().mockReturnValue(observableOf({}));
}

@Injectable()
class MockTramite230501Store { }

@Injectable()
class MockTramite230501Query { }
@Injectable()
class MockRouter {
  navigate() { }
}

describe('TercerosRelacionadosVistaComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
           imports: [FormsModule, ReactiveFormsModule],
             declarations: [],
             schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
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
                   snapshot: { url: 'url', params: {}, queryParams: {}, data: {} },
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
    component.tramiteQuery.selectTramiteState$ = observableOf({});
    component.tramiteQuery.getDestinatarioFinalTablaDatos$ = observableOf({});
    component.tramiteQuery.getRepresentanteTablaDatos$ = observableOf({});
    component.tramiteQuery.getUsuarioTablaDatos$ = observableOf({});
    component.pestanaValidar = jest.fn();
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
    component.tramiteStore.update = jest.fn().mockReturnValue([
      null
    ]);
    component.tramiteStore.destinatarioSujeto = {
      next: function() {}
    };
    component.modificarDestinatario();
  });

  it('should run #modificarRepresentanteLegal()', async () => {
    component.irAAcciones = jest.fn();
    component.representanteFilaSeleccionada = component.representanteFilaSeleccionada || {};
    component.representanteFilaSeleccionada = '0';
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.update = jest.fn().mockReturnValue([
      null
    ]);
    component.tramiteStore.representanteSujeto = {
      next: function() {}
    };
    component.modificarRepresentanteLegal();
  });

  it('should run #modificarUsuarioFinal()', async () => {
    component.irAAcciones = jest.fn();
    component.usoDeFilaSeleccionada = component.usoDeFilaSeleccionada || {};
    component.usoDeFilaSeleccionada = '0';
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.update = jest.fn().mockReturnValue([
      null
    ]);
    component.tramiteStore.usuarioSujeto = {
      next: function() {}
    };
    component.modificarUsuarioFinal();
  });

  it('should run #eliminarDestinatarioFinal()', async () => {
    component.destinatarioFinalFilaSeleccionada = component.destinatarioFinalFilaSeleccionada || {};
    component.destinatarioFinalFilaSeleccionada = '0';
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.eliminarDestinatarioFinal = jest.fn();
    component.pestanaValidar = jest.fn();
    component.eliminarDestinatarioFinal();
  });

  it('should run #eliminarRepresentanteLegal()', async () => {
    component.representanteFilaSeleccionada = component.representanteFilaSeleccionada || {};
    component.representanteFilaSeleccionada = '0';
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.eliminarRepresentanteLegal = jest.fn();
    component.pestanaValidar = jest.fn();
    component.eliminarRepresentanteLegal();;
  });

  it('should run #eliminarUsuarioFinal()', async () => {
    component.usoDeFilaSeleccionada = component.usoDeFilaSeleccionada || {};
    component.usoDeFilaSeleccionada = '0';
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.eliminarUsuarioFinal = jest.fn();
    component.pestanaValidar = jest.fn();
    component.eliminarUsuarioFinal();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroy$ = component.destroy$ || {};
    component.destroy$.next = jest.fn();
    component.ngOnDestroy();
  });

  it('should run #pestanaValidar()', async () => {
    component.tramiteState = component.tramiteState || {};
    component.tramiteState.destinatarioFinalTablaDatos = 'destinatarioFinalTablaDatos';
    component.tramiteState.representanteLegalTablaDatos = 'representanteLegalTablaDatos';
    component.tramiteState.usuarioTablaDatos = 'usuarioTablaDatos';
    component.setFormValida = jest.fn();
    component.pestanaValidar();
  });

  it('should run #setFormValida()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.setFormValida = jest.fn();
    component.setFormValida({});
  });
});
