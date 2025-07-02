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
import { Tramite260302Query } from '../../estados/tramite260302Query.query';
import { Tramite260302Store } from '../../estados/tramite260302Store.store';
import { Location } from '@angular/common';

@Injectable()
class MockDatosSolicitudService {
  obtenerRespuestaPorUrl = function() {};
}

@Injectable()
class MockTramite260302Query {}

@Injectable()
class MockTramite260302Store {}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'phoneNumber'})
class PhoneNumberPipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'safeHtml'})
class SafeHtmlPipe implements PipeTransform {
  transform(value) { return value; }
}

describe('ExporticonMercanciaEstupefacientesComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        FormsModule, 
        ReactiveFormsModule, 
        ExporticonMercanciaEstupefacientesComponent 
      ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: DatosSolicitudService, useClass: MockDatosSolicitudService },
        { provide: Tramite260302Query, useClass: MockTramite260302Query },
        { provide: Tramite260302Store, useClass: MockTramite260302Store },
        Location
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
    const mockState = {
      seleccionadoTablaMercanciasDatos: [],
      mercanciaForm: {}
    };
    component.tramite260302Query = component.tramite260302Query || {};
    component.tramite260302Query.selectTramiteState$ = observableOf(mockState);
    component.crearMercanciaForm = jest.fn();
    
    component.ngOnInit();
  
    expect(component.crearMercanciaForm).toHaveBeenCalled();
    expect(component.tramiteState).toEqual(mockState);
    expect(component.mercanciaFormState).toEqual(mockState.mercanciaForm);
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
    component.tramite260302Store = component.tramite260302Store || {};
    component.tramite260302Store.update = jest.fn().mockReturnValue([
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
      paisDeDestino: {},
      especifique: {},
      especifiqueObligatorio: {}
    });
    expect(component.tramite260302Store.update).toHaveBeenCalled();
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

  it('should run #cambiarFraccionArancelaria()', async () => {
    component.mercanciaForm = component.mercanciaForm || {};
    component.mercanciaForm.get = jest.fn().mockReturnValue({
      disable: function() {},
      setValue: function() {},
      enable: function() {},
      value: {}
    });
    component.cambiarFraccionArancelaria();
    expect(component.mercanciaForm.get).toHaveBeenCalled();
  });

  it('should run #tipoProductoSeleccionado()', async () => {

    component.tipoProductoSeleccionado({
      descripcion: {}
    });

  });

  it('should run #estadoFisicoSeleccionado()', async () => {

    component.estadoFisicoSeleccionado({
      descripcion: {}
    });

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

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

});