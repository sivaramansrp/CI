// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DestinatarioFinalComponent } from './destinatario-final.component';
import { FormBuilder } from '@angular/forms';
import { Location } from '@angular/common';
import { MaterialesPeligrososService } from '../../services/materiales-peligrosos.service';
import { Tramite230501Store } from '../../estados/stores/tramite230501Store.store';
import { Tramite230501Query } from '../../estados/queries/tramite230501Query.query';
import { SeccionLibQuery, SeccionLibStore } from '@libs/shared/data-access-user/src';
import { ActivatedRoute, Router } from '@angular/router';

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

describe('DestinatarioFinalComponent', () => {
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
    }).overrideComponent(DestinatarioFinalComponent, {

      set: { providers: [{ provide: MaterialesPeligrososService, useClass: MockMaterialesPeligrososService }] }    
    }).compileComponents();
    fixture = TestBed.createComponent(DestinatarioFinalComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #guardarDestinatario()', async () => {
    component.agregarDestinatarioFinal = component.agregarDestinatarioFinal || {};
    component.agregarDestinatarioFinal.value = {
      nombres: {},
      primerApellido: {},
      segundoApellido: {},
      rfc: {},
      lada: {},
      telefono: {},
      correoElectronico: {},
      calle: {},
      numeroExterior: {},
      numeroInterior: {},
      pais: {},
      colonia: {},
      municipio: {},
      localidad: {},
      estado: {},
      codigoPostal: {}
    };
    component.agregarDestinatarioFinal.reset = jest.fn();
    component.destinatarios = component.destinatarios || {};
    component.destinatarios.push = jest.fn();
    component.addDestinatarios = jest.fn();
    component.ubicaccion = component.ubicaccion || {};
    component.ubicaccion.back = jest.fn();
    component.guardarDestinatario();
  });

  it('should run #addDestinatarios()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.addDestinatarioFinalTablaDatos = jest.fn();
    component.addDestinatarios({});
  });

  it('should run #ngOnInit()', async () => {
    component.createrDestinatrioForm = jest.fn();
    component.onTipoPersonaChange = jest.fn();
    component.tipoPersona = component.tipoPersona || {};
    component.tipoPersona.FISICA = 'FISICA';
    component.cargarDatos = jest.fn();
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.destinatarioSujeto = observableOf({});
    component.agregarDestinatarioFinal = component.agregarDestinatarioFinal || {};
    component.agregarDestinatarioFinal.patchValue = jest.fn();
    component.tramiteQuery = component.tramiteQuery || {};
    component.tramiteQuery.esDestinatarioFinalElModoDeEdicion$ = observableOf({});
    component.ngOnInit();
    expect(component.createrDestinatrioForm).toHaveBeenCalled();
    expect(component.onTipoPersonaChange).toHaveBeenCalled();
    expect(component.cargarDatos).toHaveBeenCalled();
    expect(component.agregarDestinatarioFinal.patchValue).toHaveBeenCalled();
  });
  it('should run #addDestinatarios()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.addDestinatarioFinalTablaDatos = jest.fn();
    component.addDestinatarios({});
    expect(component.tramiteStore.addDestinatarioFinalTablaDatos).toHaveBeenCalled();
  });

  it('should run #cargarDatos()', async () => {
    component.materialesPeligrososService = component.materialesPeligrososService || {};
    component.materialesPeligrososService.obtenerListaCodigosPostales = jest.fn().mockReturnValue(observableOf({}));
    component.materialesPeligrososService.obtenerListaPaises = jest.fn().mockReturnValue(observableOf({}));
    component.materialesPeligrososService.obtenerListaEstados = jest.fn().mockReturnValue(observableOf({}));
    component.materialesPeligrososService.obtenerListaMunicipios = jest.fn().mockReturnValue(observableOf({}));
    component.materialesPeligrososService.obtenerListaLocalidades = jest.fn().mockReturnValue(observableOf({}));
    component.materialesPeligrososService.obtenerListaColonias = jest.fn().mockReturnValue(observableOf({}));
    component.cargarDatos();
  });

  it('should run #limpiarFormulario()', async () => {
    component.agregarDestinatarioFinal = component.agregarDestinatarioFinal || {};
    component.agregarDestinatarioFinal.reset = jest.fn();
    component.limpiarFormulario();
  });

  it('should run #cancelar()', async () => {
    component.ubicaccion = component.ubicaccion || {};
    component.ubicaccion.back = jest.fn();
    component.cancelar();
  });

  it('should run #ngOnDestroy()', async () => {
    component.unsubscribe$ = component.unsubscribe$ || {};
    component.unsubscribe$.next = jest.fn();
    component.unsubscribe$.complete = jest.fn();
    component.ngOnDestroy();
  });

});