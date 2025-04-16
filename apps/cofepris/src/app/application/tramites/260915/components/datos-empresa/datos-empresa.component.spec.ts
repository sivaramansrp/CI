// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosEmpresaComponent } from './datos-empresa.component';

describe('DatosEmpresaComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,DatosEmpresaComponent],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [

      ]
    }).overrideComponent(DatosEmpresaComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosEmpresaComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #mostrar_colapsable()', async () => {

    component.mostrar_colapsable();

  });

});