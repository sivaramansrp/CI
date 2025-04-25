// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { RegistroTecnicaComponent } from './registro-tecnica.component';
import { FormBuilder } from '@angular/forms';
import { Solicitud6102Store } from '../../estados/solicitud6102.store';
import { Solicitud6102Query } from '../../estados/solicitud6102.query';
import { Router } from '@angular/router';

@Injectable()
class MockSolicitud6102Store {}

@Injectable()
class MockSolicitud6102Query {}

@Injectable()
class MockRouter {
  navigate() {};
}


describe('RegistroTecnicaComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RegistroTecnicaComponent, FormsModule, ReactiveFormsModule ],
      declarations: [],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: Solicitud6102Store, useClass: MockSolicitud6102Store },
        { provide: Solicitud6102Query, useClass: MockSolicitud6102Query },
        { provide: Router, useClass: MockRouter }
      ]
    }).overrideComponent(RegistroTecnicaComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(RegistroTecnicaComponent);
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
    component.query.seleccionarSolicitud$ = observableOf({});
    component.inicializarFormulario = jest.fn();
    component.ngOnInit();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
  });

  it('should run #inicializarFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.solicitudState = component.solicitudState || {};
    component.solicitudState.radioParcial = 'radioParcial';
    component.inicializarFormulario();
  });

  it('should run #onSiguienteClick()', async () => {
    component.router = component.router || {};
    component.router.url = {
      includes: function() {}
    };
    component.router.navigate = jest.fn();
    component.onSiguienteClick();
    // expect(component.router.navigate).toHaveBeenCalled();
  });
});