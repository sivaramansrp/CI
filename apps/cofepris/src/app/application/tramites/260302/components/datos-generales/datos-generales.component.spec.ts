// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { Location } from '@angular/common';

import { Component } from '@angular/core';
import { DatosGeneralesComponent } from './datos-generales.component';
import { ActivatedRoute, Router, ActivatedRoute } from '@angular/router';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { FormBuilder } from '@angular/forms';
import { Tramite260302Store } from '../../estados/tramite260302Store.store';
import { Tramite260302Query } from '../../estados/tramite260302Query.query';
import { TIPO_TABLA_DATOS } from '../../constants/exporticon-estupefacientes.enum';
import { Destinatario } from '../../../../shared/models/terceros-relacionados.model';

@Injectable()
class MockDatosSolicitudService {
  obtenerListaPaises(): Observable<any>{
    return observableOf([{id: 1, nombre: 'México'}])
  }
}

@Injectable()
class MockTramite260302Store {
  updateDestinatarioTablaDatos = jest.fn();
  updateOtrosTablaDatos = jest.fn();
  updateSeleccionadoDestinatarioDatos = jest.fn();
}

@Injectable()
class MockTramite260302Query {
  getDestinatarioSeleccionado$ = observableOf([{
    nombreRazonSocial: 'Test Company',
    pais: 'Mexico',
    estadoLocalidad: 'CDMX',
    codigoPostal: '12345',
    colonia: 'Centro',
    calle: 'Test Street',
    numeroExterior: '123',
    numeroInterior: '456',
    lada: '55',
    telefono: '12345678',
    correoElectronico: 'test@example.com'
  } as Destinatario]);
}

@Injectable()
class MockRouter {
  navigate = jest.fn();
}

