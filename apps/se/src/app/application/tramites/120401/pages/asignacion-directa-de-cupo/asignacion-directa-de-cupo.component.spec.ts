// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { AsignacionDirectaDeCupoComponent } from './asignacion-directa-de-cupo.component';
import { BtnContinuarComponent, WizardComponent } from '@libs/shared/data-access-user/src';
import { HttpClientModule } from '@angular/common/http';
import { PasoDosComponent } from '../../components/paso-dos/paso-dos.component';
import { PasoTresComponent } from '../../components/paso-tres/paso-tres.component';

describe('AsignacionDirectaDeCupoComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule , WizardComponent , HttpClientModule, PasoDosComponent, PasoTresComponent,BtnContinuarComponent],
      declarations: [
        AsignacionDirectaDeCupoComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [

      ]
    }).overrideComponent(AsignacionDirectaDeCupoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(AsignacionDirectaDeCupoComponent);
    component = fixture.debugElement.componentInstance;
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
    // expect(component.wizardComponent.siguiente).toHaveBeenCalled();
    // expect(component.wizardComponent.atras).toHaveBeenCalled();
  });

});