// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { Component } from '@angular/core';
import { UsoFinalComponent } from './uso-final.component';
import { FormBuilder } from '@angular/forms';
import { MaterialesPeligrososService } from '../../services/materiales-peligrosos.service';
import { Location } from '@angular/common';
import { Tramite230501Store } from '../../estados/stores/tramite230501Store.store';
import { Tramite230501Query } from '../../estados/queries/tramite230501Query.query';

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

describe('UsoFinalComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
    }).overrideComponent(UsoFinalComponent, {

      set: { providers: [{ provide: MaterialesPeligrososService, useClass: MockMaterialesPeligrososService }] }    
    }).compileComponents();
    fixture = TestBed.createComponent(UsoFinalComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.cargarDatos = jest.fn();
    component.tramiteQuery = component.tramiteQuery || {};
    component.tramiteQuery.getusoTablaDatos$ = observableOf({});
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.getData = jest.fn().mockReturnValue(observableOf({}));
    component.usuarioFinalForm = component.usuarioFinalForm || {};
    component.usuarioFinalForm.patchValue = jest.fn();
    component.ngOnInit();
  });

  it('should run #cargarDatos()', async () => {
    component.materialesPeligrososService = component.materialesPeligrososService || {};
    component.materialesPeligrososService.obtenerListaPaises = jest.fn().mockReturnValue(observableOf({}));
    component.cargarDatos();
  });

  it('should run #guardarUsuarioFinal()', async () => {
    component.usuarioFinalForm = component.usuarioFinalForm || {};
    component.usuarioFinalForm.value = {
      nombres: {},
      primerApellido: {},
      segundoApellido: {},
      telefono: {},
      correoElectronico: {},
      calle: {},
      numeroExterior: {},
      numeroInterior: {},
      pais: {},
      colonia: {},
      estado: {},
      codigoPostal: {}
    };
    component.usuarioFinalForm.reset = jest.fn();
    component.usoFinalForm = component.usoFinalForm || {};
    component.usoFinalForm.value = {
      descripcion: {}
    };
    component.usuarioFinal = component.usuarioFinal || {};
    component.usuarioFinal.push = jest.fn();
    component.addUsuario = jest.fn();
    component.ubicaccion = component.ubicaccion || {};
    component.ubicaccion.back = jest.fn();
    component.guardarUsuarioFinal();

  });

  it('should run #limpiarFormulario()', async () => {
    component.usuarioFinalForm = component.usuarioFinalForm || {};
    component.usuarioFinalForm.reset = jest.fn();
    component.limpiarFormulario();
  });

  it('should run #cancelar()', async () => {
    component.ubicaccion = component.ubicaccion || {};
    component.ubicaccion.back = jest.fn();
    component.cancelar();
 });

  it('should run #addUsuario()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateUsuarioTablaDatos = jest.fn();
    component.addUsuario({});
  });

  it('should run #addUsoFinalTabla()', async () => {
    component.usoFinalForm = component.usoFinalForm || {};
    component.usoFinalForm.value = {
      descripcion: {},
      pais: {}
    };
    component.usoFinalForm.reset = jest.fn();
    component.usoFinals = component.usoFinals || {};
    component.usoFinals.push = jest.fn();
    component.addUsoFinal = jest.fn();
    component.addUsoFinalTabla();
  });

  it('should run #eliminarUsoFinal()', async () => {
    component.usoFinalFilaSeleccionada = component.usoFinalFilaSeleccionada || {};
    component.usoFinalFilaSeleccionada = '0';
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.eliminarUsoFinal = jest.fn();
    component.eliminarUsoFinal();
  });

  it('should run #addUsoFinal()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateUsoFinalTabla = jest.fn();
    component.addUsoFinal({});
  });

  it('should run #ngOnDestroy()', async () => {
    component.unsubscribe$ = component.unsubscribe$ || {};
    component.unsubscribe$.next = jest.fn();
    component.unsubscribe$.complete = jest.fn();
    component.ngOnDestroy();;
  });

});