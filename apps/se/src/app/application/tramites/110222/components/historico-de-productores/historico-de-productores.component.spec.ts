// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { HistoricoDeProductoresComponent } from './historico-de-productores.component';
import { FormBuilder } from '@angular/forms';
import { CertificadoDeService } from '../../services/validar-inicialmente-certificado.service';
import { Tramite110222Store } from '../../estados/tramite110222.store';
import { Tramite110222Query } from '../../estados/tramite110222.query';

@Injectable()
class MockCertificadoDeService {}

@Injectable()
class MockTramite110222Store {}

@Injectable()
class MockTramite110222Query {}


describe('HistoricoDeProductoresComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: CertificadoDeService, useClass: MockCertificadoDeService },
        { provide: Tramite110222Store, useClass: MockTramite110222Store },
        { provide: Tramite110222Query, useClass: MockTramite110222Query }
      ]
    }).overrideComponent(HistoricoDeProductoresComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(HistoricoDeProductoresComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.cargarProductorPorExportador = jest.fn();
    component.cargarMercancia = jest.fn();
    component.facturaOpcion = jest.fn();
    component.tramiteQuery = component.tramiteQuery || {};
    component.tramiteQuery.formulario$ = observableOf({});
    component.tramiteQuery.agregarDatosProductorFormulario$ = observableOf({});
    component.ngOnInit();
    expect(component.cargarProductorPorExportador).toHaveBeenCalled();
    expect(component.cargarMercancia).toHaveBeenCalled();
    expect(component.facturaOpcion).toHaveBeenCalled();
  });


  it('should run #cargarProductorPorExportador()', async () => {
    component.certificadoDeService = component.certificadoDeService || {};
    component.certificadoDeService.obtenerProductorPorExportador = jest.fn().mockReturnValue(observableOf({
      datos: {}
    }));
    component.cargarProductorPorExportador();
    expect(component.certificadoDeService.obtenerProductorPorExportador).toHaveBeenCalled();
  });
  it('should run #facturaOpcion()', async () => {
    component.certificadoDeService = component.certificadoDeService || {};
    component.certificadoDeService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.facturaOpcion();
    expect(component.certificadoDeService.obtenerMenuDesplegable).toHaveBeenCalled();
  });
  it('should run #cargarMercancia()', async () => {
    component.certificadoDeService = component.certificadoDeService || {};
    component.certificadoDeService.obtenerMercancia = jest.fn().mockReturnValue(observableOf({
      datos: {}
    }));
    component.cargarMercancia();
    expect(component.certificadoDeService.obtenerMercancia).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.store = component.store || {};
    component.store.setFormHistorico = jest.fn();
    component.setValoresStore({});
    expect(component.store.setFormHistorico).toHaveBeenCalled();
  });

  it('should run #setValoresStoreAgregarForm()', async () => {
    component.store = component.store || {};
    component.store.setAgregarFormDatosProductor = jest.fn();
    component.setValoresStoreAgregarForm({});
    expect(component.store.setAgregarFormDatosProductor).toHaveBeenCalled();
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