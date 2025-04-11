// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { AmpliacionAnexoComponent } from './ampliacion-anexo.component';
import { FormBuilder } from '@angular/forms';
import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { AmpliacionServiciosQuery } from '../../estados/tramite80206.query';
import { AmpliacionServiciosStore } from '../../estados/tramite80206.store';
import { HttpClient } from '@angular/common/http';

@Injectable()
class MockAmpliacionServiciosService {}

@Injectable()
class MockAmpliacionServiciosQuery {}

@Injectable()
class MockAmpliacionServiciosStore {}

@Injectable()
class MockHttpClient {
  post() {};
}

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

describe('AmpliacionAnexoComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ,AmpliacionAnexoComponent, ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: AmpliacionServiciosService, useClass: MockAmpliacionServiciosService },
        { provide: AmpliacionServiciosQuery, useClass: MockAmpliacionServiciosQuery },
        { provide: AmpliacionServiciosStore, useClass: MockAmpliacionServiciosStore },
        { provide: HttpClient, useClass: MockHttpClient }
      ]
    }).overrideComponent(AmpliacionAnexoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(AmpliacionAnexoComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
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
    component.ampliacionServiciosService = component.ampliacionServiciosService || {};
    component.ampliacionServiciosService.enviarDeberiaMostrar = jest.fn();
    component.ngOnInit();
    // expect(component.obtenerIngresoSelectList).toHaveBeenCalled();
    // expect(component.getDatos).toHaveBeenCalled();
    // expect(component.suscribirseADatosImmex).toHaveBeenCalled();
    // expect(component.suscribirseADatos).toHaveBeenCalled();
    // expect(component.suscribirseAFields).toHaveBeenCalled();
    // expect(component.ampliacionServiciosService.enviarDeberiaMostrar).toHaveBeenCalled();
  });

  it('should run #activarModal()', async () => {

    component.activarModal();

  });

  it('should run #aceptar()', async () => {

    component.aceptar();

  });

  it('should run #enCambioDeCampo()', async () => {
    component.ampliacionServiciosStore = component.ampliacionServiciosStore || {};
    component.ampliacionServiciosStore.setFraccionArancelaria = jest.fn();
    component.ampliacionServiciosStore.setRfcEmpresa = jest.fn();
    component.ampliacionServiciosStore.setCantidad = jest.fn();
    component.ampliacionServiciosStore.setValor = jest.fn();
    component.ampliacionServiciosStore.setImportacion = jest.fn();
    component.enCambioDeCampo({}, {});
    // expect(component.ampliacionServiciosStore.setFraccionArancelaria).toHaveBeenCalled();
    // expect(component.ampliacionServiciosStore.setRfcEmpresa).toHaveBeenCalled();
    // expect(component.ampliacionServiciosStore.setCantidad).toHaveBeenCalled();
    // expect(component.ampliacionServiciosStore.setValor).toHaveBeenCalled();
    // expect(component.ampliacionServiciosStore.setImportacion).toHaveBeenCalled();
  });

  it('should run #suscribirseADatos()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.add = jest.fn();
    component.ampliacionServiciosQuery = component.ampliacionServiciosQuery || {};
    component.ampliacionServiciosQuery.selectDatos$ = observableOf({});
    component.suscribirseADatos();
    // expect(component.subscription.add).toHaveBeenCalled();
  });

  it('should run #suscribirseAFields()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.add = jest.fn();
    component.ampliacionServiciosQuery = component.ampliacionServiciosQuery || {};
    component.ampliacionServiciosQuery.select = jest.fn().mockReturnValue({
      0: {
        fraccion: {},
        cantidad: {},
        fraccionArancelaria: {},
        importacion: {},
        valor: {}
      },
      subscribe: function() {
        return [
          {
            "fraccion": {},
            "cantidad": {},
            "fraccionArancelaria": {},
            "importacion": {},
            "valor": {}
          }
        ];
      }
    });
    component.suscribirseAFields();
    // expect(component.subscription.add).toHaveBeenCalled();
    // expect(component.ampliacionServiciosQuery.select).toHaveBeenCalled();
  });

  it('should run #getDatos()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.add = jest.fn();
    component.ampliacionServiciosService = component.ampliacionServiciosService || {};
    component.ampliacionServiciosService.getDatos = jest.fn().mockReturnValue(observableOf({}));
    component.ampliacionServiciosStore = component.ampliacionServiciosStore || {};
    component.ampliacionServiciosStore.setInfoRegistro = jest.fn();
    component.inicializarFormularioDesdeAlmacen = jest.fn();
    component.getDatos();
    // expect(component.subscription.add).toHaveBeenCalled();
    // expect(component.ampliacionServiciosService.getDatos).toHaveBeenCalled();
    // expect(component.ampliacionServiciosStore.setInfoRegistro).toHaveBeenCalled();
    // expect(component.inicializarFormularioDesdeAlmacen).toHaveBeenCalled();
  });

  it('should run #suscribirseADatosImmex()', async () => {
    component.ampliacionServiciosQuery = component.ampliacionServiciosQuery || {};
    component.ampliacionServiciosQuery.selectSolicitudTramite$ = observableOf({
      datosImmex: {},
      datosImportacion: {}
    });
    component.suscribirseADatosImmex();

  });

  it('should run #inicializarFormularioDesdeAlmacen()', async () => {
    component.ampliacionServiciosQuery = component.ampliacionServiciosQuery || {};
    component.ampliacionServiciosQuery.selectInfoRegistro$ = observableOf({
      seleccionaLaModalidad: {},
      folio: {},
      ano: {}
    });
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.inicializarFormularioDesdeAlmacen();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #inicializarFormularioInfoRegistro()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.inicializarFormularioInfoRegistro();
    
  });

  

  it('should run #eliminarServiciosGrid()', async () => {
    component.datosImmex = component.datosImmex || {};
    component.datosImmex.findIndex = jest.fn().mockReturnValue([
      {
        "fraccionArancelaria": {}
      }
    ]);
    component.domiciliosSeleccionados = component.domiciliosSeleccionados || {};
    component.domiciliosSeleccionados = '0';
    component.ampliacionServiciosStore = component.ampliacionServiciosStore || {};
    component.ampliacionServiciosStore.setDatosImmex = jest.fn();
    component.eliminarServiciosGrid();
   });

  it('should run #eliminarImportacion()', async () => {
    component.datosImportacion = component.datosImportacion || {};
    component.datosImportacion.findIndex = jest.fn().mockReturnValue([
      {
        "fraccionArancelaria": {}
      }
    ]);
    component.domiciliosSeleccionados = component.domiciliosSeleccionados || {};
    component.domiciliosSeleccionados = '0';
    component.ampliacionServiciosStore = component.ampliacionServiciosStore || {};
    component.ampliacionServiciosStore.setDatosImportacion = jest.fn();
    component.eliminarImportacion();
    
  });

  it('should run #actualizaGridEmpresasNacionales()', async () => {
    component.ampliacionServiciosStore = component.ampliacionServiciosStore || {};
    component.ampliacionServiciosStore.setDatosImmex = jest.fn();
    component.actualizaGridEmpresasNacionales();
    // expect(component.ampliacionServiciosStore.setDatosImmex).toHaveBeenCalled();
  });

  it('should run #cerrarModal()', async () => {

    component.cerrarModal();

  });

  it('should run #agregarImportacion()', async () => {
    component.domiciliosSeleccionados = component.domiciliosSeleccionados || {};
    component.domiciliosSeleccionados = {
      fraccion: {},
      fraccionArancelaria: {},
      descripcionComercial: {},
      anexoII: {},
      tipo: {},
      umt: {},
      categoria: {},
      valorMensual: {},
      valorAnual: {},
      volumenrMensual: {},
      volumenAnual: {}
    };
    component.activarModal = jest.fn();
    component.ampliacionServiciosStore = component.ampliacionServiciosStore || {};
    component.ampliacionServiciosStore.setDatosImportacion = jest.fn();
    component.agregarImportacion();
    // expect(component.activarModal).toHaveBeenCalled();
    // expect(component.ampliacionServiciosStore.setDatosImportacion).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.unsubscribe = jest.fn();
    component.ngOnDestroy();
    // expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });

  it('should run #procesarDatosDelHijo()', async () => {
    component.ampliacionServiciosStore = component.ampliacionServiciosStore || {};
    component.ampliacionServiciosStore.setAduanaDeIngresoSeleccion = jest.fn();
    component.procesarDatosDelHijo({});
    // expect(component.ampliacionServiciosStore.setAduanaDeIngresoSeleccion).toHaveBeenCalled();
  });

  it('should run #seleccionarDomicilios()', async () => {

    component.seleccionarDomicilios({});

  });

 

});