/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable require-await */
/* eslint-disable no-empty-function */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable class-methods-use-this */
/* eslint-disable @nx/enforce-module-boundaries */
/* eslint-disable @typescript-eslint/ban-ts-comment */
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
import { FiltrarArchivosDigitalizacionComponent } from './filtrar-archivos-digitalizacion.component';
import { FormBuilder } from '@angular/forms';
import { CatalogosService } from '@ng-mf/data-access-user';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';

@Injectable()
class MockHttpClient {
  post() {}
}

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

describe('FiltrarArchivosDigitalizacionComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        FiltrarArchivosDigitalizacionComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        CatalogosService,
        ToastrService,
        { provide: HttpClient, useClass: MockHttpClient }
      ]
    }).overrideComponent(FiltrarArchivosDigitalizacionComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(FiltrarArchivosDigitalizacionComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #docCargados', async () => {
    component.TipoDocumento = component.TipoDocumento || {};
    const docCargados = component.docCargados;

  });

  it('should run GetterDeclaration #btnDesactivado', async () => {
    component.documentoSeleccionado = component.documentoSeleccionado || {};
    component.documentoSeleccionado.id = 'id';
    const btnDesactivado = component.btnDesactivado;

  });

  it('should run #ngOnInit()', async () => {
    component.getTiposDocumentos = jest.fn();
    component.getDocumentos = jest.fn();
    component.ngOnInit();
    // expect(component.getTiposDocumentos).toHaveBeenCalled();
    // expect(component.getDocumentos).toHaveBeenCalled();
  });

  it('should run #getDocumentos()', async () => {
    component.http = component.http || {};
    component.http.get = jest.fn();
    component.getDocumentos();
    // expect(component.http.get).toHaveBeenCalled();
  });

  it('should run #docSeleccionado()', async () => {
    component.convertirKilobytesAMegabytes = jest.fn();
    component.docSeleccionado({}, {
      tam: {}
    });
    // expect(component.convertirKilobytesAMegabytes).toHaveBeenCalled();
  });

  it('should run #convertirKilobytesAMegabytes()', async () => {

    component.convertirKilobytesAMegabytes({});

  });

  it('should run #getTiposDocumentos()', async () => {
    component.catalogosServices = component.catalogosServices || {};
    component.catalogosServices.getCatalogo = jest.fn().mockReturnValue(observableOf({}));
    component.getTiposDocumentos();
    // expect(component.catalogosServices.getCatalogo).toHaveBeenCalled();
  });

  it('should run #addDoctoEspecifico()', async () => {
    component.documentoSeleccionado = component.documentoSeleccionado || {};
    component.documentoSeleccionado.descripcion = 'descripcion';
    component.http = component.http || {};
    component.http.get = jest.fn().mockReturnValue(observableOf({}));
    component.TipoDocumento = component.TipoDocumento || {};
    component.TipoDocumento.push = jest.fn();
    component.toastr = component.toastr || {};
    component.toastr.success = jest.fn();
    component.toastr.error = jest.fn();
    component.tipoDocumentosForm = component.tipoDocumentosForm || {};
    component.tipoDocumentosForm.get = jest.fn();
    component.addDoctoEspecifico();
    // expect(component.http.get).toHaveBeenCalled();
    // expect(component.TipoDocumento.push).toHaveBeenCalled();
    // expect(component.toastr.success).toHaveBeenCalled();
    // expect(component.toastr.error).toHaveBeenCalled();
    // expect(component.tipoDocumentosForm.get).toHaveBeenCalled();
  });

  it('should run #eliminarDoctoEspecifico()', async () => {
    component.TipoDocumento = component.TipoDocumento || {};
    component.TipoDocumento = ['TipoDocumento'];
    component.toastr = component.toastr || {};
    component.toastr.error = jest.fn();
    component.toastr.success = jest.fn();
    component.eliminarDoctoEspecifico();
    // expect(component.toastr.error).toHaveBeenCalled();
    // expect(component.toastr.success).toHaveBeenCalled();
  });

  it('should run #SeleccioneTodo()', async () => {
    component.TipoDocumento = component.TipoDocumento || {};
    component.TipoDocumento = ['TipoDocumento'];
    component.SeleccioneTodo({
      target: {
        checked: {}
      }
    });

  });

});