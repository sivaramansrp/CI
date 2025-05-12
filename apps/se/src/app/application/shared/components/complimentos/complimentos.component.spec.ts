// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { ComplimentosComponent } from './complimentos.component';
import { FormBuilder } from '@angular/forms';
import { CatalogosService } from '@ng-mf/data-access-user';
import { ComplimentosService } from '../../services/complimentos.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Injectable()
class MockComplimentosService {}


describe('ComplimentosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        CatalogosService,
        { provide: ComplimentosService, useClass: MockComplimentosService }
      ]
    }).overrideComponent(ComplimentosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ComplimentosComponent);
    component = fixture.debugElement.componentInstance;
  });



  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.getCatalogoPaises = jest.fn();
    component.getCatalogoEstado = jest.fn();
    component.subscription = component.subscription || {};
    component.subscription.add = jest.fn();
    component.formaComplimentos = component.formaComplimentos || {};
    component.formaComplimentos.valueChanges = observableOf({});
    component.formaComplimentos.value = 'value';
    component.formaComplimentos.patchValue = jest.fn();
    component.complimentosDatos = component.complimentosDatos || {};
    component.complimentosDatos.emit = jest.fn();
    component.ngOnInit();
    // expect(component.getCatalogoPaises).toHaveBeenCalled();
    // expect(component.getCatalogoEstado).toHaveBeenCalled();
    // expect(component.subscription.add).toHaveBeenCalled();
    // expect(component.formaComplimentos.patchValue).toHaveBeenCalled();
    // expect(component.complimentosDatos.emit).toHaveBeenCalled();
  });

  it('should run #obtainerFormaDatos()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.obtainerFormaDatos({});
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #modificarFormulario()', async () => {
    component.formaComplimentos = component.formaComplimentos || {};
    component.formaComplimentos.get = jest.fn().mockReturnValue({
      setControl: function() {},
      removeControl: function() {}
    });
    component.obtainerFormaDatos = jest.fn();
    component.modificarFormulario({}, [0]);
    expect(component.formaComplimentos.get).toHaveBeenCalled();
    // expect(component.obtainerFormaDatos).toHaveBeenCalled();
  });

  it('should run #obtenerControles()', async () => {
    component.formaComplimentos = component.formaComplimentos || {};
    component.formaComplimentos.get = jest.fn().mockReturnValue({
      contains: function() {}
    });
    component.obtenerControles();
    // expect(component.formaComplimentos.get).toHaveBeenCalled();
  });

  it('should run #getCatalogoPaises()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.add = jest.fn();
    component.catalogosServices = component.catalogosServices || {};
    component.catalogosServices.getCatalogoPaises = jest.fn().mockReturnValue(observableOf({}));
    component.camposFormulario = component.camposFormulario || {};
    component.camposFormulario.findIndex = jest.fn().mockReturnValue([
      {
        "campo": {}
      }
    ]);
    component.camposFormularioTipoPersona = component.camposFormularioTipoPersona || {};
    component.camposFormularioTipoPersona.findIndex = jest.fn().mockReturnValue([
      {
        "campo": {}
      }
    ]);
    component.camposFormularioTipoPersona.INDICEALT = {
      opciones: {}
    };
    component.camposFormularioDefault = component.camposFormularioDefault || {};
    component.camposFormularioDefault.INDICE = {
      opciones: {}
    };
    component.getCatalogoPaises();
    // expect(component.subscription.add).toHaveBeenCalled();
    // expect(component.catalogosServices.getCatalogoPaises).toHaveBeenCalled();
    // expect(component.camposFormulario.findIndex).toHaveBeenCalled();
    // expect(component.camposFormularioTipoPersona.findIndex).toHaveBeenCalled();
  });

  it('should run #getCatalogoEstado()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.add = jest.fn();
    component.complimentosService = component.complimentosService || {};
    component.complimentosService.obtenerListaEstado = jest.fn().mockReturnValue(observableOf({}));
    component.camposFormulario = component.camposFormulario || {};
    component.camposFormulario.findIndex = jest.fn().mockReturnValue([
      {
        "campo": {}
      }
    ]);
    component.camposFormularioTipoPersona = component.camposFormularioTipoPersona || {};
    component.camposFormularioTipoPersona.findIndex = jest.fn().mockReturnValue([
      {
        "campo": {}
      }
    ]);
    component.camposFormularioTipoPersona.INDICEALT = {
      opcionesCatalogo: {}
    };
    component.camposFormularioDefault = component.camposFormularioDefault || {};
    component.camposFormularioDefault.INDICE = {
      opcionesCatalogo: {}
    };
    component.getCatalogoEstado();
    // expect(component.subscription.add).toHaveBeenCalled();
    // expect(component.complimentosService.obtenerListaEstado).toHaveBeenCalled();
    // expect(component.camposFormulario.findIndex).toHaveBeenCalled();
    // expect(component.camposFormularioTipoPersona.findIndex).toHaveBeenCalled();
  });

  it('should run #aggregarAccionistas()', async () => {
    component.formaComplimentos = component.formaComplimentos || {};
    component.formaComplimentos.get = jest.fn().mockReturnValue({
      get: function() {}
    });
    component.accionistasAgregados = component.accionistasAgregados || {};
    component.accionistasAgregados.emit = jest.fn();
    component.aggregarAccionistas();
    // expect(component.formaComplimentos.get).toHaveBeenCalled();
    // expect(component.accionistasAgregados.emit).toHaveBeenCalled();
  });

  it('should run #eliminarAccionistas()', async () => {
    component.empresaAccionistasSeleccionados = component.empresaAccionistasSeleccionados || {};
    component.accionistasEliminados = component.accionistasEliminados || {};
    component.accionistasEliminados.emit = jest.fn();
    component.eliminarAccionistas();
    // expect(component.accionistasEliminados.emit).toHaveBeenCalled();
  });

  it('should run #eliminarAccionistasExtrenjeros()', async () => {
    component.accionistasExtranjerosSeleccionados = component.accionistasExtranjerosSeleccionados || {};
    component.accionistasExtranjerosEliminado = component.accionistasExtranjerosEliminado || {};
    component.accionistasExtranjerosEliminado.emit = jest.fn();
    component.eliminarAccionistasExtrenjeros();
    // expect(component.accionistasExtranjerosEliminado.emit).toHaveBeenCalled();
  });

  it('should run #handleModificarForma()', async () => {
    component.formaComplimentos = component.formaComplimentos || {};
    component.formaComplimentos.value = {
      formaSocioAccionistas: {
        nationalidadMaxicana: {},
        tipoDePersona: {}
      }
    };
    component.modificarFormulario = jest.fn();
    component.handleModificarForma();
    // expect(component.modificarFormulario).toHaveBeenCalled();
  });

});