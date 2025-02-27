// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosComplimentariaComponent } from './datos-complimentaria.component';
import { ModificacionSolicitudeService } from '../../services/modificacion-solicitude.service';

@Injectable()
class MockModificacionSolicitudeService {}


describe('DatosComplimentariaComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: ModificacionSolicitudeService, useClass: MockModificacionSolicitudeService }
      ]
    }).overrideComponent(DatosComplimentariaComponent, {

      set: { providers: [{ provide: ModificacionSolicitudeService, useClass: MockModificacionSolicitudeService }] }    
    }).compileComponents();
    fixture = TestBed.createComponent(DatosComplimentariaComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('debería ejecutar #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('debería ejecutar #ngOnInit()', async () => {
    component.obtenerFederetarios = jest.fn();
    component.obtenerOperacions = jest.fn();
    component.obtenerComplimentaria = jest.fn();
    component.ngOnInit();
    expect(component.obtenerFederetarios).toHaveBeenCalled();
    expect(component.obtenerOperacions).toHaveBeenCalled();
    expect(component.obtenerComplimentaria).toHaveBeenCalled();
  });

  it('debe ejecutar #obtenerComplimentaria()', async () => {
    component.modificionService = component.modificionService || {};
    component.modificionService.obtenerComplimentaria = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerComplimentaria();
    expect(component.modificionService.obtenerComplimentaria).toHaveBeenCalled();
  });

  it('debe ejecutar #obtenerFederetarios()', async () => {
    component.modificionService = component.modificionService || {};
    component.modificionService.obtenerFederetarios = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerFederetarios();
    expect(component.modificionService.obtenerFederetarios).toHaveBeenCalled();
  });

  it('debería ejecutar #obtenerOperacions()', async () => {
    component.modificionService = component.modificionService || {};
    component.modificionService.obtenerOperacion = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerOperacions();
    expect(component.modificionService.obtenerOperacion).toHaveBeenCalled();
  });

});