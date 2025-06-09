// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosSolicitudComponent } from './datos-solicitud.component';
import { PantallasActionService } from '../../services/pantallas-action.service';
import { ValidacionesFormularioService, SeccionLibQuery } from '@ng-mf/data-access-user';
import { Tramite230401Store } from '../../estados/tramite230401.store';
import { FormBuilder } from '@angular/forms';
import { Solicitud230401Query } from '../../estados/queries/solicitud230401.query';
import { SeccionLibStore } from '@libs/shared/data-access-user/src/core/estados/seccion.store';

@Injectable()
class MockPantallasActionService {
  inicializaPasoUnoDatosCatalogos() {}
  inicializaPagoDerechosCatalogo() {}
}

@Injectable()
class MockTramite230401Store {}

@Injectable()
class MockSolicitud230401Query {}



describe('DatosSolicitudComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        DatosSolicitudComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: PantallasActionService, useClass: MockPantallasActionService },
        ValidacionesFormularioService,
        { provide: Tramite230401Store, useClass: MockTramite230401Store },
        FormBuilder,
        { provide: Solicitud230401Query, useClass: MockSolicitud230401Query },
        SeccionLibQuery,
        SeccionLibStore
      ]
    }).overrideComponent(DatosSolicitudComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosSolicitudComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #isValid()', async () => {
    component.validacionesService = component.validacionesService || {};
    component.validacionesService.isValid = jest.fn();
    component.isValid({}, {});
    expect(component.validacionesService.isValid).toHaveBeenCalled();
  });

  it('should run #tipoSolicitudSeleccion()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite230401Store = component.tramite230401Store || {};
    component.tramite230401Store.setTipoSolicitud = jest.fn();
    component.tipoSolicitudSeleccion();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
    expect(component.tramite230401Store.setTipoSolicitud).toHaveBeenCalled();
  });

  it('should run #noDePermisocoferpriseSeleccion()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite230401Store = component.tramite230401Store || {};
    component.tramite230401Store.setNoDePermisocoferprise = jest.fn();
    component.noDePermisocoferpriseSeleccion();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
    expect(component.tramite230401Store.setNoDePermisocoferprise).toHaveBeenCalled();
  });

  it('should run #fraccionArancelariaSeleccion()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.FormSolicitud.patchValue = jest.fn();
    component.tramite230401Store = component.tramite230401Store || {};
    component.tramite230401Store.setDescripcionDeLaFraccion = jest.fn();
    component.tramite230401Store.setFraccionArancelaria = jest.fn();
    component.fraccionArancelariaSeleccion();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
    expect(component.FormSolicitud.patchValue).toHaveBeenCalled();
    expect(component.tramite230401Store.setDescripcionDeLaFraccion).toHaveBeenCalled();
    expect(component.tramite230401Store.setFraccionArancelaria).toHaveBeenCalled();
  });

  it('should run #seleccioneAutorizacion()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite230401Store = component.tramite230401Store || {};
    component.tramite230401Store.setAutorizacion = jest.fn();
    component.seleccioneAutorizacion();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
    expect(component.tramite230401Store.setAutorizacion).toHaveBeenCalled();
  });

  it('should run #numeroCasSeleccione()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.FormSolicitud.patchValue = jest.fn();
    component.tramite230401Store = component.tramite230401Store || {};
    component.tramite230401Store.setDescripcionNoArancelaria = jest.fn();
    component.tramite230401Store.setNombreQuimico = jest.fn();
    component.tramite230401Store.setNumeroCas = jest.fn();
    component.numeroCasSeleccione();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
    expect(component.FormSolicitud.patchValue).toHaveBeenCalled();
    expect(component.tramite230401Store.setDescripcionNoArancelaria).toHaveBeenCalled();
    expect(component.tramite230401Store.setNombreQuimico).toHaveBeenCalled();
    expect(component.tramite230401Store.setNumeroCas).toHaveBeenCalled();
  });

  it('should run #clasificacionSeleccione()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite230401Store = component.tramite230401Store || {};
    component.tramite230401Store.setClasificacion = jest.fn();
    component.clasificacionSeleccione();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
    expect(component.tramite230401Store.setClasificacion).toHaveBeenCalled();
  });

  it('should run #estadoFisicoSeleccione()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite230401Store = component.tramite230401Store || {};
    component.tramite230401Store.setEstadoFisico = jest.fn();
    component.estadoFisicoSeleccione();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
    expect(component.tramite230401Store.setEstadoFisico).toHaveBeenCalled();
  });

  it('should run #datosObjectoSeleccione()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite230401Store = component.tramite230401Store || {};
    component.tramite230401Store.setDatosObjecto = jest.fn();
    component.datosObjectoSeleccione();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
    expect(component.tramite230401Store.setDatosObjecto).toHaveBeenCalled();
  });

  it('should run #unidadDeMedidaSeleccione()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite230401Store = component.tramite230401Store || {};
    component.tramite230401Store.setUnidadDeMedida = jest.fn();
    component.unidadDeMedidaSeleccione();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
    expect(component.tramite230401Store.setUnidadDeMedida).toHaveBeenCalled();
  });

  it('should run #creatFormSolicitud()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.solicitudState = component.solicitudState || {};
    component.solicitudState.tipoSolicitud = 'tipoSolicitud';
    component.solicitudState.autorizada = 'autorizada';
    component.solicitudState.noDePermisocoferprise = 'noDePermisocoferprise';
    component.solicitudState.nombreComercial = 'nombreComercial';
    component.solicitudState.cantidadAutorizada = 'cantidadAutorizada';
    component.solicitudState.fraccionArancelaria = 'fraccionArancelaria';
    component.solicitudState.descripcionDeLaFraccion = 'descripcionDeLaFraccion';
    component.solicitudState.descripcionNoArancelaria = 'descripcionNoArancelaria';
    component.solicitudState.nombreQuimico = 'nombreQuimico';
    component.solicitudState.numeroCas = 'numeroCas';
    component.solicitudState.nombreDeLaMercancia = 'nombreDeLaMercancia';
    component.solicitudState.unNumero = 'unNumero';
    component.solicitudState.datosNombreComercial = 'datosNombreComercial';
    component.solicitudState.datosNumeroComun = 'datosNumeroComun';
    component.solicitudState.datosPorcentaje = 'datosPorcentaje';
    component.solicitudState.datosComponentes = 'datosComponentes';
    component.solicitudState.clasificacion = 'clasificacion';
    component.solicitudState.estadoFisico = 'estadoFisico';
    component.solicitudState.datosObjecto = 'datosObjecto';
    component.solicitudState.especifique = 'especifique';
    component.solicitudState.especifiqueDos = 'especifiqueDos';
    component.solicitudState.cantidad = 'cantidad';
    component.solicitudState.cantidadLetra = 'cantidadLetra';
    component.solicitudState.unidadDeMedida = 'unidadDeMedida';
    component.creatFormSolicitud();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #aggregarListaDeNumeros()', async () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.sustanciasSensiblesTablaDatos = component.sustanciasSensiblesTablaDatos || {};
    component.sustanciasSensiblesTablaDatos.findIndex = jest.fn().mockReturnValue([
      {
        "numeroCAS": {}
      }
    ]);
    component.tramite230401Store = component.tramite230401Store || {};
    component.tramite230401Store.setSustanciasSensiblesTablaDatos = jest.fn();
    component.aggregarListaDeNumeros();
    expect(component.FormSolicitud.get).toHaveBeenCalled();
    expect(component.sustanciasSensiblesTablaDatos.findIndex).toHaveBeenCalled();
    expect(component.tramite230401Store.setSustanciasSensiblesTablaDatos).toHaveBeenCalled();
  });

  it('should run #modificarListaDeNumeros()', async () => {
    component.sustanciasSensiblesSeleccionadas = component.sustanciasSensiblesSeleccionadas || {};
    component.sustanciasSensiblesSeleccionadas = [{
      numeroCAS: {},
      cas: {},
      descripcionNoArancelaria: {},
      nombreQuimico: {}
    }];
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.patchValue = jest.fn();
    component.modificarListaDeNumeros();
    expect(component.FormSolicitud.patchValue).toHaveBeenCalled();
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