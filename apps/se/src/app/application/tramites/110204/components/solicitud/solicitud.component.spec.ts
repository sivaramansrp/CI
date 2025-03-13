// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { SolicitudComponent } from './solicitud.component';
import { PeximService, ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { FormBuilder } from '@angular/forms';
import { Tramite110204Store } from '../../estados/tramite110204.store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Injectable()
class MockTramite110204Store {}

describe('SolicitudComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,HttpClientTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        PeximService,
        FormBuilder,
        ValidacionesFormularioService,
        { provide: Tramite110204Store, useClass: MockTramite110204Store }
      ]
    }).overrideComponent(SolicitudComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #datosRegimen', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn();
    const datosRegimen = component.datosRegimen;
    expect(component.FormSolicitud.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #datosMercancia', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn();
    const datosMercancia = component.datosMercancia;
    expect(component.FormSolicitud.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #datosProducto', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn();
    const datosProducto = component.datosProducto;
    expect(component.FormSolicitud.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #registroFederal', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn();
    const registroFederal = component.registroFederal;
    expect(component.FormSolicitud.get).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.inicializaCatalogos = jest.fn();
    component.regimenMercanciaSeleccion = jest.fn();
    component.clasifiRegimenSeleccion = jest.fn();
    component.fraccionArancelariaSeleccion = jest.fn();
    component.nicoSeleccion = jest.fn();
    component.paisOrigenSeleccion = jest.fn();
    component.paisDestinoSeleccion = jest.fn();
    component.estadoSeleccion = jest.fn();
    component.molinoSeleccion = jest.fn();
    component.unidadMedidaTarifariaSeleccion = jest.fn();
    component.representacionFederalSeleccion = jest.fn();
    component.muestraCamposPersona = jest.fn();
    component.ngOnInit();
    expect(component.inicializaCatalogos).toHaveBeenCalled();
    expect(component.regimenMercanciaSeleccion).toHaveBeenCalled();
    expect(component.clasifiRegimenSeleccion).toHaveBeenCalled();
  });

  it('should run #isValid()', async () => {
    component.validacionesService = component.validacionesService || {};
    component.validacionesService.isValid = jest.fn();
    component.isValid({}, {});
    expect(component.validacionesService.isValid).toHaveBeenCalled();
  });

  it('should run #crearFormSolicitud()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.solicitudState = component.solicitudState || {};
    component.solicitudState.fechaSalida = 'fechaSalida';
    component.solicitudState.observaciones = 'observaciones';
    component.solicitudState.observacionMerc = 'observacionMerc';
    component.solicitudState.tipoPersona = 'tipoPersona';
    component.solicitudState.nombre = 'nombre';
    component.solicitudState.representacionFederal = 'representacionFederal';
    component.crearFormSolicitud();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #clasifiRegimenSeleccion()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite110204Store = component.tramite110204Store || {};
    component.tramite110204Store.setClasifiRegimen = jest.fn();
    component.clasifiRegimenSeleccion();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
    expect(component.tramite110204Store.setClasifiRegimen).toHaveBeenCalled();
  });

  it('should run #fraccionArancelariaSeleccion()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite110204Store = component.tramite110204Store || {};
    component.tramite110204Store.setFraccionArancelaria = jest.fn();
    component.fraccionArancelariaSeleccion();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
    expect(component.tramite110204Store.setFraccionArancelaria).toHaveBeenCalled();
  });

  it('should run #nicoSeleccion()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite110204Store = component.tramite110204Store || {};
    component.tramite110204Store.setNico = jest.fn();
    component.nicoSeleccion();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
    expect(component.tramite110204Store.setNico).toHaveBeenCalled();
  });

  it('should run #unidadMedidaTarifariaSeleccion()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite110204Store = component.tramite110204Store || {};
    component.tramite110204Store.setUnidadMedidaTarifaria = jest.fn();
    component.unidadMedidaTarifariaSeleccion();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
    expect(component.tramite110204Store.setUnidadMedidaTarifaria).toHaveBeenCalled();
  });

  it('should run #paisOrigenSeleccion()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite110204Store = component.tramite110204Store || {};
    component.tramite110204Store.setPaisOrigen = jest.fn();
    component.paisOrigenSeleccion();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
    expect(component.tramite110204Store.setPaisOrigen).toHaveBeenCalled();
  });

  it('should run #paisDestinoSeleccion()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite110204Store = component.tramite110204Store || {};
    component.tramite110204Store.setPaisDestino = jest.fn();
    component.paisDestinoSeleccion();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
    expect(component.tramite110204Store.setPaisDestino).toHaveBeenCalled();
  });

  it('should run #molinoSeleccion()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite110204Store = component.tramite110204Store || {};
    component.tramite110204Store.setMolino = jest.fn();
    component.molinoSeleccion();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
    expect(component.tramite110204Store.setMolino).toHaveBeenCalled();
  });

  it('should run #estadoSeleccion()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite110204Store = component.tramite110204Store || {};
    component.tramite110204Store.setEstado = jest.fn();
    component.estadoSeleccion();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
    expect(component.tramite110204Store.setEstado).toHaveBeenCalled();
  });

  it('should run #representacionFederalSeleccion()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite110204Store = component.tramite110204Store || {};
    component.tramite110204Store.setRepresentacionFederal = jest.fn();
    component.representacionFederalSeleccion();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
    expect(component.tramite110204Store.setRepresentacionFederal).toHaveBeenCalled();
  });


  it('should run #escapeHtmlQuotes()', async () => {

    component.escapeHtmlQuotes('value');

  });

  it('should run #personaFisica()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      enable: function() {},
      disable: function() {},
      setValue: function() {}
    });
    component.personaFisica();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
  });

  it('should run #calcularUmtPrecioUnitario()', async () => {
    component.calcularPrecioUnitarioUSD = jest.fn();
    component.calcularUmtPrecioUnitario();
    // expect(component.calcularPrecioUnitarioUSD).toHaveBeenCalled();
  });

  it('should run #calcularPrecioUnitarioUSD()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      setValue: function() {},
      value: {}
    });
    component.trunCar = jest.fn();
    component.calcularPrecioUnitarioUSD();
    // expect(component.FormSolicitud.get).toHaveBeenCalled();
    // expect(component.trunCar).toHaveBeenCalled();
  });

  it('should run #trunCar()', async () => {

    component.trunCar({
      toString: function() {
        return 'ngentest';
      }
    });

  });


});