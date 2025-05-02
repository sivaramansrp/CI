// @ts-nocheck

// Este import es necesario para realizar pruebas unitarias en Angular.
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Importaciones necesarias para el funcionamiento de Angular y pruebas unitarias.
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';

import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

// Este import es necesario para definir y utilizar componentes en Angular.
import { Component } from '@angular/core';
import { DatosComponent } from './datos.component';
import { solicitud } from '@libs/shared/data-access-user/src';

describe('DatosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule , ],
      declarations: [
        DatosComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [

      ]
    }).overrideComponent(DatosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #esPrimeraPestana', async () => {

    const esPrimeraPestana = component.esPrimeraPestana;

  });

  it('should run GetterDeclaration #esUltimaPestana', async () => {

    const esUltimaPestana = component.esUltimaPestana;

  });

  it('should run #seleccionaTab()', async () => {

    component.seleccionaTab({});

  });

  it('should run #avanzarTab()', async () => {

    component.avanzarTab();

  });

  it('should run #retrocederTab()', async () => {

    component.retrocederTab();

  });

  it('should run #resetTabs()', async () => {

    component.resetTabs();

  });

});