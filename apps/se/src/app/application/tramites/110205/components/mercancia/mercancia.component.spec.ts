import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { MercanciaComponent } from './mercancia.component';
import { FormBuilder } from '@angular/forms';
import { PeruCertificadoService } from '../../services/peru-certificado.service';
import { Tramite110205Store } from '../../estados/tramite110205.store';
import { Tramite110205Query } from '../../estados/tramite110205.query';
import { SeccionLibQuery, ConsultaioQuery } from '@libs/shared/data-access-user/src';

@Injectable()
class MockPeruCertificadoService {}

@Injectable()
class MockTramite110205Store {}

@Injectable()
class MockTramite110205Query {}

describe('MercanciaComponent', () => {
  let fixture: ComponentFixture<MercanciaComponent>;
  let component: { ngOnDestroy: () => void; seccionQuery: { selectSeccionState$?: any; }; query: { selectPeru$?: any; }; initActionFormBuild: jest.Mock<any, any, any> | (() => void); umcOpcion: jest.Mock<any, any, any> | (() => void); facturasOpcion: jest.Mock<any, any, any> | (() => void); ngOnInit: () => void; fb: { group?: any; }; mercanciaState: { mercanciaForm?: any; cantidad?: any; umc?: any; valorMercancia?: any; complementoDescripcion?: any; numeroFactura?: any; tipoFactura?: any; }; cerrarClicado: { emit?: any; }; cerrarModal: jest.Mock<any, any, any> | (() => void); activarModal: () => void; peruCertificadoService: { obtenerMenuDesplegable?: any; }; guardarClicado: { emit?: any; }; mercanciaForm: { value?: any; }; store: { setmercanciaTabla?: any; metodoNombre?: any; }; tablaSeleccionEvent: { emit?: any; }; aceptar: () => void; setValoresStore: (arg0: { get: () => { value: {}; }; }, arg1: {}, arg2: {}) => void; abrirModal: () => void; destroyNotifier$: { next?: any; complete?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        MercanciaComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: PeruCertificadoService, useClass: MockPeruCertificadoService },
        { provide: Tramite110205Store, useClass: MockTramite110205Store },
        { provide: Tramite110205Query, useClass: MockTramite110205Query },
        SeccionLibQuery,
        ConsultaioQuery
      ]
    }).overrideComponent(MercanciaComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(MercanciaComponent);
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
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});
    component.query = component.query || {};
    component.query.selectPeru$ = observableOf({});
    component.initActionFormBuild = jest.fn();
    component.umcOpcion = jest.fn();
    component.facturasOpcion = jest.fn();
    component.ngOnInit();
    // expect(component.initActionFormBuild).toHaveBeenCalled();
    // expect(component.umcOpcion).toHaveBeenCalled();
    // expect(component.facturasOpcion).toHaveBeenCalled();
  });

  it('should run #initActionFormBuild()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.mercanciaState = component.mercanciaState || {};
    component.mercanciaState.mercanciaForm = {
      'fraccionArancelaria': {},
      'nombreComercialMercancia': {},
      'nombreTecnico': {},
      'nombreIngles': {},
      'otrasInstancias': {},
      'criterioParaConferirOrigen': {}
    };
    component.mercanciaState.cantidad = 'cantidad';
    component.mercanciaState.umc = 'umc';
    component.mercanciaState.valorMercancia = 'valorMercancia';
    component.mercanciaState.complementoDescripcion = 'complementoDescripcion';
    component.mercanciaState.numeroFactura = 'numeroFactura';
    component.mercanciaState.tipoFactura = 'tipoFactura';
    component.initActionFormBuild();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #cerrarModal()', async () => {
    component.cerrarClicado = component.cerrarClicado || {};
    component.cerrarClicado.emit = jest.fn();
    component.cerrarModal();
    // expect(component.cerrarClicado.emit).toHaveBeenCalled();
  });

  it('should run #activarModal()', async () => {

    component.activarModal();

  });

  it('should run #umcOpcion()', async () => {
    component.peruCertificadoService = component.peruCertificadoService || {};
    component.peruCertificadoService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.umcOpcion();
    // expect(component.peruCertificadoService.obtenerMenuDesplegable).toHaveBeenCalled();
  });

  it('should run #facturasOpcion()', async () => {
    component.peruCertificadoService = component.peruCertificadoService || {};
    component.peruCertificadoService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.facturasOpcion();
    // expect(component.peruCertificadoService.obtenerMenuDesplegable).toHaveBeenCalled();
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
    // expect(component.guardarClicado.emit).toHaveBeenCalled();
    // expect(component.store.setmercanciaTabla).toHaveBeenCalled();
    // expect(component.cerrarModal).toHaveBeenCalled();
    // expect(component.tablaSeleccionEvent.emit).toHaveBeenCalled();
  });


  it('should run #abrirModal()', async () => {

    component.abrirModal();

  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    // expect(component.destroyNotifier$.next).toHaveBeenCalled();
    // expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

});