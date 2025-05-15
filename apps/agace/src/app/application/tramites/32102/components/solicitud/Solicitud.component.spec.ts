// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { AvisoDeAmpliacionService } from '../../services/aviso-de-ampliacion.service';
import { Component } from '@angular/core';
import { SolicitudComponent } from './solicitud.component';
import { FormBuilder } from '@angular/forms';
import { Tramite32102Store } from '../../../../estados/tramites/tramite32102.store';
import { Tramite32102Query } from '../../../../estados/queries/tramite32102.query';

@Injectable()
class MockAvisoDeAmpliacionService {}

@Injectable()
class MockTramite32102Store {}

@Injectable()
class MockTramite32102Query {}

describe('SolicitudComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, SolicitudComponent ],
      declarations: [ ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: AvisoDeAmpliacionService, useClass: MockAvisoDeAmpliacionService },
        FormBuilder,
        { provide: Tramite32102Store, useClass: MockTramite32102Store },
        { provide: Tramite32102Query, useClass: MockTramite32102Query }
      ]
    }).overrideComponent(SolicitudComponent, {

      set: { providers: [{ provide: AvisoDeAmpliacionService, useClass: MockAvisoDeAmpliacionService }] }    
    }).compileComponents();
    fixture = TestBed.createComponent(SolicitudComponent);
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
    component.tramite32102Query = component.tramite32102Query || {};
    component.tramite32102Query.selectSolicitud$ = observableOf({});
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
    component.solicitudState.MANIFIESTO_1 = 'MANIFIESTO_1';
    component.solicitudState.MANIFIESTO_2 = 'MANIFIESTO_2';
    component.solicitudState.MANIFIESTO_3 = 'MANIFIESTO_3';
    component.solicitudState.MANIFIESTO_4 = 'MANIFIESTO_4';
    component.inicializarFormulario();
  });

});