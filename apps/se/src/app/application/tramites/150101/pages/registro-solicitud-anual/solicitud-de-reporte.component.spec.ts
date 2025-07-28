// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { SolicitudDeReporteComponent } from './solicitud-de-reporte.component';

describe('SolicitudDeReporteComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        SolicitudDeReporteComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [

      ]
    }).overrideComponent(SolicitudDeReporteComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(SolicitudDeReporteComponent);
    component = fixture.debugElement.componentInstance;

    component.wizardComponent = {
      siguiente: jest.fn(),
      atras: jest.fn()
    } as any;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
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

  it('should update indice and call siguiente when accion is "cont" and valor is in range', () => {
    const mockEvent = { valor: 2, accion: 'cont' };

    component.getValorIndice(mockEvent);

    expect(component.indice).toBe(2);
    expect(component.wizardComponent.siguiente).toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should update indice and call atras when accion is not "cont" and valor is in range', () => {
    const mockEvent = { valor: 3, accion: 'back' };

    component.getValorIndice(mockEvent);

    expect(component.indice).toBe(3);
    expect(component.wizardComponent.atras).toHaveBeenCalled();
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
  });

  it('should not update indice or call any method when valor is out of range (too low)', () => {
    const mockEvent = { valor: 0, accion: 'cont' };

    component.indice = 1;
    component.getValorIndice(mockEvent);

    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

  it('should not update indice or call any method when valor is out of range (too high)', () => {
    const mockEvent = { valor: 6, accion: 'back' };

    component.indice = 1;
    component.getValorIndice(mockEvent);

    expect(component.indice).toBe(1);
    expect(component.wizardComponent.siguiente).not.toHaveBeenCalled();
    expect(component.wizardComponent.atras).not.toHaveBeenCalled();
  });

});