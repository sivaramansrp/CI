// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { AmpliacionServiciosComponent } from './ampliacion-servicios.component';
import { FormBuilder } from '@angular/forms';
import { AmpliacionServiciosService } from '../../services/ampliacion-servicios.service';
import { AmpliacionServiciosQuery } from '../../estados/tramite80205.query';
import { AmpliacionServiciosStore } from '../../estados/tramite80205.store';
import { HttpClient } from '@angular/common/http';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

@Injectable()
class MockAmpliacionServiciosService {}

@Injectable()
class MockAmpliacionServiciosQuery {
  selectAduanaDeIngresoSelecion$ = observableOf({
    id: {}
  });
}

@Injectable()
class MockAmpliacionServiciosStore {
  setFormValida = function() {};
}

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

describe('AmpliacionServiciosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, AmpliacionServiciosComponent, ],
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
        { provide: HttpClient, useClass: MockHttpClient },
        ConsultaioQuery
      ]
    }).overrideComponent(AmpliacionServiciosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(AmpliacionServiciosComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #inicializarEstadoFormulario()', async () => {
    component.guardarDatosFormulario = jest.fn();
    component.inicializarFormularioInfoRegistro = jest.fn();
    component.inicializarEstadoFormulario();
   });

  it('should run #ngOnInit()', async () => {
    component.inicializarEstadoFormulario = jest.fn();
    component.obtenerIngresoSelectList = jest.fn();
    component.getDatos = jest.fn();
    component.suscribirseADatosImmex = jest.fn();
    component.suscribirseADatos = jest.fn();
    component.suscribirseAFields = jest.fn();
    component.ngOnInit();
    });

  it('should run #enCambioDeCampo()', async () => {
    component.ampliacionServiciosStore = component.ampliacionServiciosStore || {};
    component.ampliacionServiciosStore.setRfcEmpresa = jest.fn();
    component.ampliacionServiciosStore.setNumeroPrograma = jest.fn();
    component.ampliacionServiciosStore.setTiempoPrograma = jest.fn();
    component.enCambioDeCampo({}, {});
      });

  it('should run #suscribirseADatos()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.add = jest.fn();
    component.ampliacionServiciosQuery = component.ampliacionServiciosQuery || {};
    component.ampliacionServiciosQuery.selectDatos$ = observableOf({});
    component.suscribirseADatos();
    
  });

  it('should run #suscribirseAFields()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.add = jest.fn();
    component.ampliacionServiciosQuery = component.ampliacionServiciosQuery || {};
    component.ampliacionServiciosQuery.select = jest.fn().mockReturnValue({
      0: {
        rfcEmpresa: {},
        numeroPrograma: {},
        tiempoPrograma: {}
      },
      subscribe: function() {
        return [
          {
            "rfcEmpresa": {},
            "numeroPrograma": {},
            "tiempoPrograma": {}
          }
        ];
      }
    });
    component.suscribirseAFields();
    });

  it('should run #getDatos()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.add = jest.fn();
    component.ampliacionServiciosService = component.ampliacionServiciosService || {};
    component.ampliacionServiciosService.getDatos = jest.fn().mockReturnValue(observableOf({}));
    component.ampliacionServiciosStore = component.ampliacionServiciosStore || {};
    component.ampliacionServiciosStore.setInfoRegistro = jest.fn();
    component.initializeFormFromStore = jest.fn();
    component.getDatos();
    });

  it('should run #suscribirseADatosImmex()', async () => {
    component.ampliacionServiciosQuery = component.ampliacionServiciosQuery || {};
    component.ampliacionServiciosQuery.selectDatosImmex$ = observableOf({});
    component.suscribirseADatosImmex();

  });

  it('should run #initializeFormFromStore()', async () => {
    component.ampliacionServiciosQuery = component.ampliacionServiciosQuery || {};
    component.ampliacionServiciosQuery.selectInfoRegistro$ = observableOf({
      seleccionaLaModalidad: {},
      folio: {},
      ano: {}
    });
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.initializeFormFromStore();
    
  });

  it('should run #inicializarFormularioInfoRegistro()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.inicializarFormularioInfoRegistro();
    
  });

  it('should run #obtenerIngresoSelectList()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.add = jest.fn();
    component.ampliacionServiciosService = component.ampliacionServiciosService || {};
    component.ampliacionServiciosService.obtenerIngresoSelectList = jest.fn().mockReturnValue(observableOf({}));
    component.ampliacionServiciosStore = component.ampliacionServiciosStore || {};
    component.ampliacionServiciosStore.setAduanaDeIngreso = jest.fn();
    component.ampliacionServiciosQuery = component.ampliacionServiciosQuery || {};
    component.ampliacionServiciosQuery.selectAduanaDeIngreso$ = observableOf({});
    component.obtenerIngresoSelectList();
      });

  it('should run #guardarDatosFormulario()', async () => {
    component.inicializarFormularioInfoRegistro = jest.fn();
    component.guardarDatosFormulario();
    });

  it('should run #eliminarServiciosGrid()', async () => {
    component.datosImmex = component.datosImmex || {};
    component.datosImmex.findIndex = jest.fn().mockReturnValue([
      {
        "descripiónDelServicio": {}
      }
    ]);
    component.domiciliosSeleccionados = component.domiciliosSeleccionados || {};
    component.domiciliosSeleccionados = '0';
    component.ampliacionServiciosStore = component.ampliacionServiciosStore || {};
    component.ampliacionServiciosStore.setDatosImmex = jest.fn();
    component.eliminarServiciosGrid();
     });

  it('should run #eliminarEmpresasNacionales()', async () => {
    component.datos = component.datos || {};
    component.datos.findIndex = jest.fn().mockReturnValue([
      {
        "RegistroContribuyentes": {}
      }
    ]);
    component.empresasSeleccionados = component.empresasSeleccionados || {};
    component.empresasSeleccionados = {
      RegistroContribuyentes: {}
    };
    component.ampliacionServiciosStore = component.ampliacionServiciosStore || {};
    component.ampliacionServiciosStore.setDatos = jest.fn();
    component.eliminarEmpresasNacionales();
    });

  it('should run #actualizaGridEmpresasNacionales()', async () => {
    component.ampliacionServiciosStore = component.ampliacionServiciosStore || {};
    component.ampliacionServiciosStore.setDatos = jest.fn();
    component.ampliacionServiciosStore.setCamposEmpresa = jest.fn();
    component.actualizaGridEmpresasNacionales();
  });

  it('should run #ngOnDestroy()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.unsubscribe = jest.fn();
    component.ngOnDestroy();
    });

  it('should run #procesarDatosDelHijo()', async () => {
    component.ampliacionServiciosStore = component.ampliacionServiciosStore || {};
    component.ampliacionServiciosStore.setAduanaDeIngresoSeleccion = jest.fn();
    component.procesarDatosDelHijo({});
    });

  it('should run #seleccionarDomicilios()', async () => {

    component.seleccionarDomicilios({});

  });

  it('should run #seleccionarEmpresas()', async () => {

    component.seleccionarEmpresas({});

  });

});