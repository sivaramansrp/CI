// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { SolicitudComponent } from './solicitud.component';
import { AvisoService } from '../../services/aviso.service';
import { FormBuilder } from '@angular/forms';
import { ValidacionesFormularioService, ConsultaioQuery } from '@ng-mf/data-access-user';
import { Tramite32502Store } from '../../../../estados/tramites/tramite32502.store';
import { Tramite32502Query } from '../../../../estados/queries/tramite32502.query';

@Injectable()
class MockAvisoService {}

@Injectable()
class MockTramite32502Store {}

@Injectable()
class MockTramite32502Query {}

describe('SolicitudComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule ],
      declarations: [
        SolicitudComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: AvisoService, useClass: MockAvisoService },
        FormBuilder,
        ValidacionesFormularioService,
        { provide: Tramite32502Store, useClass: MockTramite32502Store },
        { provide: Tramite32502Query, useClass: MockTramite32502Query },
        ConsultaioQuery
      ]
    }).overrideComponent(SolicitudComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #adaceForm', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn();
    const adaceForm = component.adaceForm;
    expect(component.FormSolicitud.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #extranjeroAvisoAgace', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn();
    const extranjeroAvisoAgace = component.extranjeroAvisoAgace;
    expect(component.FormSolicitud.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #mercanciaST', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn();
    const mercanciaST = component.mercanciaST;
    expect(component.FormSolicitud.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #direccionST', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn();
    const direccionST = component.direccionST;
    expect(component.FormSolicitud.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #pedimentoST', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn();
    const pedimentoST = component.pedimentoST;
    expect(component.FormSolicitud.get).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.inicializarEstadoFormulario = jest.fn();
    component.inicializaCatalogos = jest.fn();
    component.tramite32502Query = component.tramite32502Query || {};
    component.tramite32502Query.select = jest.fn().mockReturnValue(observableOf({}));
    component.crearFormSolicitud = jest.fn();
    component.ngOnInit();
    expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
    expect(component.inicializaCatalogos).toHaveBeenCalled();
    expect(component.tramite32502Query.select).toHaveBeenCalled();
    expect(component.crearFormSolicitud).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroy$ = component.destroy$ || {};
    component.destroy$.next = jest.fn();
    component.destroy$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroy$.next).toHaveBeenCalled();
    expect(component.destroy$.complete).toHaveBeenCalled();
  });

  it('should run #isValid()', async () => {
    component.validacionesService = component.validacionesService || {};
    component.validacionesService.isValid = jest.fn();
    component.isValid({}, {});
    expect(component.validacionesService.isValid).toHaveBeenCalled();
  });

  it('should run #crearFormSolicitud()', async () => {
    component.tramite32502Query = component.tramite32502Query || {};
    component.tramite32502Query.selectSolicitud$ = observableOf({});
    component.seccionState = component.seccionState || {};
    component.seccionState.adace = 'adace';
    component.seccionState.razonSocial = 'razonSocial';
    component.seccionState.rfc = 'rfc';
    component.seccionState.rfcExtranjero = 'rfcExtranjero';
    component.seccionState.cveFraccionArancelaria = 'cveFraccionArancelaria';
    component.seccionState.reglaFraccion = 'reglaFraccion';
    component.seccionState.nico = 'nico';
    component.seccionState.valorUSD = 'valorUSD';
    component.seccionState.marca = 'marca';
    component.seccionState.peso = 'peso';
    component.seccionState.fechaInicio = 'fechaInicio';
    component.seccionState.numeroSerie = 'numeroSerie';
    component.seccionState.descripcionMercancia = 'descripcionMercancia';
    component.seccionState.informacionExtra = 'informacionExtra';
    component.seccionState.entidadFederativa = 'entidadFederativa';
    component.seccionState.delegacionMunicipio = 'delegacionMunicipio';
    component.seccionState.colonia = 'colonia';
    component.seccionState.calle = 'calle';
    component.seccionState.numeroExterior = 'numeroExterior';
    component.seccionState.numeroInterior = 'numeroInterior';
    component.seccionState.codigoPostal = 'codigoPostal';
    component.seccionState.patenteAutorizacion = 'patenteAutorizacion';
    component.seccionState.rfcAgenteAduanal = 'rfcAgenteAduanal';
    component.seccionState.numeroPedimento = 'numeroPedimento';
    component.seccionState.claveAduana = 'claveAduana';
    component.fb = component.fb || {};
    component.fb.group = jest.fn().mockReturnValue({
      enable: function() {},
      disable: function() {}
    });
    component.crearFormSolicitud();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #inicializaCatalogos()', async () => {
    component.avisoService = component.avisoService || {};
    component.avisoService.getFraccionArancelariaCatalogo = jest.fn().mockReturnValue(observableOf({
      0: "F",
      1: "R",
      2: "A",
      3: "C",
      4: "C",
      5: "I",
      6: "O",
      7: "N",
      8: "_",
      9: "A",
      10: "R",
      11: "A",
      12: "N",
      13: "C",
      14: "E",
      15: "L",
      16: "A",
      17: "T",
      18: "I",
      19: "A",
      20: "$"
    }));
    component.avisoService.getFraccionReglaCatalogo = jest.fn().mockReturnValue(observableOf({
      0: "R",
      1: "E",
      2: "G",
      3: "L",
      4: "A",
      5: "_",
      6: "A",
      7: "R",
      8: "A",
      9: "N",
      10: "C",
      11: "E",
      12: "L",
      13: "A",
      14: "R",
      15: "I",
      16: "A",
      17: "$"
    }));
    component.inicializaCatalogos();
    expect(component.avisoService.getFraccionArancelariaCatalogo).toHaveBeenCalled();
    expect(component.avisoService.getFraccionReglaCatalogo).toHaveBeenCalled();
  });

  it('should run #fraccionArancelariaSeleccion()', async () => {
    component.FormSolicitud = {
      get: jest.fn().mockReturnValue(new FormControl('')),
      disable: jest.fn(),
      enable: jest.fn(),
    } as any;
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.FormSolicitud.disable = jest.fn();
    component.FormSolicitud.enable = jest.fn();
    component.tramite32502Store = component.tramite32502Store || {};
    component.tramite32502Store.setCveFraccionArancelaria = jest.fn();
    component.fraccionArancelariaSeleccion();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
    expect(component.FormSolicitud.disable).toHaveBeenCalled();
    expect(component.FormSolicitud.enable).toHaveBeenCalled();
    expect(component.tramite32502Store.setCveFraccionArancelaria).toHaveBeenCalled();
  });

  it('should run #fraccionReglaSeleccion()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.fraccionReglaSeleccion();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
  });

  it('should run #onEntidadFederativaChange()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.onEntidadFederativaChange();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
  });

  it('should run #sanitizarNumeroPedimento()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.sanitizarNumeroPedimento();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.tramite32502Store = component.tramite32502Store || {};
    component.tramite32502Store.establecerDatos = jest.fn();
    component.setValoresStore({
      get: function() {
        return {
          value: {}
        };
      }
    });
    expect(component.tramite32502Store.establecerDatos).toHaveBeenCalled();
  });

  it('should run #validarFormulario()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.invalid = 'invalid';
    component.FormSolicitud.markAllAsTouched = jest.fn();
    component.validarFormulario();
    expect(component.FormSolicitud.markAllAsTouched).toHaveBeenCalled();
  });

  it('should run #cambioFechaDeIngreso()', async () => {
    component.mercanciaST = component.mercanciaST || {};
    component.mercanciaST.get = jest.fn().mockReturnValue({
      markAsUntouched: function() {},
      setValue: function() {}
    });
    component.tramite32502Store = component.tramite32502Store || {};
    component.tramite32502Store.setFechaInicio = jest.fn();
    component.cambioFechaDeIngreso({});
    expect(component.mercanciaST.get).toHaveBeenCalled();
    expect(component.tramite32502Store.setFechaInicio).toHaveBeenCalled();
  });

  it('should run #inicializarEstadoFormulario()', async () => {
    component.guardarDatosFormulario = jest.fn();
    component.crearFormSolicitud = jest.fn();
    component.inicializarEstadoFormulario();
    expect(component.guardarDatosFormulario).toHaveBeenCalled();
    expect(component.crearFormSolicitud).toHaveBeenCalled();
  });

  it('should run #guardarDatosFormulario()', async () => {
    component.crearFormSolicitud = jest.fn();
    component.guardarDatosFormulario();
    expect(component.crearFormSolicitud).toHaveBeenCalled();
  });

});