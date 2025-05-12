// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { EmpresasSubfabricanteComponent } from './empresas-subfabricante.component';
import { AutorizacionProgrmaNuevoService } from '../../services/autorizacion-programa-nuevo.service';
import { FormBuilder } from '@angular/forms';
import { Tramite80102Query } from '../../estados/tramite80102.query';
import { Tramite80102Store } from '../../estados/tramite80102.store';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
class MockAutorizacionProgrmaNuevoService {}

@Injectable()
class MockTramite80102Query {}

@Injectable()
class MockTramite80102Store {}

@Injectable()
class MockRouter {
  navigate() {};
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

describe('EmpresasSubfabricanteComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ,EmpresasSubfabricanteComponent],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: AutorizacionProgrmaNuevoService, useClass: MockAutorizacionProgrmaNuevoService },
        FormBuilder,
        { provide: Tramite80102Query, useClass: MockTramite80102Query },
        { provide: Tramite80102Store, useClass: MockTramite80102Store },
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
    }).overrideComponent(EmpresasSubfabricanteComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(EmpresasSubfabricanteComponent);
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
    component.obtenerDatosDelAlmacen = jest.fn();
    component.obtenerListaEstado = jest.fn();
    component.ngOnInit();
     expect(component.obtenerDatosDelAlmacen).toHaveBeenCalled();
     expect(component.obtenerListaEstado).toHaveBeenCalled();
  });

  it('should run #enEstadoSeleccionado()', async () => {
    component.formularioDatosSubcontratista = component.formularioDatosSubcontratista || {};
    component.formularioDatosSubcontratista.patchValue = jest.fn();
    component.formularioDatosSubcontratista.value = 'value';
    component.store = component.store || {};
    component.store.setDatosSubcontratista = jest.fn();
    component.enEstadoSeleccionado({
      id: {
        toString: function() {}
      }
    });
     expect(component.formularioDatosSubcontratista.patchValue).toHaveBeenCalled();
     expect(component.store.setDatosSubcontratista).toHaveBeenCalled();
  });

  it('should run #alCambiarRFC()', async () => {
    component.store = component.store || {};
    component.store.setDatosSubcontratista = jest.fn();
    component.alCambiarRFC({});
     expect(component.store.setDatosSubcontratista).toHaveBeenCalled();
  });

  it('should run #inicializarFormularioDatosSubcontratista()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.inicializarFormularioDatosSubcontratista();
     expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #obtenerListaEstado()', async () => {
    component.AutorizacionProgrmaNuevoServiceServicios = component.AutorizacionProgrmaNuevoServiceServicios || {};
    component.AutorizacionProgrmaNuevoServiceServicios.obtenerListaEstado = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.obtenerListaEstado();
     expect(component.AutorizacionProgrmaNuevoServiceServicios.obtenerListaEstado).toHaveBeenCalled();
  });

  it('should run #eliminarPlantas()', async () => {
    component.store = component.store || {};
    component.store.eliminarPlantas = jest.fn();
    component.eliminarPlantas({});
     expect(component.store.eliminarPlantas).toHaveBeenCalled();
  });

  it('should run #complementarPlantas()', async () => {
    component.store = component.store || {};
    component.store.setPlantasPorCompletar = jest.fn();
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.complementarPlantas({});
     expect(component.store.setPlantasPorCompletar).toHaveBeenCalled();
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