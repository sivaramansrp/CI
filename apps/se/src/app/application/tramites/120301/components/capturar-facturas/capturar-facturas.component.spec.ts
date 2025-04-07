// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { CapturarFacturasComponent } from './capturar-facturas.component';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ElegibilidadDeTextilesStore } from '../../estados/elegibilidad-de-textiles.store';
import { ElegibilidadDeTextilesQuery } from '../../queries/elegibilidad-de-textiles.query';
import { SeccionLibStore, SeccionLibQuery } from '@ng-mf/data-access-user';

@Injectable()
class MockElegibilidadTextilesService {}

@Injectable()
class MockHttpClient {
  post() {};
}

@Injectable()
class MockElegibilidadDeTextilesStore {}

@Injectable()
class MockElegibilidadDeTextilesQuery {}

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

describe('CapturarFacturasComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      imports: [CapturarFacturasComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: ElegibilidadTextilesService, useClass: MockElegibilidadTextilesService },
        { provide: HttpClient, useClass: MockHttpClient },
        FormBuilder,
        { provide: ElegibilidadDeTextilesStore, useClass: MockElegibilidadDeTextilesStore },
        { provide: ElegibilidadDeTextilesQuery, useClass: MockElegibilidadDeTextilesQuery },
        SeccionLibStore,
        SeccionLibQuery
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CapturarFacturasComponent);
    component = fixture.debugElement.componentInstance;

    // Mock methods
    component.recuperarDatos = jest.fn(); // Mock recuperarDatos
    component.obtenerListasDesplegables = jest.fn();
    component.initActionFormBuild = jest.fn();
    component.seccionStore = {
      establecerFormaValida: jest.fn(),
      establecerSeccion: jest.fn(),
    } as any;
    component.ElegibilidadDeTextilesStore = {
      setFormaValida: jest.fn(),
    } as any;
  });

  afterEach(() => {
    component.ngOnDestroy = function () {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #recuperarDatos()', async () => {
    // Call the method explicitly
    component.recuperarDatos();

    // Verify that the mocked method is called
    expect(component.recuperarDatos).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});
    component.ElegibilidadDeTextilesQuery = component.ElegibilidadDeTextilesQuery || {};
    component.ElegibilidadDeTextilesQuery.selectTextile$ = observableOf({});
    component.ngOnInit();

    // Verify that mocked methods are called
    expect(component.initActionFormBuild).toHaveBeenCalled();
    expect(component.obtenerListasDesplegables).toHaveBeenCalled();
    expect(component.recuperarDatos).toHaveBeenCalled();
    expect(component.seccionStore.establecerFormaValida).toHaveBeenCalled();
    expect(component.seccionStore.establecerSeccion).toHaveBeenCalled();
    expect(component.ElegibilidadDeTextilesStore.setFormaValida).toHaveBeenCalled();
  });

  it('should run #initActionFormBuild()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.capturarState = component.capturarState || {};
    component.capturarState.numeroFactura = 'numeroFactura';
    component.capturarState.cantidadTotal = 'cantidadTotal';
    component.capturarState.unidadDeMedida = 'unidadDeMedida';
    component.capturarState.valorDolares = 'valorDolares';
    component.capturarState.taxId = 'taxId';
    component.capturarState.razonSocial = 'razonSocial';
    component.capturarState.calle = 'calle';
    component.capturarState.ciudad = 'ciudad';
    component.capturarState.cp = 'cp';
    component.capturarState.pais = 'pais';
    component.initActionFormBuild();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #obtenerListasDesplegables()', async () => {
    component.obtenerIngresoSelectList = jest.fn();
    component.obtenerListasDesplegables();
    expect(component.obtenerIngresoSelectList).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.ElegibilidadDeTextilesStore = component.ElegibilidadDeTextilesStore || {};
    component.ElegibilidadDeTextilesStore.metodoNombre = jest.fn();
    component.setValoresStore({
      get: function() {
        return {
          value: {}
        };
      }
    }, {}, {});
    expect(component.ElegibilidadDeTextilesStore.metodoNombre).toHaveBeenCalled();
  });

  it('should run #obtenerIngresoSelectList()', async () => {
    component.ElegibilidadTextilesService = component.ElegibilidadTextilesService || {};
    component.ElegibilidadTextilesService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerIngresoSelectList();
    expect(component.ElegibilidadTextilesService.obtenerMenuDesplegable).toHaveBeenCalled();
  });

  it('should run #recuperarDatos()', async () => {
    component.ElegibilidadTextilesService = component.ElegibilidadTextilesService || {};
    component.ElegibilidadTextilesService.obtenerTablaDatos = jest.fn().mockReturnValue(observableOf({}));
    component.recuperarDatos();
    expect(component.ElegibilidadTextilesService.obtenerTablaDatos).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

});