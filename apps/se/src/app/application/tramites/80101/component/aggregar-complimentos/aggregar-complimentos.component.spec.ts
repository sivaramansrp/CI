// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { AggregarComplimentosComponent } from './aggregar-complimentos.component';
import { Tramite80101Store } from '../../estados/tramite80101.store';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Injectable()
class MockTramite80101Store {}

@Injectable()
class MockTramite80101Query {
  selectTablaDatosComplimentos$ = {};
  selectTablaDatosComplimentosExtranjera$ = {};
  selectDatosComplimento$ = observableOf({});
}

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

describe('AggregarComplimentosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AggregarComplimentosComponent, FormsModule, ReactiveFormsModule, HttpClientTestingModule ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Tramite80101Store, useClass: MockTramite80101Store },
        { provide: Tramite80101Query, useClass: MockTramite80101Query }
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

  it('should run #accionistasAgregados() aggregarTablaDatosComplimentos', async () => {
    component.store = component.store || {};
    component.store.aggregarTablaDatosComplimentos = jest.fn();
    component.store.aggregarTablaDatosComplimentosExtranjera = jest.fn();
    component.accionistasAgregados({
      rfc: {rfc: '23dsd23'},
    });
    expect(component.store.aggregarTablaDatosComplimentos).toHaveBeenCalled();
  });

    it('should run #accionistasAgregados() aggregarTablaDatosComplimentosExtranjera', async () => {
    component.store = component.store || {};
    component.store.aggregarTablaDatosComplimentos = jest.fn();
    component.store.aggregarTablaDatosComplimentosExtranjera = jest.fn();
    component.accionistasAgregados({});
    expect(component.store.aggregarTablaDatosComplimentosExtranjera).toHaveBeenCalled();
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

  it('should initialize tablaDatosComplimentos$ and tablaDatosComplimentosExtranjera$ observables', async () => {
    expect(component.tablaDatosComplimentos$).toBeDefined();
    expect(component.tablaDatosComplimentosExtranjera$).toBeDefined();
  });

  it('should call store.setDatosComplimentos when modifierComplimentos is invoked', async () => {
    const mockComplimentos = { id: 1, name: 'Test' };
    component.store.setDatosComplimentos = jest.fn();
    component.modifierComplimentos(mockComplimentos);
    expect(component.store.setDatosComplimentos).toHaveBeenCalledWith(mockComplimentos);
  });

  it('should call store.aggregarTablaDatosComplimentos for accionistasAgregados with RFC', async () => {
    const mockAccionista = { rfc: 'RFC123', name: 'Test' };
    component.store.aggregarTablaDatosComplimentos = jest.fn();
    component.store.aggregarTablaDatosComplimentosExtranjera = jest.fn();
    component.accionistasAgregados(mockAccionista);
    expect(component.store.aggregarTablaDatosComplimentos).toHaveBeenCalledWith(mockAccionista);
    expect(component.store.aggregarTablaDatosComplimentosExtranjera).not.toHaveBeenCalled();
  });

  it('should call store.aggregarTablaDatosComplimentosExtranjera for accionistasAgregados without RFC', async () => {
    const mockAccionista = { name: 'Test' };
    component.store.aggregarTablaDatosComplimentos = jest.fn();
    component.store.aggregarTablaDatosComplimentosExtranjera = jest.fn();
    component.accionistasAgregados(mockAccionista);
    expect(component.store.aggregarTablaDatosComplimentosExtranjera).toHaveBeenCalledWith(mockAccionista);
    expect(component.store.aggregarTablaDatosComplimentos).not.toHaveBeenCalled();
  });

  it('should call store.eliminarTablaDatosComplimentos when accionistasEliminados is invoked', async () => {
    const mockAccionistas = [{ id: 1, name: 'Test' }];
    component.store.eliminarTablaDatosComplimentos = jest.fn();
    component.accionistasEliminados(mockAccionistas);
    expect(component.store.eliminarTablaDatosComplimentos).toHaveBeenCalledWith(mockAccionistas);
  });

  it('should call store.eliminarTablaDatosComplimentosExtranjera when accionistasExtranjerosEliminado is invoked', async () => {
    const mockAccionistas = [{ id: 1, name: 'Test' }];
    component.store.eliminarTablaDatosComplimentosExtranjera = jest.fn();
    component.accionistasExtranjerosEliminado(mockAccionistas);
    expect(component.store.eliminarTablaDatosComplimentosExtranjera).toHaveBeenCalledWith(mockAccionistas);
  });

});