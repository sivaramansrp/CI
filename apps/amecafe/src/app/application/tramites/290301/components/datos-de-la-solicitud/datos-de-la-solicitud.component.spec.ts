
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {  Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';

import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder } from '@angular/forms';
import { NacionalRegistroDelCafeExportadoresService } from '../../services/nacional-registro-del-cafe-exportadores.service';
import { Solicitud290301Store } from '../../estados/tramite290301.store';
import { Solicitud290301Query } from '../../estados/tramite290301.query';
import { provideHttpClient } from '@angular/common/http';

@Injectable()
class MockNacionalRegistroDelCafeExportadoresService {}

@Injectable()
class MockSolicitud290301Store {}

@Injectable()
class MockSolicitud290301Query {}

describe('DatosDeLaSolicitudComponent', () => {
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let component: { ngOnDestroy: () => void; solicitud290301Query: { selectSolicitud$?: any; }; createForm: jest.Mock<any, any, any> | (() => void); subscribeToProductorDeCafeChanges: jest.Mock<any, any, any> | (() => void); getRegionsData: jest.Mock<any, any, any> | (() => void); getBeneficiosData: jest.Mock<any, any, any> | (() => void); getBodegasData: jest.Mock<any, any, any> | (() => void); getCafeExportadoresData: jest.Mock<any, any, any> | (() => void); ngOnInit: () => void; fb: { group?: any; }; dataDeLaSolicitudState: { justificacion?: any; productorDeCafe?: any; claveDelPadron?: any; observaciones?: any; requiereInspeccionInmediata?: any; informacionConfidencial?: any; }; datosSolicitudForma: { get?: any; }; subscriptions: { push?: any; }; nacionalRegistroDelCafeExportadoresService: { getRegionsData?: any; getBeneficiosData?: any; getBodegasData?: any; getCafeExportadoresData?: any; }; solicitud290301Store: { metodoNombre?: any; }; setValoresStore: (arg0: { get: () => { value: {}; }; }, arg1: {}, arg2: {}) => void; destroyed$: { next?: any; complete?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,DatosDeLaSolicitudComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [provideHttpClient(),
        FormBuilder,
        { provide: NacionalRegistroDelCafeExportadoresService, useClass: MockNacionalRegistroDelCafeExportadoresService },
        { provide: Solicitud290301Store, useClass: MockSolicitud290301Store },
        { provide: Solicitud290301Query, useClass: MockSolicitud290301Query }
      ]
    }).overrideComponent(DatosDeLaSolicitudComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
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
    component.solicitud290301Query = component.solicitud290301Query || {};
    component.solicitud290301Query.selectSolicitud$ = observableOf({});
    component.createForm = jest.fn();
    component.subscribeToProductorDeCafeChanges = jest.fn();
    component.getRegionsData = jest.fn();
    component.getBeneficiosData = jest.fn();
    component.getBodegasData = jest.fn();
    component.getCafeExportadoresData = jest.fn();
    component.ngOnInit();
    expect(component.createForm).toHaveBeenCalled();
    expect(component.subscribeToProductorDeCafeChanges).toHaveBeenCalled();
    expect(component.getRegionsData).toHaveBeenCalled();
    expect(component.getBeneficiosData).toHaveBeenCalled();
    expect(component.getBodegasData).toHaveBeenCalled();
    expect(component.getCafeExportadoresData).toHaveBeenCalled();
  });

  it('should run #createForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.dataDeLaSolicitudState = component.dataDeLaSolicitudState || {};
    component.dataDeLaSolicitudState.justificacion = 'justificacion';
    component.dataDeLaSolicitudState.productorDeCafe = 'productorDeCafe';
    component.dataDeLaSolicitudState.claveDelPadron = 'claveDelPadron';
    component.dataDeLaSolicitudState.observaciones = 'observaciones';
    component.dataDeLaSolicitudState.requiereInspeccionInmediata = 'requiereInspeccionInmediata';
    component.dataDeLaSolicitudState.informacionConfidencial = 'informacionConfidencial';
    component.createForm();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #subscribeToProductorDeCafeChanges()', async () => {
    component.datosSolicitudForma = component.datosSolicitudForma || {};
    component.datosSolicitudForma.get = jest.fn().mockReturnValue({
      enable: function() {},
      disable: function() {},
      valueChanges: observableOf({}),
      value: {}
    });
    component.subscriptions = component.subscriptions || {};
    component.subscriptions.push = jest.fn();
    component.subscribeToProductorDeCafeChanges();
    expect(component.datosSolicitudForma.get).toHaveBeenCalled();
    expect(component.subscriptions.push).toHaveBeenCalled();
  });

  it('should run #getRegionsData()', async () => {
    component.nacionalRegistroDelCafeExportadoresService = component.nacionalRegistroDelCafeExportadoresService || {};
    component.nacionalRegistroDelCafeExportadoresService.getRegionsData = jest.fn().mockReturnValue(observableOf({}));
    component.getRegionsData();
    expect(component.nacionalRegistroDelCafeExportadoresService.getRegionsData).toHaveBeenCalled();
  });

  it('should run #getBeneficiosData()', async () => {
    component.nacionalRegistroDelCafeExportadoresService = component.nacionalRegistroDelCafeExportadoresService || {};
    component.nacionalRegistroDelCafeExportadoresService.getBeneficiosData = jest.fn().mockReturnValue(observableOf({}));
    component.getBeneficiosData();
    expect(component.nacionalRegistroDelCafeExportadoresService.getBeneficiosData).toHaveBeenCalled();
  });

  it('should run #getBodegasData()', async () => {
    component.nacionalRegistroDelCafeExportadoresService = component.nacionalRegistroDelCafeExportadoresService || {};
    component.nacionalRegistroDelCafeExportadoresService.getBodegasData = jest.fn().mockReturnValue(observableOf({}));
    component.getBodegasData();
    expect(component.nacionalRegistroDelCafeExportadoresService.getBodegasData).toHaveBeenCalled();
  });

  it('should run #getCafeExportadoresData()', async () => {
    component.nacionalRegistroDelCafeExportadoresService = component.nacionalRegistroDelCafeExportadoresService || {};
    component.nacionalRegistroDelCafeExportadoresService.getCafeExportadoresData = jest.fn().mockReturnValue(observableOf({}));
    component.getCafeExportadoresData();
    expect(component.nacionalRegistroDelCafeExportadoresService.getCafeExportadoresData).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.solicitud290301Store = component.solicitud290301Store || {};
    component.solicitud290301Store.metodoNombre = jest.fn();
    component.setValoresStore({
      get: function() {
        return {
          value: {}
        };
      }
    }, {}, {});
    expect(component.solicitud290301Store.metodoNombre).toHaveBeenCalled();
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