// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { AnexoVistaUnoComponent } from './anexo-vista-uno.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Tramite80101Store } from '../../estados/tramite80101.store';
import { Tramite80101Query } from '../../estados/tramite80101.query';

@Injectable()
class MockRouter {
  navigate() {};
}

@Injectable()
class MockTramite80101Store {}

@Injectable()
class MockTramite80101Query {}


describe('AnexoVistaUnoComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ AnexoVistaUnoComponent, FormsModule, ReactiveFormsModule ],
      declarations: [],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
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
        },
        { provide: Tramite80101Store, useClass: MockTramite80101Store },
        { provide: Tramite80101Query, useClass: MockTramite80101Query }
      ]
    }).overrideComponent(AnexoVistaUnoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(AnexoVistaUnoComponent);
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
    component.query = component.query || {};
    component.query.selectImportarTablsDatos$ = observableOf({
      length: {}
    });
    component.query.selectExportarTablsDatos$ = observableOf({
      length: {}
    });
    component.ngOnInit();

  });

  it('should run #obtenerAnexoUnoDevolverLaLlamada()', async () => {
    component.store = component.store || {};
    component.store.setImportarDatosTabla = jest.fn();
    component.obtenerAnexoUnoDevolverLaLlamada({});
    expect(component.store.setImportarDatosTabla).toHaveBeenCalled();
  });

  it('should run #obtenerAnexoDosDevolverLaLlamada()', async () => {
    component.store = component.store || {};
    component.store.setExportarDatosTabla = jest.fn();
    component.obtenerAnexoDosDevolverLaLlamada({});
    expect(component.store.setExportarDatosTabla).toHaveBeenCalled();
  });

  it('should run #rutaLaFraccionDeComplemento()', async () => {
    component.store = component.store || {};
    component.store.setAnnexoUnoSeccionActiva = jest.fn();
    component.store.setDatosParaNavegar = jest.fn();
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.rutaLaFraccionDeComplemento({
      catagoria: {},
      id: {},
      datos: {}
    });
    expect(component.store.setAnnexoUnoSeccionActiva).toHaveBeenCalled();
    expect(component.store.setDatosParaNavegar).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalled();
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