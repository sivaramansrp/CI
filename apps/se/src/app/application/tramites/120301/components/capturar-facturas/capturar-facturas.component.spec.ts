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
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InputFechaComponent } from 'libs/shared/data-access-user/src/tramites/components/input-fecha/input-fecha.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from 'libs/shared/data-access-user/src/tramites/components/table/table.component';
import { TituloComponent } from 'libs/shared/data-access-user/src/tramites/components/titulo/titulo.component';
import { of, throwError } from 'rxjs';

describe('CapturarFacturasComponent', () => {
  let fixture;
  let component;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        CapturarFacturasComponent,
        TableComponent,
        TituloComponent,
        InputFechaComponent
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

    component.recuperarDatos = jest.fn(); // Mock recuperarDatos
    component.obtenerListasDesplegables = jest.fn();
    component.initActionFormBuild = jest.fn();
    component.seccionStore = {
      establecerFormaValida: jest.fn(),
    };
    component.ngOnDestroy = function () {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #recuperarDatos()', async () => {
    component.recuperarDatos();

    expect(component.recuperarDatos).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});
    component.ElegibilidadDeTextilesQuery = component.ElegibilidadDeTextilesQuery || {};
    component.ElegibilidadDeTextilesQuery.selectTextile$ = observableOf({});
    component.ngOnInit();

    
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