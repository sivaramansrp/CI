// @ts-nocheck
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Directive, Injectable, Input, NO_ERRORS_SCHEMA, Output, Pipe, PipeTransform } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { CambioDeModalidadComponent } from './cambio-de-modalidad.component';
import { FormBuilder } from '@angular/forms';
import { CambioModalidadService } from 'libs/shared/data-access-user/src/core/services/80208/cambio-modalidad.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('CambioDeModalidadComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, CambioDeModalidadComponent, HttpClientTestingModule ],
      declarations: [
      ],
      providers: [
        FormBuilder,
        CambioModalidadService
      ]
    }).overrideComponent(CambioDeModalidadComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(CambioDeModalidadComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #ngOnInit()', async () => {
    component.inicializarForm = jest.fn();
    component.getcargarDatos = jest.fn();
    component.disableFormControls = jest.fn();
    component.getCambioDeModalidad = jest.fn();
    component.getServiciosImmx = jest.fn();
    component.ngOnInit();
    expect(component.inicializarForm).toHaveBeenCalled();
    expect(component.getcargarDatos).toHaveBeenCalled();
    expect(component.disableFormControls).toHaveBeenCalled();
    expect(component.getCambioDeModalidad).toHaveBeenCalled();
    expect(component.getServiciosImmx).toHaveBeenCalled();
  });

  it('should run #inicializarForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.inicializarForm();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #getcargarDatos()', async () => {
    component.modalidadService = component.modalidadService || {};
    component.modalidadService.getDatosSimulados = jest.fn().mockReturnValue(observableOf({}));
    component.cambioDeModalidadForm = component.cambioDeModalidadForm || {};
    component.cambioDeModalidadForm.patchValue = jest.fn();
    component.getcargarDatos();
    expect(component.modalidadService.getDatosSimulados).toHaveBeenCalled();
    expect(component.cambioDeModalidadForm.patchValue).toHaveBeenCalled();
  });

  it('should run #getServiciosImmx()', async () => {
    component.modalidadService = component.modalidadService || {};
    component.modalidadService.getServiciosImmx = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.getServiciosImmx();
    expect(component.modalidadService.getServiciosImmx).toHaveBeenCalled();
  });

  it('should run #getCambioDeModalidad()', async () => {
    component.modalidadService = component.modalidadService || {};
    component.modalidadService.getCambioDeModalidad = jest.fn().mockReturnValue(observableOf({
      cambioModalidad: {
        data: {}
      }
    }));
    component.cambioDeModalidadForm = component.cambioDeModalidadForm || {};
    component.cambioDeModalidadForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.toggleServiciosImmx = jest.fn();
    component.getCambioDeModalidad();
    expect(component.modalidadService.getCambioDeModalidad).toHaveBeenCalled();
    expect(component.cambioDeModalidadForm.get).toHaveBeenCalled();
    expect(component.toggleServiciosImmx).toHaveBeenCalled();
  });

  it('should run #disableFormControls()', async () => {
    component.cambioDeModalidadForm = component.cambioDeModalidadForm || {};
    component.cambioDeModalidadForm.get = jest.fn().mockReturnValue({
      disable: function() {}
    });
    component.disableFormControls();
    expect(component.cambioDeModalidadForm.get).toHaveBeenCalled();
  });

  it('should run #toggleServiciosImmx()', async () => {
    component.cambioDeModalidad = [{ id: 1 }, { id: 2 }];
    component.cambioDeModalidad.find = jest.fn().mockReturnValue({
      id: {}
    });
    component.toggleServiciosImmx({});
    expect(component.cambioDeModalidad.find).toHaveBeenCalled();
  });

  it('should run #onDropdownSelect()', async () => {
    component.toggleServiciosImmx = jest.fn();
    component.onDropdownSelect({
      id: {}
    });
    expect(component.toggleServiciosImmx).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.unsubscribe$ = component.unsubscribe$ || {};
    component.unsubscribe$.next = jest.fn();
    component.unsubscribe$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.unsubscribe$.next).toHaveBeenCalled();
    expect(component.unsubscribe$.complete).toHaveBeenCalled();
  });

});