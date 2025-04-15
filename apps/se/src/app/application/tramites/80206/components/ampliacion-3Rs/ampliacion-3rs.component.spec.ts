// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf,Subject, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { Ampliacion3RsComponent } from './ampliacion-3rs.component';
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

describe('Ampliacion3RsComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,  ],
      declarations: [
        Ampliacion3RsComponent,
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
    }).overrideComponent(Ampliacion3RsComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(Ampliacion3RsComponent);
    component = fixture.debugElement.componentInstance;
    component.destroyNotifier$= new Subject<void>();
    component.ampliacionServiciosService.enviarDeberiaMostrar = jest.fn();
  });

  afterEach(() => {
    fixture.destroy(); 
    TestBed.resetTestingModule(); 
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.obtenerReglaSelectList = jest.fn();
    component.inicializarFormularioDesdeAlmacen = jest.fn();
    component.obtenerSectorSelectList = jest.fn();
    component.ngOnInit();
    // expect(component.obtenerReglaSelectList).toHaveBeenCalled();
    // expect(component.inicializarFormularioDesdeAlmacen).toHaveBeenCalled();
    // expect(component.obtenerSectorSelectList).toHaveBeenCalled();
  });

  it('should run #inicializarFormularioDesdeAlmacen()', async () => {
    component.ampliacionServiciosQuery = component.ampliacionServiciosQuery || {};
    component.ampliacionServiciosQuery.selectSolicitudTramite$ = observableOf({});
    component.ampliacionServiciosService = component.ampliacionServiciosService || {};
    component.ampliacionServiciosService.enviarDeberiaMostrar = jest.fn();
    component.formularioInfoRegistro = component.formularioInfoRegistro || {};
    component.formularioInfoRegistro.patchValue = jest.fn();
    component.inicializarFormularioDesdeAlmacen();
    // expect(component.ampliacionServiciosService.enviarDeberiaMostrar).toHaveBeenCalled();
    // expect(component.formularioInfoRegistro.patchValue).toHaveBeenCalled();
  });

  it('should run #inicializarFormularioInfoRegistro()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.inicializarFormularioInfoRegistro();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #obtenerReglaSelectList()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.add = jest.fn();
    component.ampliacionServiciosService = component.ampliacionServiciosService || {};
    component.ampliacionServiciosService.obtenerReglaSelectList = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.tramite80206Store = component.tramite80206Store || {};
    component.tramite80206Store.setReglaSeleccionada = jest.fn();
    component.ampliacionServiciosQuery = component.ampliacionServiciosQuery || {};
    component.ampliacionServiciosQuery.selectSolicitudTramite$ = observableOf({
      reglaSeleccionada: {}
    });
    component.obtenerReglaSelectList();
    // expect(component.subscription.add).toHaveBeenCalled();
    // expect(component.ampliacionServiciosService.obtenerReglaSelectList).toHaveBeenCalled();
    // expect(component.tramite80206Store.setReglaSeleccionada).toHaveBeenCalled();
  });

  it('should run #obtenerSectorSelectList()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.add = jest.fn();
    component.ampliacionServiciosService = component.ampliacionServiciosService || {};
    component.ampliacionServiciosService.obtenerSectorSelectList = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.tramite80206Store = component.tramite80206Store || {};
    component.tramite80206Store.setSectorDesplegable = jest.fn();
    component.ampliacionServiciosQuery = component.ampliacionServiciosQuery || {};
    component.ampliacionServiciosQuery.selectSolicitudTramite$ = observableOf({
      sectorDesplegable: {}
    });
    component.obtenerSectorSelectList();
    // expect(component.subscription.add).toHaveBeenCalled();
    // expect(component.ampliacionServiciosService.obtenerSectorSelectList).toHaveBeenCalled();
    // expect(component.tramite80206Store.setSectorDesplegable).toHaveBeenCalled();
  });

  it('should run #eliminarServiciosGrid()', async () => {
    component.domiciliosSeleccionados = component.domiciliosSeleccionados || {};
    component.domiciliosSeleccionados = ['domiciliosSeleccionados'];
    component.tramite80206Store = component.tramite80206Store || {};
    component.tramite80206Store.setDatosSector = jest.fn();
    component.eliminarServiciosGrid();
    // expect(component.tramite80206Store.setDatosSector).toHaveBeenCalled();
  });

  it('should run #agregarServiciosAmpliacion()', async () => {
    component.recibioSector = component.recibioSector || {};
    component.recibioSector= {
      descripcion: {},
      descripcionSector: {}
    };
    component.tramite80206Store = component.tramite80206Store || {};
    component.tramite80206Store.setDatosSector = jest.fn();
    component.agregarServiciosAmpliacion();
    // expect(component.tramite80206Store.setDatosSector).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.ampliacionServiciosService = component.ampliacionServiciosService || {};
    component.ampliacionServiciosService.enviarDeberiaMostrar = jest.fn();
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    // expect(component.ampliacionServiciosService.enviarDeberiaMostrar).toHaveBeenCalled();
    // expect(component.destroyNotifier$.next).toHaveBeenCalled();
    // expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

  it('should run #procesarDatosDelHijo()', async () => {
    component.ampliacionServiciosService = component.ampliacionServiciosService || {};
    component.ampliacionServiciosService.enviarDeberiaMostrar = jest.fn();
    component.tramite80206Store = component.tramite80206Store || {};
    component.tramite80206Store.setIsSelectedRegla = jest.fn();
    component.tramite80206Store.setAduanaDeIngresoSeleccion = jest.fn();
    component.procesarDatosDelHijo({});
    // expect(component.ampliacionServiciosService.enviarDeberiaMostrar).toHaveBeenCalled();
    // expect(component.tramite80206Store.setIsSelectedRegla).toHaveBeenCalled();
    // expect(component.tramite80206Store.setAduanaDeIngresoSeleccion).toHaveBeenCalled();
  });

  it('should run #cambioDeSector()', async () => {
    component.tramite80206Store = component.tramite80206Store || {};
    component.tramite80206Store.setSectorSeleccion = jest.fn();
    component.cambioDeSector({});
    // expect(component.tramite80206Store.setSectorSeleccion).toHaveBeenCalled();
  });

  it('should run #seleccionarDomicilios()', async () => {

    component.seleccionarDomicilios([]);

  });

});