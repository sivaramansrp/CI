// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { PagoDeDerechosContenedoraComponent } from './pago-de-derechos-contenedora.component';
import { Tramite240118Query } from '../../estados/tramite240118Query.query';
import { Tramite240118Store } from '../../estados/tramite240118Store.store';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';

@Injectable()
class MockTramite240118Query {}

@Injectable()
class MockTramite240118Store {}

@Injectable()
class MockDatosSolicitudService {
  obtenerDatosSolicitud() {
    return observableOf({});
  }
}

describe('PagoDeDerechosContenedoraComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ PagoDeDerechosContenedoraComponent, FormsModule, ReactiveFormsModule ],
      declarations: [],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Tramite240118Query, useClass: MockTramite240118Query },
        { provide: Tramite240118Store, useClass: MockTramite240118Store },
        { provide: DatosSolicitudService, useClass: MockDatosSolicitudService },

      ]
    }).overrideComponent(PagoDeDerechosContenedoraComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PagoDeDerechosContenedoraComponent);
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
    component.tramiteQuery = component.tramiteQuery || {};
    component.tramiteQuery.getPagoDerechos$ = observableOf({});
    component.ngOnInit();

  });

  it('should run #ngOnDestroy()', async () => {
    component.unsubscribe$ = component.unsubscribe$ || {};
    component.unsubscribe$.next = jest.fn();
    component.unsubscribe$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.unsubscribe$.next).toHaveBeenCalled();
    expect(component.unsubscribe$.complete).toHaveBeenCalled();
  });

  it('should run #updatePagoDerechos()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updatePagoDerechosFormState = jest.fn();
    component.updatePagoDerechos({});
    expect(component.tramiteStore.updatePagoDerechosFormState).toHaveBeenCalled();
  });

});