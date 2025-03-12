// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { CUSTOM_ELEMENTS_SCHEMA, Input, NO_ERRORS_SCHEMA, Pipe, PipeTransform } from '@angular/core';
import { ComponentFixture, TestBed, async} from '@angular/core/testing';
import { FormControl,FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

import { Component, Directive } from '@angular/core';
import { AgregaPersonasComponent } from './agrega-personas.component';
import { FormBuilder } from '@angular/forms';
import { MyCustomDirective } from '@ng-mf/data-access-user';
import { PhoneNumberPipe } from '@ng-mf/data-access-user';
import { SafeHtmlPipe } from '@ng-mf/data-access-user';
import { TranslatePipe } from '@ng-mf/data-access-user';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';

@Injectable()
class MockTramite32502Store {}

describe('SolicitudComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        SolicitudComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        AvisoService,
        FormBuilder,
        ValidacionesFormularioService,
        { provide: Tramite32502Store, useClass: MockTramite32502Store }
      ]
    }).overrideComponent(SolicitudComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {
      //
    };
    fixture.destroy();
  });

  it('should run #constructor()', () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #adaceForm', () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn();
    const ADACE_FORM = component.adaceForm;
    // expect(component.FormSolicitud.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #extranjeroAvisoAgace', () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn();
    const EXTRANJERO_AVISO_AGACE = component.extranjeroAvisoAgace;
    // expect(component.FormSolicitud.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #mercanciaST', () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn();
    const MERCENCIA_ST = component.mercanciaST;
    // expect(component.FormSolicitud.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #direccionST', () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn();
    const DIRECCION_ST = component.direccionST;
    // expect(component.FormSolicitud.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #pedimentoST', () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn();
    const PEDIMENTO_ST = component.pedimentoST;
    // expect(component.FormSolicitud.get).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', () => {
    component.inicializaCatalogos = jest.fn();
    component.fraccionArancelariaSeleccion = jest.fn();
    component.fraccionReglaSeleccion = jest.fn();
    component.onEntidadFederativaChange = jest.fn();
    component.sanitizeNumPedimento = jest.fn();
    component.ngOnInit();
    // expect(component.inicializaCatalogos).toHaveBeenCalled();
    // expect(component.fraccionArancelariaSeleccion).toHaveBeenCalled();
    // expect(component.fraccionReglaSeleccion).toHaveBeenCalled();
    // expect(component.onEntidadFederativaChange).toHaveBeenCalled();
    // expect(component.sanitizeNumPedimento).toHaveBeenCalled();
  });

  it('should run #isValid()', () => {
    component.validacionesService = component.validacionesService || {};
    component.validacionesService.isValid = jest.fn();
    component.isValid({}, {});
    // expect(component.validacionesService.isValid).toHaveBeenCalled();
  });

  it('should run #crearFormSolicitud()', () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.solicitudState = component.solicitudState || {};
    component.solicitudState.adace = 'adace';
    component.solicitudState.razonSocial = 'razonSocial';
    component.solicitudState.rfc = 'rfc';
    component.solicitudState.rfcExtranjero = 'rfcExtranjero';
    component.solicitudState.cveFraccionArancelaria = 'cveFraccionArancelaria';
    component.solicitudState.reglaFraccion = 'reglaFraccion';
    component.solicitudState.nico = 'nico';
    component.solicitudState.valorUSD = 'valorUSD';
    component.solicitudState.marca = 'marca';
    component.solicitudState.peso = 'peso';
    component.solicitudState.fechaInicio = 'fechaInicio';
    component.solicitudState.numeroSerie = 'numeroSerie';
    component.solicitudState.descripcionMercancia = 'descripcionMercancia';
    component.solicitudState.informacionExtra = 'informacionExtra';
    component.solicitudState.entidadFederativa = 'entidadFederativa';
    component.solicitudState.delegacionMunicipio = 'delegacionMunicipio';
    component.solicitudState.colonia = 'colonia';
    component.solicitudState.calle = 'calle';
    component.solicitudState.numeroExterior = 'numeroExterior';
    component.solicitudState.numeroInterior = 'numeroInterior';
    component.solicitudState.codigoPostal = 'codigoPostal';
    component.solicitudState.patenteAutorizacion = 'patenteAutorizacion';
    component.solicitudState.rfcAgenteAduanal = 'rfcAgenteAduanal';
    component.solicitudState.numeroPedimento = 'numeroPedimento';
    component.solicitudState.claveAduana = 'claveAduana';
    component.crearFormSolicitud();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #inicializaCatalogos()', () => {
    component.avisoService = component.avisoService || {};
    component.avisoService.getFraccionArancelariaCatalogo = jest.fn().mockReturnValue(observableOf({
      0: "f",
      1: "r",
      2: "a",
      3: "c",
      4: "c",
      5: "i",
      6: "o",
      7: "n",
      8: "A",
      9: "r",
      10: "a",
      11: "n",
      12: "c",
      13: "e",
      14: "l",
      15: "a",
      16: "r",
      17: "i",
      18: "a",
      19: "$"
    }));
    component.avisoService.getFraccionReglaCatalogo = jest.fn().mockReturnValue(observableOf({
      0: "r",
      1: "e",
      2: "g",
      3: "l",
      4: "a",
      5: "A",
      6: "r",
      7: "a",
      8: "n",
      9: "c",
      10: "e",
      11: "l",
      12: "a",
      13: "r",
      14: "i",
      15: "a",
      16: "$"
    }));
    component.inicializaCatalogos();
    // expect(component.avisoService.getFraccionArancelariaCatalogo).toHaveBeenCalled();
    // expect(component.avisoService.getFraccionReglaCatalogo).toHaveBeenCalled();
  });

  it('should run #fraccionArancelariaSeleccion()', () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite32502Store = component.tramite32502Store || {};
    component.tramite32502Store.setFraccionArancelaria = jest.fn();
    component.fraccionArancelariaSeleccion();
    // expect(component.FormSolicitud.get).toHaveBeenCalled();
    // expect(component.tramite32502Store.setFraccionArancelaria).toHaveBeenCalled();
  });

  it('should run #fraccionReglaSeleccion()', () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite32502Store = component.tramite32502Store || {};
    component.tramite32502Store.setFraccionRegla = jest.fn();
    component.fraccionReglaSeleccion();
    // expect(component.FormSolicitud.get).toHaveBeenCalled();
    // expect(component.tramite32502Store.setFraccionRegla).toHaveBeenCalled();
  });

  it('should run #onEntidadFederativaChange()', () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite32502Store = component.tramite32502Store || {};
    component.tramite32502Store.setFraccionRegla = jest.fn();
    component.onEntidadFederativaChange();
    // expect(component.FormSolicitud.get).toHaveBeenCalled();
    // expect(component.tramite32502Store.setFraccionRegla).toHaveBeenCalled();
  });

  it('should run #sanitizeNumPedimento()', () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite32502Store = component.tramite32502Store || {};
    component.tramite32502Store.setFraccionRegla = jest.fn();
    component.sanitizeNumPedimento();
    // expect(component.FormSolicitud.get).toHaveBeenCalled();
    // expect(component.tramite32502Store.setFraccionRegla).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', () => {
    component.tramite32502Store = component.tramite32502Store || {};
    component.tramite32502Store.setFraccionArancelaria = jest.fn();
    component.tramite32502Store.setFraccionRegla = jest.fn();
    component.setValoresStore({
      get: function() {
        return {
          value: {}
        };
      }
    }, {}, {});
    // expect(component.tramite32502Store.setFraccionArancelaria).toHaveBeenCalled();
    // expect(component.tramite32502Store.setFraccionRegla).toHaveBeenCalled();
  });

  it('should run #validarFormulario()', () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.invalid = 'invalid';
    component.FormSolicitud.markAllAsTouched = jest.fn();
    component.validarFormulario();
    // expect(component.FormSolicitud.markAllAsTouched).toHaveBeenCalled();
  });

});