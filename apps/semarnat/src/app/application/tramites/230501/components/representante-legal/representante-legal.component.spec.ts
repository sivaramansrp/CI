// @ts-nocheck
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Injectable, Input, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { Component } from '@angular/core';
import { RepresentanteLegalComponent } from './representante-legal.component';
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

describe('RepresentanteLegalComponent', () => {
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
    }).overrideComponent(RepresentanteLegalComponent, {

      set: { providers: [{ provide: MaterialesPeligrososService, useClass: MockMaterialesPeligrososService }] }
    }).compileComponents();
    fixture = TestBed.createComponent(RepresentanteLegalComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });



  it('should run #ngOnInit()', async () => {
    component.onTipoPersonaChange = jest.fn();
    component.tipoPersona = component.tipoPersona || {};
    component.tipoPersona.FISICA = 'FISICA';
    component.cargarDatos = jest.fn();
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.representanteSujeto = observableOf({});
    component.representanteLegalForm = component.representanteLegalForm || {};
    component.representanteLegalForm.patchValue = jest.fn();
    component.tramiteQuery = component.tramiteQuery || {};
    component.tramiteQuery.esRepresentanteLegalElModoDeEdicion$ = observableOf({});
    component.ngOnInit();
  });

  it('should run #cargarDatos()', async () => {
    component.materialesPeligrososService = component.materialesPeligrososService || {};
    component.materialesPeligrososService.obtenerListaPaises = jest.fn().mockReturnValue(observableOf({}));
    component.cargarDatos();
  });

  it('should run #guardarRepresentante()', async () => {
    component.representanteLegalForm = component.representanteLegalForm || {};
    component.representanteLegalForm.value = {
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
    component.representanteLegalForm.reset = jest.fn();
    component.setFormValida = jest.fn();
    component.representantes = component.representantes || {};
    component.representantes.push = jest.fn();
    component.updateRepresentanteLegal = jest.fn();
    component.addRepresentanteLegal = jest.fn();
    component.ubicaccion = component.ubicaccion || {};
    component.ubicaccion.back = jest.fn();
    component.guardarRepresentante();
  });

  it('should run #limpiarFormulario()', async () => {
    component.representanteLegalForm = component.representanteLegalForm || {};
    component.representanteLegalForm.reset = jest.fn();
    component.limpiarFormulario();
  });

  it('should run #cancelar()', async () => {
    component.ubicaccion = component.ubicaccion || {};
    component.ubicaccion.back = jest.fn();
    component.cancelar();
  });

  it('should run #setFormValida()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.setFormValida = jest.fn();
    component.setFormValida({});
  });

  it('should run #addRepresentanteLegal()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.addRepresentanteLegalTablaDatos = jest.fn();
    component.addRepresentanteLegal({});
  });

  it('should run #updateRepresentanteLegal()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateRepresentanteLegalTablaDatos = jest.fn();
    component.updateRepresentanteLegal({});
  });

  it('should run #ngOnDestroy()', async () => {
    component.unsubscribe$ = component.unsubscribe$ || {};
    component.unsubscribe$.next = jest.fn();
    component.unsubscribe$.complete = jest.fn();
    component.ngOnDestroy();
  });

});