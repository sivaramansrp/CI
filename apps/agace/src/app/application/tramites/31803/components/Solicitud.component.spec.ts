// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { SolicitudComponent } from './solicitud.component';
import { RegistroSolicitudService } from '../services/registro-solicitud-service.service';
import { FormBuilder } from '@angular/forms';
import { Tramite31803Store } from '../state/Tramite31803.store';
import { Tramite31803Query } from '../state/Tramite31803.query';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';

@Injectable()
class MockRegistroSolicitudService {}

@Injectable()
class MockTramite31803Store {}

@Injectable()
class MockTramite31803Query {}

describe('SolicitudComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ,SolicitudComponent],
      declarations: [
        
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: RegistroSolicitudService, useClass: MockRegistroSolicitudService },
        FormBuilder,
        { provide: Tramite31803Store, useClass: MockTramite31803Store },
        { provide: Tramite31803Query, useClass: MockTramite31803Query },
        ValidacionesFormularioService
      ]
    }).overrideComponent(SolicitudComponent, {

      set: { providers: [{ provide: RegistroSolicitudService, useClass: MockRegistroSolicitudService }] }    
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

  it('should run #ngOnInit()', async () => {
    component.getBancoData = jest.fn();
    component.query = component.query || {};
    component.query.selectSolicitud$ = observableOf({});
    component.donanteDomicilio = jest.fn();
    component.ngOnInit();
    expect(component.getBancoData).toHaveBeenCalled();
    expect(component.donanteDomicilio).toHaveBeenCalled();
  });

  it('should run #cambioFechaFactura()', async () => {
    component.registroForm = component.registroForm || {};
    component.registroForm.patchValue = jest.fn();
    component.setValoresStore = jest.fn();
    component.cambioFechaFactura({});
    expect(component.registroForm.patchValue).toHaveBeenCalled();
    expect(component.setValoresStore).toHaveBeenCalled();
  });

  it('should run #getBancoData()', async () => {
    component.registroSolicitud = component.registroSolicitud || {};
    component.registroSolicitud.getBancoData = jest.fn().mockReturnValue(observableOf({}));
    component.bancoCatalogo = component.bancoCatalogo || {};
    component.bancoCatalogo.catalogos = 'catalogos';
    component.getBancoData();
    expect(component.registroSolicitud.getBancoData).toHaveBeenCalled();
  });

  it('should run #onSubmit()', async () => {
    component.registroForm = component.registroForm || {};
    component.registroForm.valid = 'valid';
    component.onSubmit();

  });

  it('should run #isValid()', async () => {
    component.validacionesService = component.validacionesService || {};
    component.validacionesService.isValid = jest.fn();
    component.isValid({}, {});
    expect(component.validacionesService.isValid).toHaveBeenCalled();
  });

  it('should run #validarDestinatarioFormulario()', async () => {
    component.registroForm = component.registroForm || {};
    component.registroForm.invalid = 'invalid';
    component.registroForm.markAllAsTouched = jest.fn();
    component.validarDestinatarioFormulario();
    expect(component.registroForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.store = component.store || {};
    component.store.metodoNombre = jest.fn();
    component.setValoresStore({
      get: function() {
        return {
          value: {}
        };
      }
    }, {}, {});
    expect(component.store.metodoNombre).toHaveBeenCalled();
  });

  it('should run #donanteDomicilio()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.solicitudState = component.solicitudState || {};
    component.solicitudState.banco = 'banco';
    component.solicitudState.llave = 'llave';
    component.solicitudState.manifiesto1 = 'manifiesto1';
    component.solicitudState.manifiesto2 = 'manifiesto2';
    component.solicitudState.numeroOperacion = 'numeroOperacion';
    component.donanteDomicilio();
    expect(component.fb.group).toHaveBeenCalled();
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