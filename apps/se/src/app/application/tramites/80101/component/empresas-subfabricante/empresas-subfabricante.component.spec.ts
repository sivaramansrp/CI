// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { EmpresasSubfabricanteComponent } from './empresas-subfabricante.component';
import { NuevoProgramaIndustrialService } from '../../services/nuevo-programa-industrial.service';
import { FormBuilder } from '@angular/forms';
import { Tramite80101Query } from '../../estados/tramite80101.query';
import { Tramite80101Store } from '../../estados/tramite80101.store';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
class MockNuevoProgramaIndustrialService {}

@Injectable()
class MockTramite80101Query {}

@Injectable()
class MockTramite80101Store {}

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
      imports: [EmpresasSubfabricanteComponent, FormsModule, ReactiveFormsModule ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: NuevoProgramaIndustrialService, useClass: MockNuevoProgramaIndustrialService },
        FormBuilder,
        { provide: Tramite80101Query, useClass: MockTramite80101Query },
        { provide: Tramite80101Store, useClass: MockTramite80101Store },
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

  it('should run #obtenerDatosDelAlmacen()', async () => {
    component.query = component.query || {};
    component.query.datosSubcontratistaEstado$ = observableOf({});
    component.query.plantasBuscadas$ = observableOf({
      length: {}
    });
    component.query.plantasSubfabricantesAgregar$ = observableOf({
      length: {}
    });
    component.formularioDatosSubcontratista = component.formularioDatosSubcontratista || {};
    component.formularioDatosSubcontratista.setValue = jest.fn();
    // Removed setting 'valid' as it is a read-only property
    component.store = component.store || {};
    component.store.setFormValida = jest.fn();
    component.obtenerDatosDelAlmacen();
    expect(component.formularioDatosSubcontratista.setValue).toHaveBeenCalled();
    expect(component.store.setFormValida).toHaveBeenCalled();
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
    component.alCambiarRFC({data: 'dummy'});
    expect(component.store.setDatosSubcontratista).toHaveBeenCalled();
  });

  it('should run #inicializarFormularioDatosSubcontratista()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.inicializarFormularioDatosSubcontratista();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #obtenerListaEstado()', async () => {
    component.nuevoProgramaIndustrialService = component.nuevoProgramaIndustrialService || {};
    component.nuevoProgramaIndustrialService.obtenerListaEstado = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.obtenerListaEstado();
    expect(component.nuevoProgramaIndustrialService.obtenerListaEstado).toHaveBeenCalled();
  });

  it('should run #obtenerSubfabricantesDisponibles()', async () => {
    component.nuevoProgramaIndustrialService = component.nuevoProgramaIndustrialService || {};
    component.nuevoProgramaIndustrialService.getSubfabricantesDisponibles = jest.fn().mockReturnValue(observableOf([{data:'dummy'}]));
    component.store = component.store || {};
    component.store.setPlantasBuscadas = jest.fn();
    component.obtenerSubfabricantesDisponibles();
    expect(component.nuevoProgramaIndustrialService.getSubfabricantesDisponibles).toHaveBeenCalled();
    expect(component.store.setPlantasBuscadas).toHaveBeenCalled();
  });

  it('should run #obtenerRegistroSeleccionado()', async () => {

    component.obtenerRegistroSeleccionado({
      length: {}
    });

  });

  it('should run #realizarBusqueda()', async () => {
    component.formularioDatosSubcontratista = component.formularioDatosSubcontratista || {};
    component.formularioDatosSubcontratista.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.obtenerSubfabricantesDisponibles = jest.fn();
    component.realizarBusqueda();
    expect(component.formularioDatosSubcontratista.get).toHaveBeenCalled();
  });

  it('should run #agregarPlantas()', async () => {
    component.store = component.store || {};
    component.store.setPlantasSubfabricantesAgregar = jest.fn();
    component.agregarPlantas([{data:'dummy'}]);
    expect(component.store.setPlantasSubfabricantesAgregar).toHaveBeenCalled();
  });

  it('should run #datosDelSubfabricantePorEliminar()', async () => {

    component.datosDelSubfabricantePorEliminar({});

  });

  it('should run #eliminarPlantas()', async () => {
    component.store = component.store || {};
    component.store.eliminarPlantas = jest.fn();
    component.eliminarPlantas([{data:'dummy'}]);
    expect(component.store.eliminarPlantas).toHaveBeenCalled();
  });

  it('should run #complementarPlantas()', async () => {
    component.store = component.store || {};
    component.store.setPlantasPorCompletar = jest.fn();
    component.store.setindicePrevioRuta = jest.fn();
    component.router = component.router || {};
    component.router.navigate = jest.fn();
    component.tabIndex = 1;
    component.complementarPlantas([{data:'dummy'}]);
    expect(component.store.setPlantasPorCompletar).toHaveBeenCalled();
    expect(component.store.setindicePrevioRuta).toHaveBeenCalled();
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