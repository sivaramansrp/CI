// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf,Subject, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { AmpliacionAnexoComponent } from './ampliacion-anexo.component';
import { FormBuilder } from '@angular/forms';
import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { AmpliacionServiciosQuery } from '../../estados/tramite80206.query';
import { Tramite80206Store } from '../../estados/tramite80206.store';
import { HttpClient } from '@angular/common/http';

@Injectable()
class MockAmpliacionServiciosService {}

@Injectable()
class MockAmpliacionServiciosQuery {}

@Injectable()
class MockTramite80206Store {}

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
      imports: [ FormsModule, ReactiveFormsModule, ],
      declarations: [
        AmpliacionAnexoComponent ,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: AmpliacionServiciosService, useClass: MockAmpliacionServiciosService },
        { provide: AmpliacionServiciosQuery, useClass: MockAmpliacionServiciosQuery },
        { provide: Tramite80206Store, useClass: MockTramite80206Store },
        { provide: HttpClient, useClass: MockHttpClient }
      ]
    }).overrideComponent(AmpliacionAnexoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(AmpliacionAnexoComponent);
    component = fixture.debugElement.componentInstance;
    component.destroyNotifier$= new Subject<void>();
  });

  afterEach(() => {
    fixture.destroy(); 
    TestBed.resetTestingModule(); 
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.getDatos = jest.fn();
    component.suscribirseADatosImmex = jest.fn();
    component.suscribirseAFields = jest.fn();
    component.ngOnInit();
    });

  it('should run #activarModal()', async () => {

    component.activarModal();

  });

  it('should run #aceptar()', async () => {

    component.aceptar();

  });

  it('should run #enCambioDeCampo()', async () => {
    component.tramite80206Store = component.tramite80206Store || {};
    component.tramite80206Store.setFraccionArancelaria = jest.fn();
    component.tramite80206Store.setRfcEmpresa = jest.fn();
    component.tramite80206Store.setCantidad = jest.fn();
    component.tramite80206Store.setValor = jest.fn();
    component.tramite80206Store.setImportacion = jest.fn();
    component.enCambioDeCampo({}, {});
   });

  it('should run #suscribirseAFields()', async () => {
    component.ampliacionServiciosQuery = component.ampliacionServiciosQuery || {};
    component.ampliacionServiciosQuery.selectSolicitudTramite$ = observableOf({});
    component.suscribirseAFields();

  });

  it('should run #getDatos()', async () => {
    component.ampliacionServiciosService = component.ampliacionServiciosService || {};
    component.ampliacionServiciosService.getDatos = jest.fn().mockReturnValue(observableOf({}));
    component.tramite80206Store = component.tramite80206Store || {};
    component.tramite80206Store.setInfoRegistro = jest.fn();
    component.inicializarFormularioDesdeAlmacen = jest.fn();
    component.getDatos();
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
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.tramiteState = component.tramiteState || {};
    component.tramiteState.infoRegistro = {
      seleccionaLaModalidad: {},
      folio: {},
      ano: {}
    };
    component.inicializarFormularioDesdeAlmacen();
    
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
    component.domiciliosSeleccionados= '0';
    component.tramite80206Store = component.tramite80206Store || {};
    component.tramite80206Store.setDatosImmex = jest.fn();
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
    component.tramite80206Store = component.tramite80206Store || {};
    component.tramite80206Store.setDatosImportacion = jest.fn();
    component.eliminarImportacion();
   });

  it('should run #actualizaGridEmpresasNacionales()', async () => {
    component.tramite80206Store = component.tramite80206Store || {};
    component.tramite80206Store.setDatosImmex = jest.fn();
    component.actualizaGridEmpresasNacionales();
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
    component.tramite80206Store = component.tramite80206Store || {};
    component.tramite80206Store.setDatosImportacion = jest.fn();
    component.agregarImportacion();
     });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
   });

  it('should run #procesarDatosDelHijo()', async () => {
    component.tramite80206Store = component.tramite80206Store || {};
    component.tramite80206Store.setAduanaDeIngresoSeleccion = jest.fn();
    component.procesarDatosDelHijo({});
   });

  it('should run #seleccionarDomicilios()', async () => {

    component.seleccionarDomicilios([]);

  });

});