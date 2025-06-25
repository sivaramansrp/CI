// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { SolicitudComponent } from './solicitud.component';
import { FormBuilder } from '@angular/forms';
import { Tramite6402Store } from '../../estados/tramite6402.store';
import { Tramite6402Query } from '../../estados/tramite6402.query';
import { AutorizacionImportacionService } from '../../services/autorizacion-importacion.service';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

@Injectable()
class MockTramite6402Store {}

@Injectable()
class MockTramite6402Query {}

@Injectable()
class MockAutorizacionImportacionService {}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'phoneNumber'})
class PhoneNumberPipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'safeHtml'})
class SafeHtmlPipe implements PipeTransform {
  transform(value) { return value; }
}

describe('SolicitudComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ SolicitudComponent, FormsModule, ReactiveFormsModule ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: Tramite6402Store, useClass: MockTramite6402Store },
        { provide: Tramite6402Query, useClass: MockTramite6402Query },
        { provide: AutorizacionImportacionService, useClass: MockAutorizacionImportacionService },
        ValidacionesFormularioService,
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

  it('should run GetterDeclaration #datosPedimento', async () => {
    component.solicitudFormulario = component.solicitudFormulario || {};
    component.solicitudFormulario.get = jest.fn();
    const datosPedimento = component.datosPedimento;
    expect(component.solicitudFormulario.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #datosMedioTransporte', async () => {
    component.solicitudFormulario = component.solicitudFormulario || {};
    component.solicitudFormulario.get = jest.fn();
    const datosMedioTransporte = component.datosMedioTransporte;
    expect(component.solicitudFormulario.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #datosDestinoMercancia', async () => {
    component.solicitudFormulario = component.solicitudFormulario || {};
    component.solicitudFormulario.get = jest.fn();
    const datosDestinoMercancia = component.datosDestinoMercancia;
    expect(component.solicitudFormulario.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #datosAduana', async () => {
    component.solicitudFormulario = component.solicitudFormulario || {};
    component.solicitudFormulario.get = jest.fn();
    const datosAduana = component.datosAduana;
    expect(component.solicitudFormulario.get).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.tramiteQuery = component.tramiteQuery || {};
    component.tramiteQuery.selectSolicitud$ = observableOf({});
    component.consultaioQuery = component.consultaioQuery || {};
    component.consultaioQuery.selectConsultaioState$ = observableOf({});
    component.inicializarEstadoFormulario = jest.fn();
    component.inicializarFormulario = jest.fn();
    component.cargarFederativa = jest.fn();
    component.cargarAduanas = jest.fn();
    component.cargarAduaneras = jest.fn();
    component.cargarRecintoFiscalizado = jest.fn();
    component.cargarTipoDeDocumento = jest.fn();
    component.cargarMedioDeTransporte = jest.fn();
    component.cargarPaisDeProcedencia = jest.fn();
    component.cargarSiNo = jest.fn();
    component.cargarTipoDeDestino = jest.fn();
    component.inicializarMercanciaFormulario = jest.fn();
    component.ngOnInit();
    expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
    expect(component.inicializarFormulario).toHaveBeenCalled();
    expect(component.cargarFederativa).toHaveBeenCalled();
    expect(component.cargarAduanas).toHaveBeenCalled();
    expect(component.cargarAduaneras).toHaveBeenCalled();
    expect(component.cargarRecintoFiscalizado).toHaveBeenCalled();
    expect(component.cargarTipoDeDocumento).toHaveBeenCalled();
    expect(component.cargarMedioDeTransporte).toHaveBeenCalled();
    expect(component.cargarPaisDeProcedencia).toHaveBeenCalled();
    expect(component.cargarSiNo).toHaveBeenCalled();
    expect(component.cargarTipoDeDestino).toHaveBeenCalled();
    expect(component.inicializarMercanciaFormulario).toHaveBeenCalled();
  });
  it('should run #cargarAduaneras()', async () => {
    component.autorizacionImportacionService = component.autorizacionImportacionService || {};
    component.autorizacionImportacionService.obtenerAduaneras = jest.fn().mockReturnValue(observableOf({
      datos: {}
    }));
    component.cargarAduaneras();
    expect(component.autorizacionImportacionService.obtenerAduaneras).toHaveBeenCalled();
  });

  it('should run #cargarAduanas()', async () => {
    component.autorizacionImportacionService = component.autorizacionImportacionService || {};
    component.autorizacionImportacionService.obtenerAduanas = jest.fn().mockReturnValue(observableOf({
      datos: {}
    }));
    component.cargarAduanas();
    expect(component.autorizacionImportacionService.obtenerAduanas).toHaveBeenCalled();
  });

  it('should run #cargarRecintoFiscalizado()', async () => {
    component.autorizacionImportacionService = component.autorizacionImportacionService || {};
    component.autorizacionImportacionService.obtenerRecintoFiscalizado = jest.fn().mockReturnValue(observableOf({
      datos: {}
    }));
    component.cargarRecintoFiscalizado();
    expect(component.autorizacionImportacionService.obtenerRecintoFiscalizado).toHaveBeenCalled();
  });

  it('should run #cargarTipoDeDocumento()', async () => {
    component.autorizacionImportacionService = component.autorizacionImportacionService || {};
    component.autorizacionImportacionService.obtenerTipoDeDocumento = jest.fn().mockReturnValue(observableOf({
      datos: {}
    }));
    component.cargarTipoDeDocumento();
    expect(component.autorizacionImportacionService.obtenerTipoDeDocumento).toHaveBeenCalled();
  });

  it('should run #cargarMedioDeTransporte()', async () => {
    component.autorizacionImportacionService = component.autorizacionImportacionService || {};
    component.autorizacionImportacionService.obtenerMedioDeTransporte = jest.fn().mockReturnValue(observableOf({
      datos: {}
    }));
    component.cargarMedioDeTransporte();
    expect(component.autorizacionImportacionService.obtenerMedioDeTransporte).toHaveBeenCalled();
  });

  it('should run #cargarPaisDeProcedencia()', async () => {
    component.autorizacionImportacionService = component.autorizacionImportacionService || {};
    component.autorizacionImportacionService.obtenerPaisDeProcedencia = jest.fn().mockReturnValue(observableOf({
      datos: {}
    }));
    component.cargarPaisDeProcedencia();
    expect(component.autorizacionImportacionService.obtenerPaisDeProcedencia).toHaveBeenCalled();
  });

  it('should run #cargarSiNo()', async () => {
    component.autorizacionImportacionService = component.autorizacionImportacionService || {};
    component.autorizacionImportacionService.obtenerSiNo = jest.fn().mockReturnValue(observableOf({
      datos: {}
    }));
    component.cargarSiNo();
    expect(component.autorizacionImportacionService.obtenerSiNo).toHaveBeenCalled();
  });

  it('should run #cargarTipoDeDestino()', async () => {
    component.autorizacionImportacionService = component.autorizacionImportacionService || {};
    component.autorizacionImportacionService.obtenerTipoDeDestino = jest.fn().mockReturnValue(observableOf({
      datos: {}
    }));
    component.cargarTipoDeDestino();
    expect(component.autorizacionImportacionService.obtenerTipoDeDestino).toHaveBeenCalled();
  });

  it('should run #cargarFederativa()', async () => {
    component.autorizacionImportacionService = component.autorizacionImportacionService || {};
    component.autorizacionImportacionService.obtenerFederativa = jest.fn().mockReturnValue(observableOf({
      datos: {}
    }));
    component.cargarFederativa();
    expect(component.autorizacionImportacionService.obtenerFederativa).toHaveBeenCalled();
  });

  it('should run #inicializarFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.tramiteState = component.tramiteState || {};
    component.tramiteState.solicitudFormulario = 'solicitudFormulario';
    component.inicializarEstadoFormulario = jest.fn();
    component.inicializarFormulario();
    expect(component.fb.group).toHaveBeenCalled();
    expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
  });

  it('should run #inicializarMercanciaFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.tramiteState = component.tramiteState || {};
    component.tramiteState.mercanciaFormulario = 'mercanciaFormulario';
    component.inicializarMercanciaFormulario();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #isValid()', async () => {
    component.validacionesService = component.validacionesService || {};
    component.validacionesService.isValid = jest.fn();
    component.isValid({}, {});
    expect(component.validacionesService.isValid).toHaveBeenCalled();
  });

  it('should run #filaSeleccionada()', async () => {

    component.filaSeleccionada({});

  });

  it('should run #cargarMercanciaTabla()', async () => {
    component.autorizacionImportacionService = component.autorizacionImportacionService || {};
    component.autorizacionImportacionService.obtenerSolicitudTabla = jest.fn().mockReturnValue(observableOf({
      datos: {}
    }));
    component.tablaDeDatos = component.tablaDeDatos || {};
    component.tablaDeDatos.datos = 'datos';
    component.cargarMercanciaTabla();
    expect(component.autorizacionImportacionService.obtenerSolicitudTabla).toHaveBeenCalled();
  });

  it('should run #agregarMercancia()', async () => {
    component.cargarMercanciaTabla = jest.fn();
    component.closeMercancia = component.closeMercancia || {};
    component.closeMercancia.nativeElement = {
      click: function() {}
    };
    component.abrirModal = jest.fn();
    component.agregarMercancia();
    expect(component.cargarMercanciaTabla).toHaveBeenCalled();
    expect(component.abrirModal).toHaveBeenCalled();
  });

  it('should run #abrirModal()', async () => {

    component.abrirModal();

  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

});