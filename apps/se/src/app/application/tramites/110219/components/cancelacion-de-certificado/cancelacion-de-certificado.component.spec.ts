// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { CancelacionDeCertificadoComponent } from './cancelacion-de-certificado.component';
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

describe('CancelacionDeCertificadoComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
        CancelacionDeCertificadoComponent,
        CancelacionDeCertificadoComponent,
        CancelacionDeCertificadoComponent,
        imports: [ FormsModule, ReactiveFormsModule ,CancelacionDeCertificadoComponent],
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
    }).overrideComponent(CancelacionDeCertificadoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(CancelacionDeCertificadoComponent);
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
  });

  it('should run #ngOnInit()', async () => {
    component.getTratadoData = jest.fn();
    component.getPaisdata = jest.fn();
    component.getSolicitudesTabla = jest.fn();
    component.query = component.query || {};
    component.query.selectSolicitud$ = observableOf({});
    component.donanteDomicilio = jest.fn();
    component.ngOnInit();
 
  });

  it('should run #cambioFechaInicial()', async () => {
    component.cancelacionForm = component.cancelacionForm || {};
    component.cancelacionForm.patchValue = jest.fn();
    component.setValoresStore = jest.fn();
    component.cambioFechaInicial({});
  });

  it('should run #cambioFechaFinal()', async () => {
    component.cancelacionForm = component.cancelacionForm || {};
    component.cancelacionForm.patchValue = jest.fn();
    component.setValoresStore = jest.fn();
    component.cambioFechaFinal({});
  });

  it('should run #validarDestinatarioFormulario()', async () => {
    component.cancelacionForm = component.cancelacionForm || {};
    component.cancelacionForm.invalid = 'invalid';
    component.cancelacionForm.markAllAsTouched = jest.fn();
    component.validarDestinatarioFormulario();
  });

  it('should run #alBuscarClic()', async () => {

    component.alBuscarClic();

  });

  it('should run #getTratadoData()', async () => {
    component.certificadoService = component.certificadoService || {};
    component.certificadoService.getTratadoData = jest.fn().mockReturnValue(observableOf({}));
    component.tratadoCatalogo = component.tratadoCatalogo || {};
    component.tratadoCatalogo.catalogos = 'catalogos';
    component.getTratadoData();
  });

  it('should run #getPaisdata()', async () => {
    component.certificadoService = component.certificadoService || {};
    component.certificadoService.getTratadoData = jest.fn().mockReturnValue(observableOf({}));
    component.paisCatalogo = component.paisCatalogo || {};
    component.paisCatalogo.catalogos = 'catalogos';
    component.getPaisdata();
  });

  it('should run #getSolicitudesTabla()', async () => {
    component.certificadoService = component.certificadoService || {};
    component.certificadoService.getSolicitudesTabla = jest.fn().mockReturnValue(observableOf({}));
    component.getSolicitudesTabla();
  });

  it('should run #isValid()', async () => {
    component.validacionesService = component.validacionesService || {};
    component.validacionesService.isValid = jest.fn();
    component.isValid({}, {});
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
  });

  it('should run #donanteDomicilio()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.solicitudState = component.solicitudState || {};
    component.solicitudState.numeroCertificado = 'numeroCertificado';
    component.solicitudState.tratado = 'tratado';
    component.solicitudState.pais = 'pais';
    component.solicitudState.fechaInicial = 'fechaInicial';
    component.solicitudState.fechaFinal = 'fechaFinal';
    component.donanteDomicilio();
  });

  it('should run #emitirEventoClick()', async () => {
    component.dataEvent = component.dataEvent || {};
    component.dataEvent.emit = jest.fn();
    component.emitirEventoClick();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyed$ = component.destroyed$ || {};
    component.destroyed$.next = jest.fn();
    component.destroyed$.complete = jest.fn();
    component.ngOnDestroy();

  });

  

});

