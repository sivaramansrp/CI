// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { Component } from '@angular/core';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { ImportadorExportadorService } from 'libs/shared/data-access-user/src/core/services/10301/importador-exportador.service';

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

describe('PasoDosComponent', () => {
  let fixture;
  let component:PasoDosComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        PasoDosComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        CatalogosService,
        ImportadorExportadorService
      ]
    }).overrideComponent(PasoDosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PasoDosComponent);
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
    component.importarExportar = component.importarExportar || {};
    component.importarExportar.getTipoDocumento = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getTipoDocumento();
    // expect(component.importarExportar.getTipoDocumento).toHaveBeenCalled();
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

    component.enDocumentSelect({});

  });

  it('should run #verDocument()', async () => {
    component.documentosSeleccion = component.documentosSeleccion || {};
    component.documentosSeleccion.index = 'index';
    component.verDocument({});

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
          0: {
            size: {},
            name: {}
          }
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