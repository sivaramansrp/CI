// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { SolicitanteComponent } from './solicitante.component';
import { SolicitanteService } from '@libs/shared/data-access-user/src/core/services/shared/solicitante/solicitante.service';
import { FormBuilder } from '@angular/forms';
import { FormulariosService } from '@libs/shared/data-access-user/src/core/services/shared/formularios/formularios.service';


describe('SolicitanteComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, SolicitanteComponent ],
      declarations: [],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        provideHttpClient(),
        SolicitanteService,
        FormBuilder,
        FormulariosService
      ]
    }).overrideComponent(SolicitanteComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(SolicitanteComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #datosGeneralesForm', async () => {
    component.form = component.form || {};
    component.form.get = jest.fn();
    const datosGeneralesForm = component.datosGeneralesForm;
    // expect(component.form.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #domicilioFiscalForm', async () => {
    component.form = component.form || {};
    component.form.get = jest.fn();
    const domicilioFiscalForm = component.domicilioFiscalForm;
    // expect(component.form.get).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.getDatosGenerales = jest.fn();
    component.ngOnInit();
    // expect(component.getDatosGenerales).toHaveBeenCalled();
  });

  it('should run #obtenerTipoPersona()', async () => {

    component.obtenerTipoPersona({});

  });

  it('should run #crearFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.crearFormulario();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #inicializarFormGroup()', async () => {
    component.form = component.form || {};
    component.form.get = jest.fn().mockReturnValue({
      addControl: function() {}
    });
    component.getValidators = jest.fn();
    component.fb = component.fb || {};
    component.fb.control = jest.fn();
    component.inicializarFormGroup([{
      validators: {},
      campo: {},
      disabled: {}
    }], {});
    // expect(component.form.get).toHaveBeenCalled();
    // expect(component.getValidators).toHaveBeenCalled();
    // expect(component.fb.control).toHaveBeenCalled();
  });

  it('should run #getValidators()', async () => {

    component.getValidators([{}]);

  });

  it('should run #getDatosGenerales()', async () => {
    component.solicitanteServicio = component.solicitanteServicio || {};
    component.solicitanteServicio.getDatosGenerales = jest.fn().mockReturnValue(observableOf({}));
    component.formServices = component.formServices || {};
    component.formServices.obtenerNombresCamposForm = jest.fn().mockReturnValue([{}]);
    component.formServices.agregarValorCampoDesactivados = jest.fn();
    component.getDatosGenerales();
    // expect(component.solicitanteServicio.getDatosGenerales).toHaveBeenCalled();
    // expect(component.formServices.obtenerNombresCamposForm).toHaveBeenCalled();
    // expect(component.formServices.agregarValorCampoDesactivados).toHaveBeenCalled();
  });

});