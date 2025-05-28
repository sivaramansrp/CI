// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder } from '@angular/forms';
import { AcuicolaService } from '../../service/acuicola.service';
import { TramiteStoreQuery } from '../../estados/tramite220703.query';
import { TramiteStore } from '../../estados/tramite220703.store';
import { SeccionLibQuery, SeccionLibStore } from '@libs/shared/data-access-user/src';

@Injectable()
class MockAcuicolaService { }

@Injectable()
class MockTramiteStoreQuery { }

@Injectable()
class MockTramiteStore { }

describe('DatosDeLaSolicitudComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, DatosDeLaSolicitudComponent],
      declarations: [

      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: AcuicolaService, useClass: MockAcuicolaService },
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
    component.getMercanciaDatos = jest.fn();
    component.datosDeLaSolicitudForm = component.datosDeLaSolicitudForm || {};
    component.datosDeLaSolicitudForm.patchValue = jest.fn();
    component.datosDeLaSolicitudForm.statusChanges = observableOf({});
    component.datosDeLaSolicitudForm.value = 'value';
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.setSolicitudTramite = jest.fn();
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});
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

   
  
  });

  it('should run #iniciarFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.iniciarFormulario();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #mostrarColapsable()', async () => {

    component.mostrarColapsable();

  });

  it('should run #cambioFechaFinal()', async () => {
    component.datosDeLaSolicitudForm = component.datosDeLaSolicitudForm || {};
    component.datosDeLaSolicitudForm.get = jest.fn().mockReturnValue({
      markAsUntouched: function () { },
      setValue: function () { }
    });

  
 
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

  it('should run #getMercanciaDatos()', async () => {
    component.acuicolaService = component.acuicolaService || {};
    component.acuicolaService.getDatosMercancia = jest.fn().mockReturnValue(observableOf({}));
    component.getMercanciaDatos();
    expect(component.acuicolaService.getDatosMercancia).toHaveBeenCalled();
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
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.unsubscribe = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.unsubscribe).toHaveBeenCalled();
  });

});