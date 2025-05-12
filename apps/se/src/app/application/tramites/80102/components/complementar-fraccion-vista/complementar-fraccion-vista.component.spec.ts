// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { ComplementarFraccionVistaComponent } from './complementar-fraccion-vista.component';
import { Tramite80102Query } from '../../estados/tramite80102.query';

@Injectable()
class MockTramite80102Query {}

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

describe('ComplementarFraccionVistaComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ ComplementarFraccionVistaComponent,FormsModule, ReactiveFormsModule ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Tramite80102Query, useClass: MockTramite80102Query }
      ]
    }).overrideComponent(ComplementarFraccionVistaComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ComplementarFraccionVistaComponent);
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
    component.query = component.query || {};
    component.query.selectDatosParaNavegar$ = observableOf({
      encabezadoDescripcionComercial: {}
    });
    component.complimentarFraccionDatos = component.complimentarFraccionDatos || {};
    component.complimentarFraccionDatos.descripcion = 'descripcion';
    component.ngOnInit();

  });

  it('should run #getDatos()', async () => {

    component.getDatos({});

  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
     expect(component.destroyNotifier$.next).toHaveBeenCalled();
     expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

});