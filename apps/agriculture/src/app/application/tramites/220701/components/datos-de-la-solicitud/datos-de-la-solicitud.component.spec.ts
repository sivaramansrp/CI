// @ts-nocheck
import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
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

import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { AcuicolaService } from '../../servicios/acuicola.service';
import { MedioDeTransporteService } from '../../servicios/medio-de-transporte';
import { TramiteStoreQuery } from '../../estados/tramite220701.query';
import { TramiteStore } from '../../estados/tramite220701.store';
import { SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';

@Injectable()
class MockAcuicolaService {}

@Injectable()
class MockMedioDeTransporteService {}

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

describe('DatosDeLaSolicitudComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        DatosDeLaSolicitudComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: AcuicolaService, useClass: MockAcuicolaService },
        { provide: MedioDeTransporteService, useClass: MockMedioDeTransporteService },
        ChangeDetectorRef,
        { provide: TramiteStoreQuery, useClass: MockTramiteStoreQuery },
        { provide: TramiteStore, useClass: MockTramiteStore },
        SeccionLibQuery,
        SeccionLibStore
      ]
    }).overrideComponent(DatosDeLaSolicitudComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
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
    component.iniciarFormulario = jest.fn();
    component.getHoraDeInspeccion = jest.fn();
    component.cargarDatos = jest.fn();
    component.getAduanaDeIngreso = jest.fn();
    component.getOficinaDeInspeccion = jest.fn();
    component.getPuntoDeInspeccion = jest.fn();
    component.getTipoContenedor = jest.fn();
    component.obtenerResponsableDatos = jest.fn();
    component.getMedioDeTransporte = jest.fn();
    component.datosDeLaSolicitudForm = component.datosDeLaSolicitudForm || {};
    component.datosDeLaSolicitudForm.patchValue = jest.fn();
    component.datosDeLaSolicitudForm.statusChanges = observableOf({});
    component.datosDeLaSolicitudForm.value = 'value';
    component.datosDeLaSolicitudForm.get = jest.fn().mockReturnValue({
      status: {}
    });
    component.datosDeLaSolicitudForm.valid = 'valid';
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.setSolicitudTramite = jest.fn();
    component.fetchData = jest.fn();
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});
    component.seccionQuery.getValue = jest.fn().mockReturnValue({
      formaValida: {}
    });
    component.seccionStore = component.seccionStore || {};
    component.seccionStore.establecerFormaValida = jest.fn();
    component.ngOnInit();
    expect(component.iniciarFormulario).toHaveBeenCalled();
    expect(component.getHoraDeInspeccion).toHaveBeenCalled();
    expect(component.cargarDatos).toHaveBeenCalled();
    expect(component.getAduanaDeIngreso).toHaveBeenCalled();
    expect(component.getOficinaDeInspeccion).toHaveBeenCalled();
    expect(component.getPuntoDeInspeccion).toHaveBeenCalled();
    expect(component.getTipoContenedor).toHaveBeenCalled();
    expect(component.obtenerResponsableDatos).toHaveBeenCalled();
    expect(component.getMedioDeTransporte).toHaveBeenCalled();
    expect(component.datosDeLaSolicitudForm.patchValue).toHaveBeenCalled();
    expect(component.datosDeLaSolicitudForm.get).toHaveBeenCalled();
    expect(component.tramiteStore.setSolicitudTramite).toHaveBeenCalled();
    expect(component.fetchData).toHaveBeenCalled();
    expect(component.seccionQuery.getValue).toHaveBeenCalled();
    expect(component.seccionStore.establecerFormaValida).toHaveBeenCalled();
  });

  it('should run #iniciarFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.iniciarFormulario();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #fetchData()', async () => {
    component.medioDeTransporteService = component.medioDeTransporteService || {};
    component.medioDeTransporteService.getDatos = jest.fn().mockReturnValue(observableOf({}));
    component.cdr = component.cdr || {};
    component.cdr.detectChanges = jest.fn();
    component.datosDeLaSolicitudForm = component.datosDeLaSolicitudForm || {};
    component.datosDeLaSolicitudForm.patchValue = jest.fn();
    component.fetchData();
    expect(component.medioDeTransporteService.getDatos).toHaveBeenCalled();
    expect(component.cdr.detectChanges).toHaveBeenCalled();
    expect(component.datosDeLaSolicitudForm.patchValue).toHaveBeenCalled();
  });

  it('should run #mostrarColapsable()', async () => {

    component.mostrarColapsable();

  });

  it('should run #cargarDatos()', async () => {
    component.acuicolaService = component.acuicolaService || {};
    component.acuicolaService.obtenerDatosCertificados = jest.fn().mockReturnValue(observableOf({}));
    component.datosDeLaSolicitudForm = component.datosDeLaSolicitudForm || {};
    component.datosDeLaSolicitudForm.patchValue = jest.fn();
    component.cargarDatos();
    expect(component.acuicolaService.obtenerDatosCertificados).toHaveBeenCalled();
    expect(component.datosDeLaSolicitudForm.patchValue).toHaveBeenCalled();
  });

  it('should run #getHoraDeInspeccion()', async () => {
    component.acuicolaService = component.acuicolaService || {};
    component.acuicolaService.getHoraDeInspeccion = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getHoraDeInspeccion();
    expect(component.acuicolaService.getHoraDeInspeccion).toHaveBeenCalled();
  });

  it('should run #getAduanaDeIngreso()', async () => {
    component.acuicolaService = component.acuicolaService || {};
    component.acuicolaService.getAduanaDeIngreso = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getAduanaDeIngreso();
    expect(component.acuicolaService.getAduanaDeIngreso).toHaveBeenCalled();
  });

  it('should run #getOficinaDeInspeccion()', async () => {
    component.acuicolaService = component.acuicolaService || {};
    component.acuicolaService.getOficinaDeInspeccion = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getOficinaDeInspeccion();
    expect(component.acuicolaService.getOficinaDeInspeccion).toHaveBeenCalled();
  });

  it('should run #getPuntoDeInspeccion()', async () => {
    component.acuicolaService = component.acuicolaService || {};
    component.acuicolaService.getPuntoDeInspeccion = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getPuntoDeInspeccion();
    expect(component.acuicolaService.getPuntoDeInspeccion).toHaveBeenCalled();
  });

  it('should run #getTipoContenedor()', async () => {
    component.acuicolaService = component.acuicolaService || {};
    component.acuicolaService.getTipoContenedor = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getTipoContenedor();
    expect(component.acuicolaService.getTipoContenedor).toHaveBeenCalled();
  });

  it('should run #getMedioDeTransporte()', async () => {
    component.acuicolaService = component.acuicolaService || {};
    component.acuicolaService.getMedioDeTransporte = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getMedioDeTransporte();
    expect(component.acuicolaService.getMedioDeTransporte).toHaveBeenCalled();
  });

  it('should run #obtenerResponsableDatos()', async () => {
    component.acuicolaService = component.acuicolaService || {};
    component.acuicolaService.obtenerResponsableDatos = jest.fn().mockReturnValue(observableOf({}));
    component.datosDeLaSolicitudForm = component.datosDeLaSolicitudForm || {};
    component.datosDeLaSolicitudForm.patchValue = jest.fn();
    component.obtenerResponsableDatos();
    expect(component.acuicolaService.obtenerResponsableDatos).toHaveBeenCalled();
    expect(component.datosDeLaSolicitudForm.patchValue).toHaveBeenCalled();
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