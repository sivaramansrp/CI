// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { CertificadoDeOrigenComponent } from './certificado-de-origen.component';
import { CertificadoService } from '../../services/certificado.service';
import { FormBuilder } from '@angular/forms';
import { ValidacionesFormularioService } from '@libs/shared/data-access-user/src';
import { Tramite110219Store } from '../../estados/Tramite110219.store';
import { Tramite110219Query } from '../../estados/Tramite110219.query';

@Injectable()
class MockCertificadoService {}

@Injectable()
class MockTramite110219Store {}

@Injectable()
class MockTramite110219Query {}

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

describe('CertificadoDeOrigenComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ,CertificadoDeOrigenComponent],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: CertificadoService, useClass: MockCertificadoService },
        FormBuilder,
        ValidacionesFormularioService,
        { provide: Tramite110219Store, useClass: MockTramite110219Store },
        { provide: Tramite110219Query, useClass: MockTramite110219Query }
      ]
    }).overrideComponent(CertificadoDeOrigenComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(CertificadoDeOrigenComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #validacionForm', async () => {
    component.cancelacionForm = component.cancelacionForm || {};
    component.cancelacionForm.get = jest.fn();
    const validacionForm = component.validacionForm;
    expect(component.cancelacionForm.get).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.getMercanciaCertificadoTabla = jest.fn();
    component.query = component.query || {};
    component.query.selectSolicitud$ = observableOf({});
    component.donanteDomicilio = jest.fn();
    component.ngOnInit();
    expect(component.getMercanciaCertificadoTabla).toHaveBeenCalled();
    expect(component.donanteDomicilio).toHaveBeenCalled();
  });

  it('should run #validarDestinatarioFormulario()', async () => {
    component.cancelacionForm = component.cancelacionForm || {};
    component.cancelacionForm.invalid = 'invalid';
    component.cancelacionForm.markAllAsTouched = jest.fn();
    component.validarDestinatarioFormulario();
    expect(component.cancelacionForm.markAllAsTouched).toHaveBeenCalled();
  });

  it('should run #getMercanciaCertificadoTabla()', async () => {
    component.certificadoService = component.certificadoService || {};
    component.certificadoService.getMercanciaCertificadoTabla = jest.fn().mockReturnValue(observableOf({}));
    component.getMercanciaCertificadoTabla();
    expect(component.certificadoService.getMercanciaCertificadoTabla).toHaveBeenCalled();
  });

  it('should run #isValid()', async () => {
    component.validacionesService = component.validacionesService || {};
    component.validacionesService.isValid = jest.fn();
    component.isValid({}, {});
    expect(component.validacionesService.isValid).toHaveBeenCalled();
  });

  it('should run #donanteDomicilio()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn().mockReturnValue({
      markAsDirty: function() {},
      markAllAsTouched: function() {},
      invalid: {}
    });
    component.solicitudState = component.solicitudState || {};
    component.solicitudState.motivoCancelacion = 'motivoCancelacion';
    component.solicitudState.fechaExpedicion = 'fechaExpedicion';
    component.solicitudState.fechaVencimiento = 'fechaVencimiento';
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

  it('should run #setValoresStore()', () => {
    component.Tramite110219Store = component.Tramite110219Store || {};
    component.Tramite110219Store.setFraccionArancelaria = jest.fn();
    component.Tramite110219Store.setFraccionRegla = jest.fn();
    component.setValoresStore({
      get: function () {
        return {
          value: {}
        };
      }
    }, 'fraccionArancelaria', 'setFraccionArancelaria');
    component.Tramite110219Store.setFraccionArancelaria()
    expect(component.tramite32502Store.setFraccionArancelaria).toHaveBeenCalled();
    component.setValoresStore({
      get: function () {
        return {
          value: {}
        };
      }
    }, 'fraccionRegla', 'setFraccionRegla');
    component.Tramite110219Store.setFraccionRegla()
    expect(component.Tramite110219Store.setFraccionRegla).toHaveBeenCalled();
  });
 

});