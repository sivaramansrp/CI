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
import { Tramite260304Store } from '../../estados/tramite260304Store.store';
import { ExportacionMedicamentosContenganService } from '../../service/exportacion-medicamentos-contengan.service';
import { HttpClientModule } from '@angular/common/http';
import { Tramite260304Query } from '../../estados/tramite260304Query.query';

@Injectable()
class MockDatosSolicitudService {
  obtenerListaPaises() {}
}

@Injectable()
class MockTramite260304Store {
  updateOtrosTablaDatos() {}
}

@Injectable()
class MockImportacionMateriasPrimasService {
  obtenerOstro() {}
}
@Injectable()
  class MockTramite260304Query{
    getOtrosSeleccionado$() {
      return observableOf({});
    }
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
        { provide: Tramite260304Store, useClass: MockTramite260304Store },
          { provide: Tramite260304Query, useClass: MockTramite260304Query },
      ]
    }).overrideComponent(AgregarOtrosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(AgregarOtrosComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #crearFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.obtenerValor = jest.fn();
    component.crearFormulario();
    expect(component.fb.group).toHaveBeenCalled();
    expect(component.obtenerValor).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.cargarDatos = jest.fn();
    component.tramiteQuery = component.tramiteQuery || {};
    component.tramiteQuery.getOtrosSeleccionado$ = observableOf({});
    component.crearFormulario = jest.fn();
    component.changeNacionalidad = jest.fn();
    component.ngOnInit();
    expect(component.cargarDatos).toHaveBeenCalled();
    expect(component.crearFormulario).toHaveBeenCalled();
    expect(component.changeNacionalidad).toHaveBeenCalled();
  });

  it('should run #obtenerValor()', async () => {

    component.obtenerValor({});

  });

  it('should run #cargarDatos()', async () => {
    component.datosSolicitudService = component.datosSolicitudService || {};
    component.datosSolicitudService.obtenerListaPaises = jest.fn().mockReturnValue(observableOf({}));
    component.cargarDatos();
    expect(component.datosSolicitudService.obtenerListaPaises).toHaveBeenCalled();
  });

  it('should run #limpiarFormulario()', async () => {
    component.tipoPersonaRadioOpcions = component.tipoPersonaRadioOpcions || {};
    component.tipoPersonaRadioOpcions = ['tipoPersonaRadioOpcions'];
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

  it('should run #obtenerNuevoValorFormulario()', async () => {
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.getRawValue = jest.fn().mockReturnValue({
      segundoApellido: {},
      primerApellido: {},
      nombres: {},
      tipoPersona: {},
      denominacionRazon: {}
    });
    component.tipoPersona = component.tipoPersona || {};
    component.tipoPersona.MORAL = 'MORAL';
    component.tipoPersona.FISICA = 'FISICA';
    component.obtenerNuevoValorFormulario();
    expect(component.agregarDatosForm.getRawValue).toHaveBeenCalled();
  });

  it('should run #guardar()', async () => {
    component.tramiteStore = component.tramiteStore || {};
    component.tramiteStore.updateOtrosTablaDatos = jest.fn();
    component.obtenerNuevoValorFormulario = jest.fn();
    component.ubicaccion = component.ubicaccion || {};
    component.ubicaccion.back = jest.fn();
    component.guardar();
    expect(component.tramiteStore.updateOtrosTablaDatos).toHaveBeenCalled();
    expect(component.obtenerNuevoValorFormulario).toHaveBeenCalled();
    expect(component.ubicaccion.back).toHaveBeenCalled();
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
    component.alternarOpcionNoContribuyente = jest.fn();
    component.tipoPersona = component.tipoPersona || {};
    component.tipoPersona.NO_CONTRIBUYENTE = 'NO_CONTRIBUYENTE';
    component.changeNacionalidad();
  });

  it('should run #alternarOpcionNoContribuyente()', async () => {
    component.tipoPersonaRadioOpcions = component.tipoPersonaRadioOpcions || {};
    component.tipoPersonaRadioOpcions.findIndex = jest.fn().mockReturnValue([
      {
        "value": {}
      }
    ]);
    component.tipoPersonaRadioOpcions.push = jest.fn();
    component.tipoPersonaRadioOpcions.splice = jest.fn();
    component.alternarOpcionNoContribuyente({})
  });

  it('should run #seBuscaRfc()', async () => {
    component.exportacionMateriasPrimasService = component.exportacionMateriasPrimasService || {};
    component.exportacionMateriasPrimasService.obtenerOstro = jest.fn().mockReturnValue(observableOf({}));
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.patchValue = jest.fn();
    component.agregarDatosForm.get = jest.fn().mockReturnValue({
      setValue: function() {},
      disabled: {},
      value: {}
    });
    component.seBuscaRfc();
    expect(component.exportacionMateriasPrimasService.obtenerOstro).toHaveBeenCalled();
    expect(component.agregarDatosForm.patchValue).toHaveBeenCalled();
    expect(component.agregarDatosForm.get).toHaveBeenCalled();
  });

  it('should run #esInvalido()', async () => {
    component.agregarDatosForm = component.agregarDatosForm || {};
    component.agregarDatosForm.get = jest.fn().mockReturnValue({
      dirty: {},
      touched: {},
      invalid: {}
    });
    component.esInvalido({});
    expect(component.agregarDatosForm.get).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.unsubscribe$ = component.unsubscribe$ || {};
    component.unsubscribe$.next = jest.fn();
    component.unsubscribe$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.unsubscribe$.next).toHaveBeenCalled();
    expect(component.unsubscribe$.complete).toHaveBeenCalled();
  });

});