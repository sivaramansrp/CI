// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { AgregarFabricanteContenedoraComponent } from './agregar-fabricante-contenedora.component';
import { Tramite260102Store } from '../../estados/stores/tramite260102Store.store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Injectable()
class MockTramite260102Store {}

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

describe('AgregarFabricanteContenedoraComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, AgregarFabricanteContenedoraComponent,HttpClientTestingModule ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Tramite260102Store, useClass: MockTramite260102Store }
      ]
    }).overrideComponent(AgregarFabricanteContenedoraComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(AgregarFabricanteContenedoraComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #updateFabricanteTablaDatos()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateFabricanteTablaDatos = jest.fn();
    component.updateFabricanteTablaDatos({});
    expect(component.tramiteStore.updateFabricanteTablaDatos).toHaveBeenCalled();
  });

});