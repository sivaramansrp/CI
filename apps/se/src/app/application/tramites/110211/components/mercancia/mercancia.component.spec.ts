import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { MercanciaComponent } from './mercancia.component';
import { FormBuilder } from '@angular/forms';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { camCertificadoStore } from '../../estados/cam-certificado.store';
import { camCertificadoQuery } from '../../estados/cam-certificado.query';
import { SeccionLibStore, SeccionLibQuery } from '@ng-mf/data-access-user';

@Injectable()
class MockCamCertificadoService {}

@Injectable()
class MockcamCertificadoStore {}

@Injectable()
class MockcamCertificadoQuery {}

describe('MercanciaComponent', () => {
  let fixture: ComponentFixture<MercanciaComponent>;
  let component: { ngOnDestroy: () => void; seccionQuery: { selectSeccionState$?: any; }; query: { selectCam$?: any; }; umcOpcion: jest.Mock<any, any, any> | (() => void); facturasOpcion: jest.Mock<any, any, any> | (() => void); initActionFormBuild: jest.Mock<any, any, any> | (() => void); ngOnInit: () => void; mercanciaForm: { disable?: any; enable?: any; value?: any; }; ngAfterViewInit: () => void; fb: { group?: any; }; mercanciaState: { fraccionArancelaria?: any; nombreComercialMercancia?: any; nombreTecnico?: any; nombreIngles?: any; criterioClasificacion?: any; cantidad?: any; umc?: any; valorMercancia?: any; complementoClasificacion?: any; numeroFactura?: any; tipoFactura?: any; }; cerrarClicado: { emit?: any; }; cerrarModal: jest.Mock<any, any, any> | (() => void); activarModal: () => void; camCertificadoService: { obtenerMenuDesplegable?: any; }; guardarClicado: { emit?: any; }; store: { setmercanciaTabla?: any; metodoNombre?: any; }; tablaSeleccionEvent: { emit?: any; }; aceptar: () => void; setValoresStore: (arg0: { get: () => { value: {}; }; }, arg1: {}, arg2: {}) => void; destroyNotifier$: { next?: any; complete?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, MercanciaComponent ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: CamCertificadoService, useClass: MockCamCertificadoService },
        { provide: camCertificadoStore, useClass: MockcamCertificadoStore },
        { provide: camCertificadoQuery, useClass: MockcamCertificadoQuery },
        SeccionLibStore,
        SeccionLibQuery
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
    component.query.selectCam$ = observableOf({});
    component.umcOpcion = jest.fn();
    component.facturasOpcion = jest.fn();
    component.initActionFormBuild = jest.fn();
    component.ngOnInit();
    // expect(component.umcOpcion).toHaveBeenCalled();
    // expect(component.facturasOpcion).toHaveBeenCalled();
    // expect(component.initActionFormBuild).toHaveBeenCalled();
  });

  it('should run #ngAfterViewInit()', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.disable = jest.fn();
    component.mercanciaForm.enable = jest.fn();
    component.ngAfterViewInit();
    // expect(component.mercanciaForm.disable).toHaveBeenCalled();
    // expect(component.mercanciaForm.enable).toHaveBeenCalled();
  });

  it('should run #initActionFormBuild()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.mercanciaState = component.mercanciaState || {};
    component.mercanciaState.fraccionArancelaria = 'fraccionArancelaria';
    component.mercanciaState.nombreComercialMercancia = 'nombreComercialMercancia';
    component.mercanciaState.nombreTecnico = 'nombreTecnico';
    component.mercanciaState.nombreIngles = 'nombreIngles';
    component.mercanciaState.criterioClasificacion = 'criterioClasificacion';
    component.mercanciaState.cantidad = 'cantidad';
    component.mercanciaState.umc = 'umc';
    component.mercanciaState.valorMercancia = 'valorMercancia';
    component.mercanciaState.complementoClasificacion = 'complementoClasificacion';
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
    component.camCertificadoService = component.camCertificadoService || {};
    component.camCertificadoService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.umcOpcion();
    // expect(component.camCertificadoService.obtenerMenuDesplegable).toHaveBeenCalled();
  });

  it('should run #facturasOpcion()', async () => {
    component.camCertificadoService = component.camCertificadoService || {};
    component.camCertificadoService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.facturasOpcion();
    // expect(component.camCertificadoService.obtenerMenuDesplegable).toHaveBeenCalled();
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


  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    // expect(component.destroyNotifier$.next).toHaveBeenCalled();
    // expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

});