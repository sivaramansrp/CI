// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Pipe,
  PipeTransform,
  Injectable,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Directive,
  Input,
  Output,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DetalleMercanciaComponent } from './detalle-mercancia.component';
import { FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('DetalleMercanciaComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [FormBuilder],
    })
      .overrideComponent(DetalleMercanciaComponent, {})
      .compileComponents();
    fixture = TestBed.createComponent(DetalleMercanciaComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.formaDetalleMercancia = component.formaDetalleMercancia || {};
    component.formaDetalleMercancia.patchValue = jest.fn();
    component.ngOnInit();
  });

  it('should run #isValid()', async () => {
    component.isValid(
      {
        controls: {
          campo: {
            errors: {},
            touched: {},
          },
        },
        errors: {},
        touched: {},
      },
      {}
    );
  });

  it('should run #eliminarMercancias()', async () => {
    component.eliminarMercancia = component.eliminarMercancia || {};
    component.tablaMercanciasLista = [0];
    component.eliminarMercancia.emit = jest.fn();
    component.eliminarMercancias();
    expect(component.eliminarMercancia.emit).toHaveBeenCalled();
  });

  it('should run #agregarMercancias()', async () => {
    component.formaDetalleMercancia = component.formaDetalleMercancia || {};
    component.formaDetalleMercancia.value = {
      formaFormaceutica: {},
    };
    component.formaDetalleMercancia.reset = jest.fn();
    component.datosFormFormaceutica = component.datosFormFormaceutica || {};
    component.datosFormFormaceutica.find = jest.fn().mockReturnValue([
      {
        id: '1',
      },
    ]);
    component.agregarMercancia = component.agregarMercancia || {};
    component.agregarMercancia.emit = jest.fn();
    component.agregarMercancias();
  });
});
