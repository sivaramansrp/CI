import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosExportadorComponent } from './datos-exportador.component';
import { FormBuilder } from '@angular/forms';
import { PermisoImportacionStore } from '../../estados/permiso-importacion.store';
import { Tramite130120Query } from '../../estados/permiso-importacion.query';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';

@Injectable()
class MockPermisoImportacionStore {}

@Injectable()
class MockTramite130120Query {}

describe('DatosExportadorComponent', () => {
  let fixture: ComponentFixture<DatosExportadorComponent>;
  let component: DatosExportadorComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        DatosExportadorComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: PermisoImportacionStore, useClass: MockPermisoImportacionStore },
        { provide: Tramite130120Query, useClass: MockTramite130120Query },
        ConsultaioQuery
      ]
    }).overrideComponent(DatosExportadorComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosExportadorComponent);
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
    component.query = component.query || {};
    component.query.selectDatos$ = observableOf({});
    component.initActionFormBuild = jest.fn();
    component.consultaquery = component.consultaquery || {};
    component.consultaquery.selectConsultaioState$ = observableOf({});
    await component.ngOnInit();
    // expect(component.initActionFormBuild).toHaveBeenCalled();
  });

  it('should run #initActionFormBuild()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.datosState = component.datosState || {};
    component.datosState.datosExportador = {
      persona_tipo: {},
      personales_nombre: {},
      primer_apellido: {},
      seguna_apellido: {},
      denominación_razón_social_exportador: {},
      domicilio: {},
      observaciones: {}
    };
    component.initActionFormBuild();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #onTipoPersonaExportadorChange()', async () => {
    component.datosExportador = component.datosExportador || {};
    component.datosExportador.get = jest.fn().mockReturnValue({
      clearValidators: function() {},
      setValue: function() {},
      setValidators: function() {},
      updateValueAndValidity: function() {}
    });
    component.store = component.store || {};
    component.store.setExportadorPersona_tipo = jest.fn();
    component.store.setExportadorDenominación_razón_social = jest.fn();
    component.store.setExportadorPersonales_nombre = jest.fn();
    component.store.setExportadorPrimer_apellido = jest.fn();
    component.store.setExportadorSegundo_apellido = jest.fn();
    component.onTipoPersonaExportadorChange({});
    // expect(component.datosExportador.get).toHaveBeenCalled();
    // expect(component.store.setExportadorPersona_tipo).toHaveBeenCalled();
    // expect(component.store.setExportadorDenominación_razón_social).toHaveBeenCalled();
    // expect(component.store.setExportadorPersonales_nombre).toHaveBeenCalled();
    // expect(component.store.setExportadorPrimer_apellido).toHaveBeenCalled();
    // expect(component.store.setExportadorSegundo_apellido).toHaveBeenCalled();
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
    // expect(component.store.metodoNombre).toHaveBeenCalled();
  });

});