// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  Pipe,
  PipeTransform,
  Injectable,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
  Directive,
  Input,
  Output,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DetallesPlantasComponent } from './detalles-plantas.component';
import { FormBuilder } from '@angular/forms';

describe('DetallesPlantasComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [FormBuilder],
    })
      .overrideComponent(DetallesPlantasComponent, {})
      .compileComponents();
    fixture = TestBed.createComponent(DetallesPlantasComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #inicializarFormularioDatosPlantas()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn().mockReturnValue({
      get: function () {},
    });
    component.inicializarFormularioDatosPlantas();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #regresarPlantas()', async () => {
    component.alRegresarPlantas = component.alRegresarPlantas || {};
    component.alRegresarPlantas.emit = jest.fn();
    component.regresarPlantas();
    // expect(component.alRegresarPlantas.emit).toHaveBeenCalled();
  });

  it('should run #cambiarPermaneceMerCancia()', async () => {
    component.formularioDatosPlantas = component.formularioDatosPlantas || {};
    component.formularioDatosPlantas.patchValue = jest.fn();
    component.cambiarPermaneceMerCancia({
      id: {},
    });
    // expect(component.formularioDatosPlantas.patchValue).toHaveBeenCalled();
  });

  it('should run #cambiartipoContribuyente()', async () => {
    component.formularioDatosPlantas = component.formularioDatosPlantas || {};
    component.formularioDatosPlantas.patchValue = jest.fn();
    component.cambiartipoContribuyente({
      id: {},
    });
    // expect(component.formularioDatosPlantas.patchValue).toHaveBeenCalled();
  });
});
