// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { FormBuilder } from '@angular/forms';
import { AcuicolaService } from '../../servicios/acuicola.service';
import { TramiteStoreQuery } from '../../estados/tramite220701.query';
import { TramiteStore } from '../../estados/tramite220701.store';
import { SeccionLibQuery, SeccionLibStore } from '@libs/shared/data-access-user/src';

@Injectable()
class MockAcuicolaService {}

@Injectable()
class MockTramiteStoreQuery {}

@Injectable()
class MockTramiteStore {}
describe('PagoDeDerechosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,PagoDeDerechosComponent ],
      declarations: [
              ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: AcuicolaService, useClass: MockAcuicolaService },
        { provide: TramiteStoreQuery, useClass: MockTramiteStoreQuery },
        { provide: TramiteStore, useClass: MockTramiteStore },
        SeccionLibQuery,
        SeccionLibStore
      ]
    }).overrideComponent(PagoDeDerechosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.debugElement.componentInstance;
  });



  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.tramiteStoreQuery = component.tramiteStoreQuery || {};
    component.tramiteStoreQuery.selectSolicitudTramite$ = observableOf({});
    component.obtenerListaJustificacion = jest.fn();
    component.iniciarFormulario = jest.fn();
    component.getBancoDatos = jest.fn();
    component.pagoDeCargarDatos = jest.fn();
    component.pagoDerechosRevision = jest.fn();
    component.pagosDeDerechosForm = component.pagosDeDerechosForm || {};
    component.pagosDeDerechosForm.patchValue = jest.fn();
    component.pagosDeDerechosForm.statusChanges = observableOf({});
    component.pagosDeDerechosForm.value = 'value';
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.setPagoDeDerechosTramite = jest.fn();
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});
    component.ngOnInit();
    // expect(component.obtenerListaJustificacion).toHaveBeenCalled();
    // expect(component.iniciarFormulario).toHaveBeenCalled();
    // expect(component.getBancoDatos).toHaveBeenCalled();
    // expect(component.pagoDeCargarDatos).toHaveBeenCalled();
    // expect(component.pagoDerechosRevision).toHaveBeenCalled();
    // expect(component.pagosDeDerechosForm.patchValue).toHaveBeenCalled();
    // expect(component.tramiteStore.setPagoDeDerechosTramite).toHaveBeenCalled();
  });

  it('should run #iniciarFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.iniciarFormulario();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #pagoDeCargarDatos()', async () => {
    component.acuicolaService = component.acuicolaService || {};
    component.acuicolaService.pagoDeCargarDatos = jest.fn().mockReturnValue(observableOf({}));
    component.pagosDeDerechosForm = component.pagosDeDerechosForm || {};
    component.pagosDeDerechosForm.patchValue = jest.fn();
    component.pagoDeCargarDatos();
    // expect(component.acuicolaService.pagoDeCargarDatos).toHaveBeenCalled();
    // expect(component.pagosDeDerechosForm.patchValue).toHaveBeenCalled();
  });

  it('should run #getBancoDatos()', async () => {
    component.acuicolaService = component.acuicolaService || {};
    component.acuicolaService.getBancoDatos = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getBancoDatos();
    // expect(component.acuicolaService.getBancoDatos).toHaveBeenCalled();
  });

  it('should run #obtenerListaJustificacion()', async () => {
    component.acuicolaService = component.acuicolaService || {};
    component.acuicolaService.obtenerDetallesDelCatalogo = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerListaJustificacion();
    // expect(component.acuicolaService.obtenerDetallesDelCatalogo).toHaveBeenCalled();
  });

  it('should run #pagoDerechosRevision()', async () => {
    component.acuicolaService = component.acuicolaService || {};
    component.acuicolaService.getPagoDerechosRevision = jest.fn().mockReturnValue(observableOf({}));
    component.pagosDeDerechosForm = component.pagosDeDerechosForm || {};
    component.pagosDeDerechosForm.patchValue = jest.fn();
    component.pagoDerechosRevision();
    // expect(component.acuicolaService.getPagoDerechosRevision).toHaveBeenCalled();
    // expect(component.pagosDeDerechosForm.patchValue).toHaveBeenCalled();
  });

  it('should run #cambioValorRadio()', async () => {
    component.pagosDeDerechosForm = component.pagosDeDerechosForm || {};
    component.pagosDeDerechosForm.patchValue = jest.fn();
    component.iniciarFormulario = jest.fn();
    component.cambioValorRadio({}, {});
    // expect(component.pagosDeDerechosForm.patchValue).toHaveBeenCalled();
    // expect(component.iniciarFormulario).toHaveBeenCalled();
  });

  it('should run #cambioValorRadioRevision()', async () => {
    component.pagosDeDerechosForm = component.pagosDeDerechosForm || {};
    component.pagosDeDerechosForm.patchValue = jest.fn();
    component.iniciarFormulario = jest.fn();
    component.cambioValorRadioRevision({}, {});
    // expect(component.pagosDeDerechosForm.patchValue).toHaveBeenCalled();
    // expect(component.iniciarFormulario).toHaveBeenCalled();
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