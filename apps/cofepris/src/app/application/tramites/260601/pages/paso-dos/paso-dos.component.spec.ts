import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { PasoDosComponent } from './paso-dos.component';
import { CatalogosService } from '@ng-mf/data-access-user';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Injectable()
class MockAvisoSanitarioService {}

describe('PasoDosComponent', () => {
  let fixture: ComponentFixture<PasoDosComponent>;
  let component: { ngOnDestroy: () => void; getTiposDocumentos: jest.Mock<any, any, any> | (() => void); obtenerDocumentosSeleccionados: jest.Mock<any, any, any> | (() => void); ngOnInit: () => void; catalogosServices: { getCatalogo?: any; }; avisoSanitarioService: { obtenerDocumentosSeleccionados?: any; }; destruirNotificador$: { next?: any; complete?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, PasoDosComponent, HttpClientTestingModule ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        CatalogosService,
        { provide: AvisoSanitarioService, useClass: MockAvisoSanitarioService }
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
    component.obtenerDocumentosSeleccionados = jest.fn();
    component.ngOnInit();
  });

  it('should run #getTiposDocumentos()', async () => {
    component.catalogosServices = component.catalogosServices || {};
    component.catalogosServices.getCatalogo = jest.fn().mockReturnValue(observableOf({}));
    component.getTiposDocumentos();
  });

  it('should run #obtenerDocumentosSeleccionados()', async () => {
    component.avisoSanitarioService = component.avisoSanitarioService || {};
    component.avisoSanitarioService.obtenerDocumentosSeleccionados = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerDocumentosSeleccionados();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destruirNotificador$ = component.destruirNotificador$ || {};
    component.destruirNotificador$.next = jest.fn();
    component.destruirNotificador$.complete = jest.fn();
    component.ngOnDestroy();
  });

});