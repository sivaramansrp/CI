// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { AgregarOtrosComponent } from './agregar-otros.component';
import { FormBuilder } from '@angular/forms';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Location } from '@angular/common';
import { Tramite260302Store } from '../../estados/tramite260302Store.store';
import { ImportacionMateriasPrimasService } from '../../service/exportacion-materias-primas.service';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
class MockDatosSolicitudService {
  obtenerListaPaises() {}
}

@Injectable()
class MockTramite260302Store {
  updateOtrosTablaDatos() {}
  updateSeleccionadoOtrosDatos() {}
  select = jest.fn().mockReturnValue(observableOf({}));
  _select = jest.fn().mockReturnValue(observableOf({}));
}

@Injectable()
class MockImportacionMateriasPrimasService {
  obtenerOstro() {}
}

describe('AgregarOtrosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,HttpClientModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: DatosSolicitudService, useClass: MockDatosSolicitudService },
        Location,
        { provide: Tramite260302Store, useClass: MockTramite260302Store },
        { provide: ImportacionMateriasPrimasService, useClass: MockImportacionMateriasPrimasService }
      ]
    }).overrideComponent(AgregarOtrosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(AgregarOtrosComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.cargarDatos = jest.fn();
    component.ngOnInit();
    expect(component.cargarDatos).toHaveBeenCalled();
  });

  it('should run #cargarDatos()', async () => {
    component.datosSolicitudService = component.datosSolicitudService || {};
    component.datosSolicitudService.obtenerListaPaises = jest.fn().mockReturnValue(observableOf({}));
    component.cargarDatos();
    expect(component.datosSolicitudService.obtenerListaPaises).toHaveBeenCalled();
  });

  it('should run #limpiarFormulario()', async () => {
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.reset = jest.fn();
    component.limpiarFormulario();
    expect(component.agregarDatosForm.reset).toHaveBeenCalled();
  });

  it('should run #cancelar()', async () => {
    component.ubicaccion = component.ubicaccion || {};
    component.ubicaccion.back = jest.fn();
    component.cancelar();
    expect(component.ubicaccion.back).toHaveBeenCalled();
  });

  it('should run #guardar()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateOtrosTablaDatos = jest.fn();
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.value = 'value';
    component.ubicaccion = component.ubicaccion || {};
    component.ubicaccion.back = jest.fn();
    component.guardar();
    expect(component.tramiteStore.updateOtrosTablaDatos).toHaveBeenCalled();
  });

  it('should run #changeNacionalidad()', async () => {
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.value = {
      tipoPersona: {}
    };
    component.agregarDatosForm.enable = jest.fn();
    component.agregarDatosForm.disable = jest.fn();
    component.agregarDatosForm.get = jest.fn().mockReturnValue({
      disable: function() {},
      enable: function() {}
    });
    component.tipoPersona = component.tipoPersona || {};
    component.tipoPersona.NO_CONTRIBUYENTE = 'NO_CONTRIBUYENTE';
    component.changeNacionalidad();
    expect(component.agregarDatosForm.enable).toHaveBeenCalled();
  });

  it('should run #buscar()', async () => {
    component.importacionMateriasPrimasService = component.importacionMateriasPrimasService || {};
    component.importacionMateriasPrimasService.obtenerOstro = jest.fn().mockReturnValue(observableOf({}));
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.patchValue = jest.fn();
    component.seBuscaRfc();
  });

  it('should run #ngOnDestroy()', async () => {
    component.unsubscribe$ = component.unsubscribe$ || {};
    component.unsubscribe$.next = jest.fn();
    component.unsubscribe$.complete = jest.fn();
    component.ngOnDestroy();
  });

});