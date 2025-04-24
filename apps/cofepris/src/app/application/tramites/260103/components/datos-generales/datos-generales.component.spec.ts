// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosGeneralesComponent } from './datos-generales.component';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { FormBuilder } from '@angular/forms';
import { Tramite260103Store } from '../../estados/tramite260103Store.store';
import { Location } from '@angular/common';


@Injectable()
class MockDatosSolicitudService {
  obtenerListaPaises(): Observable<any> {
    return observableOf([]);
  }
  obtenerListaEstados(): Observable<any> {
    return observableOf([]);
  }
  obtenerListaMunicipios(): Observable<any> {
    return observableOf([]);
  }
  obtenerListaCodigosPostales(): Observable<any> {
    return observableOf([]);
  }
  obtenerListaColonias(): Observable<any> {
    return observableOf([]);
  }
  obtenerListaLocalidades(): Observable<any> {
    return observableOf([]);
  }
}

@Injectable()
class MockTramite260103Store {}

@Injectable()
class MockRouter {
  navigate() {};
}

describe('DatosGeneralesComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],

      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: DatosSolicitudService, useClass: MockDatosSolicitudService },
        FormBuilder,
        { provide: Tramite260103Store, useClass: MockTramite260103Store },
        { provide: Router, useClass: MockRouter },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {url: 'url', params: {}, queryParams: {}, data: {}, paramMap: { get: (key: string) => 'someValue'}},
            url: observableOf('url'),
            params: observableOf({}),
            queryParams: observableOf({}),
            fragment: observableOf('fragment'),
            data: observableOf({})
          }
        }
      ]
    }).overrideComponent(DatosGeneralesComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosGeneralesComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #cargarDatos()', async () => {
    component.datosSolicitudService = component.datosSolicitudService || {};
    component.datosSolicitudService.obtenerListaPaises = jest.fn().mockReturnValue(observableOf({}));
    component.cargarDatos();
    expect(component.datosSolicitudService.obtenerListaPaises).toHaveBeenCalled();
  });

  it('should run #cancelar()', async () => {
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.cancelar();
    expect(component.router.navigate).toBeTruthy();
  });

  it('should run #limpiarFormulario()', async () => {
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.reset = jest.fn();
    component.limpiarFormulario();
    expect(component.agregarDatosForm.reset).toHaveBeenCalled();
  });
});