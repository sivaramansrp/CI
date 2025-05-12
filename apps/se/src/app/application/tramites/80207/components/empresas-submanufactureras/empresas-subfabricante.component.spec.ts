// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { EmpresasSubFabricanteComponent } from './empresas-subfabricante.component';
import { FormBuilder } from '@angular/forms';
import { SubfabricanteService } from '../../servicios/servicios-subfabricante.service';
import { Tramites80207Queries } from '../../estados/tramite80207.query';
import { Tramites80207Store } from '../../estados/tramite80207.store';

@Injectable()
class MockSubfabricanteService {}


@Injectable()
class MockTramites80207Queries {}

@Injectable()
class MockTramites80207Store {}

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

describe('EmpresasSubFabricanteComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,EmpresasSubFabricanteComponent, ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: SubfabricanteService, useClass: MockSubfabricanteService },
        { provide: Tramites80207Queries, useClass: MockTramites80207Queries },
        { provide: Tramites80207Store, useClass: MockTramites80207Store }
      ]
    }).overrideComponent(EmpresasSubFabricanteComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(EmpresasSubFabricanteComponent);
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
    component.obtenerDatosDeRegistro = jest.fn();
    component.obtenerDatosDelAlmacen = jest.fn();
    component.obtenerListaEstado = jest.fn();
    component.ngOnInit();
    expect(component.obtenerDatosDeRegistro).toHaveBeenCalled();
    expect(component.obtenerDatosDelAlmacen).toHaveBeenCalled();
    expect(component.obtenerListaEstado).toHaveBeenCalled();
  });

  it('should run #obtenerDatosDelAlmacen()', async () => {
    component.query = component.query || {};
    component.query.infoRegisterEstado$ = observableOf({});
    component.query.datosSubcontratistaEstado$ = observableOf({});
    component.query.plantasBuscadas$ = observableOf({
      length: {}
    });
    component.query.plantasSubfabricantesAgregar$ = observableOf({
      length: {}
    });
    component.formularioInfoRegistro = component.formularioInfoRegistro || {};
    component.formularioInfoRegistro.setValue = jest.fn();
    component.formularioDatosSubcontratista = component.formularioDatosSubcontratista || {};
    component.formularioDatosSubcontratista.setValue = jest.fn();
    component.store = component.store || {};
    component.store.setFormValida = jest.fn();
    component.mostrarTablaSubfabricantesDisponibles$ = component.mostrarTablaSubfabricantesDisponibles$ || {};
    component.mostrarTablaSubfabricantesDisponibles$.next = jest.fn();
    component.obtenerDatosDelAlmacen();
    expect(component.formularioInfoRegistro.setValue).toHaveBeenCalled();
    expect(component.formularioDatosSubcontratista.setValue).toHaveBeenCalled();
    expect(component.store.setFormValida).toHaveBeenCalled();
  });

  it('should run #enEstadoSeleccionado()', async () => {
    component.formularioDatosSubcontratista = component.formularioDatosSubcontratista || {};
    component.formularioDatosSubcontratista.patchValue = jest.fn();
    component.formularioDatosSubcontratista.value = 'value';
    component.store = component.store || {};
    component.store.setDatosContr = jest.fn();
    component.enEstadoSeleccionado({
      id: {
        toString: function() {}
      }
    });
    expect(component.formularioDatosSubcontratista.patchValue).toHaveBeenCalled();
    expect(component.store.setDatosContr).toHaveBeenCalled();
  });

  it('should run #obtenerRFC()', async () => {
    component.store = component.store || {};
    component.store.setDatosContr = jest.fn();
    component.formularioDatosSubcontratista = component.formularioDatosSubcontratista || {};
    component.formularioDatosSubcontratista.value = 'value';
    component.obtenerRFC();
    expect(component.store.setDatosContr).toHaveBeenCalled();
  });

  it('should run #obtenerDatosDeRegistro()', async () => {
    component.subfabricanteDatosService = component.subfabricanteDatosService || {};
    component.subfabricanteDatosService.getDatos = jest.fn().mockReturnValue(observableOf({}));
    component.store = component.store || {};
    component.store.setInfoRegistro = jest.fn();
    component.obtenerDatosDeRegistro();
    expect(component.subfabricanteDatosService.getDatos).toHaveBeenCalled();
    expect(component.store.setInfoRegistro).toHaveBeenCalled();
  });

  it('should run #inicializarFormularioInfoRegistro()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.inicializarFormularioInfoRegistro();
     expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #inicializarFormularioDatosSubcontratista()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.inicializarFormularioDatosSubcontratista();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #obtenerListaEstado()', async () => {
    component.subfabricanteDatosService = component.subfabricanteDatosService || {};
    component.subfabricanteDatosService.obtenerListaEstado = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.obtenerListaEstado();
    expect(component.subfabricanteDatosService.obtenerListaEstado).toHaveBeenCalled();
  });

  it('should run #obtenerSubfabricantesDisponibles()', async () => {
    component.subfabricanteDatosService = component.subfabricanteDatosService || {};
    component.subfabricanteDatosService.getSubfabricantesDisponibles = jest.fn().mockReturnValue(observableOf({
      length: {}
    }));
    component.store = component.store || {};
    component.store.setPlantasBuscadas = jest.fn();
    component.obtenerSubfabricantesDisponibles();
    expect(component.subfabricanteDatosService.getSubfabricantesDisponibles).toHaveBeenCalled();
  });

  it('should run #obtenerRegistroSeleccionado()', async () => {

    component.obtenerRegistroSeleccionado({
      length: {}
    }, {});

  });

  it('should run #realizarBusqueda()', async () => {
    component.formularioDatosSubcontratista = component.formularioDatosSubcontratista || {};
    component.formularioDatosSubcontratista.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.obtenerSubfabricantesDisponibles = jest.fn();
    component.realizarBusqueda();
    expect(component.formularioDatosSubcontratista.get).toHaveBeenCalled();
    expect(component.obtenerSubfabricantesDisponibles).toHaveBeenCalled();
  });

  it('should run #agregarPlantas()', async () => {
    component.store = component.store || {};
    component.store.setPlantasSubfabricantesAgregar = jest.fn();
    component.agregarPlantas();
     expect(component.store.setPlantasSubfabricantesAgregar).toHaveBeenCalled();
  });

  it('should run #datosDelSubfabricantePorEliminar()', async () => {

    component.datosDelSubfabricantePorEliminar({});

  });

  it('should run #eliminarPlantas()', async () => {
    component.store = component.store || {};
    component.store.eliminarPlantas = jest.fn();
    component.eliminarPlantas();
     expect(component.store.eliminarPlantas).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.mostrarTablaSubfabricantesDisponibles$ = component.mostrarTablaSubfabricantesDisponibles$ || {};
    component.mostrarTablaSubfabricantesDisponibles$.next = jest.fn();
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.mostrarTablaSubfabricantesDisponibles$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

});