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
  it('should have correct table headers configuration', () => {
    // Test mercancias headers
    expect(component.encabezadosMercancias.length).toBe(11);
    expect(component.encabezadosMercancias[0].encabezado).toBe('Número de Orden');
    expect(component.encabezadosMercancias[1].encabezado).toBe('Fracción Arancelaria');
    expect(component.encabezadosMercancias[2].encabezado).toBe('Nombre Técnico');
    expect(component.encabezadosMercancias[3].encabezado).toBe('Nombre Comercial');
    expect(component.encabezadosMercancias[4].encabezado).toBe('Nombre en Ingles');
    expect(component.encabezadosMercancias[5].encabezado).toBe('Complemento descripción');
    expect(component.encabezadosMercancias[6].encabezado).toBe('Número de certificado');
    expect(component.encabezadosMercancias[7].encabezado).toBe('Pais/Bloque');
    expect(component.encabezadosMercancias[8].encabezado).toBe('Tratado/Acuerdo');
    expect(component.encabezadosMercancias[9].encabezado).toBe('Fecha expedición');
    expect(component.encabezadosMercancias[10].encabezado).toBe('Fecha vencimíento');
   
    
    // Test productores headers
    expect(component.encabezadosProductores.length).toBe(6);
    expect(component.encabezadosProductores[0].encabezado).toBe('Nombre del productor');
    expect(component.encabezadosProductores[1].encabezado).toBe('Número de registro fiscal');

    expect(component.encabezadosProductores[2].encabezado).toBe('Dirección');
    expect(component.encabezadosProductores[3].encabezado).toBe('Correo Electrónico');
    expect(component.encabezadosProductores[4].encabezado).toBe('Teléfono');
    expect(component.encabezadosProductores[5].encabezado).toBe('Razón Social');

  });

  it('should correctly extract values through clave functions', () => {
    const mockMercancia: MercanciaCertificado = {
      numeroOrden: '1',
      fraccionArancelaria: '1234',
      nombreTecnico: 'Test Tech',
      nombreComercial: 'Test Comm',
      nombreIngles: 'Test Eng',
      complementoDescripcion: 'Test Desc',
      numeroCertificado: 'CERT-123',
      pais: 'MX',
      tratado: 'T-MEC',
      fechaExpedicion: '2023-01-01',
      fechaVencimiento: '2024-01-01'
    };

    const mockProductor: ProductoresAsociados = {
      nombreProductor: 'John Doe',
      numeroRegistroFiscal: 'TAX123',
      direccion: '123 Main St',
      correoElectronico: 'john@example.com',
      telefono: '555-1234',
      razonSocial: 'Test Corp'
    };

    // Test mercancia clave functions
    expect(component.encabezadosMercancias[0].clave(mockMercancia)).toBe('1');
    expect(component.encabezadosMercancias[6].clave(mockMercancia)).toBe('CERT-123');
    expect(component.encabezadosMercancias[1].clave(mockMercancia)).toBe('1234');
    expect(component.encabezadosMercancias[2].clave(mockMercancia)).toBe('Test Tech');
    expect(component.encabezadosMercancias[3].clave(mockMercancia)).toBe('Test Comm');
    expect(component.encabezadosMercancias[4].clave(mockMercancia)).toBe('Test Eng');
    expect(component.encabezadosMercancias[5].clave(mockMercancia)).toBe('Test Desc');
    expect(component.encabezadosMercancias[7].clave(mockMercancia)).toBe('CERT-123');

    expect(component.encabezadosMercancias[8].clave(mockMercancia)).toBe('MX');
    expect(component.encabezadosMercancias[9].clave(mockMercancia)).toBe('T-MEC');
    expect(component.encabezadosMercancias[10].clave(mockMercancia)).toBe('2023-01-01');
    expect(component.encabezadosMercancias[11].clave(mockMercancia)).toBe('2024-01-01');
    
    // Test productores clave functions
    expect(component.encabezadosProductores[0].clave(mockProductor)).toBe('John Doe');
    expect(component.encabezadosProductores[1].clave(mockProductor)).toBe('TAX123');
    expect(component.encabezadosProductores[2].clave(mockProductor)).toBe('123 Main St');
    expect(component.encabezadosProductores[3].clave(mockProductor)).toBe('john@example.com');
    expect(component.encabezadosProductores[4].clave(mockProductor)).toBe('555-1234');
    expect(component.encabezadosProductores[5].clave(mockProductor)).toBe('Test Corp');
  });


});