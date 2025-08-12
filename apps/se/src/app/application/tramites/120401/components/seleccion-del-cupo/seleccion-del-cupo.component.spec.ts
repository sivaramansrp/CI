// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { SeleccionDelCupoComponent } from './seleccion-del-cupo.component';
import { FormBuilder } from '@angular/forms';
import { SeleccionDelCupoService } from '@ng-mf/data-access-user';
import { AsignacionDirectaCupoPersonasFisicasPrimeraVezService } from '../../services/asignacion-directa-cupo-personas-fisicas-primera-vez.service';
import { Tramite120401Store } from '../../estados/tramites/tramite120401.store';
import { Tramite120401Query } from '../../estados/queries/tramite120401.query';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
class MockAsignacionDirectaCupoPersonasFisicasPrimeraVezService {
  obtenerRespuestaPorUrl = function() {};
}

@Injectable()
class MockTramite120401Store {}

@Injectable()
class MockTramite120401Query {
  tramiteState$ = observableOf({ datos: [] });
  regimen$ = observableOf(null);
  tratado$ = observableOf(null);
  producto$ = observableOf(null);
  nombreSubproducto$ = observableOf(null);;
}


describe('SeleccionDelCupoComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ,SeleccionDelCupoComponent , HttpClientModule ],
      declarations: [    
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        SeleccionDelCupoService,
        { provide: AsignacionDirectaCupoPersonasFisicasPrimeraVezService, useClass: MockAsignacionDirectaCupoPersonasFisicasPrimeraVezService },
        { provide: Tramite120401Store, useClass: MockTramite120401Store },
        { provide: Tramite120401Query, useClass: MockTramite120401Query }
      ]
    }).overrideComponent(SeleccionDelCupoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(SeleccionDelCupoComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.initializeForm = jest.fn();
    component.loadSeleccionDelCupo = jest.fn();
    component.loadRegimen = jest.fn();
    component.loadTratado = jest.fn();
    component.loadProducto = jest.fn();
    component.regimen$ = component.regimen$ || {};
    component.regimen$.subscribe = jest.fn().mockReturnValue([
      null
    ]);
    component.seleccionForm = component.seleccionForm || {};
    component.seleccionForm.get = jest.fn().mockReturnValue({
      setValue: function() {}
    });
    component.tratado$ = component.tratado$ || {};
    component.tratado$.subscribe = jest.fn().mockReturnValue([
      null
    ]);
    component.producto$ = component.producto$ || {};
    component.producto$.subscribe = jest.fn().mockReturnValue([
      null
    ]);
    component.nombreSubproducto$ = component.nombreSubproducto$ || {};
    component.nombreSubproducto$.subscribe = jest.fn().mockReturnValue([
      null
    ]);
    component.ngOnInit();
    // expect(component.initializeForm).toHaveBeenCalled();
    // expect(component.loadSeleccionDelCupo).toHaveBeenCalled();
    // expect(component.loadRegimen).toHaveBeenCalled();
    // expect(component.loadTratado).toHaveBeenCalled();
    // expect(component.loadProducto).toHaveBeenCalled();
    // expect(component.regimen$.subscribe).toHaveBeenCalled();
    // expect(component.seleccionForm.get).toHaveBeenCalled();
    // expect(component.tratado$.subscribe).toHaveBeenCalled();
    // expect(component.producto$.subscribe).toHaveBeenCalled();
    // expect(component.nombreSubproducto$.subscribe).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyed$ = component.destroyed$ || {};
    component.destroyed$.next = jest.fn();
    component.destroyed$.complete = jest.fn();
    component.ngOnDestroy();
    // expect(component.destroyed$.next).toHaveBeenCalled();
    // expect(component.destroyed$.complete).toHaveBeenCalled();
  });

  it('should run #initializeForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.initializeForm();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #loadRegimen()', async () => {
    component.service = component.service || {};
    component.service.getRegimen = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.loadRegimen();
    // expect(component.service.getRegimen).toHaveBeenCalled();
  });

  it('should run #loadTratado()', async () => {
    component.service = component.service || {};
    component.service.getTratado = jest.fn().mockReturnValue(observableOf({
      tratado: {}
    }));
    component.loadTratado();
    // expect(component.service.getTratado).toHaveBeenCalled();
  });

  it('should run #loadProducto()', async () => {
    component.service = component.service || {};
    component.service.getProducto = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.loadProducto();
    // expect(component.service.getProducto).toHaveBeenCalled();
  });

  it('should run #loadSeleccionDelCupo()', async () => {
    component.service = component.service || {};
    component.service.getSeleccionDelCupo = jest.fn().mockReturnValue(observableOf({}));
    component.loadSeleccionDelCupo();
    // expect(component.service.getSeleccionDelCupo).toHaveBeenCalled();
  });

  it('should run #getRegimen()', async () => {
    component.seleccionForm = component.seleccionForm || {};
    component.seleccionForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite120401Store = component.tramite120401Store || {};
    component.tramite120401Store.setRegimen = jest.fn();
    component.getRegimen();
    // expect(component.seleccionForm.get).toHaveBeenCalled();
    // expect(component.tramite120401Store.setRegimen).toHaveBeenCalled();
  });

  it('should run #getTratado()', async () => {
    component.seleccionForm = component.seleccionForm || {};
    component.seleccionForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite120401Store = component.tramite120401Store || {};
    component.tramite120401Store.setTratado = jest.fn();
    component.getTratado();
    // expect(component.seleccionForm.get).toHaveBeenCalled();
    // expect(component.tramite120401Store.setTratado).toHaveBeenCalled();
  });

  it('should run #obtenerValorProducto()', async () => {
    component.seleccionForm = component.seleccionForm || {};
    component.seleccionForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite120401Store = component.tramite120401Store || {};
    component.tramite120401Store.setProducto = jest.fn();
    component.obtenerValorProducto();
    // expect(component.seleccionForm.get).toHaveBeenCalled();
    // expect(component.tramite120401Store.setProducto).toHaveBeenCalled();
  });

  it('should run #getSubproducto()', async () => {
    component.seleccionForm = component.seleccionForm || {};
    component.seleccionForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite120401Store = component.tramite120401Store || {};
    component.tramite120401Store.setSubproducto = jest.fn();
    component.getSubproducto();
    // expect(component.seleccionForm.get).toHaveBeenCalled();
    // expect(component.tramite120401Store.setSubproducto).toHaveBeenCalled();
  });

  it('should run #listaDeFilaSeleccionada()', async () => {

    component.listaDeFilaSeleccionada({});

  });

});