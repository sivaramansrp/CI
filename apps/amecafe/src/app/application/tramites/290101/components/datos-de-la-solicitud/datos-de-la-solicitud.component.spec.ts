// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder } from '@angular/forms';
import { ProductoTablaServicios } from '../../servicios/regiones-compra.service';
import { Router } from '@angular/router';
import { TramiteStoreQuery } from '../../estados/tramite290101.query';
import { TramiteStore } from '../../estados/tramite290101.store';
import { SeccionLibQuery, SeccionLibStore } from '@libs/shared/data-access-user/src';
import { CatalogosService } from '../../servicios/catalogos.service';

@Injectable()
class MockProductoTablaServicios {}

@Injectable()
class MockRouter {
  navigate() {};
}

@Injectable()
class MockTramiteStoreQuery {}

@Injectable()
class MockTramiteStore {}

@Injectable()
class MockCatalogosService {}

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

describe('DatosDeLaSolicitudComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        DatosDeLaSolicitudComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: ProductoTablaServicios, useClass: MockProductoTablaServicios },
        { provide: Router, useClass: MockRouter },
        { provide: TramiteStoreQuery, useClass: MockTramiteStoreQuery },
        { provide: TramiteStore, useClass: MockTramiteStore },
        SeccionLibQuery,
        SeccionLibStore,
        { provide: CatalogosService, useClass: MockCatalogosService }
      ]
    }).overrideComponent(DatosDeLaSolicitudComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #redirigirBodegas()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.redirigirBodegas();
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('should run #redirigirCafeExportadores()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.redirigirCafeExportadores();
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('should run #redirigirBeneficios()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.redirigirBeneficios();
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('should run #redirigirRegiones()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.redirigirRegiones();
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.tramiteStoreQuery = component.tramiteStoreQuery || {};
    component.tramiteStoreQuery.selectSolicitudTramite$ = observableOf({});
    component.iniciarFormulario = jest.fn();
    component.catalogosService = component.catalogosService || {};
    component.catalogosService.RadioOpcion = 'RadioOpcion';
    component.datosSolicitudForma = component.datosSolicitudForma || {};
    component.datosSolicitudForma.get = jest.fn().mockReturnValue({
      enable: function() {},
      disable: function() {},
      valueChanges: observableOf({})
    });
    component.datosSolicitudForma.patchValue = jest.fn();
    component.datosSolicitudForma.statusChanges = observableOf({});
    component.datosSolicitudForma.value = 'value';
    component.subscriptions = component.subscriptions || {};
    component.subscriptions.push = jest.fn();
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.setSolicitudTramite = jest.fn();
    component.buscarDatos = jest.fn();
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});
    component.ngOnInit();
    expect(component.iniciarFormulario).toHaveBeenCalled();
    expect(component.datosSolicitudForma.get).toHaveBeenCalled();
    expect(component.datosSolicitudForma.patchValue).toHaveBeenCalled();
    expect(component.subscriptions.push).toHaveBeenCalled();
    expect(component.tramiteStore.setSolicitudTramite).toHaveBeenCalled();
    expect(component.buscarDatos).toHaveBeenCalled();
  });

  it('should run #iniciarFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.iniciarFormulario();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #buscarDatos()', async () => {
    component.productoTablaServicios = component.productoTablaServicios || {};
    component.productoTablaServicios.obtenerDatos = jest.fn().mockReturnValue(observableOf({}));
    component.buscarDatos();
    expect(component.productoTablaServicios.obtenerDatos).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.subscriptions = component.subscriptions || {};
    component.subscriptions = ['subscriptions'];
    component.ngOnDestroy();

  });

});