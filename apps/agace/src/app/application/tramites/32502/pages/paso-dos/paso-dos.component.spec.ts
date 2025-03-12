// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { CUSTOM_ELEMENTS_SCHEMA, Input, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, async} from '@angular/core/testing';
import { FormControl,FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

import { Component, Directive } from '@angular/core';
import { AgregaPersonasComponent } from './agrega-personas.component';
import { FormBuilder } from '@angular/forms';
import { MyCustomDirective } from '@ng-mf/data-access-user';
import { PhoneNumberPipe } from '@ng-mf/data-access-user';
import { SafeHtmlPipe } from '@ng-mf/data-access-user';
import { TranslatePipe } from '@ng-mf/data-access-user';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';

describe('PasoDosComponent', () => {
  let fixture;
  let component;

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
        DocumentoService,
        ToastrService
      ]
    }).overrideComponent(PasoDosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PasoDosComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {
      //
    };
    fixture.destroy();
  });

  it('should run #constructor()', () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #btnDesactivado', () => {
    component.documentoSeleccionado = component.documentoSeleccionado || {};
    component.documentoSeleccionado.id = 'id';
    const BTN_DISACTIVADO = component.btnDesactivado;

  });

  it('should run #cargarDoc()', () => {
    component.PDF = component.PDF || {};
    component.PDF.toLowerCase = jest.fn();
    component.toastr = component.toastr || {};
    component.toastr.error = jest.fn();
    component.toastr.success = jest.fn();
    component.documentoSeleccionado = component.documentoSeleccionado || {};
    component.documentoSeleccionado.tam = 'tam';
    component.DocumentoService = component.DocumentoService || {};
    component.DocumentoService.subirDocumento = jest.fn().mockReturnValue(observableOf({}));
    component.documentosCargados = component.documentosCargados || {};
    component.documentosCargados.push = jest.fn();
    component.cargarDoc({
      target: {
        files: {
          0: {
            name: 'name',
            size: {}
          }
        }
      }
    });
    // expect(component.PDF.toLowerCase).toHaveBeenCalled();
    // expect(component.toastr.error).toHaveBeenCalled();
    // expect(component.toastr.success).toHaveBeenCalled();
    // expect(component.DocumentoService.subirDocumento).toHaveBeenCalled();
    // expect(component.documentosCargados.push).toHaveBeenCalled();
  });

  it('should run #convertirKilobytesABytes()', () => {

    component.convertirKilobytesABytes({});

  });

});