// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';

import { DatosTramiteComponent } from './datos-tramite.component';
import { RegistrarSolicitudService } from '../services/registrar-solicitud.service';
import { FormBuilder } from '@angular/forms';
import { Solicitud290201Store } from '../../../estados/tramites/tramites290201.store';
import { Solicitud290201Query } from '../../../estados/queries/tramites290201.query';


describe('DatosTramiteComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,DatosTramiteComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: RegistrarSolicitudService, useClass: MockRegistrarSolicitudService },
        FormBuilder,
        { provide: Solicitud290201Store, useClass: MockSolicitud290201Store },
        { provide: Solicitud290201Query, useClass: MockSolicitud290201Query }
      ]
    }).overrideComponent(DatosTramiteComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosTramiteComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #datosDelTramiteRealizar', async () => {
    component.informationCafeForm = component.informationCafeForm || {};
    component.informationCafeForm.get = jest.fn();
    const datosDelTramiteRealizar = component.datosDelTramiteRealizar;
    expect(component.informationCafeForm.get).toHaveBeenCalled();
  });

  it('should run #createForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.informationCafeState = component.informationCafeState || {};
    component.informationCafeState.formasdelcafe = 'formasdelcafe';
    component.informationCafeState.tipos = 'tipos';
    component.informationCafeState.calidad = 'calidad';
    component.informationCafeState.procesos = 'procesos';
    component.informationCafeState.certifications = 'certifications';
    component.informationCafeState.adunadesalida = 'adunadesalida';
    component.informationCafeState.paisdestino = 'paisdestino';
    component.informationCafeState.entidaddeprocedencia = 'entidaddeprocedencia';
    component.informationCafeState.ciclocafetalero = 'ciclocafetalero';
    component.createForm();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.solicitud290201Query = component.solicitud290201Query || {};
    component.solicitud290201Query.selectSolicitud$ = observableOf({});
    component.createForm = jest.fn();
    component.getTiposData = jest.fn();
    component.getFormasdelcafeData = jest.fn();
    component.getCalidadData = jest.fn();
    component.getProcesosData = jest.fn();
    component.getAduanadesalidaData = jest.fn();
    component.getEntidadDeProcedenciaData = jest.fn();
    component.getCiclocafetaleroData = jest.fn();
    component.ngOnInit();
    expect(component.createForm).toHaveBeenCalled();
    expect(component.getTiposData).toHaveBeenCalled();
    expect(component.getFormasdelcafeData).toHaveBeenCalled();
    expect(component.getCalidadData).toHaveBeenCalled();
    expect(component.getProcesosData).toHaveBeenCalled();
    expect(component.getAduanadesalidaData).toHaveBeenCalled();
    expect(component.getEntidadDeProcedenciaData).toHaveBeenCalled();
    expect(component.getCiclocafetaleroData).toHaveBeenCalled();
  });

  it('should run #getTiposData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getTiposData = jest.fn().mockReturnValue(observableOf({}));
    component.tiposData = component.tiposData || {};
    component.tiposData.catalogos = 'catalogos';
    component.getTiposData();
    expect(component.registrarsolicitud.getTiposData).toHaveBeenCalled();
  });

  it('should run #getFormasdelcafeData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getFormasdelcafeData = jest.fn().mockReturnValue(observableOf({}));
    component.formasdelcafeData = component.formasdelcafeData || {};
    component.formasdelcafeData.catalogos = 'catalogos';
    component.getFormasdelcafeData();
    expect(component.registrarsolicitud.getFormasdelcafeData).toHaveBeenCalled();
  });

  it('should run #getCalidadData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getCalidadData = jest.fn().mockReturnValue(observableOf({}));
    component.calidadData = component.calidadData || {};
    component.calidadData.catalogos = 'catalogos';
    component.getCalidadData();
    expect(component.registrarsolicitud.getCalidadData).toHaveBeenCalled();
  });

  it('should run #getProcesosData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getProcesosData = jest.fn().mockReturnValue(observableOf({}));
    component.procesosData = component.procesosData || {};
    component.procesosData.catalogos = 'catalogos';
    component.getProcesosData();
    expect(component.registrarsolicitud.getProcesosData).toHaveBeenCalled();
  });

  it('should run #getAduanadesalidaData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getAduanadesalidaData = jest.fn().mockReturnValue(observableOf({}));
    component.adunadesalidaData = component.adunadesalidaData || {};
    component.adunadesalidaData.catalogos = 'catalogos';
    component.getAduanadesalidaData();
    expect(component.registrarsolicitud.getAduanadesalidaData).toHaveBeenCalled();
  });

  it('should run #getEntidadDeProcedenciaData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getEntidadDeProcedenciaData = jest.fn().mockReturnValue(observableOf({}));
    component.entidaddeprocedenciaData = component.entidaddeprocedenciaData || {};
    component.entidaddeprocedenciaData.catalogos = 'catalogos';
    component.getEntidadDeProcedenciaData();
    expect(component.registrarsolicitud.getEntidadDeProcedenciaData).toHaveBeenCalled();
  });

  it('should run #getCiclocafetaleroData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getCiclocafetaleroData = jest.fn().mockReturnValue(observableOf({}));
    component.ciclocafetaleroData = component.ciclocafetaleroData || {};
    component.ciclocafetaleroData.catalogos = 'catalogos';
    component.getCiclocafetaleroData();
    expect(component.registrarsolicitud.getCiclocafetaleroData).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.solicitud290201Store = component.solicitud290201Store || {};
    component.solicitud290201Store.metodoNombre = jest.fn();
    component.setValoresStore({
      get: function() {
        return {
          value: {}
        };
      }
    }, {}, {});
    expect(component.solicitud290201Store.metodoNombre).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyed$ = component.destroyed$ || {};
    component.destroyed$.next = jest.fn();
    component.destroyed$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyed$.next).toHaveBeenCalled();
    expect(component.destroyed$.complete).toHaveBeenCalled();
  });

});