// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component, ChangeDetectorRef } from '@angular/core';
import { InternaDatosGeneralesComponent } from './interna-datos-generales.component';
import { FormBuilder } from '@angular/forms';
import { RevisionService } from '../../servicios/revision.service';
import { ValidacionesFormularioService, SeccionLibQuery, SeccionLibStore } from '@libs/shared/data-access-user/src';
import { MercanciaDatosService } from '../../servicios/mercancia-datos.service';
import { CatalogosService } from '../../servicios/catalogos.service';
import { HttpClient } from '@angular/common/http';
import { TramiteStoreQuery } from '../../estados/tramite220701.query';
import { TramiteStore } from '../../estados/tramite220701.store';

@Injectable()
class MockRevisionService {}

@Injectable()
class MockMercanciaDatosService {}

@Injectable()
class MockCatalogosService {}

@Injectable()
class MockHttpClient {
  post() {};
}

@Injectable()
class MockTramiteStoreQuery {}

@Injectable()
class MockTramiteStore {}

describe('InternaDatosGeneralesComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,InternaDatosGeneralesComponent],
      declarations: [ ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: RevisionService, useClass: MockRevisionService },
        ValidacionesFormularioService,
        { provide: MercanciaDatosService, useClass: MockMercanciaDatosService },
        { provide: CatalogosService, useClass: MockCatalogosService },
        { provide: HttpClient, useClass: MockHttpClient },
        ChangeDetectorRef,
        { provide: TramiteStoreQuery, useClass: MockTramiteStoreQuery },
        { provide: TramiteStore, useClass: MockTramiteStore },
        SeccionLibQuery,
        SeccionLibStore
      ]
    }).overrideComponent(InternaDatosGeneralesComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(InternaDatosGeneralesComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #crearFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.crearFormulario();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #initActionFormBuild()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.forma = component.forma || {};
    component.forma.setControl = jest.fn();
    component.initActionFormBuild();
    // expect(component.fb.group).toHaveBeenCalled();
    // expect(component.forma.setControl).toHaveBeenCalled();
  });

  it('should run #esValido()', async () => {
    component.validacionesService = component.validacionesService || {};
    component.validacionesService.isValid = jest.fn();
    component.esValido({}, {});
    // expect(component.validacionesService.isValid).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.tramiteStoreQuery = component.tramiteStoreQuery || {};
    component.tramiteStoreQuery.selectSolicitudTramite$ = observableOf({});
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.disableFormControls = jest.fn();
    component.forma = component.forma || {};
    component.forma.setControl = jest.fn();
    component.forma.patchValue = jest.fn();
    component.forma.statusChanges = observableOf({});
    component.forma.value = 'value';
    component.getOficianaInspeccion = jest.fn();
    component.getEstablecimiento = jest.fn();
    component.getRegimenDestinaran = jest.fn();
    component.getMovilizacionNacional = jest.fn();
    component.getPuntoVerificacion = jest.fn();
    component.getEmpresaTransportista = jest.fn();
    component.obtenerListasDesplegables = jest.fn();
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.setInternaDatosGeneralesTramite = jest.fn();
    component.obtenerDatos = jest.fn();
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});
    component.ngOnInit();
    // expect(component.fb.group).toHaveBeenCalled();
    // expect(component.disableFormControls).toHaveBeenCalled();
    // expect(component.forma.setControl).toHaveBeenCalled();
    // expect(component.forma.patchValue).toHaveBeenCalled();
    // expect(component.getOficianaInspeccion).toHaveBeenCalled();
    // expect(component.getEstablecimiento).toHaveBeenCalled();
    // expect(component.getRegimenDestinaran).toHaveBeenCalled();
    // expect(component.getMovilizacionNacional).toHaveBeenCalled();
    // expect(component.getPuntoVerificacion).toHaveBeenCalled();
    // expect(component.getEmpresaTransportista).toHaveBeenCalled();
    // expect(component.obtenerListasDesplegables).toHaveBeenCalled();
    // expect(component.tramiteStore.setInternaDatosGeneralesTramite).toHaveBeenCalled();
    // expect(component.obtenerDatos).toHaveBeenCalled();
  });

  it('should run #obtenerDatos()', async () => {
    component.mercanciaDatosService = component.mercanciaDatosService || {};
    component.mercanciaDatosService.getDatos = jest.fn().mockReturnValue(observableOf({}));
    component.cdr = component.cdr || {};
    component.cdr.detectChanges = jest.fn();
    // expect(component.mercanciaDatosService.getDatos).toHaveBeenCalled();
    // expect(component.cdr.detectChanges).toHaveBeenCalled();
  });

  it('should run #obtenerListasDesplegables()', async () => {
    component.obtenerIngresoSelectList = jest.fn();
    component.obtenerSanidadAgropecuariaList = jest.fn();
    component.obtenerPuntoInspeccionList = jest.fn();
    component.obtenerEstablecimientoList = jest.fn();
    component.obtenerVeterinarioList = jest.fn();
    component.obtenerRegimenList = jest.fn();
    component.obtenerListasDesplegables();
    // expect(component.obtenerIngresoSelectList).toHaveBeenCalled();
    // expect(component.obtenerSanidadAgropecuariaList).toHaveBeenCalled();
    // expect(component.obtenerPuntoInspeccionList).toHaveBeenCalled();
    // expect(component.obtenerEstablecimientoList).toHaveBeenCalled();
    // expect(component.obtenerVeterinarioList).toHaveBeenCalled();
    // expect(component.obtenerRegimenList).toHaveBeenCalled();
  });

  it('should run #obtenerIngresoSelectList()', async () => {
    component.catalogosService = component.catalogosService || {};
    component.catalogosService.obtenerAduanaDeIngreso = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.obtenerIngresoSelectList();
    // expect(component.catalogosService.obtenerAduanaDeIngreso).toHaveBeenCalled();
  });

  it('should run #obtenerSanidadAgropecuariaList()', async () => {
    component.catalogosService = component.catalogosService || {};
    component.catalogosService.obtenerSanidadAgropecuaria = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.obtenerSanidadAgropecuariaList();
    // expect(component.catalogosService.obtenerSanidadAgropecuaria).toHaveBeenCalled();
  });

  it('should run #obtenerPuntoInspeccionList()', async () => {
    component.catalogosService = component.catalogosService || {};
    component.catalogosService.obtenerPuntoInspeccion = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.obtenerPuntoInspeccionList();
    // expect(component.catalogosService.obtenerPuntoInspeccion).toHaveBeenCalled();
  });

  it('should run #obtenerEstablecimientoList()', async () => {
    component.catalogosService = component.catalogosService || {};
    component.catalogosService.obtenerEstablecimiento = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.obtenerEstablecimientoList();
    // expect(component.catalogosService.obtenerEstablecimiento).toHaveBeenCalled();
  });

  it('should run #obtenerVeterinarioList()', async () => {
    component.catalogosService = component.catalogosService || {};
    component.catalogosService.obtenerVeterinario = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.obtenerVeterinarioList();
    // expect(component.catalogosService.obtenerVeterinario).toHaveBeenCalled();
  });

  it('should run #obtenerRegimenList()', async () => {
    component.catalogosService = component.catalogosService || {};
    component.catalogosService.obtenerRegimen = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.obtenerRegimenList();
    // expect(component.catalogosService.obtenerRegimen).toHaveBeenCalled();
  });

  it('should run #getAduanaIngreso()', async () => {
    component.revisionService = component.revisionService || {};
    component.revisionService.getAduanaIngreso = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getAduanaIngreso();
    // expect(component.revisionService.getAduanaIngreso).toHaveBeenCalled();
  });

  it('should run #getOficianaInspeccion()', async () => {
    component.revisionService = component.revisionService || {};
    component.revisionService.getOficianaInspeccion = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getOficianaInspeccion();
    // expect(component.revisionService.getOficianaInspeccion).toHaveBeenCalled();
  });

  it('should run #getEstablecimiento()', async () => {
    component.revisionService = component.revisionService || {};
    component.revisionService.getEstablecimiento = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getEstablecimiento();
    // expect(component.revisionService.getEstablecimiento).toHaveBeenCalled();
  });

  it('should run #getRegimenDestinaran()', async () => {
    component.revisionService = component.revisionService || {};
    component.revisionService.getRegimenDestinaran = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getRegimenDestinaran();
    // expect(component.revisionService.getRegimenDestinaran).toHaveBeenCalled();
  });

  it('should run #getMovilizacionNacional()', async () => {
    component.revisionService = component.revisionService || {};
    component.revisionService.getMovilizacionNacional = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getMovilizacionNacional();
    // expect(component.revisionService.getMovilizacionNacional).toHaveBeenCalled();
  });

  it('should run #getPuntoVerificacion()', async () => {
    component.revisionService = component.revisionService || {};
    component.revisionService.getPuntoVerificacion = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getPuntoVerificacion();
    // expect(component.revisionService.getPuntoVerificacion).toHaveBeenCalled();
  });

  it('should run #getEmpresaTransportista()', async () => {
    component.revisionService = component.revisionService || {};
    component.revisionService.getEmpresaTransportista = jest.fn().mockReturnValue(observableOf({
      code: {},
      data: {}
    }));
    component.getEmpresaTransportista();
    // expect(component.revisionService.getEmpresaTransportista).toHaveBeenCalled();
  });

  it('should run #disableFormControls()', async () => {
    component.forma = component.forma || {};
    component.forma.get = jest.fn().mockReturnValue({
      disable: function() {}
    });
    component.disableFormControls();
    // expect(component.forma.get).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.unsubscribe$ = component.unsubscribe$ || {};
    component.unsubscribe$.next = jest.fn();
    component.unsubscribe$.complete = jest.fn();
    component.ngOnDestroy();
    // expect(component.unsubscribe$.next).toHaveBeenCalled();
    // expect(component.unsubscribe$.complete).toHaveBeenCalled();
  });

});