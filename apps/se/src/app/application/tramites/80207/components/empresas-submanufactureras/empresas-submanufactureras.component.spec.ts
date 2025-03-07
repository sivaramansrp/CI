// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { EmpresasSubmanufacturerasComponent } from './empresas-submanufactureras.component';
import { FormBuilder } from '@angular/forms';
import { SubManufacturerService } from '../../servicios/servicios-submanufacturer-servico';
import { Tramites80207Queries } from '../../estados/tramite80207.query';
import { Tramites80207Store } from '../../estados/tamite80207.store';

@Injectable()
class MockSubManufacturerService {}

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

describe('EmpresasSubmanufacturerasComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ,EmpresasSubmanufacturerasComponent],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: SubManufacturerService, useClass: MockSubManufacturerService },
        { provide: Tramites80207Queries, useClass: MockTramites80207Queries },
        { provide: Tramites80207Store, useClass: MockTramites80207Store }
      ]
    }).overrideComponent(EmpresasSubmanufacturerasComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(EmpresasSubmanufacturerasComponent);
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

  
  it('should run #enEstadoSeleccionado()', async () => {
    component.store = component.store || {};
    component.store.setDatosContr = jest.fn();
    component.enEstadoSeleccionado({
      id: {
        toString: function() {}
      }
    });
     expect(component.store.setDatosContr).toHaveBeenCalled();
  });

  it('should run #obtenerRFC()', async () => {
    component.formularioDatosSubcontratista = component.formularioDatosSubcontratista || {};
    component.formularioDatosSubcontratista.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.store = component.store || {};
    component.store.setDatosContr = jest.fn();
    component.obtenerRFC();
    expect(component.formularioDatosSubcontratista.get).toHaveBeenCalled();
    expect(component.store.setDatosContr).toHaveBeenCalled();
  });

  it('should run #obtenerDatosDeRegistro()', async () => {
    component.subManufacturerDatoService = component.subManufacturerDatoService || {};
    component.subManufacturerDatoService.getDatos = jest.fn().mockReturnValue(observableOf({}));
    component.store = component.store || {};
    component.store.setInfoRegistro = jest.fn();
    component.obtenerDatosDeRegistro();
    expect(component.subManufacturerDatoService.getDatos).toHaveBeenCalled();
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
     expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #obtenerListaEstado()', async () => {
    component.subManufacturerDatoService = component.subManufacturerDatoService || {};
    component.subManufacturerDatoService.obtenerListaEstado = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.obtenerListaEstado();
     expect(component.subManufacturerDatoService.obtenerListaEstado).toHaveBeenCalled();
  });

  it('should run #obtenerSubfabricantesDisponibles()', async () => {
    component.subManufacturerDatoService = component.subManufacturerDatoService || {};
    component.subManufacturerDatoService.getSubfabricantesDisponibles = jest.fn().mockReturnValue(observableOf({}));
    component.mostrarTablaSubfabricantesDisponibles$ = component.mostrarTablaSubfabricantesDisponibles$ || {};
    component.mostrarTablaSubfabricantesDisponibles$.next = jest.fn();
    component.obtenerSubfabricantesDisponibles();
    expect(component.subManufacturerDatoService.getSubfabricantesDisponibles).toHaveBeenCalled();
    expect(component.mostrarTablaSubfabricantesDisponibles$.next).toHaveBeenCalled();
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
    component.datosDelSubfabricanteSeleccionado = component.datosDelSubfabricanteSeleccionado || {};
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
    component.store.setPlantasSubfabricantesEliminar = jest.fn();
    component.eliminarPlantas();
     expect(component.store.setPlantasSubfabricantesEliminar).toHaveBeenCalled();
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

