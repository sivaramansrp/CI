// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { AnexoDosYTresComponent } from './anexo-dos-y-tres.component';
import { FormBuilder } from '@angular/forms';

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

describe('AnexoDosYTresComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        AnexoDosYTresComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder
      ]
    }).overrideComponent(AnexoDosYTresComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(AnexoDosYTresComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #createAnexoDosForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.createAnexoDosForm();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #createAnexoTresForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.createAnexoTresForm();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #eliminarAnexoDos()', async () => {
    component.anexoDosTablaLista = component.anexoDosTablaLista || {};
    component.anexoDosTablaLista = ['anexoDosTablaLista'];
    component.obtenerAnexoDosDevolverLaLlamada = component.obtenerAnexoDosDevolverLaLlamada || {};
    component.obtenerAnexoDosDevolverLaLlamada.emit = jest.fn();
    component.eliminarAnexoDos();
    // expect(component.obtenerAnexoDosDevolverLaLlamada.emit).toHaveBeenCalled();
  });

  it('should run #agregarAnexoDos()', async () => {
    component.anexoDosFormGroup = component.anexoDosFormGroup || {};
    component.anexoDosFormGroup.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.anexoDosTablaLista = component.anexoDosTablaLista || {};
    component.anexoDosTablaLista.push = jest.fn();
    component.obtenerAnexoDosDevolverLaLlamada = component.obtenerAnexoDosDevolverLaLlamada || {};
    component.obtenerAnexoDosDevolverLaLlamada.emit = jest.fn();
    component.agregarAnexoDos();
    // expect(component.anexoDosFormGroup.get).toHaveBeenCalled();
    // expect(component.anexoDosTablaLista.push).toHaveBeenCalled();
    // expect(component.obtenerAnexoDosDevolverLaLlamada.emit).toHaveBeenCalled();
  });

  it('should run #eliminarAnexoTres()', async () => {
    component.anexoDosTablaLista = component.anexoDosTablaLista || {};
    component.anexoDosTablaLista = ['anexoDosTablaLista'];
    component.obtenerAnexoTresDevolverLaLlamada = component.obtenerAnexoTresDevolverLaLlamada || {};
    component.obtenerAnexoTresDevolverLaLlamada.emit = jest.fn();
    component.eliminarAnexoTres();
    // expect(component.obtenerAnexoTresDevolverLaLlamada.emit).toHaveBeenCalled();
  });

  it('should run #agregarAnexoTres()', async () => {
    component.anexoTresFormGroup = component.anexoTresFormGroup || {};
    component.anexoTresFormGroup.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.anexoTresTablaLista = component.anexoTresTablaLista || {};
    component.anexoTresTablaLista.push = jest.fn();
    component.obtenerAnexoTresDevolverLaLlamada = component.obtenerAnexoTresDevolverLaLlamada || {};
    component.obtenerAnexoTresDevolverLaLlamada.emit = jest.fn();
    component.agregarAnexoTres();
    // expect(component.anexoTresFormGroup.get).toHaveBeenCalled();
    // expect(component.anexoTresTablaLista.push).toHaveBeenCalled();
    // expect(component.obtenerAnexoTresDevolverLaLlamada.emit).toHaveBeenCalled();
  });

  it('should run #setAnexoDosLista()', async () => {

    component.setAnexoDosLista({});

  });

  it('should run #setAnexoTresLista()', async () => {

    component.setAnexoTresLista({});

  });

});