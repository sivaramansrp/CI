// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { ModificacionComponent } from './modificacion.component';
import { FormBuilder } from '@angular/forms';
import { ModificacionProgramaImmexBajaSubmanufactureraService } from '../../services/modificacion-programa-immex-baja-submanufacturera.service';
import { Tramite80303Query } from '../../estados/tramite80303Query.query';

@Injectable()
class MockModificacionProgramaImmexBajaSubmanufactureraService {}

@Injectable()
class MockTramite80303Query {}

describe('ModificacionComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ModificacionComponent, FormsModule, ReactiveFormsModule ],
      declarations: [],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: ModificacionProgramaImmexBajaSubmanufactureraService, useClass: MockModificacionProgramaImmexBajaSubmanufactureraService },
        { provide: Tramite80303Query, useClass: MockTramite80303Query }
      ]
    }).overrideComponent(ModificacionComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ModificacionComponent);
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
    component.crearFormaulario = jest.fn();
    component.modificacionProgramaImmexBajaSubmanufactureraService = component.modificacionProgramaImmexBajaSubmanufactureraService || {};
    component.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl = jest.fn();
    component.tramite80303Querry = component.tramite80303Querry || {};
    component.tramite80303Querry.selectTramiteState$ = observableOf({
      submanufacturerasTablaDatos: {}
    });
    component.ngOnInit();
    expect(component.crearFormaulario).toHaveBeenCalled();
    expect(component.modificacionProgramaImmexBajaSubmanufactureraService.obtenerRespuestaPorUrl).toHaveBeenCalled();
  });

  it('should run #crearFormaulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.crearFormaulario();
    expect(component.fb.group).toHaveBeenCalled();
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