/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable require-await */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-empty-function */
/* eslint-disable class-methods-use-this */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable sort-imports */
/* eslint-disable max-classes-per-file */
// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, Directive, Injectable, Input, NO_ERRORS_SCHEMA, Output, Pipe, PipeTransform } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { AnexarPageComponent } from './anexar-page.component';
import { CatalogosService, RegistroDigitalizarDocumentosService } from '@ng-mf/data-access-user';
import { DomSanitizer } from '@angular/platform-browser';

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

describe('AnexarPageComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        AnexarPageComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        CatalogosService,
        RegistroDigitalizarDocumentosService,
        DomSanitizer
      ]
    }).overrideComponent(AnexarPageComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(AnexarPageComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.getTiposDocumentos = jest.fn();
    component.getTipoDocumento = jest.fn();
    component.ngOnInit();
    // expect(component.getTiposDocumentos).toHaveBeenCalled();
    // expect(component.getTipoDocumento).toHaveBeenCalled();
  });

  it('should run #getTiposDocumentos()', async () => {
    component.catalogosServices = component.catalogosServices || {};
    component.catalogosServices.getCatalogo = jest.fn().mockReturnValue(observableOf({}));
    component.getTiposDocumentos();
    // expect(component.catalogosServices.getCatalogo).toHaveBeenCalled();
  });

  it('should run #getTipoDocumento()', async () => {
    component.registrodigitalizar = component.registrodigitalizar || {};
    component.registrodigitalizar.getTipoDocumento = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getTipoDocumento();
    // expect(component.registrodigitalizar.getTipoDocumento).toHaveBeenCalled();
  });

  it('should run #todosDocumentos()', async () => {
    component.documentosSeleccion = component.documentosSeleccion || {};
    component.documentosSeleccion.every = jest.fn().mockReturnValue([
      null
    ]);
    component.todosDocumentos();
    // expect(component.documentosSeleccion.every).toHaveBeenCalled();
  });

  it('should run #enDocumentSelect()', async () => {
    component.disponiblesDocumentos = component.disponiblesDocumentos || {};
    component.disponiblesDocumentos.index = 'index';
    component.enDocumentSelect({});

  });

  it('should run #verDocument()', async () => {
    component.nombresArchivosSubidos = component.nombresArchivosSubidos || {};
    component.nombresArchivosSubidos.index = 'index';
    component.sanitizer = component.sanitizer || {};
    component.sanitizer.bypassSecurityTrustResourceUrl = jest.fn();
    component.verDocument({});
    // expect(component.sanitizer.bypassSecurityTrustResourceUrl).toHaveBeenCalled();
  });

  it('should run #cambioArchivo()', async () => {
    component.fileSizes = component.fileSizes || {};
    component.fileSizes.index = 'index';
    component.resolucions = component.resolucions || {};
    component.resolucions.index = 'index';
    component.nombresArchivosSubidos = component.nombresArchivosSubidos || {};
    component.nombresArchivosSubidos.index = 'index';
    component.cambioArchivo({
      target: {
        files: {
          result: {}
        },
        value: {}
      }
    }, {});

  });

  it('should run #adjuntarArchivos()', async () => {

    component.adjuntarArchivos();

  });

  it('should run #cerrarProceso()', async () => {

    component.cerrarProceso();

  });

});