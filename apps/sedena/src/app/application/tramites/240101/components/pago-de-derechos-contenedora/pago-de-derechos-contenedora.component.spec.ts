// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { PagoDeDerechosContenedoraComponent } from './pago-de-derechos-contenedora.component';
import { Tramite240101Query } from '../../estados/tramite240101Query.query';
import { Tramite240101Store } from '../../estados/tramite240101Store.store';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { PagoDeDerechosComponent } from '../../../../shared/components/pago-de-derechos/pago-de-derechos.component';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Injectable()
class MockTramite240101Query {}

@Injectable()
class MockTramite240101Store {}

describe('PagoDeDerechosContenedoraComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, PagoDeDerechosComponent, HttpClientTestingModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Tramite240101Query, useClass: MockTramite240101Query },
        { provide: Tramite240101Store, useClass: MockTramite240101Store },
        ConsultaioQuery,
        DatosSolicitudService
      ]
    }).overrideComponent(PagoDeDerechosContenedoraComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PagoDeDerechosContenedoraComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.tramiteQuery = component.tramiteQuery || {};
    component.tramiteQuery.getPagoDerechos$ = observableOf({});
    component.consultaQuery = component.consultaQuery || {};
    component.consultaQuery.selectConsultaioState$ = observableOf({});
    component.ngOnInit();

  });

  it('should run #ngOnDestroy()', async () => {
    component.unsubscribe$ = component.unsubscribe$ || {};
    component.unsubscribe$.next = jest.fn();
    component.unsubscribe$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.unsubscribe$.next).toHaveBeenCalled();
  });

  it('should run #updatePagoDerechos()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updatePagoDerechosFormState = jest.fn();
    component.updatePagoDerechos({});
    expect(component.tramiteStore.updatePagoDerechosFormState).toHaveBeenCalled();
  });

});