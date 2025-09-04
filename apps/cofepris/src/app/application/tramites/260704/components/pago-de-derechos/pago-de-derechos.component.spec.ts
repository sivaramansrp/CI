// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { Component } from '@angular/core';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { ConsultaService } from '../../service/consulta.service';
import { Tramite260704Store } from '../../estados/Tramite260704.store';
import { Tramite260704Query } from '../../estados/Tramite260704.query';
import { FormBuilder } from '@angular/forms';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

@Injectable()
class MockConsultaService {}

@Injectable()
class MockTramite260704Store {}

@Injectable()
class MockTramite260704Query {}

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

describe('PagoDeDerechosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, PagoDeDerechosComponent, HttpClientTestingModule ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: ConsultaService, useClass: MockConsultaService },
        { provide: Tramite260704Store, useClass: MockTramite260704Store },
        { provide: Tramite260704Query, useClass: MockTramite260704Query },
        FormBuilder,
        ValidacionesFormularioService,
        ConsultaioQuery
      ]
    }).overrideComponent(PagoDeDerechosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    if (component && component.ngOnDestroy) {
      component.ngOnDestroy = function() {};
    }
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.donanteDomicilio = jest.fn();
    component.query = component.query || {};
    component.query.selectSolicitud$ = observableOf({});
    component.obtenerDatosBanco = jest.fn();
    component.inicializarEstadoFormulario = jest.fn();
    component.ngOnInit();
    expect(component.donanteDomicilio).toHaveBeenCalled();
    expect(component.obtenerDatosBanco).toHaveBeenCalled();
    expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
  });

  it('should run #inicializarEstadoFormulario()', async () => {
    component.guardarDatosFormulario = jest.fn();
    component.donanteDomicilio = jest.fn();
    component.soloLectura = true; // Set to true to trigger guardarDatosFormulario
    component.inicializarEstadoFormulario();
    expect(component.guardarDatosFormulario).toHaveBeenCalled();
    expect(component.donanteDomicilio).not.toHaveBeenCalled(); // This should NOT be called when soloLectura is true
  });

  it('should run #guardarDatosFormulario()', async () => {
    component.donanteDomicilio = jest.fn();
    component.pagoDeDerechosForm = component.pagoDeDerechosForm || {};
    component.pagoDeDerechosForm.disable = jest.fn();
    component.pagoDeDerechosForm.enable = jest.fn();
    component.soloLectura = true; // Set to true to trigger disable
    component.guardarDatosFormulario();
    expect(component.donanteDomicilio).toHaveBeenCalled();
    expect(component.pagoDeDerechosForm.disable).toHaveBeenCalled();
    expect(component.pagoDeDerechosForm.enable).not.toHaveBeenCalled(); // Should not be called when soloLectura is true
  });

  it('should run #obtenerDatosBanco()', async () => {
    component.consulta = component.consulta || {};
    component.consulta.obtenerDatosBanco = jest.fn().mockReturnValue(observableOf({}));
    component.bancoCatalogo = component.bancoCatalogo || {};
    component.bancoCatalogo.catalogos = 'catalogos';
    component.obtenerDatosBanco();
    expect(component.consulta.obtenerDatosBanco).toHaveBeenCalled();
  });

  it('should run #cambioFechaPago()', async () => {
    component.pagoDeDerechosForm = component.pagoDeDerechosForm || {};
    component.pagoDeDerechosForm.patchValue = jest.fn();
    component.setValoresStore = jest.fn();
    component.cambioFechaPago({});
    expect(component.pagoDeDerechosForm.patchValue).toHaveBeenCalled();
    expect(component.setValoresStore).toHaveBeenCalled();
  });

  it('should run #isValid()', async () => {
    component.validacionesService = component.validacionesService || {};
    component.validacionesService.isValid = jest.fn();
    component.isValid({}, {});
    expect(component.validacionesService.isValid).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.store = component.store || {};
    component.store.setTestMethod = jest.fn(); // Mock a specific store method
    
    const mockForm = {
      get: jest.fn().mockReturnValue({
        value: 'testValue'
      })
    };
    
    component.setValoresStore(mockForm, 'testField', 'setTestMethod');
    expect(mockForm.get).toHaveBeenCalledWith('testField');
    expect(component.store.setTestMethod).toHaveBeenCalledWith('testValue');
  });

  it('should run #donanteDomicilio()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.solicitudState = component.solicitudState || {};
    component.solicitudState.claveDeReferencia = 'claveDeReferencia';
    component.solicitudState.cadenaDependecia = 'cadenaDependecia';
    component.solicitudState.fechaPago = 'fechaPago';
    component.solicitudState.banco = 'banco';
    component.solicitudState.importeDePago = 'importeDePago';
    component.donanteDomicilio();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyed$ = component.destroyed$ || {};
    component.destroyed$.next = jest.fn();
    component.destroyed$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyed$.next).toHaveBeenCalled();
    expect(component.destroyed$.complete).toHaveBeenCalled();
  });

});