// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { provideHttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PasoUnoComponent } from './paso-uno.component';

describe('PasoUnoComponent', () => {
  let fixture: ComponentFixture<PasoUnoComponent>;
  let component: PasoUnoComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,PasoUnoComponent ],
      declarations: [],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        provideHttpClient()
      ]
    }).overrideComponent(PasoUnoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PasoUnoComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run ngOnInit()', () => {
    expect(() => component.ngOnInit()).not.toThrow();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #seleccionaTab()', async () => {
    component.seleccionaTab({});
  });

  it('should run fetchGetDatosConsulta without errors', () => {
    expect(() => component.fetchGetDatosConsulta()).not.toThrow();
  });

});