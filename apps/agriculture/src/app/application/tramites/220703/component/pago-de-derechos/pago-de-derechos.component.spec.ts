// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { FormBuilder } from '@angular/forms';
import { AcuicolaService } from '../../service/acuicola.service';

@Injectable()
class MockAcuicolaService {}

describe('PagoDeDerechosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, PagoDeDerechosComponent],
      declarations: [
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        { provide: AcuicolaService, useClass: MockAcuicolaService }
      ]
    }).overrideComponent(PagoDeDerechosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.iniciarFormulario = jest.fn();
    component.getBancoDatos = jest.fn();
    component.pagoDeCargarDatos = jest.fn();
    component.pagoDerechosRevision = jest.fn();
    component.ngOnInit();
    expect(component.iniciarFormulario).toHaveBeenCalled();
    expect(component.getBancoDatos).toHaveBeenCalled();
    expect(component.pagoDeCargarDatos).toHaveBeenCalled();
    expect(component.pagoDerechosRevision).toHaveBeenCalled();
  });

  it('should run #iniciarFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.iniciarFormulario();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #pagoDeCargarDatos()', async () => {
    component.acuicolaService = component.acuicolaService || {};
    component.acuicolaService.pagoDeCargarDatos = jest.fn().mockReturnValue(observableOf({}));
    component.pagosDeDerechosForm = component.pagosDeDerechosForm || {};
    component.pagosDeDerechosForm.patchValue = jest.fn();
    
  
 
  });

  it('should run #getBancoDatos()', async () => {
    component.acuicolaService = component.acuicolaService || {};
    component.acuicolaService.getBancoDatos = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getBancoDatos();
    expect(component.acuicolaService.getBancoDatos).toHaveBeenCalled();
  });

  it('should run #pagoDerechosRevision()', async () => {
    component.acuicolaService = component.acuicolaService || {};
    component.acuicolaService.getPagoDerechosRevision = jest.fn().mockReturnValue(observableOf({}));
    component.pagosDeDerechosForm = component.pagosDeDerechosForm || {};
    component.pagosDeDerechosForm.patchValue = jest.fn();
    component.pagoDerechosRevision();
    expect(component.acuicolaService.getPagoDerechosRevision).toHaveBeenCalled();
    expect(component.pagosDeDerechosForm.patchValue).toHaveBeenCalled();
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