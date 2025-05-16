// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosGeneralesComponent } from './datos-generales.component';
import { ActivatedRoute, Router, ActivatedRoute } from '@angular/router';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { FormBuilder } from '@angular/forms';
import { Tramite260302Store } from '../../estados/tramite260302Store.store';
import { Tramite260302Query } from '../../estados/tramite260302Query.query';

@Injectable()
class MockDatosSolicitudService {
  obtenerListaPaises(): Observable<any>{
    return observableOf([])
  }
}

@Injectable()
class MockTramite260302Store {}

@Injectable()
class MockTramite260302Query {}

@Injectable()
class MockRouter {
  navigate() {};
}

describe('DatosGeneralesComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],

      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: DatosSolicitudService, useClass: MockDatosSolicitudService },
        FormBuilder,
        { provide: Tramite260302Store, useClass: MockTramite260302Store },
        { provide: Tramite260302Query, useClass: MockTramite260302Query },
        { provide: Router, useClass: MockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {url: 'url', params: {}, queryParams: {}, data: {}, paramMap: { get: (key: string) => 'someValue'}},
            url: observableOf('url'),
            params: observableOf({}),
            queryParams: observableOf({}),
            fragment: observableOf('fragment'),
            data: observableOf({})
          }
        }
      ]
    }).overrideComponent(DatosGeneralesComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosGeneralesComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #cargarDatos()', async () => {
    component.datosSolicitudService = component.datosSolicitudService || {};
    component.datosSolicitudService.obtenerListaPaises = jest.fn().mockReturnValue(observableOf({}));
    component.cargarDatos();
    expect(component.datosSolicitudService.obtenerListaPaises).toHaveBeenCalled();
  });

  it('should run #limpiarFormulario()', async () => {
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.reset = jest.fn();
    component.limpiarFormulario();
    expect(component.agregarDatosForm.reset).toHaveBeenCalled();
  });

  it('should run #guardarDatos()', async () => {
    component.tipoTablaDatos = component.tipoTablaDatos || {};
    component.tipoTablaDatos.OTROS = 'OTROS';
    component.addFabricantes = jest.fn();
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.value = 'value';
    component.addFacturadores = jest.fn();
    component.addCertificadoTablaDatos = jest.fn();
    component.addProveedores = jest.fn();
    component.addOtros = jest.fn();
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.guardarDatos();

  });

  it('should run #addDestinario()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateDestinatarioTablaDatos = jest.fn();
    component.addDestinatario({});
  });


  it('should run #addOtros()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateOtrosTablaDatos = jest.fn();
    component.addOtros({});
  });



});