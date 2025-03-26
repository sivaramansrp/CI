// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component, ChangeDetectorRef } from '@angular/core';
import { PasoUnoComponent } from './paso-uno.component';

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'phoneNumber'})
class PhoneNumberPipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'safeHtml'})
class SafeHtmlPipe implements PipeTransform {
  transform(value) { return value; }
}

describe('PasoUnoComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        PasoUnoComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        ChangeDetectorRef
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

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngAfterViewInit()', async () => {
    component.solicitante = component.solicitante || {};
    component.solicitante.obtenerTipoPersona = jest.fn();
    component.cdr = component.cdr || {};
    component.cdr.detectChanges = jest.fn();
    component.ngAfterViewInit();
    // expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalled();
    // expect(component.cdr.detectChanges).toHaveBeenCalled();
  });

  it('should run #seleccionaTab()', async () => {
    component.miEvento = component.miEvento || {};
    component.miEvento.emit = jest.fn();
    component.seleccionaTab({}, {});
    // expect(component.miEvento.emit).toHaveBeenCalled();
  });

  it('should run #emitirCancelacion()', async () => {
    component.eventoDatosHijo = component.eventoDatosHijo || {};
    component.eventoDatosHijo.emit = jest.fn();
    component.seleccionaTab = jest.fn();
    component.emitirCancelacion({});
    // expect(component.eventoDatosHijo.emit).toHaveBeenCalled();
    // expect(component.seleccionaTab).toHaveBeenCalled();
  });

  it('should run #ngAfterViewInit()', async () => {
    component.solicitante = component.solicitante || {};
    component.solicitante.obtenerTipoPersona = jest.fn();
    component.ngAfterViewInit();
    // expect(component.solicitante.obtenerTipoPersona).toHaveBeenCalled();
  });

  it('should run #seleccionaTab()', async () => {

    component.seleccionaTab({});

  });


  it('should run #emitirCancelacion()', async () => {

    component.emitirCancelacion();

  });

});