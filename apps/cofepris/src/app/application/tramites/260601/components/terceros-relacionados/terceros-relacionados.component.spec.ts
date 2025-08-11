import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { TercerosRelacionadosComponent } from './terceros-relacionados.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { Tramite260601Query } from '../../../../estados/queries/tramite260601.query';
import { Tramite260601Store } from '../../../../estados/tramites/tramite260601.store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

@Injectable()
class MockTramite260601Query {}

@Injectable()
class MockTramite260601Store {}
@Injectable()
class AvisoSanitarioService {}

@Injectable()
class MockAvisoSanitarioService {}

describe('TercerosRelacionadosComponent', () => {
  let fixture: ComponentFixture<TercerosRelacionadosComponent>;
  let component: { ngOnDestroy: () => void; tramiteQuery: { getProveedorTablaDatos$?: any; getFabricanteTablaDatos$?: any; }; consultaioQuery: { selectConsultaioState$?: any; }; ngOnInit: () => void; tramiteStore: { updateProveedorTablaDatos?: any; updateFabricanteTablaDatos?: any; }; addProveedores: (arg0: {}) => void; addFabricantes: (arg0: {}) => void; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, TercerosRelacionadosComponent, HttpClientTestingModule ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        ConsultaioQuery,
        { provide: Tramite260601Query, useClass: MockTramite260601Query },
        { provide: Tramite260601Store, useClass: MockTramite260601Store },
        { provide: ActivatedRoute, useValue: {} }
      ]
    }).overrideComponent(TercerosRelacionadosComponent, {

      set: { providers: [{ provide: AvisoSanitarioService, useClass: MockAvisoSanitarioService }] }    
    }).compileComponents();
    fixture = TestBed.createComponent(TercerosRelacionadosComponent);
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
    component.tramiteQuery = component.tramiteQuery || {};
    component.tramiteQuery.getProveedorTablaDatos$ = observableOf({});
    component.tramiteQuery.getFabricanteTablaDatos$ = observableOf({});
    component.consultaioQuery = component.consultaioQuery || {};
    component.consultaioQuery.selectConsultaioState$ = observableOf({});
    component.ngOnInit();

  });

  it('should run #addProveedores()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateProveedorTablaDatos = jest.fn();
    component.addProveedores({});
    // expect(component.tramiteStore.updateProveedorTablaDatos).toHaveBeenCalled();
  });

  it('should run #addFabricantes()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateFabricanteTablaDatos = jest.fn();
    component.addFabricantes({});
    // expect(component.tramiteStore.updateFabricanteTablaDatos).toHaveBeenCalled();
  });

});