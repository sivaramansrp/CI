import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DomiciliosDePlantasComponent } from './domicilios-de-plantas.component';
import { FormBuilder } from '@angular/forms';
import { ProsecService } from '../../services/prosec.service';
import { AutorizacionProsecStore } from '../../estados/autorizacion-prosec.store';
import { AUtorizacionProsecQuery } from '../../queries/autorizacion-prosec.query';
import { SeccionLibStore, SeccionLibQuery, ConsultaioQuery } from '@ng-mf/data-access-user';

@Injectable()
class MockProsecService {}

@Injectable()
class MockAutorizacionProsecStore {}

@Injectable()
class MockAUtorizacionProsecQuery {}


describe('DomiciliosDePlantasComponent', () => {
  let fixture: ComponentFixture<DomiciliosDePlantasComponent>;
  let component: { ngOnDestroy: () => void; seccionQuery: { selectSeccionState$?: any; }; AUtorizacionProsecQuery: { selectProsec$?: any; }; initActionFormBuild: jest.Mock<any, any, any> | (() => void); obtenerLista: jest.Mock<any, any, any> | (() => void); seccionStore: { establecerFormaValida?: any; }; forma: { statusChanges?: any; valid?: any; disable?: any; enable?: any; }; AutorizacionProsecStore: { setDomiciliosFormaValida?: any; metodoNombre?: any; setEstado?: any; setRepresentacionFederal?: any; setActividadProductiva?: any; setFormaValida?: any; }; ProsecService: { formValida?: any; obtenerMenuDesplegable?: any; obtenerTablaDatos?: any; }; inicializarEstadoFormulario: jest.Mock<any, any, any> | (() => void); ngOnInit: () => void; setValoresStore: (arg0: { get: () => { value: {}; }; }, arg1: {}, arg2: {}) => void; fb: { group?: any; }; domiciliosState: { modalidad?: any; Estado?: any; RepresentacionFederal?: any; ActividadProductiva?: any; }; obtenerListaEstado: jest.Mock<any, any, any> | (() => void); obtenerListaFederal: jest.Mock<any, any, any> | (() => void); obtenerListaActividad: jest.Mock<any, any, any> | (() => void); recuperarDatos: jest.Mock<any, any, any> | (() => void); estadoSeleccion: (arg0: {}) => void; fedralSeleccion: (arg0: {}) => void; productivaSeleccion: (arg0: {}) => void; destroyNotifier$: { next?: any; complete?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, DomiciliosDePlantasComponent, ReactiveFormsModule ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: ProsecService, useClass: MockProsecService },
        { provide: AutorizacionProsecStore, useClass: MockAutorizacionProsecStore },
        { provide: AUtorizacionProsecQuery, useClass: MockAUtorizacionProsecQuery },
        SeccionLibStore,
        SeccionLibQuery,
        ConsultaioQuery
      ]
    }).overrideComponent(DomiciliosDePlantasComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DomiciliosDePlantasComponent);
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
    component.AUtorizacionProsecQuery = component.AUtorizacionProsecQuery || {};
    component.AUtorizacionProsecQuery.selectProsec$ = observableOf({});
    component.initActionFormBuild = jest.fn();
    component.obtenerLista = jest.fn();
    component.seccionStore = component.seccionStore || {};
    component.seccionStore.establecerFormaValida = jest.fn();
    component.forma = component.forma || {};
    component.forma.statusChanges = observableOf({});
    component.forma.valid = 'valid';
    component.AutorizacionProsecStore = component.AutorizacionProsecStore || {};
    component.AutorizacionProsecStore.setDomiciliosFormaValida = jest.fn();
    component.ProsecService = component.ProsecService || {};
    component.ProsecService.formValida = jest.fn();
    component.inicializarEstadoFormulario = jest.fn();
    component.ngOnInit();
    // expect(component.initActionFormBuild).toHaveBeenCalled();
    // expect(component.obtenerLista).toHaveBeenCalled();
    // expect(component.seccionStore.establecerFormaValida).toHaveBeenCalled();
    // expect(component.AutorizacionProsecStore.setDomiciliosFormaValida).toHaveBeenCalled();
    // expect(component.ProsecService.formValida).toHaveBeenCalled();
    // expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.AutorizacionProsecStore = component.AutorizacionProsecStore || {};
    // Mock the actual method that setValoresStore will call, e.g., 'setFormaValida'
    component.AutorizacionProsecStore.setFormaValida = jest.fn();
    // Pass the method name as a string, matching the implementation in setValoresStore
    component.setValoresStore({
      get: function() {
        return {
          value: {}
        };
      }
    }, {}, 'setFormaValida');
    // expect(component.AutorizacionProsecStore.setFormaValida).toHaveBeenCalled();
  });

  it('should run #inicializarEstadoFormulario()', async () => {
    component.forma = component.forma || {};
    component.forma.disable = jest.fn();
    component.forma.enable = jest.fn();
    component.inicializarEstadoFormulario();
    // expect(component.forma.disable).toHaveBeenCalled();
    // expect(component.forma.enable).toHaveBeenCalled();
  });

  it('should run #initActionFormBuild()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.domiciliosState = component.domiciliosState || {};
    component.domiciliosState.modalidad = 'modalidad';
    component.domiciliosState.Estado = 'Estado';
    component.domiciliosState.RepresentacionFederal = 'RepresentacionFederal';
    component.domiciliosState.ActividadProductiva = 'ActividadProductiva';
    component.initActionFormBuild();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #obtenerListaEstado()', async () => {
    component.ProsecService = component.ProsecService || {};
    component.ProsecService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerListaEstado();
    // expect(component.ProsecService.obtenerMenuDesplegable).toHaveBeenCalled();
  });

  it('should run #obtenerListaFederal()', async () => {
    component.ProsecService = component.ProsecService || {};
    component.ProsecService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerListaFederal();
    // expect(component.ProsecService.obtenerMenuDesplegable).toHaveBeenCalled();
  });

  it('should run #obtenerListaActividad()', async () => {
    component.ProsecService = component.ProsecService || {};
    component.ProsecService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerListaActividad();
    // expect(component.ProsecService.obtenerMenuDesplegable).toHaveBeenCalled();
  });

  it('should run #obtenerLista()', async () => {
    component.obtenerListaEstado = jest.fn();
    component.obtenerListaFederal = jest.fn();
    component.obtenerListaActividad = jest.fn();
    component.recuperarDatos = jest.fn();
    component.obtenerLista();
    // expect(component.obtenerListaEstado).toHaveBeenCalled();
    // expect(component.obtenerListaFederal).toHaveBeenCalled();
    // expect(component.obtenerListaActividad).toHaveBeenCalled();
    // expect(component.recuperarDatos).toHaveBeenCalled();
  });

  it('should run #estadoSeleccion()', async () => {
    component.AutorizacionProsecStore = component.AutorizacionProsecStore || {};
    component.AutorizacionProsecStore.setEstado = jest.fn();
    component.estadoSeleccion({});
    // expect(component.AutorizacionProsecStore.setEstado).toHaveBeenCalled();
  });

  it('should run #fedralSeleccion()', async () => {
    component.AutorizacionProsecStore = component.AutorizacionProsecStore || {};
    component.AutorizacionProsecStore.setRepresentacionFederal = jest.fn();
    component.fedralSeleccion({});
    // expect(component.AutorizacionProsecStore.setRepresentacionFederal).toHaveBeenCalled();
  });

  it('should run #productivaSeleccion()', async () => {
    component.AutorizacionProsecStore = component.AutorizacionProsecStore || {};
    component.AutorizacionProsecStore.setActividadProductiva = jest.fn();
    component.productivaSeleccion({});
    // expect(component.AutorizacionProsecStore.setActividadProductiva).toHaveBeenCalled();
  });

  it('should run #recuperarDatos()', async () => {
    component.ProsecService = component.ProsecService || {};
    component.ProsecService.obtenerTablaDatos = jest.fn().mockReturnValue(observableOf({}));
    component.recuperarDatos();
    // expect(component.ProsecService.obtenerTablaDatos).toHaveBeenCalled();
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