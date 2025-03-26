// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { AggregarComplimentosComponent } from './aggregar-complimentos.component';
import { Tramite80102Store } from '../../estados/tramite80102.store';
import { Tramite80102Query } from '../../estados/tramite80102.query';
import { AutorizacionProgrmaNuevoService } from '../../services/autorizacion-programa-nuevo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Injectable()
class MockTramite80102Store {}

@Injectable()
class MockTramite80102Query {
  selectTablaDatosComplimentos$ = {};
  selectTablaDatosComplimentosExtranjera$ = {};
  selectDatosComplimento$ = observableOf({});
}

describe('AggregarComplimentosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Tramite80102Store, useClass: MockTramite80102Store },
        { provide: Tramite80102Query, useClass: MockTramite80102Query },
      ]
    }).overrideComponent(AggregarComplimentosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(AggregarComplimentosComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #modifierComplimentos()', async () => {
    component.store = component.store || {};
    component.store.setDatosComplimentos = jest.fn();
    component.modifierComplimentos({});
    expect(component.store.setDatosComplimentos).toHaveBeenCalled();
  });

  it('should run #accionistasAgregados()', async () => {
    component.store = component.store || {};
    component.store.aggregarTablaDatosComplimentos = jest.fn();
    component.store.aggregarTablaDatosComplimentosExtranjera = jest.fn();
    component.accionistasAgregados({
      rfc: {}
    });
    expect(component.store.aggregarTablaDatosComplimentos).toHaveBeenCalled();
    // expect(component.store.aggregarTablaDatosComplimentosExtranjera).toHaveBeenCalled();
  });

  it('should run #accionistasEliminados()', async () => {
    component.store = component.store || {};
    component.store.eliminarTablaDatosComplimentos = jest.fn();
    component.accionistasEliminados({});
    expect(component.store.eliminarTablaDatosComplimentos).toHaveBeenCalled();
  });

  it('should run #accionistasExtranjerosEliminado()', async () => {
    component.store = component.store || {};
    component.store.eliminarTablaDatosComplimentosExtranjera = jest.fn();
    component.accionistasExtranjerosEliminado({});
    expect(component.store.eliminarTablaDatosComplimentosExtranjera).toHaveBeenCalled();
  });

});