// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { MercanciaComponent } from './mercancia.component';
import { FormBuilder } from '@angular/forms';
import { ValidarInicialmenteCertificadoService } from '../../services/validar-inicialmente-certificado.service';
import { Tramite110222Store } from '../../estados/tramite110222.store';
import { Tramite110222Query } from '../../estados/tramite110222.query';
import { SeccionLibStore, SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

@Injectable()
class MockValidarInicialmenteCertificadoService {}

@Injectable()
class MockTramite110222Store {}

@Injectable()
class MockTramite110222Query {}


describe('MercanciaComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        MercanciaComponent
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: ValidarInicialmenteCertificadoService, useClass: MockValidarInicialmenteCertificadoService },
        { provide: Tramite110222Store, useClass: MockTramite110222Store },
        { provide: Tramite110222Query, useClass: MockTramite110222Query },
        SeccionLibStore,
        SeccionLibQuery,
        ConsultaioQuery
      ]
    }).overrideComponent(MercanciaComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(MercanciaComponent);
    component = fixture.debugElement.componentInstance;
  });



  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});
    component.query = component.query || {};
    component.query.selectTramite$ = observableOf({});
    component.initActionFormBuild = jest.fn();
    component.consultaQuery = component.consultaQuery || {};
    component.consultaQuery.selectConsultaioState$ = observableOf({});
    component.umcOpcion = jest.fn();
    component.facturasOpcion = jest.fn();
    component.ngOnInit();
    expect(component.initActionFormBuild).toHaveBeenCalled();
    expect(component.umcOpcion).toHaveBeenCalled();
    expect(component.facturasOpcion).toHaveBeenCalled();
  });

  it('should run #initActionFormBuild()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.mercanciaState = component.mercanciaState || {};
    component.mercanciaState.mercanciaForm = {
      'fraccionArancelaria': {},
      'nombreComercialMercancia': {},
      'nombreTecnico': {},
      'criterioParaTratoPreferencial': {},
      'valorDeContenidoRegional': {},
      'otrasInstancias': {},
      'criterioParaConferirOrigen': {}
    };
    component.mercanciaState.cantidad = 'cantidad';
    component.mercanciaState.umc = 'umc';
    component.mercanciaState.valorMercancia = 'valorMercancia';
    component.mercanciaState.complementoDescripcion = 'complementoDescripcion';
    component.mercanciaState.numeroFactura = 'numeroFactura';
    component.mercanciaState.tipoFactura = 'tipoFactura';
    component.mercanciaState.numeroDeSerie = 'numeroDeSerie';
    component.initActionFormBuild();
  });

  it('should run #cerrarModal()', async () => {
    component.cerrarClicado = component.cerrarClicado || {};
    component.cerrarClicado.emit = jest.fn();
    component.cerrarModal();
  });

  it('should run #activarModal()', async () => {

    component.activarModal();

  });

  it('should run #umcOpcion()', async () => {
    component.ValidarInicialmenteCertificadoService = component.ValidarInicialmenteCertificadoService || {};
    component.ValidarInicialmenteCertificadoService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.umcOpcion();
  });

  it('should run #facturasOpcion()', async () => {
    component.ValidarInicialmenteCertificadoService = component.ValidarInicialmenteCertificadoService || {};
    component.ValidarInicialmenteCertificadoService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.facturasOpcion();
  });

  it('should run #aceptar()', async () => {
    component.guardarClicado = component.guardarClicado || {};
    component.guardarClicado.emit = jest.fn();
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.value = 'value';
    component.store = component.store || {};
    component.store.setmercanciaTabla = jest.fn();
    component.cerrarModal = jest.fn();
    component.tablaSeleccionEvent = component.tablaSeleccionEvent || {};
    component.tablaSeleccionEvent.emit = jest.fn();
    component.aceptar();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
  });

});