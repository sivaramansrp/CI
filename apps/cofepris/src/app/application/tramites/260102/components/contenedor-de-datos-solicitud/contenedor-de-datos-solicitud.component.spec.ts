// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Input, Output } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { ContenedorDeDatosSolicitudComponent } from './contenedor-de-datos-solicitud.component';
import { Tramite260102Query } from '../../estados/queries/tramite260102Query.query';
import { Tramite260102Store } from '../../estados/stores/tramite260102Store.store';
import { SeccionLibStore, SeccionLibQuery, ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { ActivatedRoute } from '@angular/router';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DatosDeLaSolicitudComponent } from '../../../../shared/components/datos-de-la-solicitud/datos-de-la-solicitud.component';
@Injectable()
class MockTramite260102Query {}

@Injectable()
class MockTramite260102Store {}

@Injectable()
class MockSeccionLibStore {}
@Injectable()
class MockSeccionLibQuery {}
@Injectable()
class MockConsultaioQuery {}
@Injectable()
class MockDatosSolicitudService {}
describe('ContenedorDeDatosSolicitudComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, DatosDeLaSolicitudComponent, ContenedorDeDatosSolicitudComponent, HttpClientTestingModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: Tramite260102Query, useClass: MockTramite260102Query },
        { provide: Tramite260102Store, useClass: MockTramite260102Store },
        SeccionLibStore,
        SeccionLibQuery,
        DatosSolicitudService,
        ConsultaioQuery,
        { provide: ActivatedRoute, useValue: { snapshot: { params: {} } } },
        
      ]
    }).overrideComponent(ContenedorDeDatosSolicitudComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ContenedorDeDatosSolicitudComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.tramite260102Query = component.tramite260102Query || {};
    component.tramite260102Query.selectTramiteState$ = observableOf({});
    component.opcionConfig = component.opcionConfig || {};
    component.opcionConfig.datos = 'datos';
    component.scianConfig = component.scianConfig || {};
    component.scianConfig.datos = 'datos';
    component.tablaMercanciasConfig = component.tablaMercanciasConfig || {};
    component.tablaMercanciasConfig.datos = 'datos';
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});
    component.consultaQuery = component.consultaQuery || {};
    component.consultaQuery.selectConsultaioState$ = observableOf({});
    component.idProcedimiento = component.idProcedimiento || {};
    component.ngOnInit();
  });

  it('should run #opcionSeleccionado()', async () => {
    component.tramite260102Store = component.tramite260102Store || {};
    component.tramite260102Store.updateOpcionConfigDatos = jest.fn();
    component.opcionSeleccionado({});
    expect(component.tramite260102Store.updateOpcionConfigDatos).toHaveBeenCalled();
  });

  it('should run #scianSeleccionado()', async () => {
    component.tramite260102Store = component.tramite260102Store || {};
    component.tramite260102Store.updateScianConfigDatos = jest.fn();
    component.scianSeleccionado({});
    expect(component.tramite260102Store.updateScianConfigDatos).toHaveBeenCalled();
  });

  it('should run #mercanciasSeleccionado()', async () => {
    component.tramite260102Store = component.tramite260102Store || {};
    component.tramite260102Store.updateTablaMercanciasConfigDatos = jest.fn();
    component.mercanciasSeleccionado({});
    expect(component.tramite260102Store.updateTablaMercanciasConfigDatos).toHaveBeenCalled();
  });


  it('should run #datosDeTablaSeleccionados()', async () => {
    component.tramite260102Store = component.tramite260102Store || {};
    component.tramite260102Store.update = jest.fn().mockReturnValue([
      null
    ]);
    component.datosDeTablaSeleccionados({
      opcionSeleccionados: {},
      scianSeleccionados: {},
      mercanciasSeleccionados: {},
      opcionesColapsableState: {}
    });
    expect(component.tramite260102Store.update).toHaveBeenCalled();
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