@Injectable()
class MockLocation {
  back = jest.fn();
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
        { provide: Tramite260302Store, useClass: MockTramite260302Store },
        { provide: Tramite260302Query, useClass: MockTramite260302Query },
        { provide: Router, useClass: MockRouter },
        { provide: Location, useClass: MockLocation },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {url: 'url', params: {}, queryParams: {}, data: {}, paramMap: { get: (key: string) => 'Destinatario (Destino final)'}},
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
    expect(component.tipoDatos).toBe('Destinatario (Destino final)');
    expect(component.tipoTablaDatos).toBe(TIPO_TABLA_DATOS);
  });

  it('should run #ngOnInit()', async () => {
    component.ngOnInit();
    expect(component.datoSeleccionado).toBeDefined();
    expect(component.agregarDatosForm).toBeDefined();
  });

  it('should run #crearFormulario()', async () => {
    component.datoSeleccionado = {
      nombreRazonSocial: 'Test Company',
      pais: 'Mexico',
      estadoLocalidad: 'CDMX',
      codigoPostal: '12345',
      colonia: 'Centro',
      calle: 'Test Street',
      numeroExterior: '123',
      numeroInterior: '456',
      lada: '55',
      telefono: '12345678',
      correoElectronico: 'test@example.com'
    } as Destinatario;
    
    component.crearFormulario();
    
    expect(component.agregarDatosForm).toBeDefined();
    expect(component.agregarDatosForm.get('nombreRazonSocial')?.value).toBe('Test Company');
    expect(component.agregarDatosForm.get('pais')?.value).toBe('Mexico');
    expect(component.agregarDatosForm.get('calle')?.value).toBe('Test Street');
  });

  it('should run #cargarDatos()', async () => {
    component.datosSolicitudService = component.datosSolicitudService || {};
    component.datosSolicitudService.obtenerListaPaises = jest.fn().mockReturnValue(observableOf([{id: 1, nombre: 'México'}]));
    component.cargarDatos();
    expect(component.datosSolicitudService.obtenerListaPaises).toHaveBeenCalled();
    expect(component.paisesDatos).toEqual([{id: 1, nombre: 'México'}]);
  });

  it('should run #cancelar()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateSeleccionadoDestinatarioDatos = jest.fn();
    component.ubicaccion = component.ubicaccion || {};
    component.ubicaccion.back = jest.fn();
    
    component.cancelar();
    
    expect(component.tramiteStore.updateSeleccionadoDestinatarioDatos).toHaveBeenCalledWith([]);
    expect(component.ubicaccion.back).toHaveBeenCalled();
  });

  it('should run #limpiarFormulario()', async () => {
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.reset = jest.fn();
    component.limpiarFormulario();
    expect(component.agregarDatosForm.reset).toHaveBeenCalled();
  });

  it('should run #guardarDatos() for DESTINATARIO type', async () => {
    component.tipoDatos = TIPO_TABLA_DATOS.DESTINATARIO;
    component.tipoTablaDatos = TIPO_TABLA_DATOS;
    component.agregarDatosForm = {
      getRawValue: jest.fn().mockReturnValue({nombreRazonSocial: 'Test'})
    };
    component.addDestinatario = jest.fn();
    component.ubicaccion = component.ubicaccion || {};
    component.ubicaccion.back = jest.fn();
    
    component.guardarDatos();
    
    expect(component.addDestinatario).toHaveBeenCalledWith([{nombreRazonSocial: 'Test'}]);
    expect(component.ubicaccion.back).toHaveBeenCalled();
  });

  it('should run #guardarDatos() for OTROS type', async () => {
    component.tipoDatos = TIPO_TABLA_DATOS.OTROS;
    component.tipoTablaDatos = TIPO_TABLA_DATOS;
    component.agregarDatosForm = {
      value: {nombreRazonSocial: 'Test'}
    };
    component.addOtros = jest.fn();
    component.ubicaccion = component.ubicaccion || {};
    component.ubicaccion.back = jest.fn();
    
    component.guardarDatos();
    
    expect(component.addOtros).toHaveBeenCalledWith([{nombreRazonSocial: 'Test'}]);
    expect(component.ubicaccion.back).toHaveBeenCalled();
  });

  it('should run #guardarDatos() for default case', async () => {
    component.tipoDatos = 'UNKNOWN_TYPE';
    component.tipoTablaDatos = TIPO_TABLA_DATOS;
    component.ubicaccion = component.ubicaccion || {};
    component.ubicaccion.back = jest.fn();
    
    component.guardarDatos();
    
    expect(component.ubicaccion.back).toHaveBeenCalled();
  });

  it('should run #addDestinatario()', async () => {
    const testData = [{nombreRazonSocial: 'Test'} as Destinatario];
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateDestinatarioTablaDatos = jest.fn();
    
    component.addDestinatario(testData);
    
    expect(component.tramiteStore.updateDestinatarioTablaDatos).toHaveBeenCalledWith(testData);
  });

  it('should run #addOtros()', async () => {
    const testData = [{nombreRazonSocial: 'Test'}];
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateOtrosTablaDatos = jest.fn();
    
    component.addOtros(testData);
    
    expect(component.tramiteStore.updateOtrosTablaDatos).toHaveBeenCalledWith(testData);
  });

  it('should run #obtenerValor() with existing data', async () => {
    component.datoSeleccionado = {
      nombreRazonSocial: 'Test Company',
      pais: 'Mexico'
    } as Destinatario;
    
    const result = component.obtenerValor('nombreRazonSocial');
    expect(result).toBe('Test Company');
    
    const result2 = component.obtenerValor('pais');
    expect(result2).toBe('Mexico');
  });

  it('should run #obtenerValor() with no data', async () => {
    component.datoSeleccionado = null as any;
    
    const result = component.obtenerValor('nombreRazonSocial');
    expect(result).toBe('');
  });

  it('should run #esInvalido() with invalid control', async () => {
    component.agregarDatosForm = {
      get: jest.fn().mockReturnValue({
        invalid: true,
        touched: true,
        dirty: false
      })
    };
    
    const result = component.esInvalido('nombreRazonSocial');
    expect(result).toBe(true);
  });

  it('should run #esInvalido() with valid control', async () => {
    component.agregarDatosForm = {
      get: jest.fn().mockReturnValue({
        invalid: false,
        touched: true,
        dirty: false
      })
    };
    
    const result = component.esInvalido('nombreRazonSocial');
    expect(result).toBe(false);
  });

  it('should run #esInvalido() with null control', async () => {
    component.agregarDatosForm = {
      get: jest.fn().mockReturnValue(null)
    };
    
    const result = component.esInvalido('nombreRazonSocial');
    expect(result).toBe(false);
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = {
      next: jest.fn(),
      complete: jest.fn()
    };
    
    component.ngOnDestroy();
    
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });



});