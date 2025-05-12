// @ts-nocheck
import { isPlatformBrowser } from '@angular/common';
import { Component } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Directive } from '@angular/core';
import { Injectable } from '@angular/core';
import { Input } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Output } from '@angular/core';
import { Pipe } from '@angular/core';
import { PipeTransform } from '@angular/core';
import { async } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { of as observableOf } from 'rxjs';
import { throwError } from 'rxjs';

import { InternaPagoDeDerechosComponent } from './interna-pago-de-derechos.component';
import { ImportacionDeAcuiculturaService } from '../../servicios/importacion-de-agricultura.service';
import { SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
import { TramiteStore } from '../../estados/tramite220701.store';
import { TramiteStoreQuery } from '../../estados/tramite220701.query';

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

describe('InternaPagoDeDerechosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        InternaPagoDeDerechosComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
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

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
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
    component.seccionQuery.getValue = jest.fn().mockReturnValue({
      formaValida: {}
    });
    component.seccionStore = component.seccionStore || {};
    component.seccionStore.establecerFormaValida = jest.fn();
    component.ngOnInit();
    expect(component.crearFormularioPago).toHaveBeenCalled();
    expect(component.formularioPago.patchValue).toHaveBeenCalled();
    expect(component.formularioPago.get).toHaveBeenCalled();
    expect(component.verificarEstadoDelBoton).toHaveBeenCalled();
    expect(component.obtenerListaJustificacion).toHaveBeenCalled();
    expect(component.obtenerListaBanco).toHaveBeenCalled();
    expect(component.tramiteStore.setInternaPagoDeDerechosTramite).toHaveBeenCalled();
    expect(component.seccionQuery.getValue).toHaveBeenCalled();
    expect(component.seccionStore.establecerFormaValida).toHaveBeenCalled();
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
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #cambioValorRadio()', async () => {
    component.formularioPago = component.formularioPago || {};
    component.formularioPago.patchValue = jest.fn();
    component.crearFormularioPago = jest.fn();
    component.cambioValorRadio({}, {});
    expect(component.formularioPago.patchValue).toHaveBeenCalled();
    expect(component.crearFormularioPago).toHaveBeenCalled();
  });

  it('should run #cambioFechaFinal()', async () => {
    component.formularioPago = component.formularioPago || {};
    component.formularioPago.patchValue = jest.fn();
    component.cambioFechaFinal({});
    expect(component.formularioPago.patchValue).toHaveBeenCalled();
  });

  it('should run #obtenerListaBanco()', async () => {
    component.importacionAcuiculturaServicio = component.importacionAcuiculturaServicio || {};
    component.importacionAcuiculturaServicio.obtenerDetallesDelCatalogo = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.obtenerListaBanco();
    expect(component.importacionAcuiculturaServicio.obtenerDetallesDelCatalogo).toHaveBeenCalled();
  });

  it('should run #verificarEstadoDelBoton()', async () => {
    component.formularioPago = component.formularioPago || {};
    component.formularioPago.valid = 'valid';
    component.importacionAcuiculturaServicio = component.importacionAcuiculturaServicio || {};
    component.importacionAcuiculturaServicio.actualizarFormaValida = jest.fn();
    component.verificarEstadoDelBoton();
    expect(component.importacionAcuiculturaServicio.actualizarFormaValida).toHaveBeenCalled();
  });

  it('should run #obtenerListaJustificacion()', async () => {
    component.importacionAcuiculturaServicio = component.importacionAcuiculturaServicio || {};
    component.importacionAcuiculturaServicio.obtenerDetallesDelCatalogo = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerListaJustificacion();
    expect(component.importacionAcuiculturaServicio.obtenerDetallesDelCatalogo).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.actualizarValorAleatorio = jest.fn();
    component.formularioPago = component.formularioPago || {};
    component.formularioPago.value = 'value';
    component.importacionAcuiculturaServicio = component.importacionAcuiculturaServicio || {};
    component.importacionAcuiculturaServicio.actualizarFormularioPago = jest.fn();
    component.setValoresStore({}, {});
    expect(component.actualizarValorAleatorio).toHaveBeenCalled();
    expect(component.importacionAcuiculturaServicio.actualizarFormularioPago).toHaveBeenCalled();
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
    expect(component.formularioPago.patchValue).toHaveBeenCalled();
  });

  it('should run #formatearFecha()', async () => {

    component.formatearFecha({
      getDate: function() {
        return {
          toString: function() {
            return {
              padStart: function() {}
            };
          }
        };
      },
      getMonth: function() {},
      getFullYear: function() {}
    });

  });

  it('should run #ngOnDestroy()', async () => {
    component.unsubscribe$ = component.unsubscribe$ || {};
    component.unsubscribe$.next = jest.fn();
    component.unsubscribe$.complete = jest.fn();
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.unsubscribe$.next).toHaveBeenCalled();
    expect(component.unsubscribe$.complete).toHaveBeenCalled();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

});