// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosGeneralesComponent } from './datos-generales.component';
import { ActivatedRoute, Router, ActivatedRoute } from '@angular/router';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { FormBuilder } from '@angular/forms';
import { Tramite260301Store } from '../../estados/tramite260301Store.store';
import { Tramite260301Query } from '../../estados/tramite260301Query.query';

@Injectable()
class MockDatosSolicitudService {
  obtenerListaPaises(): Observable<any>{
    return observableOf([])
  }
}

@Injectable()
class MockTramite260301Store {}

@Injectable()
class MockTramite260301Query {}

@Injectable()
class MockRouter {
  navigate() {};
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
        { provide: Tramite260301Store, useClass: MockTramite260301Store },
        { provide: Tramite260301Query, useClass: MockTramite260301Query },
        { provide: Router, useClass: MockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {url: 'url', params: {}, queryParams: {}, data: {}, paramMap: { get: (key: string) => 'someValue'}},
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

  it('should run #cancelar()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.cancelar();
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('should run #limpiarFormulario()', async () => {
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.reset = jest.fn();
    component.limpiarFormulario();
    expect(component.agregarDatosForm.reset).toHaveBeenCalled();
  });

  it('should run #guardarDatos() for FABRICANTE', async () => {
    component.tipoDatos = component.tipoTablaDatos.FABRICANTE;
    component.addFabricantes = jest.fn();
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.value = 'value';
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.guardarDatos();
    expect(component.addFabricantes).toHaveBeenCalledWith(['value']);
    expect(component.router.navigate).toHaveBeenCalledWith(['pago', 'importacion-materias-primas-estupefacientes']);
  });

  it('should run #guardarDatos() for FACTURADOR', async () => {
    component.tipoDatos = component.tipoTablaDatos.FACTURADOR;
    component.addFacturadores = jest.fn();
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.value = 'value';
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.guardarDatos();
    expect(component.addFacturadores).toHaveBeenCalledWith(['value']);
    expect(component.router.navigate).toHaveBeenCalledWith(['pago', 'importacion-materias-primas-estupefacientes']);
  });

  it('should run #guardarDatos() for CERTIFICADO', async () => {
    component.tipoDatos = component.tipoTablaDatos.CERTIFICADO;
    component.addCertificadoTablaDatos = jest.fn();
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.value = 'value';
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.guardarDatos();
    expect(component.addCertificadoTablaDatos).toHaveBeenCalledWith(['value']);
    expect(component.router.navigate).toHaveBeenCalledWith(['pago', 'importacion-materias-primas-estupefacientes']);
  });

  it('should run #guardarDatos() for PROVEEDOR', async () => {
    component.tipoDatos = component.tipoTablaDatos.PROVEEDOR;
    component.addProveedores = jest.fn();
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.value = 'value';
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.guardarDatos();
    expect(component.addProveedores).toHaveBeenCalledWith(['value']);
    expect(component.router.navigate).toHaveBeenCalledWith(['pago', 'importacion-materias-primas-estupefacientes']);
  });

  it('should run #guardarDatos() for OTROS', async () => {
    component.tipoDatos = component.tipoTablaDatos.OTROS;
    component.addOtros = jest.fn();
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.value = 'value';
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.guardarDatos();
    expect(component.addOtros).toHaveBeenCalledWith(['value']);
    expect(component.router.navigate).toHaveBeenCalledWith(['pago', 'importacion-materias-primas-estupefacientes']);
  });

  it('should run #guardarDatos() for default case', async () => {
    component.tipoDatos = 'unknown';
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.guardarDatos();
    expect(component.router.navigate).toHaveBeenCalledWith(['pago', 'importacion-materias-primas-estupefacientes']);
  });

  it('should run #addFabricantes()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateFabricanteTablaDatos = jest.fn();
    component.addFabricantes({});
  });

  it('should run #addCertificadoTablaDatos()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateCertificadoTablaDatos = jest.fn();
    component.addCertificadoTablaDatos({});
  });

  it('should run #addOtros()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateOtrosTablaDatos = jest.fn();
    component.addOtros({});
  });

  it('should run #addProveedores()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateProveedorTablaDatos = jest.fn();
    component.addProveedores({});
  });

  it('should run #addFacturadores()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateFacturadorTablaDatos = jest.fn();
    component.addFacturadores({});
  });

  it('should run #crearFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn().mockReturnValue({});
    component.crearFormulario();
    expect(component.fb.group).toHaveBeenCalled();
  });

});