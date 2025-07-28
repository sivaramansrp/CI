// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosGeneralesComponent } from './datos-generales.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { FormBuilder } from '@angular/forms';
import { Tramite260304Store } from '../../estados/tramite260304Store.store';
import { Tramite260304Query } from '../../estados/tramite260304Query.query';

@Injectable()
class MockDatosSolicitudService {
  obtenerListaPaises(): Observable<any>{
    return observableOf([])
  }
}

@Injectable()
class MockTramite260304Store {
  updateDestinatarioTablaDatos() {};
  updateOtrosTablaDatos() {};
}

@Injectable()
class MockTramite260304Query {
  getDestinatarioSeleccionado$ = observableOf([]);
}

@Injectable()
class MockRouter {
  navigate() {};
}

@Injectable()
class MockLocation {
  back() {};
}

describe('DatosGeneralesComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],

      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: DatosSolicitudService, useClass: MockDatosSolicitudService },
        FormBuilder,
        { provide: Tramite260304Store, useClass: MockTramite260304Store },
        { provide: Tramite260304Query, useClass: MockTramite260304Query },
        { provide: Router, useClass: MockRouter },
        { provide: Location, useClass: MockLocation },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {url: 'url', params: {}, queryParams: {}, data: {}, paramMap: { get: (key: string) => 'DESTINATARIO'}},
            url: observableOf('url'),
            params: observableOf({}),
            queryParams: observableOf({}),
            fragment: observableOf('fragment'),
            data: observableOf({})
          }
        }
      ]
    }).overrideComponent(DatosGeneralesComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosGeneralesComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #cargarDatos()', async () => {
    component.datosSolicitudService = component.datosSolicitudService || {};
    component.datosSolicitudService.obtenerListaPaises = jest.fn().mockReturnValue(observableOf({}));
    component.cargarDatos();
    expect(component.datosSolicitudService.obtenerListaPaises).toHaveBeenCalled();
  });

  it('should run #limpiarFormulario()', async () => {
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.reset = jest.fn();
    component.limpiarFormulario();
    expect(component.agregarDatosForm.reset).toHaveBeenCalled();
  });


  it('should run #guardarDatos() with unknown type', async () => {
    component.tipoDatos = 'UNKNOWN';
    component.ubicaccion = component.ubicaccion || {};
    component.ubicaccion.back = jest.fn();
    component.guardarDatos();
    expect(component.ubicaccion.back).toHaveBeenCalled();
  });

  it('should run #addDestinatario()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateDestinatarioTablaDatos = jest.fn();
    const testData = [{ nombre: 'test' }];
    component.addDestinatario(testData);
    expect(component.tramiteStore.updateDestinatarioTablaDatos).toHaveBeenCalledWith(testData);
  });

  it('should run #addOtros()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateOtrosTablaDatos = jest.fn();
    const testData = [{ campo: 'test' }];
    component.addOtros(testData);
    expect(component.tramiteStore.updateOtrosTablaDatos).toHaveBeenCalledWith(testData);
  });

  it('should run #ngOnInit()', async () => {
    component.cargarDatos = jest.fn();
    component.tramiteQuery = component.tramiteQuery || {};
    component.tramiteQuery.getDestinatarioSeleccionado$ = observableOf([{ id: 1, nombre: 'test' }]);
    component.crearFormulario = jest.fn();
    component.ngOnInit();
    expect(component.cargarDatos).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.unsubscribe$ = component.unsubscribe$ || {};
    component.unsubscribe$.next = jest.fn();
    component.unsubscribe$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.unsubscribe$.next).toHaveBeenCalled();
    expect(component.unsubscribe$.complete).toHaveBeenCalled();
  });

  it('should run #esInvalido() with invalid control', async () => {
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.get = jest.fn().mockReturnValue({
      invalid: true,
      touched: true,
      dirty: false
    });
    const result = component.esInvalido('testControl');
    expect(result).toBe(true);
  });

  it('should run #esInvalido() with valid control', async () => {
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.get = jest.fn().mockReturnValue({
      invalid: false,
      touched: true,
      dirty: false
    });
    const result = component.esInvalido('testControl');
    expect(result).toBe(false);
  });

  it('should run #esInvalido() with null control', async () => {
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.get = jest.fn().mockReturnValue(null);
    const result = component.esInvalido('testControl');
    expect(result).toBe(false);
  });

  it('should run #cancelar()', async () => {
    component.ubicaccion = component.ubicaccion || {};
    component.ubicaccion.back = jest.fn();
    component.cancelar();
    expect(component.ubicaccion.back).toHaveBeenCalled();
  });

  it('should run #obtenerValor() with existing field', async () => {
    component.datoSeleccionado = { nombreRazonSocial: 'Test Name' };
    const result = component.obtenerValor('nombreRazonSocial');
    expect(result).toBe('Test Name');
  });

  it('should run #obtenerValor() with non-existing field', async () => {
    component.datoSeleccionado = {};
    const result = component.obtenerValor('nombreRazonSocial');
    expect(result).toBe('');
  });

  it('should run #obtenerValor() with null datoSeleccionado', async () => {
    component.datoSeleccionado = null;
    const result = component.obtenerValor('nombreRazonSocial');
    expect(result).toBe('');
  });

  it('should run #crearFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn().mockReturnValue({});
    component.obtenerValor = jest.fn().mockReturnValue('testValue');
    component.crearFormulario();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should initialize tipoDatos from route params', async () => {
    expect(component.tipoDatos).toBeDefined();
  });

  it('should handle cargarDatos error', async () => {
    component.datosSolicitudService = component.datosSolicitudService || {};
    component.datosSolicitudService.obtenerListaPaises = jest.fn().mockReturnValue(throwError('Error'));
    component.cargarDatos();
    expect(component.datosSolicitudService.obtenerListaPaises).toHaveBeenCalled();
  });

  it('should handle ngOnInit with subscription', async () => {
    component.cargarDatos = jest.fn();
    component.tramiteQuery = component.tramiteQuery || {};
    component.tramiteQuery.getDestinatarioSeleccionado$ = observableOf([]);
    component.crearFormulario = jest.fn();
    component.ngOnInit();
    expect(component.cargarDatos).toHaveBeenCalled();
  });

  it('should handle esInvalido with dirty control', async () => {
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.get = jest.fn().mockReturnValue({
      invalid: true,
      touched: false,
      dirty: true
    });
    const result = component.esInvalido('testControl');
    expect(result).toBe(true);
  });

  it('should handle esInvalido with untouched and clean control', async () => {
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.get = jest.fn().mockReturnValue({
      invalid: true,
      touched: false,
      dirty: false
    });
    const result = component.esInvalido('testControl');
    expect(result).toBe(false);
  });

  it('should handle constructor initialization', async () => {
    expect(component.route).toBeDefined();
    expect(component.datosSolicitudService).toBeDefined();
    expect(component.fb).toBeDefined();
    expect(component.tramiteStore).toBeDefined();
    expect(component.tramiteQuery).toBeDefined();
    expect(component.router).toBeDefined();
    expect(component.ubicaccion).toBeDefined();
  });

  it('should handle subscription cleanup in ngOnDestroy', async () => {
    const unsubscribeSpy = jest.fn();
    const completeSpy = jest.fn();
    component.unsubscribe$ = {
      next: unsubscribeSpy,
      complete: completeSpy
    };
    component.ngOnDestroy();
    expect(unsubscribeSpy).toHaveBeenCalled();
    expect(completeSpy).toHaveBeenCalled();
  });

  it('should handle obtenerValor with undefined datoSeleccionado', async () => {
    component.datoSeleccionado = undefined;
    const result = component.obtenerValor('nombreRazonSocial');
    expect(result).toBe('');
  });

  it('should handle crearFormulario with form builder', async () => {
    const mockFormGroup = {
      group: jest.fn()
    };
    component.fb = mockFormGroup as any;
    component.obtenerValor = jest.fn().mockReturnValue('');
    component.crearFormulario();
    expect(mockFormGroup.group).toHaveBeenCalled();
  });

  it('should handle guardarDatos with default case', async () => {
    component.tipoDatos = 'INVALID_TYPE';
    component.tipoTablaDatos = { DESTINATARIO: 'DESTINATARIO', OTROS: 'OTROS' };
    component.ubicaccion = { back: jest.fn() } as any;
    component.guardarDatos();
    expect(component.ubicaccion.back).toHaveBeenCalled();
  });

});