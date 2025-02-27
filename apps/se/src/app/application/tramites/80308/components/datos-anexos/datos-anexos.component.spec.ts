// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosAnexosComponent } from './datos-anexos.component';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';

@Injectable()
class MockModificacionSolicitudeService {}


describe('DatosAnexosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [ ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: ModificacionSolicitudeService, useClass: MockModificacionSolicitudeService }
      ]
    }).overrideComponent(DatosAnexosComponent, {

      set: { providers: [{ provide: ModificacionSolicitudeService, useClass: MockModificacionSolicitudeService }] }    
    }).compileComponents();
    fixture = TestBed.createComponent(DatosAnexosComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('debería ejecutar #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('debería ejecutar #ngOnInit()', async () => {
    component.obteneComplimentaria = jest.fn();
    component.ngOnInit();
    expect(component.obteneComplimentaria).toHaveBeenCalled();
  });

  it('debe ejecutar #obteneComplimentaria()', async () => {
    component.modificionService = component.modificionService || {};
    component.modificionService.obtenerAnexo = jest.fn().mockReturnValue(observableOf({}));
    component.obteneComplimentaria();
    expect(component.modificionService.obtenerAnexo).toHaveBeenCalled();
  });

  it('debería ejecutar #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.destroyNotifier$.unsubscribe = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
    expect(component.destroyNotifier$.unsubscribe).toHaveBeenCalled();
  });

});