// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { CambioDeModalidadComponent } from './cambio-de-modalidad.component';
import { FormBuilder } from '@angular/forms';
import { CambioModalidadService } from '../../service/cambio-modalidad.service';
import { CambioModalidadQuery } from '../../estados/tramite80208.query';
import { CambioModalidadStore } from '../../estados/tramite80208.store';
import { SeccionLibQuery, SeccionLibStore, ConsultaioQuery } from '@ng-mf/data-access-user';

@Injectable()
class MockCambioModalidadService {}

@Injectable()
class MockCambioModalidadQuery {}

@Injectable()
class MockCambioModalidadStore {}

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

describe('CambioDeModalidadComponent', () => {
  let fixture;
  let component;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule, 
        ReactiveFormsModule,
        CambioDeModalidadComponent
      ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: CambioModalidadService, useClass: MockCambioModalidadService },
        { provide: CambioModalidadQuery, useClass: MockCambioModalidadQuery },
        { provide: CambioModalidadStore, useClass: MockCambioModalidadStore },
        SeccionLibQuery,
        SeccionLibStore,
        ConsultaioQuery
      ]
    }).overrideComponent(CambioDeModalidadComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(CambioDeModalidadComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.cambioModalidadQuery = component.cambioModalidadQuery || {};
    component.cambioModalidadQuery.selectCambioModalidad$ = observableOf({});
    component.inicializarForm = jest.fn();
    component.getCargarDatos = jest.fn();
    component.getCambioDeModalidad = jest.fn();
    component.getServiciosImmx = jest.fn();
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});    component.cambioDeModalidadForm = component.cambioDeModalidadForm || {};
    component.cambioDeModalidadForm.statusChanges = observableOf({});
    component.cambioDeModalidadForm.get = jest.fn().mockReturnValue({
      status: {}
    });
    Object.defineProperty(component.cambioDeModalidadForm, 'valid', {
      get: jest.fn(() => true),
      configurable: true
    });
    component.seccionStore = component.seccionStore || {};
    component.seccionStore.establecerFormaValida = jest.fn();
    component.ngOnInit();
    expect(component.inicializarForm).toHaveBeenCalled();
    expect(component.getCargarDatos).toHaveBeenCalled();
    expect(component.getCambioDeModalidad).toHaveBeenCalled();
    expect(component.getServiciosImmx).toHaveBeenCalled();
  
  });

  it('should run #inicializarForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.cambioDeModalidadState = component.cambioDeModalidadState || {};
    component.cambioDeModalidadState.seleccionaLaModalidad = 'seleccionaLaModalidad';
    component.cambioDeModalidadState.folio = 'folio';
    component.cambioDeModalidadState.ano = 'ano';
    component.cambioDeModalidadState.seleccionaModalidad = 'seleccionaModalidad';
    component.inicializarForm();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #inicializarEstadoFormulario()', async () => {
    component.guardarDatosFormulario = jest.fn();
    component.inicializarForm = jest.fn();
    component.inicializarEstadoFormulario();
    // expect(component.guardarDatosFormulario).toHaveBeenCalled();
    expect(component.inicializarForm).toHaveBeenCalled();
  });

  it('should run #guardarDatosFormulario()', async () => {
    component.inicializarForm = jest.fn();
    component.cambioDeModalidadForm = component.cambioDeModalidadForm || {};
    component.cambioDeModalidadForm.disable = jest.fn();
    component.cambioDeModalidadForm.enable = jest.fn();
    component.guardarDatosFormulario();
    expect(component.inicializarForm).toHaveBeenCalled();
    // expect(component.cambioDeModalidadForm.disable).toHaveBeenCalled();
    expect(component.cambioDeModalidadForm.enable).toHaveBeenCalled();
  });

  it('should run #getCargarDatos()', async () => {
    component.modalidadService = component.modalidadService || {};
    component.modalidadService.getDatosSimulados = jest.fn().mockReturnValue(observableOf({}));
    component.cambioDeModalidadForm = component.cambioDeModalidadForm || {};
    component.cambioDeModalidadForm.patchValue = jest.fn();
    component.getCargarDatos();
    expect(component.modalidadService.getDatosSimulados).toHaveBeenCalled();
    expect(component.cambioDeModalidadForm.patchValue).toHaveBeenCalled();
  });

  it('should run #getServiciosImmx()', async () => {
    component.modalidadService = component.modalidadService || {};
    component.modalidadService.getServiciosImmx = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.cambioModalidadStore = component.cambioModalidadStore || {};
    component.cambioModalidadStore.setCambioModalidad = jest.fn();
    component.getServiciosImmx();
    expect(component.modalidadService.getServiciosImmx).toHaveBeenCalled();
    expect(component.cambioModalidadStore.setCambioModalidad).toHaveBeenCalled();
  });

  it('should run #getCambioDeModalidad()', async () => {
    component.modalidadService = component.modalidadService || {};
    component.modalidadService.getCambioDeModalidad = jest.fn().mockReturnValue(observableOf({
      cambioModalidad: {
        data: {}
      }
    }));
    component.cambioDeModalidadForm = component.cambioDeModalidadForm || {};
    component.cambioDeModalidadForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.toggleServiciosImmx = jest.fn();
    component.getCambioDeModalidad();
    expect(component.modalidadService.getCambioDeModalidad).toHaveBeenCalled();
    expect(component.cambioDeModalidadForm.get).toHaveBeenCalled();
    expect(component.toggleServiciosImmx).toHaveBeenCalled();
  });

  it('should run #toggleServiciosImmx()', async () => {
    component.cambioDeModalidad = component.cambioDeModalidad || {};
    component.cambioDeModalidad.find = jest.fn().mockReturnValue([
      {
        "id": {}
      }
    ]);
    component.cambioModalidadStore = component.cambioModalidadStore || {};
    component.cambioModalidadStore.setCambioModalidad = jest.fn();
    component.toggleServiciosImmx({});

  });

  it('should run #seleccionarDesplegable()', async () => {
    component.toggleServiciosImmx = jest.fn();
    component.seleccionarDesplegable({
      id: {
        toString: function() {}
      }
    });
    expect(component.toggleServiciosImmx).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.unsubscribe$ = component.unsubscribe$ || {};
    component.unsubscribe$.next = jest.fn();
    component.unsubscribe$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.unsubscribe$.next).toHaveBeenCalled();
    expect(component.unsubscribe$.complete).toHaveBeenCalled();
  });
});