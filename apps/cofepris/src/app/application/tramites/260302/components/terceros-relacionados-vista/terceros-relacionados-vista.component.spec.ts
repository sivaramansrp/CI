// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { TercerosRelacionadosVistaComponent } from './terceros-relacionados-vista.component';
import { Tramite260302Store } from '../../estados/tramite260302Store.store';
import { Tramite260302Query } from '../../estados/tramite260302Query.query';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
class MockTramite260302Store {}

@Injectable()
class MockTramite260302Query {}

@Injectable()
class MockRouter {
  navigate() {};
}

describe('TercerosRelacionadosVistaComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],

      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Tramite260302Store, useClass: MockTramite260302Store },
        { provide: Tramite260302Query, useClass: MockTramite260302Query },
        { provide: Router, useClass: MockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {url: 'url', params: {}, queryParams: {}, data: {}},
            url: observableOf('url'),
            params: observableOf({}),
            queryParams: observableOf({}),
            fragment: observableOf('fragment'),
            data: observableOf({})
          }
        }
      ]
    }).overrideComponent(TercerosRelacionadosVistaComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(TercerosRelacionadosVistaComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.tramiteQuery = component.tramiteQuery || {};
    component.tramiteQuery.getFabricanteTablaDatos$ = 'getFabricanteTablaDatos$';
    component.tramiteQuery.getCertificadoTablaDatos$ = 'getCertificadoTablaDatos$';
    component.tramiteQuery.getProveedorTablaDatos$ = 'getProveedorTablaDatos$';
    component.tramiteQuery.getFacturadorTablaDatos$ = 'getFacturadorTablaDatos$';
    component.tramiteQuery.getOtrasTablaDatos$ = 'getOtrasTablaDatos$';
    component.ngOnInit();

  });

  it('should run #navigate()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.navigate({});
  });

  it('should run #navigateOtros()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.navigateOtros();
    expect(component.router.navigate).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroy$ = component.destroy$ || {};
    component.destroy$.next = jest.fn();
    component.destroy$.complete = jest.fn();
    component.ngOnDestroy();
  });

});