// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { Servicio } from '../../models/datos-info.model';
import { Catalogo } from '@ng-mf/data-access-user';
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
      imports: [ FormsModule, ReactiveFormsModule,AmpliacionServiciosComponent, ],
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
    // expect(component.guardarDatosFormulario).toHaveBeenCalled();
    // expect(component.inicializarFormularioInfoRegistro).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.inicializarEstadoFormulario = jest.fn();
    component.obtenerIngresoSelectList = jest.fn();
    component.getDatos = jest.fn();
    component.suscribirseADatosImmex = jest.fn();
    component.suscribirseADatos = jest.fn();
    component.suscribirseAFields = jest.fn();
    component.getTablaDatos = jest.fn();
    component.ngOnInit();
    // expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
    // expect(component.obtenerIngresoSelectList).toHaveBeenCalled();
    // expect(component.getDatos).toHaveBeenCalled();
    // expect(component.suscribirseADatosImmex).toHaveBeenCalled();
    // expect(component.suscribirseADatos).toHaveBeenCalled();
    // expect(component.suscribirseAFields).toHaveBeenCalled();
    // expect(component.getTablaDatos).toHaveBeenCalled();
  });

  it('should run #enCambioDeCampo()', async () => {
    component.ampliacionServiciosStore = component.ampliacionServiciosStore || {};
    component.ampliacionServiciosStore.setRfcEmpresa = jest.fn();
    component.ampliacionServiciosStore.setNumeroPrograma = jest.fn();
    component.ampliacionServiciosStore.setTiempoPrograma = jest.fn();
    component.enCambioDeCampo({}, {});
    // expect(component.ampliacionServiciosStore.setRfcEmpresa).toHaveBeenCalled();
    // expect(component.ampliacionServiciosStore.setNumeroPrograma).toHaveBeenCalled();
    // expect(component.ampliacionServiciosStore.setTiempoPrograma).toHaveBeenCalled();
  });

  it('should run #suscribirseADatos()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.add = jest.fn();
    component.ampliacionServiciosQuery = component.ampliacionServiciosQuery || {};
    component.ampliacionServiciosQuery.selectDatos$ = observableOf({});
    component.suscribirseADatos();
    // expect(component.subscription.add).toHaveBeenCalled();
  });

  it('should run #getTablaDatos()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.add = jest.fn();
    component.ampliacionServiciosService = component.ampliacionServiciosService || {};
    component.ampliacionServiciosService.getTablaDatos = jest.fn().mockReturnValue(observableOf({}));
    component.getTablaDatos();
    // expect(component.subscription.add).toHaveBeenCalled();
    // expect(component.ampliacionServiciosService.getTablaDatos).toHaveBeenCalled();
  });

  it('should run #cerrarModal()', async () => {

    component.cerrarModal();

  });

  it('should run #cerrarModalEliminar()', async () => {
    component.eliminarServiciosGrid = jest.fn();
    component.cerrarModalEliminar({});
    // expect(component.eliminarServiciosGrid).toHaveBeenCalled();
  });

  it('should run #cerrarModalAgregar()', async () => {
    component.actualizaGridEmpresasNacionales = jest.fn();
    component.cerrarModalAgregar();
    // expect(component.actualizaGridEmpresasNacionales).toHaveBeenCalled();
  });

  it('should run #cerrarEliminarDos()', async () => {
    component.eliminarEmpresasNacionales = jest.fn();
    component.cerrarEliminarDos({});
    // expect(component.eliminarEmpresasNacionales).toHaveBeenCalled();
  });

  it('should run #cerrarNotSeleccainda()', async () => {

    component.cerrarNotSeleccainda();

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
    component.initializeFormFromStore = jest.fn();
    component.getDatos();
    // expect(component.subscription.add).toHaveBeenCalled();
    // expect(component.ampliacionServiciosService.getDatos).toHaveBeenCalled();
    // expect(component.ampliacionServiciosStore.setInfoRegistro).toHaveBeenCalled();
    // expect(component.initializeFormFromStore).toHaveBeenCalled();
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
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #inicializarFormularioInfoRegistro()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.inicializarFormularioInfoRegistro();
    // expect(component.fb.group).toHaveBeenCalled();
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
    // expect(component.subscription.add).toHaveBeenCalled();
    // expect(component.ampliacionServiciosService.obtenerIngresoSelectList).toHaveBeenCalled();
    // expect(component.ampliacionServiciosStore.setAduanaDeIngreso).toHaveBeenCalled();
  });

  it('should run #guardarDatosFormulario()', async () => {
    component.inicializarFormularioInfoRegistro = jest.fn();
    component.guardarDatosFormulario();
    // expect(component.inicializarFormularioInfoRegistro).toHaveBeenCalled();
  });

  it('should run #eliminarServiciosGrid()', async () => {
    component.datosImmex = component.datosImmex || {};
    component.datosImmex.findIndex = jest.fn().mockReturnValue([
      {
        "id": {}
      }
    ]);
    component.domiciliosSeleccionados = component.domiciliosSeleccionados || {};
    component.domiciliosSeleccionados[0]= {
      clearSelection: function() {}
    };
    component.ampliacionServiciosStore = component.ampliacionServiciosStore || {};
    component.ampliacionServiciosStore.setDatosImmex = jest.fn();
    component.eliminarServiciosGrid();
    // expect(component.datosImmex.findIndex).toHaveBeenCalled();
    // expect(component.ampliacionServiciosStore.setDatosImmex).toHaveBeenCalled();
  });

  it('should run #doConfirmAgregar()', async () => {

    component.doConfirmAgregar();

  });

  it('should run #doConfirmEliminar()', async () => {
    component.domiciliosSeleccionados = component.domiciliosSeleccionados || {};
    component.domiciliosSeleccionados[0] = {
      id: {}
    };
    component.doConfirmEliminar();

  });

  it('should run #doAgregarDos()', async () => {
    component.domiciliosSeleccionados = component.domiciliosSeleccionados || {};
    component.doAgregarDos();

  });

  it('should run #doEliminarDos()', async () => {
    component.empresasSeleccionados = component.empresasSeleccionados || {};
    component.doEliminarDos();

  });

  it('should run #agregarServiciosAmpliacion()', async () => {
    component.recibioDatos = component.recibioDatos || {};
    component.recibioDatos[0] = {
      descripcion: {},
      tipode: {},
      id: {}
    };
    component.datosImmex = component.datosImmex || {};
    component.datosImmex.some = jest.fn().mockReturnValue([
      {
        "id": {}
      }
    ]);
    component.doConfirmAgregar = jest.fn();
    component.ampliacionServiciosStore = component.ampliacionServiciosStore || {};
    component.ampliacionServiciosStore.setDatosImmex = jest.fn();
    component.agregarServiciosAmpliacion();
    // expect(component.datosImmex.some).toHaveBeenCalled();
    // expect(component.doConfirmAgregar).toHaveBeenCalled();
    // expect(component.ampliacionServiciosStore.setDatosImmex).toHaveBeenCalled();
  });

  it('should run #eliminarEmpresasNacionales()', async () => {
    component.datos = component.datos || {};
    component.datos.findIndex = jest.fn().mockReturnValue([
      {
        "RegistroContribuyentes": {}
      }
    ]);
    component.empresasSeleccionados = component.empresasSeleccionados || {};
    component.empresasSeleccionados[0]= {
      RegistroContribuyentes: {},
      clearSelection: function() {}
    };
    component.ampliacionServiciosStore = component.ampliacionServiciosStore || {};
    component.ampliacionServiciosStore.setDatos = jest.fn();
    component.eliminarEmpresasNacionales();
    // expect(component.datos.findIndex).toHaveBeenCalled();
    // expect(component.ampliacionServiciosStore.setDatos).toHaveBeenCalled();
  });

  it('should run #actualizaGridEmpresasNacionales()', async () => {
    component.rfcEmpresa = component.rfcEmpresa || {};
    component.rfcEmpresa.trim = jest.fn();
    component.numeroPrograma = component.numeroPrograma || {};
    component.numeroPrograma.trim = jest.fn();
    component.tiempoPrograma = component.tiempoPrograma || {};
    component.tiempoPrograma.trim = jest.fn();
    component.domiciliosSeleccionados = component.domiciliosSeleccionados || {};
    component.domiciliosSeleccionados[0] = {
      descripiónDelServicio: {},
      tipode: {},
      id:1
    };
    component.ampliacionServiciosStore = component.ampliacionServiciosStore || {};
    component.ampliacionServiciosStore.setDatos = jest.fn();
    component.ampliacionServiciosStore.setCamposEmpresa = jest.fn();
    component.actualizaGridEmpresasNacionales();
    // expect(component.rfcEmpresa.trim).toHaveBeenCalled();
    // expect(component.numeroPrograma.trim).toHaveBeenCalled();
    // expect(component.tiempoPrograma.trim).toHaveBeenCalled();
    // expect(component.ampliacionServiciosStore.setDatos).toHaveBeenCalled();
    // expect(component.ampliacionServiciosStore.setCamposEmpresa).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.unsubscribe = jest.fn();
    component.ngOnDestroy();
    // expect(component.subscription.unsubscribe).toHaveBeenCalled();
  });

  it('should run #procesarDatosDelHijo()', async () => {
    component.aduanaDeIngreso = component.aduanaDeIngreso || {};
    component.aduanaDeIngreso.find = jest.fn().mockReturnValue([
      {
        "id": {},
        
      }
    ]);
    component.formulario = component.formulario || {};
    component.formulario.value = {
      entidadFederativa: {}
    };
    component.ampliacionServiciosStore = component.ampliacionServiciosStore || {};
    component.ampliacionServiciosStore.setAduanaDeIngresoSeleccion = jest.fn();
    component.procesarDatosDelHijo();
    // expect(component.aduanaDeIngreso.find).toHaveBeenCalled();
    // expect(component.ampliacionServiciosStore.setAduanaDeIngresoSeleccion).toHaveBeenCalled();
  });

  it('should run #seleccionarDomicilios()', async () => {
    component.tablaB = component.tablaB || {};
    component.tablaB.clearSelection = jest.fn();
    component.seleccionarDomicilios({
      id: {}
    });
    // expect(component.tablaB.clearSelection).toHaveBeenCalled();
  });

  it('should run #seleccionarAutorizados()', async () => {
    component.tablaA = component.tablaA || {};
    component.tablaA.clearSelection = jest.fn();
    component.seleccionarAutorizados({
      id: {}
    });
    // expect(component.tablaA.clearSelection).toHaveBeenCalled();
  });

  it('should run #seleccionarEmpresas()', async () => {

    component.seleccionarEmpresas({});

  });

});