// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { ExporticonMercanciaEstupefacientesComponent } from './exporticon-mercancia-estupefacientes.component';
import { FormBuilder } from '@angular/forms';
import { DatosSolicitudService } from '../../../../shared/services/datos-solicitud.service';
import { Tramite260304Query } from '../../estados/tramite260304Query.query';
import { Tramite260304Store } from '../../estados/tramite260304Store.store';
import { Location } from '@angular/common';

@Injectable()
class MockDatosSolicitudService {
  obtenerRespuestaPorUrl = function() {};
}

@Injectable()
class MockTramite260304Query {}

@Injectable()
class MockTramite260304Store {}



describe('ExporticonMercanciaEstupefacientesComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, ExporticonMercanciaEstupefacientesComponent, ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: DatosSolicitudService, useClass: MockDatosSolicitudService },
        { provide: Tramite260304Query, useClass: MockTramite260304Query },
        { provide: Tramite260304Store, useClass: MockTramite260304Store },
      ]
    }).overrideComponent(ExporticonMercanciaEstupefacientesComponent, {

      set: { providers: [{ provide: DatosSolicitudService, useClass: MockDatosSolicitudService }] }    
    }).compileComponents();
    fixture = TestBed.createComponent(ExporticonMercanciaEstupefacientesComponent);
    component = fixture.debugElement.componentInstance;
  });

 it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.tramite260304Query = component.tramite260304Query || {};
    component.tramite260304Query.selectTramiteState$ = observableOf({});
    component.crearMercanciaForm = jest.fn();
    component.ngOnInit();
  });

  it('should run #obtenerMensajeError()', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockReturnValue({
      errors: {},
      value: {}
    });
    component.obtenerMensajeError({});
    expect(component.mercanciaForm.get).toHaveBeenCalled();
  });

  it('should run #obtenerValor()', async () => {
    component.mercanciaFormState = component.mercanciaFormState || {};
    component.mercanciaFormState.field = 'field';
    component.obtenerValor({});

  });

  it('should run #esInvalido()', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockReturnValue({
      dirty: {},
      touched: {},
      invalid: {}
    });
    component.esInvalido({});
    expect(component.mercanciaForm.get).toHaveBeenCalled();
  });

  it('should run #crearMercanciaForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.obtenerValor = jest.fn();
    component.crearMercanciaForm();
    expect(component.fb.group).toHaveBeenCalled();
    expect(component.obtenerValor).toHaveBeenCalled();
  });

  it('should run #isValid()', async () => {

    component.isValid({
      controls: {
        campo: {
          errors: {},
          touched: {}
        }
      },
      errors: {},
      touched: {}
    }, {});

  });

  it('should run #formaFarmaceuticaSeleccionadasChange()', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockReturnValue({
      setValue: function() {}
    });
    component.formaFarmaceuticaSeleccionadasChange({
      length: {}
    });
  });

  it('should run #usoEspesificoSeleccionadasChange()', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockReturnValue({
      setValue: function() {}
    });
    component.usoEspesificoSeleccionadasChange({
      length: {}
    });
  });

  it('should run #mostrarColapsable()', async () => {

    component.mostrarColapsable({});

  });

  it('should run #agregarMercancia()', async () => {
    component.mercanciaSeleccionado = jest.fn();
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.value = 'value';
    component.ubicaccion = component.ubicaccion || {};
    component.ubicaccion.back = jest.fn();
    component.agregarMercancia();
    expect(component.mercanciaSeleccionado).toHaveBeenCalled();
    expect(component.ubicaccion.back).toHaveBeenCalled();
  });

  it('should run #limpiarMercancia()', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.reset = jest.fn();
    component.limpiarMercancia();
    expect(component.mercanciaForm.reset).toHaveBeenCalled();
  });

  it('should run #cancelar()', async () => {
    component.ubicaccion = component.ubicaccion || {};
    component.ubicaccion.back = jest.fn();
    component.cancelar();
    expect(component.ubicaccion.back).toHaveBeenCalled();
  });

  it('should run #mercanciaSeleccionado()', async () => {
    component.tramiteState = component.tramiteState || {};
    component.tramiteState.tablaMercanciasConfigDatos = {
      findIndex: function() {
        return [
          {
            "clasificacionProducto": {}
          }
        ];
      },
      splice: function() {}
    };
    component.tramite260304Store = component.tramite260304Store || {};
    component.tramite260304Store.update = jest.fn().mockReturnValue([
      null
    ]);
    component.mercanciaSeleccionado({
      clasificacionProducto: {},
      especificarClasificacionProducto: {},
      denominacionCumonInternacional: {},
      marcaComercialDenominacion: {},
      cantidadDeLotes: {},
      kgPorLote: {},
      numeroDePiezasAFabricar: {},
      descripcionNumeroDePiezas: {},
      formaFarmaceutica: {},
      estadoFisico: {},
      fraccionArancelaria: {},
      descripcionFraccion: {},
      unidadMedidaComercializacion: {},
      cantidadUMC: {},
      unidadMedidaTarifa: {},
      cantidadUMT: {},
      presentacion: {},
      numeroRegistroSanitario: {},
      paisOrigen: {},
      paisProcedencia: {},
      tipoProducto: {},
      usoEspecifico: {},
      numeroCAS: {},
      paisDeDestino: {}
    });
    expect(component.tramite260304Store.update).toHaveBeenCalled();
  });

  it('should run #eliminarDetalleMercancia()', async () => {
    component.detalleMercanciaDatos = component.detalleMercanciaDatos || {};
    component.detalleMercanciaDatos = ['detalleMercanciaDatos'];
    component.tablaMercanciasLista = component.tablaMercanciasLista || {};
    component.tablaMercanciasLista.some = jest.fn().mockReturnValue([
      {
        "registroSanitario": {}
      }
    ]);
    component.eliminarDetalleMercancia();
    expect(component.tablaMercanciasLista.some).toHaveBeenCalled();
  });

  it('should run #agregarDetalleMercancia()', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.detalleMercanciaDatos = component.detalleMercanciaDatos || {};
    component.detalleMercanciaDatos.push = jest.fn();
    component.agregarDetalleMercancia();
    expect(component.mercanciaForm.get).toHaveBeenCalled();
    expect(component.detalleMercanciaDatos.push).toHaveBeenCalled();
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