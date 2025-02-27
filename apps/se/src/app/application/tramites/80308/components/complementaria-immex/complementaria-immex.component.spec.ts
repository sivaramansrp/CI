// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { ComplementariaImmexComponent } from './complementaria-immex.component';

describe('ComplementariaImmexComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [

      ]
    }).overrideComponent(ComplementariaImmexComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ComplementariaImmexComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('debería ejecutar #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('debe ejecutar #seleccionaTab()', async () => {

    component.seleccionaTab({});

  });

});