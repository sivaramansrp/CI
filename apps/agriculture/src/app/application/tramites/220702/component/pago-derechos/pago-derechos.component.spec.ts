// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { PagoDerechosComponent } from './pago-derechos.component';
import { FormBuilder } from '@angular/forms';
import { FitosanitarioService } from '../../service/fitosanitario.service';

@Injectable()
class MockFitosanitarioService { }


describe('PagoDerechosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, PagoDerechosComponent],
      declarations: [
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: FitosanitarioService, useClass: MockFitosanitarioService }
      ]
    }).overrideComponent(PagoDerechosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PagoDerechosComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.iniciarFormulario = jest.fn();
    component.pagoDeCargarDatos = jest.fn();
    component.ngOnInit();
    expect(component.iniciarFormulario).toHaveBeenCalled();
    expect(component.pagoDeCargarDatos).toHaveBeenCalled();
  });

  it('should run #iniciarFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.iniciarFormulario();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #pagoDeCargarDatos()', async () => {
    component.fitosanitarioService = component.fitosanitarioService || {};
    component.fitosanitarioService.pagoDeCargarDatos = jest.fn().mockReturnValue(observableOf({}));
    component.pagosDerechosForm = component.pagosDerechosForm || {};
    component.pagoDeCargarDatos();
    expect(component.fitosanitarioService.pagoDeCargarDatos).toHaveBeenCalled();
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