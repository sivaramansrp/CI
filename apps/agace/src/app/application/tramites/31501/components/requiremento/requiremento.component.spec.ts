// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { RequirementoComponent } from './requiremento.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { AutoridadService } from '../../services/autoridad.service';

@Injectable()
class MockRouter {
  navigate() {};
}

@Injectable()
class MockAutoridadService {}

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

describe('RequirementoComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RequirementoComponent, FormsModule, ReactiveFormsModule ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {url: 'url', params: {}, queryParams: {}, data: {}},
            url: observableOf('url'),
            params: observableOf({}),
            queryParams: observableOf({}),
            fragment: observableOf('fragment'),
            data: observableOf({})
          }
        },
        FormBuilder,
        { provide: Router, useClass: MockRouter },
        ConsultaioQuery,
        { provide: AutoridadService, useClass: MockAutoridadService }
      ]
    }).overrideComponent(RequirementoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(RequirementoComponent);
    component = fixture.debugElement.componentInstance;
    Object.defineProperty(window, 'history', {
      value: { state: { data: {} } },
      writable: true
    });
    });

    afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
    });

    it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
    });

    it('should run #ngOnInit() when consultaDatos.update is true', async () => {
    Object.defineProperty(window, 'history', {
      value: { state: { data: {} } },
      writable: true
    });
    const mockConsultaDatos = { update: true, readonly: false };
    component.consultaioQuery = {
      selectConsultaioState$: observableOf(mockConsultaDatos)
    };
    component.guardarDatosFormulario = jest.fn();
    component.ngOnInit();
    expect(component.guardarDatosFormulario).toHaveBeenCalled();
    expect(component.esDatosRespuesta).toBe(false);
    });

    it('should run #ngOnInit() when consultaDatos.update is false', async () => {
    // Patch history.state
    Object.defineProperty(window, 'history', {
      value: { state: { data: {} } },
      writable: true
    });
    const mockConsultaDatos = { update: false, readonly: true };
    component.consultaioQuery = {
      selectConsultaioState$: observableOf(mockConsultaDatos)
    };
    component.guardarDatosFormulario = jest.fn();
    component.ngOnInit();
    expect(component.guardarDatosFormulario).not.toHaveBeenCalled();
    expect(component.esDatosRespuesta).toBe(true);
    });

    it('should run #guardarDatosFormulario() and set folioTramite and esDatosRespuesta', async () => {
    const resp = { folioTramite: '123', tipoTramite: 'abc' };
    component.autoridadService = component.autoridadService || {};
    component.autoridadService.agregarRequerimiento = jest.fn().mockReturnValue(observableOf(resp));
    component.autoridadService.actualizarEstadoFormulario = jest.fn();
    component.guardarDatosFormulario();
    expect(component.autoridadService.agregarRequerimiento).toHaveBeenCalled();
    expect(component.autoridadService.actualizarEstadoFormulario).toHaveBeenCalledWith(resp);
    // esDatosRespuesta should be true and folioTramite should be set
    expect(component.esDatosRespuesta).toBe(true);
    expect(component.folioTramite).toEqual({ folioTramite: '123', tipoTramite: 'abc' });
    });

    it('should run #seleccionaTab()', async () => {
    component.indice = 1;
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
    });

    it('should run #continuar()', async () => {
    component.continuarEvento = component.continuarEvento || {};
    component.continuarEvento.emit = jest.fn();
    component.continuar();
    expect(component.continuarEvento.emit).toHaveBeenCalledWith('');
    });

    it('should run #cancelar()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.cancelar();
    expect(component.router.navigate).toHaveBeenCalledWith(['/pago/autoridad/main']);
    });

    it('should run #ngOnDestroy()', async () => {
    component.destroy$ = component.destroy$ || {};
    component.destroy$.next = jest.fn();
    component.destroy$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroy$.next).toHaveBeenCalled();
    expect(component.destroy$.complete).toHaveBeenCalled();
    });

  it('should run #continuar()', async () => {
    component.continuarEvento = component.continuarEvento || {};
    component.continuarEvento.emit = jest.fn();
    component.continuar();
    expect(component.continuarEvento.emit).toHaveBeenCalled();
  });

  it('should run #cancelar()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.cancelar();
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroy$ = component.destroy$ || {};
    component.destroy$.next = jest.fn();
    component.destroy$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroy$.next).toHaveBeenCalled();
    expect(component.destroy$.complete).toHaveBeenCalled();
  });

});