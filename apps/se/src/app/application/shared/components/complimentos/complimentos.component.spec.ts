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
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ComplimentosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        CatalogosService
        
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
    component.formaComplimentos.valueChanges = observableOf({
      formaSocioAccionistas: {
        nationalidadMaxicana: {},
        tipoDePersona: {}
      }
    });
    component.modificarFormulario = jest.fn();
    component.complimentosDatos = component.complimentosDatos || {};
    component.complimentosDatos.emit = jest.fn();
    component.ngOnInit();
    expect(component.getCatalogoPaises).toHaveBeenCalled();
    expect(component.getCatalogoEstado).toHaveBeenCalled();
  });

  it('should run #obtainerFormaDatos()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.obtainerFormaDatos({});
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #modificarFormulario()', async () => {
    component.formaComplimentos = component.formaComplimentos || {};
    component.formaComplimentos.get = jest.fn().mockReturnValue({
      setControl: function() {},
      removeControl: function() {}
    });
    component.obtainerFormaDatos = jest.fn();
    component.modificarFormulario({}, []);
    expect(component.formaComplimentos.get).toHaveBeenCalled();
  });

  it('should run #getControls()', async () => {
    component.formaComplimentos = component.formaComplimentos || {};
    component.formaComplimentos.get = jest.fn().mockReturnValue({
      contains: function() {}
    });
    component.getControls();
    expect(component.formaComplimentos.get).toHaveBeenCalled();
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
    expect(component.subscription.add).toHaveBeenCalled();
    expect(component.catalogosServices.getCatalogoPaises).toHaveBeenCalled();
  });

  it('should run #getCatalogoEstado()', async () => {
    component.subscription = component.subscription || {};
    component.subscription.add = jest.fn();
    component.catalogosServices = component.catalogosServices || {};
    component.catalogosServices.getCatalogos = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
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
    component.getCatalogoEstado();
    expect(component.subscription.add).toHaveBeenCalled();
    expect(component.catalogosServices.getCatalogos).toHaveBeenCalled();
    expect(component.camposFormulario.findIndex).toHaveBeenCalled();
  });

  it('should run #aggregarAccionistas()', async () => {
    component.formaComplimentos = component.formaComplimentos || {};
    component.formaComplimentos.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.accionistasAgregados = component.accionistasAgregados || {};
    component.accionistasAgregados.emit = jest.fn();
    component.aggregarAccionistas();
    expect(component.formaComplimentos.get).toHaveBeenCalled();
    expect(component.accionistasAgregados.emit).toHaveBeenCalled();
  });

  it('should run #eliminarAccionistas()', async () => {
    component.empresaAccionistasSeleccionados = [1];
    component.accionistasEliminados = component.accionistasEliminados || {};
    component.accionistasEliminados.emit = jest.fn();
    
    component.eliminarAccionistas();
    expect(component.accionistasEliminados.emit).toHaveBeenCalled();
  });

  it('should run #eliminarAccionistasExtrenjeros()', async () => {
    component.accionistasExtranjerosSeleccionados = [1];
    component.accionistasExtranjerosEliminado = component.accionistasExtranjerosEliminado || {};
    component.accionistasExtranjerosEliminado.emit = jest.fn();
    component.eliminarAccionistasExtrenjeros();
    expect(component.accionistasExtranjerosEliminado.emit).toHaveBeenCalled();
  });

});