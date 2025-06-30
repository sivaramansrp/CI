// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { ContenedorDePasosComponent } from './contenedor-de-pasos.component';


describe('ContenedorDePasosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        ContenedorDePasosComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [

      ]
    }).overrideComponent(ContenedorDePasosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ContenedorDePasosComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #seleccionaTab()', async () => {
    component.seleccionaTab({});
  });

  it('should run #getValorIndice()', async () => {
    component.wizardComponent = component.wizardComponent || {};
    component.wizardComponent.siguiente = jest.fn();
    component.wizardComponent.atras = jest.fn();
    component.getValorIndice({
      valor: {},
      accion: {}
    });
  });

  it('should set indice when seleccionaTab is called', () => {
    component.indice = 1;
    component.seleccionaTab(3);
    expect(component.indice).toBe(3);
  });

  it('should update indice, tituloMensaje and call wizardComponent.siguiente() when accion is "cont" and valor in range', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    };
    const accionBoton = { accion: 'cont', valor: 2 };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(2);
    expect(component.tituloMensaje).toBe('Cargar archivos');
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should update indice, tituloMensaje and call wizardComponent.atras() when accion is not "cont" and valor in range', () => {
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    };
    const accionBoton = { accion: 'atras', valor: 3 };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(3);
    expect(component.tituloMensaje).toBe('Firmar');
    expect(component.wizardComponent.atras).toHaveBeenCalled();
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should not update indice or call wizardComponent methods if valor is out of range', () => {
    component.indice = 1;
    component.tituloMensaje = 'Initial';
    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    };
    const accionBoton = { accion: 'cont', valor: 5 };
    component.getValorIndice(accionBoton);
    expect(component.indice).toBe(1);
    expect(component.tituloMensaje).toBe('Initial');
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });
  
    it('should return TITULOMENSAJE for valor 1', () => {
      expect(ContenedorDePasosComponent.obtenerNombreDelTítulo(1)).toBe(component.tituloMensaje);
    });

    it('should return "Cargar archivos" for valor 2', () => {
      expect(ContenedorDePasosComponent.obtenerNombreDelTítulo(2)).toBe('Cargar archivos');
    });

    it('should return "Firmar" for valor 3', () => {
      expect(ContenedorDePasosComponent.obtenerNombreDelTítulo(3)).toBe('Firmar');
    });

    it('should return TITULOMENSAJE for any other valor', () => {
      expect(ContenedorDePasosComponent.obtenerNombreDelTítulo(0)).toBe(component.tituloMensaje);
      expect(ContenedorDePasosComponent.obtenerNombreDelTítulo(99)).toBe(component.tituloMensaje);
      expect(ContenedorDePasosComponent.obtenerNombreDelTítulo(-1)).toBe(component.tituloMensaje);
    });

  it('should initialize datosPasos with correct values', () => {
    expect(component.datosPasos.nroPasos).toBe(component.pasos.length);
    expect(component.datosPasos.indice).toBe(component.indice);
    expect(component.datosPasos.txtBtnAnt).toBe('Anterior');
    expect(component.datosPasos.txtBtnSig).toBe('Continuar');
  });

  it('should have default indice as 1 and tituloMensaje as TITULOMENSAJE', () => {
    expect(component.indice).toBe(1);
    expect(component.tituloMensaje).toBeDefined();
  });
});
