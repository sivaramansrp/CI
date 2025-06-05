// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { SectoresYMercanciasComponent } from './sectores-y-mercancias.component';
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

describe('SectoresYMercanciasComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, SectoresYMercanciasComponent ],
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
    }).overrideComponent(SectoresYMercanciasComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(SectoresYMercanciasComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #inicializarEstadoFormulario()', async () => {
    component.sectoresYMercancias = component.sectoresYMercancias || {};
    component.sectoresYMercancias.disable = jest.fn();
    component.sectoresYMercancias.enable = jest.fn();
    component.inicializarEstadoFormulario();
    // expect(component.sectoresYMercancias.disable).toHaveBeenCalled();
    // expect(component.sectoresYMercancias.enable).toHaveBeenCalled();
  });

  it('should run #initActionFormBuild()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.sectoresState = component.sectoresState || {};
    component.sectoresState.Sector = 'Sector';
    component.sectoresState.Fraccion_arancelaria = 'Fraccion_arancelaria';
    component.initActionFormBuild();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #obtenserListaEstado()', async () => {
    component.ProsecService = component.ProsecService || {};
    component.ProsecService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.obtenserListaEstado();
    // expect(component.ProsecService.obtenerMenuDesplegable).toHaveBeenCalled();
  });

  it('should run #recuperarDatos()', async () => {
    component.ProsecService = component.ProsecService || {};
    component.ProsecService.obtenerTablaDatos = jest.fn().mockReturnValue(observableOf({}));
    component.recuperarDatos();
    // expect(component.ProsecService.obtenerTablaDatos).toHaveBeenCalled();
  });

  it('should run #sectorSeleccion()', async () => {
    component.AutorizacionProsecStore = component.AutorizacionProsecStore || {};
    component.AutorizacionProsecStore.setActividadProductiva = jest.fn();
    component.sectorSeleccion({});
    // expect(component.AutorizacionProsecStore.setActividadProductiva).toHaveBeenCalled();
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