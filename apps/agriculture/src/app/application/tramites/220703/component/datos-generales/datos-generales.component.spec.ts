// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosGeneralesComponent } from './datos-generales.component';
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


describe('DatosGeneralesComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, DatosGeneralesComponent],
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
    }).overrideComponent(DatosGeneralesComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosGeneralesComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.tramiteStoreQuery = component.tramiteStoreQuery || {};
    component.tramiteStoreQuery.selectSolicitudTramite$ = observableOf({});
    component.iniciarFormulario = jest.fn();
    component.getAduanaDeIngreso = jest.fn();
    component.getOficinaDeInspeccion = jest.fn();
    component.getPuntoDeInspeccion = jest.fn();
    component.getRegimenAlQueSeDestinara = jest.fn();
    component.getPuntoDeVerificacion = jest.fn();
    component.getDatosParaMovilizacion = jest.fn();
    component.getMercanciaTablaDatos = jest.fn();
    component.datosGeneralesForm = component.datosGeneralesForm || {};
    component.datosGeneralesForm.patchValue = jest.fn();
    component.datosGeneralesForm.statusChanges = observableOf({});
    component.datosGeneralesForm.value = 'value';
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.setSolicitudTramite = jest.fn();
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});
    component.ngOnInit();
    expect(component.iniciarFormulario).toHaveBeenCalled();
    expect(component.getAduanaDeIngreso).toHaveBeenCalled();
    expect(component.getOficinaDeInspeccion).toHaveBeenCalled();
    expect(component.getPuntoDeInspeccion).toHaveBeenCalled();
    expect(component.getRegimenAlQueSeDestinara).toHaveBeenCalled();
    expect(component.getPuntoDeVerificacion).toHaveBeenCalled();
    expect(component.getDatosParaMovilizacion).toHaveBeenCalled();


  });

  it('should run #iniciarFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.iniciarFormulario();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #getMercanciaTablaDatos()', async () => {
    component.acuicolaService = component.acuicolaService || {};
    component.acuicolaService.getMercanciaDatos = jest.fn().mockReturnValue(observableOf({}));
    component.getMercanciaTablaDatos();
    expect(component.acuicolaService.getMercanciaDatos).toHaveBeenCalled();
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

  it('should run #getRegimenAlQueSeDestinara()', async () => {
    component.acuicolaService = component.acuicolaService || {};
    component.acuicolaService.getRegimenAlQueSeDestinara = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getRegimenAlQueSeDestinara();
    expect(component.acuicolaService.getRegimenAlQueSeDestinara).toHaveBeenCalled();
  });

  it('should run #getDatosParaMovilizacion()', async () => {
    component.acuicolaService = component.acuicolaService || {};
    component.acuicolaService.getDatosParaMovilizacion = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getDatosParaMovilizacion();
    expect(component.acuicolaService.getDatosParaMovilizacion).toHaveBeenCalled();
  });

  it('should run #getPuntoDeVerificacion()', async () => {
    component.acuicolaService = component.acuicolaService || {};
    component.acuicolaService.getPuntoDeVerificacion = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getPuntoDeVerificacion();
    expect(component.acuicolaService.getPuntoDeVerificacion).toHaveBeenCalled();
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