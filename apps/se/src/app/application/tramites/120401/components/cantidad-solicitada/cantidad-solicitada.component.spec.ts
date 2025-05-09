// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { CantidadSolicitadaComponent } from './cantidad-solicitada.component';
import { FormBuilder } from '@angular/forms';
import { Tramite120401Store } from '../../estados/tramites/tramite120401.store';
import { Tramite120401Query } from '../../estados/queries/tramite120401.query';

@Injectable()
class MockTramite120401Store {}

@Injectable()
class MockTramite120401Query {
  cantidadSolicitada$ = {};
}



describe('CantidadSolicitadaComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ,CantidadSolicitadaComponent],
      declarations: [      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: Tramite120401Store, useClass: MockTramite120401Store },
        { provide: Tramite120401Query, useClass: MockTramite120401Query }
      ]
    }).overrideComponent(CantidadSolicitadaComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(CantidadSolicitadaComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.crearFormulario = jest.fn();
    component.cantidadSolicitada$ = component.cantidadSolicitada$ || {};
    component.cantidadSolicitada$.subscribe = jest.fn().mockReturnValue([
      null
    ]);
    component.form = component.form || {};
    component.form.get = jest.fn().mockReturnValue({
      setValue: function() {}
    });
    component.ngOnInit();
    // expect(component.crearFormulario).toHaveBeenCalled();
    // expect(component.cantidadSolicitada$.subscribe).toHaveBeenCalled();
    // expect(component.form.get).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyed$ = component.destroyed$ || {};
    component.destroyed$.next = jest.fn();
    component.destroyed$.complete = jest.fn();
    component.ngOnDestroy();
    // expect(component.destroyed$.next).toHaveBeenCalled();
    // expect(component.destroyed$.complete).toHaveBeenCalled();
  });

  it('should run #crearFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.crearFormulario();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #esInvalido()', async () => {
    component.form = component.form || {};
    component.form.get = jest.fn().mockReturnValue({
      dirty: {},
      touched: {},
      invalid: {}
    });
    component.esInvalido({});
    // expect(component.form.get).toHaveBeenCalled();
  });

  it('should run #validarYEnviarFormulario()', async () => {
    component.form = component.form || {};
    component.form.invalid = 'invalid';
    component.form.markAllAsTouched = jest.fn();
    component.validarYEnviarFormulario();
    // expect(component.form.markAllAsTouched).toHaveBeenCalled();
  });

  it('should run #getCantidadSolicitada()', async () => {
    component.form = component.form || {};
    component.form.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite120401Store = component.tramite120401Store || {};
    component.tramite120401Store.setCantidadSolicitada = jest.fn();
    component.getCantidadSolicitada();
    // expect(component.form.get).toHaveBeenCalled();
    // expect(component.tramite120401Store.setCantidadSolicitada).toHaveBeenCalled();
  });

});