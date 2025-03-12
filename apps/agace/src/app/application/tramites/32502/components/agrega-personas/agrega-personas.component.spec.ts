// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, async} from '@angular/core/testing';
import { FormControl,FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

import { Component, Directive } from '@angular/core';
import { AgregaPersonasComponent } from './agrega-personas.component';
import { FormBuilder } from '@angular/forms';
import { MyCustomDirective } from './my-custom.directive.mock';
import { PhoneNumberPipe } from './phone-number.pipe.mock';
import { SafeHtmlPipe } from './safe-html.pipe.mock';
import { TranslatePipe } from './translate.pipe.mock';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';

describe('AgregaPersonasComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        AgregaPersonasComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        ValidacionesFormularioService
      ]
    }).overrideComponent(AgregaPersonasComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(AgregaPersonasComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {
      //
    };
    fixture.destroy();
  });

  it('should run #constructor()', () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #gafeteIsValid', () => {
    component.gafete = component.gafete || {};
    component.gafete.errors = 'errors';
    component.gafete.touched = 'touched';
    const GAFETEISVALID = component.gafeteIsValid;

  });

  it('should run #isValid()', () => {
    component.validacionesService = component.validacionesService || {};
    component.validacionesService.isValid = jest.fn();
    component.isValid({});
    // expect(component.validacionesService.isValid).toHaveBeenCalled();
  });

  it('should run #buscarGafete()', () => {
    component.gafete = component.gafete || {};
    component.gafete.value = 'value';
    component.habilitarCamposFormulario = jest.fn();
    component.buscarGafete();
    // expect(component.habilitarCamposFormulario).toHaveBeenCalled();
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
    // expect(component.personaForm.get).toHaveBeenCalled();
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
    // expect(component.personaForm.get).toHaveBeenCalled();
  });

  it('should run #agregarPersona()', () => {
    component.gafete = component.gafete || {};
    component.gafete.setValidators = jest.fn();
    component.gafete.updateValueAndValidity = jest.fn();
    component.gafete.invalid = 'invalid';
    component.gafete.markAllAsTouched = jest.fn();
    component.gafete.value = 'value';
    component.personaForm = component.personaForm || {};
    component.personaForm.invalid = 'invalid';
    component.personaForm.markAllAsTouched = jest.fn();
    component.personaForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.personaForm.reset = jest.fn();
    component.habilitarCamposFormulario = jest.fn();
    component.personas = component.personas || {};
    component.personas.push = jest.fn();
    component.deshabilitarCamposFormulario = jest.fn();
    component.agregarPersona();
    // expect(component.gafete.setValidators).toHaveBeenCalled();
    // expect(component.gafete.updateValueAndValidity).toHaveBeenCalled();
    // expect(component.gafete.markAllAsTouched).toHaveBeenCalled();
    // expect(component.personaForm.markAllAsTouched).toHaveBeenCalled();
    // expect(component.personaForm.get).toHaveBeenCalled();
    // expect(component.personaForm.reset).toHaveBeenCalled();
    // expect(component.habilitarCamposFormulario).toHaveBeenCalled();
    // expect(component.personas.push).toHaveBeenCalled();
    // expect(component.deshabilitarCamposFormulario).toHaveBeenCalled();
  });

  it('should run #eliminar()', () => {
    component.personas = component.personas || {};
    component.personas.splice = jest.fn();
    component.eliminar({});
    // expect(component.personas.splice).toHaveBeenCalled();
  });

});