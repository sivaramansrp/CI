// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { InspeccionFisicaComponent } from './inspeccion-fisica.component';
import { PasoDosComponent } from '../paso-dos/paso-dos.component';
import { PasoUnoComponent } from '../paso-uno/paso-uno.component';
import { PasoTresComponent } from '../paso-tres/paso-tres.component';


describe('InspeccionFisicaComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,InspeccionFisicaComponent , PasoDosComponent, PasoTresComponent, PasoUnoComponent],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [

      ]
    }).overrideComponent(InspeccionFisicaComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(InspeccionFisicaComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #getValorIndice()', async () => {
    component.componenteWizard = component.componenteWizard || {};
    component.componenteWizard.siguiente = jest.fn();
    component.componenteWizard.atras = jest.fn();
    component.getValorIndice({
      valor: {},
      accion: {}
    });
    // expect(component.componenteWizard.siguiente).toHaveBeenCalled();
    // expect(component.componenteWizard.atras).toHaveBeenCalled();
  });

});