// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { ServiciosComponent } from './servicios.component';
import { FormBuilder } from '@angular/forms';
import { Tramite80102Query } from '../../estados/tramite80102.query';
import { Tramite80102Store } from '../../estados/tramite80102.store';
import { AutorizacionProgrmaNuevoService } from '../../services/autorizacion-programa-nuevo.service';
import { CatalogosService } from '@ng-mf/data-access-user';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Injectable()
class MockTramite80102Query {
  selectAduanaDeIngresoSelecion$ = observableOf({
    id: {}
  });
  selectdatosEmpresaExtranjera$ = {};
}

@Injectable()
class MockTramite80102Store {
  setFormValida = function() {};
}

describe('ServiciosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: Tramite80102Query, useClass: MockTramite80102Query },
        { provide: Tramite80102Store, useClass: MockTramite80102Store },
        CatalogosService
      ]
    }).overrideComponent(ServiciosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ServiciosComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.obtenerIngresoSelectList = jest.fn();
    component.getDatos = jest.fn();
    component.suscribirseADatosImmex = jest.fn();
    component.suscribirseADatos = jest.fn();
    component.suscribirseAFields = jest.fn();
    component.getCatalogoPaises = jest.fn();
    component.ngOnInit();
    expect(component.obtenerIngresoSelectList).toHaveBeenCalled();
    expect(component.getDatos).toHaveBeenCalled();
    expect(component.suscribirseADatosImmex).toHaveBeenCalled();
  });

  it('should run #getCatalogoPaises()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.add = jest.fn();
    component.catalogosServices = component.catalogosServices || {};
    component.catalogosServices.getCatalogoPaises = jest.fn().mockReturnValue(observableOf({}));
    component.camposFormulario = component.camposFormulario || {};
    component.camposFormulario.findIndex = jest.fn().mockReturnValue([
      {
        "campo": {}
      }
    ]);
    component.camposFormulario.INDICE = {
      opciones: {}
    };
    component.Tramite80102Store = component.Tramite80102Store || {};
    component.Tramite80102Store.setPaisesOrigen = jest.fn();
    component.getCatalogoPaises();
    expect(component.catalogosServices.getCatalogoPaises).toHaveBeenCalled();
    expect(component.camposFormulario.findIndex).toHaveBeenCalled();
  });

  it('should run #enCambioDeCampo()', async () => {
    component.Tramite80102Store = component.Tramite80102Store || {};
    component.Tramite80102Store.setRfcEmpresa = jest.fn();
    component.Tramite80102Store.setNumeroPrograma = jest.fn();
    component.Tramite80102Store.setTiempoPrograma = jest.fn();
    component.enCambioDeCampo('numeroPrograma', {});
    expect(component.Tramite80102Store.setNumeroPrograma).toHaveBeenCalled();
  });

  it('should run #suscribirseADatos()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.add = jest.fn();
    component.Tramite80102Query = component.Tramite80102Query || {};
    component.Tramite80102Query.selectDatos$ = observableOf({});
    component.suscribirseADatos();
  });


  it('should run #getDatos()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.add = jest.fn();
    component.autorizacionProgrmaNuevoService = component.autorizacionProgrmaNuevoService || {};
    component.autorizacionProgrmaNuevoService.getDatos = jest.fn().mockReturnValue(observableOf({}));
    component.Tramite80102Store = component.Tramite80102Store || {};
    component.Tramite80102Store.setInfoRegistro = jest.fn();
    component.getDatos();
    expect(component.autorizacionProgrmaNuevoService.getDatos).toHaveBeenCalled();
    expect(component.Tramite80102Store.setInfoRegistro).toHaveBeenCalled();
  });

  it('should run #suscribirseADatosImmex()', async () => {
    component.Tramite80102Query = component.Tramite80102Query || {};
    component.Tramite80102Query.selectDatosImmex$ = observableOf({});
    component.suscribirseADatosImmex();

  });

  it('should run #obtenerIngresoSelectList()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.add = jest.fn();
    component.autorizacionProgrmaNuevoService = component.autorizacionProgrmaNuevoService || {};
    component.autorizacionProgrmaNuevoService.obtenerIngresoSelectList = jest.fn().mockReturnValue(observableOf({}));
    component.Tramite80102Store = component.Tramite80102Store || {};
    component.Tramite80102Store.setAduanaDeIngreso = jest.fn();
    component.Tramite80102Query = component.Tramite80102Query || {};
    component.Tramite80102Query.selectAduanaDeIngreso$ = observableOf({});
    component.obtenerIngresoSelectList();
    expect(component.autorizacionProgrmaNuevoService.obtenerIngresoSelectList).toHaveBeenCalled();
    expect(component.Tramite80102Store.setAduanaDeIngreso).toHaveBeenCalled();
  });

  it('should run #eliminarServiciosGrid()', async () => {
    component.datosImmex = component.datosImmex || {};
    component.datosImmex.findIndex = jest.fn().mockReturnValue([
      {
        "descripiónDelServicio": {}
      }
    ]);
    component.domiciliosSeleccionados = component.domiciliosSeleccionados || {};
    component.domiciliosSeleccionados[0] = '0';
    component.Tramite80102Store = component.Tramite80102Store || {};
    component.Tramite80102Store.setDatosImmex = jest.fn();
    component.eliminarServiciosGrid();
    expect(component.datosImmex.findIndex).toHaveBeenCalled();
    expect(component.Tramite80102Store.setDatosImmex).toHaveBeenCalled();
  });

  it('should run #agregarServiciosAmpliacion()', async () => {
    component.recibioDatos = component.recibioDatos || {};
    component.recibioDatos[0] = {
      descripcion: {},
      tipode: {}
    };
    component.Tramite80102Store = component.Tramite80102Store || {};
    component.Tramite80102Store.setDatosImmex = jest.fn();
    component.agregarServiciosAmpliacion();
    expect(component.Tramite80102Store.setDatosImmex).toHaveBeenCalled();
  });

  it('should run #eliminarEmpresasNacionales()', async () => {
    component.datos = component.datos || {};
    component.datos.findIndex = jest.fn().mockReturnValue([
      {
        "RegistroContribuyentes": {}
      }
    ]);
    component.empresasSeleccionados = component.empresasSeleccionados || {};
    component.empresasSeleccionados[0] = {
      RegistroContribuyentes: {}
    };
    component.Tramite80102Store = component.Tramite80102Store || {};
    component.Tramite80102Store.setDatos = jest.fn();
    component.eliminarEmpresasNacionales();
    expect(component.datos.findIndex).toHaveBeenCalled();
  });

  it('should run #actualizaGridEmpresasNacionales()', async () => {
    component.Tramite80102Store = component.Tramite80102Store || {};
    component.Tramite80102Store.setDatos = jest.fn();
    component.Tramite80102Store.setCamposEmpresa = jest.fn();
    component.actualizaGridEmpresasNacionales();
    expect(component.Tramite80102Store.setCamposEmpresa).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.unsubscribe = jest.fn();
    component.ngOnDestroy();
  });

  it('should run #procesarDatosDelHijo()', async () => {
    component.Tramite80102Store = component.Tramite80102Store || {};
    component.Tramite80102Store.setAduanaDeIngresoSeleccion = jest.fn();
    component.procesarDatosDelHijo({});
    expect(component.Tramite80102Store.setAduanaDeIngresoSeleccion).toHaveBeenCalled();
  });

  it('should run #seleccionarDomicilios()', async () => {

    component.seleccionarDomicilios({});

  });

  it('should run #seleccionarEmpresas()', async () => {

    component.seleccionarEmpresas({});

  });

  it('should run #eliminarEmpresaExtranjera()', async () => {
    component.empresaExtranjeraSeleccionados = [0];
    component.Tramite80102Store = component.Tramite80102Store || {};
    component.Tramite80102Store.eliminarDatosEmpresaExtranjera = jest.fn();
    component.eliminarEmpresaExtranjera();
    expect(component.Tramite80102Store.eliminarDatosEmpresaExtranjera).toHaveBeenCalled();
  });

  it('should run #agregarEmpresaExtranjera()', async () => {
    component.Tramite80102Store = component.Tramite80102Store || {};
    component.Tramite80102Store.agregarDdatosEmpresaExtranjera = jest.fn();
    component.formularioEmpresaExtranjera = component.formularioEmpresaExtranjera || {};
    component.formularioEmpresaExtranjera.value = 'value';
    component.agregarEmpresaExtranjera();
    expect(component.Tramite80102Store.agregarDdatosEmpresaExtranjera).toHaveBeenCalled();
  });

});