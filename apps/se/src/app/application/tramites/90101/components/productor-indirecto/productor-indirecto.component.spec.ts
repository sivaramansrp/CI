import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { ProductorIndirectoComponent } from './productor-indirecto.component';
import { FormBuilder } from '@angular/forms';
import { ProsecService } from '../../services/prosec.service';
import { AutorizacionProsecStore } from '../../estados/autorizacion-prosec.store';
import { AUtorizacionProsecQuery } from '../../queries/autorizacion-prosec.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

@Injectable()
class MockProsecService {}

@Injectable()
class MockAutorizacionProsecStore {}

@Injectable()
class MockAUtorizacionProsecQuery {}


describe('ProductorIndirectoComponent', () => {
  let fixture: ComponentFixture<ProductorIndirectoComponent>;
  let component: { ngOnDestroy: () => void; AUtorizacionProsecQuery: { selectProsec$?: any; }; initActionFormBuild: jest.Mock<any, any, any> | (() => void); recuperarDatos: jest.Mock<any, any, any> | (() => void); productorIndirecto: { statusChanges?: any; valid?: any; disable?: any; enable?: any; }; AutorizacionProsecStore: { setProductorFromValida?: any; metodoNombre?: any; setValores?: any; }; ProsecService: { formValida?: any; obtenerTablaDatos?: any; }; inicializarEstadoFormulario: jest.Mock<any, any, any> | (() => void); ngOnInit: () => void; fb: { group?: any; }; productorState: { contribuyentes?: any; }; setValoresStore: (arg0: { get: () => { value: {}; }; }, arg1: {}, arg2: {}) => void; destroyNotifier$: { next?: any; complete?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, ProductorIndirectoComponent ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: ProsecService, useClass: MockProsecService },
        { provide: AutorizacionProsecStore, useClass: MockAutorizacionProsecStore },
        { provide: AUtorizacionProsecQuery, useClass: MockAUtorizacionProsecQuery },
        ConsultaioQuery
      ]
    }).overrideComponent(ProductorIndirectoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ProductorIndirectoComponent);
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
    component.AUtorizacionProsecQuery = component.AUtorizacionProsecQuery || {};
    component.AUtorizacionProsecQuery.selectProsec$ = observableOf({});
    component.initActionFormBuild = jest.fn();
    component.recuperarDatos = jest.fn();
    component.productorIndirecto = component.productorIndirecto || {};
    component.productorIndirecto.statusChanges = observableOf({});
    component.AutorizacionProsecStore = component.AutorizacionProsecStore || {};
    component.AutorizacionProsecStore.setProductorFromValida = jest.fn();
    component.ProsecService = component.ProsecService || {};
    component.ProsecService.formValida = jest.fn();
    component.inicializarEstadoFormulario = jest.fn();
    component.ngOnInit();
    // expect(component.initActionFormBuild).toHaveBeenCalled();
    // expect(component.recuperarDatos).toHaveBeenCalled();
    // expect(component.AutorizacionProsecStore.setProductorFromValida).toHaveBeenCalled();
    // expect(component.ProsecService.formValida).toHaveBeenCalled();
    // expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
  });

  it('should run #inicializarEstadoFormulario()', async () => {
    component.productorIndirecto = component.productorIndirecto || {};
    component.productorIndirecto.disable = jest.fn();
    component.productorIndirecto.enable = jest.fn();
    component.inicializarEstadoFormulario();
    // expect(component.productorIndirecto.disable).toHaveBeenCalled();
    // expect(component.productorIndirecto.enable).toHaveBeenCalled();
  });

  it('should run #initActionFormBuild()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.productorState = component.productorState || {};
    component.productorState.contribuyentes = 'contribuyentes';
    component.initActionFormBuild();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #recuperarDatos()', async () => {
    component.ProsecService = component.ProsecService || {};
    component.ProsecService.obtenerTablaDatos = jest.fn().mockReturnValue(observableOf({}));
    component.recuperarDatos();
    expect(component.ProsecService.obtenerTablaDatos).toHaveBeenCalled();
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