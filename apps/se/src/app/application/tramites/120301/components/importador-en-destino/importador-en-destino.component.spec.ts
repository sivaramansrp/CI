// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { ImportadorEnDestinoComponent } from './importador-en-destino.component';
import { ElegibilidadTextilesService } from '../../services/elegibilidad-textiles/elegibilidad-textiles.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
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


describe('ImportadorEnDestinoComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        ImportadorEnDestinoComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: ElegibilidadTextilesService, useClass: MockElegibilidadTextilesService },
        FormBuilder,
        { provide: HttpClient, useClass: MockHttpClient },
        { provide: ElegibilidadDeTextilesStore, useClass: MockElegibilidadDeTextilesStore },
        { provide: ElegibilidadDeTextilesQuery, useClass: MockElegibilidadDeTextilesQuery },
        SeccionLibStore,
        SeccionLibQuery
      ]
    }).overrideComponent(ImportadorEnDestinoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ImportadorEnDestinoComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.initActionFormBuild = jest.fn();
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});
    component.ElegibilidadDeTextilesQuery = component.ElegibilidadDeTextilesQuery || {};
    component.ElegibilidadDeTextilesQuery.selectTextile$ = observableOf({});
    component.importadorForm = component.importadorForm || {};
    component.importadorForm.statusChanges = observableOf({});
    component.importadorForm.valid = 'valid';
    component.ElegibilidadDeTextilesStore = component.ElegibilidadDeTextilesStore || {};
    component.ElegibilidadDeTextilesStore.setFormaValida = jest.fn();
    component.obtenerListasDesplegables = jest.fn();
    component.seccionStore = component.seccionStore || {};
    component.seccionStore.establecerFormaValida = jest.fn();
    component.seccionStore.establecerSeccion = jest.fn();
    component.ngOnInit();
    expect(component.initActionFormBuild).toHaveBeenCalled();
    // expect(component.ElegibilidadDeTextilesStore.setFormaValida).toHaveBeenCalled();
    // expect(component.obtenerListasDesplegables).toHaveBeenCalled();
    // expect(component.seccionStore.establecerFormaValida).toHaveBeenCalled();
    // expect(component.seccionStore.establecerSeccion).toHaveBeenCalled();
  });

  it('should run #initActionFormBuild()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.importadorState = component.importadorState || {};
    component.importadorState.tipo = 'tipo';
    component.importadorState.cantidadTotalImportador = 'cantidadTotalImportador';
    component.importadorState.razonSocialImportador = 'razonSocialImportador';
    component.importadorState.domicilio = 'domicilio';
    component.importadorState.ciudadImportador = 'ciudadImportador';
    component.importadorState.cpImportador = 'cpImportador';
    component.importadorState.PaisImportador = 'PaisImportador';
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

  it('should run #setValoresStore()', async () => {
    component.ElegibilidadDeTextilesStore = component.ElegibilidadDeTextilesStore || {};
    component.ElegibilidadDeTextilesStore.someMethod = jest.fn();
    const form = new FormGroup({
      campo: new FormControl('testValue'),
    });

    // Act
    component.setValoresStore(form, 'campo', 'someMethod');

    // Assert
    expect(component.ElegibilidadDeTextilesStore.someMethod).toHaveBeenCalled();

    // component.setValoresStore({
    //   get: function() {
    //     return {
    //       value: {}
    //     };
    //   }
    // }, {}, {});
    // expect(component.ElegibilidadDeTextilesStore.metodoNombre).toHaveBeenCalled();
  });

});