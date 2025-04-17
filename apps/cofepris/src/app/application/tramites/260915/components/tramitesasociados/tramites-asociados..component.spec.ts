// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { Solicitud260915State, Solicitud260915Store } from '../../estados/tramites260915.store';
import { Solicitud260915Query } from '../../estados/tramites260915.query';
import { Component } from '@angular/core';
import { TramitesAsociadosComponent } from './tramites-asociados.component';
import { PermisoSanitarioDispositivosMedicosService } from '../../services/permiso-sanitario-dispositivos-medicos.service';

import { Router } from '@angular/router';

class MockPermisoSanitarioDispositivosMedicosService {
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
        { provide: PermisoSanitarioDispositivosMedicosService, useClass: MockPermisoSanitarioDispositivosMedicosService },
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
    component.permisosanitariodispositivosmedicosservice = component.permisosanitariodispositivosmedicosservice || {};
    component.permisosanitariodispositivosmedicosservice.getTramitesAsociados = jest.fn().mockReturnValue(observableOf({}));
    component.getTramitesAsociados();
    expect(component.permisosanitariodispositivosmedicosservice.getTramitesAsociados).toHaveBeenCalled();
  });

  it('should run #showModal()', async () => {

    component.showModal();

  });

  it('should run #hideModal()', async () => {
    component.esModalVisible = true; // Set modal visibility to true
    component.hideModal(); // Call the method
    expect(component.esModalVisible).toBe(false); // Assert that the modal is hidden
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