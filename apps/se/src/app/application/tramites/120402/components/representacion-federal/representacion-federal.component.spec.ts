// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { RepresentacionFederalComponent } from './representacion-federal.component';
import { FormBuilder } from '@angular/forms';
import { RepresentacionFederalService } from '@ng-mf/data-access-user';
import { Tramite120402Store } from '../../estados/tramites/tramite120402.store';
import { Tramite120402Query } from '../../estados/queries/tramite120402.query';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
class MockTramite120402Store {}

@Injectable()
class MockTramite120402Query {
  entidad$ = {};
  representacion$ = {};
}

describe('RepresentacionFederalComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, RepresentacionFederalComponent , HttpClientModule],
      declarations: [],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        RepresentacionFederalService,
        { provide: Tramite120402Store, useClass: MockTramite120402Store },
        { provide: Tramite120402Query, useClass: MockTramite120402Query }
      ]
    }).overrideComponent(RepresentacionFederalComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(RepresentacionFederalComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.initializeForm = jest.fn();
    component.loadEntidad = jest.fn();
    component.loadRepresentacion = jest.fn();
    component.entidad$ = component.entidad$ || {};
    component.entidad$.subscribe = jest.fn().mockReturnValue([
      null
    ]);
    component.representacionForm = component.representacionForm || {};
    component.representacionForm.get = jest.fn().mockReturnValue({
      setValue: function() {}
    });
    component.representacion$ = component.representacion$ || {};
    component.representacion$.subscribe = jest.fn().mockReturnValue([
      null
    ]);
    component.ngOnInit();
    // expect(component.initializeForm).toHaveBeenCalled();
    // expect(component.loadEntidad).toHaveBeenCalled();
    // expect(component.loadRepresentacion).toHaveBeenCalled();
    // expect(component.entidad$.subscribe).toHaveBeenCalled();
    // expect(component.representacionForm.get).toHaveBeenCalled();
    // expect(component.representacion$.subscribe).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyed$ = component.destroyed$ || {};
    component.destroyed$.next = jest.fn();
    component.destroyed$.complete = jest.fn();
    component.ngOnDestroy();
    // expect(component.destroyed$.next).toHaveBeenCalled();
    // expect(component.destroyed$.complete).toHaveBeenCalled();
  });

  it('should run #initializeForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.initializeForm();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #loadEntidad()', async () => {
    component.service = component.service || {};
    component.service.getEntidad = jest.fn().mockReturnValue(observableOf({}));
    component.loadEntidad();
    // expect(component.service.getEntidad).toHaveBeenCalled();
  });

  it('should run #loadRepresentacion()', async () => {
    component.service = component.service || {};
    component.service.getEntidad = jest.fn().mockReturnValue(observableOf({}));
    component.loadRepresentacion();
    // expect(component.service.getEntidad).toHaveBeenCalled();
  });

  it('should run #getEntidad()', async () => {
    component.representacionForm = component.representacionForm || {};
    component.representacionForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite120402Store = component.tramite120402Store || {};
    component.tramite120402Store.setEntidad = jest.fn();
    component.getEntidad();
    // expect(component.representacionForm.get).toHaveBeenCalled();
    // expect(component.tramite120402Store.setEntidad).toHaveBeenCalled();
  });

  it('should run #getRepresentacion()', async () => {
    component.representacionForm = component.representacionForm || {};
    component.representacionForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite120402Store = component.tramite120402Store || {};
    component.tramite120402Store.setRepresentacion = jest.fn();
    component.getRepresentacion();
    // expect(component.representacionForm.get).toHaveBeenCalled();
    // expect(component.tramite120402Store.setRepresentacion).toHaveBeenCalled();
  });

});