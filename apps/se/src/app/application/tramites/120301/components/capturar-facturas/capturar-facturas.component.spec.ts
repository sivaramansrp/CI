import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { SeccionLibStore, SeccionLibQuery, TableComponent, TituloComponent, InputFechaComponent } from '@ng-mf/data-access-user';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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

describe('CapturarFacturasComponent', () => {
  let fixture: ComponentFixture<CapturarFacturasComponent>;
  let component: { ngOnDestroy: () => void; seccionQuery: { selectSeccionState$?: any; }; ElegibilidadDeTextilesQuery: { selectTextile$?: any; }; initActionFormBuild: jest.Mock<any, any, any> | (() => void); obtenerListasDesplegables: jest.Mock<any, any, any> | (() => void); recuperarDatos: jest.Mock<any, any, any> | (() => void); seccionStore: { establecerFormaValida?: any; establecerSeccion?: any; }; facturaForm: { statusChanges?: any; valid?: any; }; ElegibilidadDeTextilesStore: { setFormaValida?: any; metodoNombre?: any; }; ngOnInit: () => void; fb: { group?: any; }; capturarState: { numeroFactura?: any; cantidadTotal?: any; unidadDeMedida?: any; valorDolares?: any; taxId?: any; razonSocial?: any; calle?: any; ciudad?: any; cp?: any; pais?: any; }; obtenerIngresoSelectList: jest.Mock<any, any, any> | (() => void); setValoresStore: (arg0: { get: () => { value: {}; }; }, arg1: {}, arg2: {}) => void; ElegibilidadTextilesService: { obtenerMenuDesplegable?: any; obtenerTablaDatos?: any; }; destroyNotifier$: { next?: any; complete?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        CapturarFacturasComponent,
        TableComponent,
        TituloComponent,
        InputFechaComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: ElegibilidadTextilesService, useClass: MockElegibilidadTextilesService },
        { provide: HttpClient, useClass: MockHttpClient },
        FormBuilder,
        { provide: ElegibilidadDeTextilesStore, useClass: MockElegibilidadDeTextilesStore },
        { provide: ElegibilidadDeTextilesQuery, useClass: MockElegibilidadDeTextilesQuery },
        SeccionLibStore,
        SeccionLibQuery
      ]
    }).overrideComponent(CapturarFacturasComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(CapturarFacturasComponent);
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
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});
    component.ElegibilidadDeTextilesQuery = component.ElegibilidadDeTextilesQuery || {};
    component.ElegibilidadDeTextilesQuery.selectTextile$ = observableOf({});
    component.initActionFormBuild = jest.fn();
    component.obtenerListasDesplegables = jest.fn();
    component.recuperarDatos = jest.fn();
    component.seccionStore = component.seccionStore || {};
    component.seccionStore.establecerFormaValida = jest.fn();
    component.seccionStore.establecerSeccion = jest.fn();
    component.facturaForm = component.facturaForm || {};
    component.facturaForm.statusChanges = observableOf({});
    component.facturaForm.valid = 'valid';
    component.ElegibilidadDeTextilesStore = component.ElegibilidadDeTextilesStore || {};
    component.ElegibilidadDeTextilesStore.setFormaValida = jest.fn();
    component.ngOnInit();
    // expect(component.initActionFormBuild).toHaveBeenCalled();
    // expect(component.obtenerListasDesplegables).toHaveBeenCalled();
    // expect(component.recuperarDatos).toHaveBeenCalled();
    // expect(component.seccionStore.establecerFormaValida).toHaveBeenCalled();
    // expect(component.seccionStore.establecerSeccion).toHaveBeenCalled();
    // expect(component.ElegibilidadDeTextilesStore.setFormaValida).toHaveBeenCalled();
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
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #obtenerListasDesplegables()', async () => {
    component.obtenerIngresoSelectList = jest.fn();
    component.obtenerListasDesplegables();
    // expect(component.obtenerIngresoSelectList).toHaveBeenCalled();
  });

  it('should run #obtenerIngresoSelectList()', async () => {
    component.ElegibilidadTextilesService = component.ElegibilidadTextilesService || {};
    component.ElegibilidadTextilesService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerIngresoSelectList();
    // expect(component.ElegibilidadTextilesService.obtenerMenuDesplegable).toHaveBeenCalled();
  });

  it('should run #recuperarDatos()', async () => {
    component.ElegibilidadTextilesService = component.ElegibilidadTextilesService || {};
    component.ElegibilidadTextilesService.obtenerTablaDatos = jest.fn().mockReturnValue(observableOf({}));
    component.recuperarDatos();
    // expect(component.ElegibilidadTextilesService.obtenerTablaDatos).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    // expect(component.destroyNotifier$.next).toHaveBeenCalled();
    // expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

});