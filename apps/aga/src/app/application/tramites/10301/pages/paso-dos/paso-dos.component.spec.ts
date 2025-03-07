// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { of } from 'rxjs';
import { Component } from '@angular/core';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { ImportadorExportadorService } from '../../services/importador-exportador.service';
import { ImportadorExportadorStore } from '../../state/store';
import { ImportadorExportadorQuery } from '../../state/query';
import { DatosDelTramiteComponent } from '../../components/datos-del-tramite/datos-del-tramite.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Injectable()
class MockImportadorExportadorService {}

@Injectable()
class MockImportadorExportadorStore {}

@Injectable()
class MockImportadorExportadorQuery {}

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
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, PasoDosComponent, HttpClientTestingModule ],
      declarations: [
        
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        CatalogosService,
        { provide: ImportadorExportadorService, useClass: MockImportadorExportadorService },
        { provide: ImportadorExportadorStore, useClass: MockImportadorExportadorStore },
        { provide: ImportadorExportadorQuery, useClass: MockImportadorExportadorQuery }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  class MockImportadorExportadorService{
    getTipoDocumento() {
      return of({ code: 200, data: [{ id: 1, descripcion: 'Tipo Documento' }] });
    }
  }


  afterEach(() => {
    if(component){
    component.ngOnDestroy = () => {};
    }
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.getTiposDocumentos = jest.fn();
    component.getTipoDocumento = jest.fn();
    component.ngOnInit();

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

  it('should run #enDocumentoSelect()', async () => {

    component.enDocumentoSelect({});

  });

  it('should run #verDocument()', async () => {
    component.documentosSeleccion = component.documentosSeleccion || {};
    component.documentosSeleccion.index = 'index';
    component.verDocument({});

  });

  it('should run #cambioArchivo()', async () => {
    component.tamanosDeArchivos = component.tamanosDeArchivos || {};
    component.tamanosDeArchivos.index = 'index';
    component.resoluciones = component.resoluciones || {};
    component.resoluciones.index = 'index';
    component.nombresArchivosSubidos = component.nombresArchivosSubidos || {};
    component.nombresArchivosSubidos.index = 'index';
    const fakeFile = new File(["dummy content"], "test-image.png", { type: "image/png" });
const event = {
  target: { files: [fakeFile] }
} as unknown as Event;
component.cambioArchivo(event);
    
    

  });

  it('should run #adjuntarArchivos()', async () => {

    component.adjuntarArchivos();

  });

  it('should run #cerrarProceso()', async () => {

    component.cerrarProceso();

  });

  it('should run #ngOnDestroy()', async () => {
    component.getTiposDocumentosSubscription = component.getTiposDocumentosSubscription || {};
    component.getTiposDocumentosSubscription.unsubscribe = jest.fn();
    component.getTipoDocumentoSubscription = component.getTipoDocumentoSubscription || {};
    component.getTipoDocumentoSubscription.unsubscribe = jest.fn();
    component.ngOnDestroy();
    // expect(component.getTiposDocumentosSubscription.unsubscribe).toHaveBeenCalled();
    // expect(component.getTipoDocumentoSubscription.unsubscribe).toHaveBeenCalled();
  });

});