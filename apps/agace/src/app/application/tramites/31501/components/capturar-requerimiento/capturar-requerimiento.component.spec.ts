// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { CapturarRequerimientoComponent } from './capturar-requerimiento.component';
import { AutoridadService } from '../../services/autoridad.service';
import { FormBuilder } from '@angular/forms';
import { Tramite31501Store } from '../../../../estados/tramites/tramite31501.store';
import { Tramite31501Query } from '../../../../estados/queries/tramite31501.query';

@Injectable()
class MockAutoridadService {}

@Injectable()
class MockTramite31501Store {}

@Injectable()
class MockTramite31501Query {}

describe('CapturarRequerimientoComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, CapturarRequerimientoComponent ],
      declarations: [],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: AutoridadService, useClass: MockAutoridadService },
        FormBuilder,
        { provide: Tramite31501Store, useClass: MockTramite31501Store },
        { provide: Tramite31501Query, useClass: MockTramite31501Query }
      ]
    }).overrideComponent(CapturarRequerimientoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(CapturarRequerimientoComponent);
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
    component.tramite31501Query = component.tramite31501Query || {};
    component.tramite31501Query.selectSolicitud$ = observableOf({});
    component.inicializarFormulario = jest.fn();
    component.fetchAduanaList = jest.fn();
    component.ngOnInit();
  });

  it('should run #inicializarFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.solicitud31501State = component.solicitud31501State || {};
    component.solicitud31501State.motivoCancelacion = 'motivoCancelacion';
    component.solicitud31501State.tipoDeRequerimiento = 'tipoDeRequerimiento';
    component.inicializarFormulario();
  });

  it('should run #fetchAduanaList()', async () => {
    component.autoridadService = component.autoridadService || {};
    component.autoridadService.getTramiteList = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.tramiteList = component.tramiteList || {};
    component.tramiteList.catalogos = 'catalogos';
    component.fetchAduanaList();
    // expect(component.autoridadService.getTramiteList).toHaveBeenCalled();
  });

});