// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

import { Component, Directive } from '@angular/core';
import { AgregaPersonasComponent } from './agrega-personas.component';
import { FormBuilder } from '@angular/forms';
import { MyCustomDirective } from '@ng-mf/data-access-user';
import { PhoneNumberPipe } from '@ng-mf/data-access-user';
import { SafeHtmlPipe } from '@ng-mf/data-access-user';
import { TranslatePipe } from '@ng-mf/data-access-user';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';

describe('AgregaPersonasComponent', () => {
  let fixture: ComponentFixture<AgregaPersonasComponent>;
  let component: AgregaPersonasComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, FormsModule,
        ReactiveFormsModule,
        AgregaPersonasComponent],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        FormBuilder,
        ValidacionesFormularioService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AgregaPersonasComponent);
    component = fixture.componentInstance;
  });

  afterEach(() => {
    if (component) {
      component.ngOnDestroy = function() {
        //
      };
    }
    fixture.destroy();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #gafeteIsValid', () => {
    component.gafete = component.gafete || {};
    component.gafete.errors = 'errors';
    component.gafete.touched = 'touched';
    const gafeteIsValid = component.gafeteIsValid;
    expect(gafeteIsValid).toBeDefined();
  });

  it('should run #isValid()', () => {
    component.validacionesService = component.validacionesService || {};
    component.validacionesService.isValid = jest.fn();
    component.isValid({});
    expect(component.validacionesService.isValid).toHaveBeenCalled();
  });

  it('should run #buscarGafete()', () => {
    component.gafete = component.gafete || {};
    component.gafete.value = 'value';
    component.habilitarCamposFormulario = jest.fn();
    component.buscarGafete();
    expect(component.habilitarCamposFormulario).toHaveBeenCalled();
  });

  it('should run #habilitarCamposFormulario()', () => {
    component.personaForm = component.personaForm || {};
    component.personaForm.controls = 'controls';
    component.personaForm.get = jest.fn().mockReturnValue({
      updateValueAndValidity: function() {
        //
      },
      setValidators: function() {
        //
      },
      enable: function() {
        //
      }
    });
    component.habilitarCamposFormulario();
    expect(component.personaForm.get).toHaveBeenCalled();
  });

  it('should run #deshabilitarCamposFormulario()', () => {
    component.personaForm = component.personaForm || {};
    component.personaForm.controls = 'controls';
    component.personaForm.get = jest.fn().mockReturnValue({
      disable: function() {
        //
      }
    });
    component.deshabilitarCamposFormulario();
    expect(component.personaForm.get).toHaveBeenCalled();
  });

  it('should run #agregarPersona()', () => {
    component.gafete = component.gafete || {};
    component.gafete.setValidators = jest.fn();
    component.gafete.updateValueAndValidity = jest.fn();
    Object.defineProperty(component.gafete, 'invalid', { get: jest.fn(() => 'invalid') });
    component.gafete.markAllAsTouched = jest.fn();
    component.gafete.value = 'value';
    component.personaForm = component.personaForm || {};
    Object.defineProperty(component.personaForm, 'invalid', { get: jest.fn(() => 'invalid') });
    component.personaForm.markAllAsTouched = jest.fn();
    component.personaForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.personaForm.reset = jest.fn();
    component.habilitarCamposFormulario = jest.fn();
    component.personas = component.personas || [];
    component.personas.push = jest.fn();
    component.deshabilitarCamposFormulario = jest.fn();
    component.agregarPersona();
    expect(component.gafete.setValidators).toHaveBeenCalled();
    expect(component.gafete.updateValueAndValidity).toHaveBeenCalled();
    expect(component.gafete.markAllAsTouched).toHaveBeenCalled();
    expect(component.personaForm.markAllAsTouched).toHaveBeenCalled();
    expect(component.personaForm.get).toHaveBeenCalled();
    expect(component.personaForm.reset).toHaveBeenCalled();
    expect(component.habilitarCamposFormulario).toHaveBeenCalled();
    expect(component.personas.push).toHaveBeenCalled();
    expect(component.deshabilitarCamposFormulario).toHaveBeenCalled();
  });

  it('should run #eliminar()', () => {
    component.personas = component.personas || [];
    component.personas.splice = jest.fn();
    component.eliminar({});
    expect(component.personas.splice).toHaveBeenCalled();
  });
});