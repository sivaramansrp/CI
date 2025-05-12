// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { TramitesAsociadosComponent } from './tramites-asociados.component';
import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';
import { Router } from '@angular/router';

class MockRegistrarSolicitudMcpService {
  getTramitesAsociados() {
    return observableOf([]); // Mocked response
  }
}

class MockRouter {
  navigate = jest.fn();
}

describe('TramitesAsociadosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,TramitesAsociadosComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: RegistrarSolicitudMcpService, useClass: MockRegistrarSolicitudMcpService },
        { provide: Router, useClass: MockRouter }
      ]
    }).overrideComponent(TramitesAsociadosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(TramitesAsociadosComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.getTramitesAsociados = jest.fn();
    component.ngOnInit();
    expect(component.getTramitesAsociados).toHaveBeenCalled();
  });

  it('should run #getTramitesAsociados()', async () => {
    component.registrarsolicitudmcp = component.registrarsolicitudmcp || {};
    component.registrarsolicitudmcp.getTramitesAsociados = jest.fn().mockReturnValue(observableOf({}));
    component.getTramitesAsociados();
    expect(component.registrarsolicitudmcp.getTramitesAsociados).toHaveBeenCalled();
  });

  it('should run #showModal()', async () => {

    component.showModal();

  });

  it('should run #hideModal()', async () => {

    component.hideModal();

  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyed$ = component.destroyed$ || {};
    component.destroyed$.next = jest.fn();
    component.destroyed$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyed$.next).toHaveBeenCalled();
    expect(component.destroyed$.complete).toHaveBeenCalled();
  });

});