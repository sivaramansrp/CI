// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { InternaPagoDeDerechosComponent } from './interna-pago-de-derechos.component';
import { FormBuilder } from '@angular/forms';
import { ImportacionDeAcuiculturaService } from '../../servicios/importacion-de-agricultura.service';
import { TramiteStoreQuery } from '../../estados/tramite220701.query';
import { TramiteStore } from '../../estados/tramite220701.store';
import { SeccionLibQuery, SeccionLibStore } from '@libs/shared/data-access-user/src';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
class MockImportacionDeAcuiculturaService {
  obtenerDatos = function() {
    return observableOf({
      formularioPago: {}
    });
  };
}

@Injectable()
class MockTramiteStoreQuery {}

@Injectable()
class MockTramiteStore {}


describe('InternaPagoDeDerechosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule , InternaPagoDeDerechosComponent, HttpClientModule],
      declarations: [
       
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: ImportacionDeAcuiculturaService, useClass: MockImportacionDeAcuiculturaService },
        { provide: TramiteStoreQuery, useClass: MockTramiteStoreQuery },
        { provide: TramiteStore, useClass: MockTramiteStore },
        SeccionLibQuery,
        SeccionLibStore
      ]
    }).overrideComponent(InternaPagoDeDerechosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(InternaPagoDeDerechosComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.tramiteStoreQuery = component.tramiteStoreQuery || {};
    component.tramiteStoreQuery.selectSolicitudTramite$ = observableOf({});
    component.crearFormularioPago = jest.fn();
    component.formularioPago = component.formularioPago || {};
    component.formularioPago.statusChanges = observableOf({});
    component.formularioPago.patchValue = jest.fn();
    component.formularioPago.value = 'value';
    component.formularioPago.get = jest.fn().mockReturnValue({
      status: {}
    });
    component.formularioPago.valid = 'valid';
    component.verificarEstadoDelBoton = jest.fn();
    component.obtenerListaJustificacion = jest.fn();
    component.obtenerListaBanco = jest.fn();
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.setInternaPagoDeDerechosTramite = jest.fn();
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});
    component.seccionQuery.getValue = jest.fn();
    component.seccionStore = component.seccionStore || {};
    component.seccionStore.establecerFormaValida = jest.fn();
    component.ngOnInit();
    // expect(component.crearFormularioPago).toHaveBeenCalled();
    // expect(component.formularioPago.patchValue).toHaveBeenCalled();
    // expect(component.formularioPago.get).toHaveBeenCalled();
    // expect(component.verificarEstadoDelBoton).toHaveBeenCalled();
    // expect(component.obtenerListaJustificacion).toHaveBeenCalled();
    // expect(component.obtenerListaBanco).toHaveBeenCalled();
    // expect(component.tramiteStore.setInternaPagoDeDerechosTramite).toHaveBeenCalled();
    // expect(component.seccionQuery.getValue).toHaveBeenCalled();
    // expect(component.seccionStore.establecerFormaValida).toHaveBeenCalled();
  });

  it('should run #crearFormularioPago()', async () => {
    component.formularioPagoStore = component.formularioPagoStore || {};
    component.formularioPagoStore.exentoPago = 'exentoPago';
    component.formularioPagoStore.justificacion = 'justificacion';
    component.formularioPagoStore.claveReferencia = 'claveReferencia';
    component.formularioPagoStore.cadenaDependencia = 'cadenaDependencia';
    component.formularioPagoStore.banco = 'banco';
    component.formularioPagoStore.llavePago = 'llavePago';
    component.formularioPagoStore.fechaPago = 'fechaPago';
    component.formularioPagoStore.importePago = 'importePago';
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.crearFormularioPago();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #cambioValorRadio()', async () => {
    component.formularioPago = component.formularioPago || {};
    component.formularioPago.patchValue = jest.fn();
    component.crearFormularioPago = jest.fn();
    component.cambioValorRadio({}, {});
    // expect(component.formularioPago.patchValue).toHaveBeenCalled();
    // expect(component.crearFormularioPago).toHaveBeenCalled();
  });

  it('should run #cambioFechaFinal()', async () => {
    component.formularioPago = component.formularioPago || {};
    component.formularioPago.patchValue = jest.fn();
    component.cambioFechaFinal({});
    // expect(component.formularioPago.patchValue).toHaveBeenCalled();
  });

  it('should run #obtenerListaBanco()', async () => {
    component.importacionAcuiculturaServicio = component.importacionAcuiculturaServicio || {};
    component.importacionAcuiculturaServicio.obtenerDetallesDelCatalogo = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerListaBanco();
    // expect(component.importacionAcuiculturaServicio.obtenerDetallesDelCatalogo).toHaveBeenCalled();
  });

  it('should run #verificarEstadoDelBoton()', async () => {
    component.formularioPago = component.formularioPago || {};
    component.formularioPago.valid = 'valid';
    component.importacionAcuiculturaServicio = component.importacionAcuiculturaServicio || {};
    component.importacionAcuiculturaServicio.actualizarFormaValida = jest.fn();
    component.verificarEstadoDelBoton();
    // expect(component.importacionAcuiculturaServicio.actualizarFormaValida).toHaveBeenCalled();
  });

  it('should run #obtenerListaJustificacion()', async () => {
    component.importacionAcuiculturaServicio = component.importacionAcuiculturaServicio || {};
    component.importacionAcuiculturaServicio.obtenerDetallesDelCatalogo = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerListaJustificacion();
    // expect(component.importacionAcuiculturaServicio.obtenerDetallesDelCatalogo).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.actualizarValorAleatorio = jest.fn();
    component.formularioPago = component.formularioPago || {};
    component.formularioPago.value = 'value';
    component.importacionAcuiculturaServicio = component.importacionAcuiculturaServicio || {};
    component.importacionAcuiculturaServicio.actualizarFormularioPago = jest.fn();
    component.setValoresStore({}, {});
    // expect(component.actualizarValorAleatorio).toHaveBeenCalled();
    // expect(component.importacionAcuiculturaServicio.actualizarFormularioPago).toHaveBeenCalled();
  });

  it('should run #actualizarValorAleatorio()', async () => {
    component.formularioPago = component.formularioPago || {};
    component.formularioPago.value = {
      justificacion: {},
      banco: {}
    };
    component.formularioPago.patchValue = jest.fn();
    component.formularioPagoStore = component.formularioPagoStore || {};
    component.formularioPagoStore.exentoPago = 'exentoPago';
    component.actualizarValorAleatorio();
    // expect(component.formularioPago.patchValue).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.unsubscribe$ = component.unsubscribe$ || {};
    component.unsubscribe$.next = jest.fn();
    component.unsubscribe$.complete = jest.fn();
    component.ngOnDestroy();
    // expect(component.unsubscribe$.next).toHaveBeenCalled();
    // expect(component.unsubscribe$.complete).toHaveBeenCalled();
  });

});