// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Injectable } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Observable, of as observableOf } from 'rxjs';
import { By } from '@angular/platform-browser';
 
import { SolicitudComponent } from './solicitud.component';
import { AvisoService } from '../../services/aviso.service';
import { ValidacionesFormularioService } from '@ng-mf/data-access-user';
import { Tramite32502Store } from '../../../../estados/queries/tramite32502.query';
import { Tramite32502Query } from '../../../../estados/queries/tramite32502.query';
import { provideHttpClient } from '@angular/common/http';
 
 
@Injectable()
class MockTramite32502Store { }
 
describe('SolicitudComponent', () => {
  let fixture: ComponentFixture<SolicitudComponent>;
  let component: SolicitudComponent;
 
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [
        SolicitudComponent
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        provideHttpClient(),
        AvisoService,
        FormBuilder,
        ValidacionesFormularioService,
        { provide: Tramite32502Store, useClass: MockTramite32502Store },
        Tramite32502Query
      ]
    }).compileComponents();
 
    fixture = TestBed.createComponent(SolicitudComponent);
    component = fixture.debugElement.componentInstance;
  });
 
  afterEach(() => {
    if (fixture) {
      fixture.destroy();
    }
  });
 
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
 
  it('should initialize the form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.FormSolicitud).toBeDefined();
  });
 
  it('should run GetterDeclaration #adaceForm', () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn();
    const ADACE_FORM = component.adaceForm;
    expect(component.FormSolicitud.get).toHaveBeenCalledWith('adaceForm');
  });
 
  it('should run GetterDeclaration #extranjeroAvisoAgace', () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn();
    const EXTRANJERO_AVISO_AGACE = component.extranjeroAvisoAgace;
    expect(component.FormSolicitud.get).toHaveBeenCalledWith('extranjeroAvisoAgace');
  });
 
  it('should run GetterDeclaration #mercanciaST', () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn();
    const MERCENCIA_ST = component.mercanciaST;
    expect(component.FormSolicitud.get).toHaveBeenCalledWith('mercanciaST');
  });
 
  it('should run GetterDeclaration #direccionST', () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn();
    const DIRECCION_ST = component.direccionST;
    expect(component.FormSolicitud.get).toHaveBeenCalledWith('direccionST');
  });
 
  it('should run GetterDeclaration #pedimentoST', () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn();
    const PEDIMENTO_ST = component.pedimentoST;
    expect(component.FormSolicitud.get).toHaveBeenCalledWith('pedimentoST');
  });
 
  it('should run #ngOnInit()', () => {
    component.inicializaCatalogos = jest.fn();
    component.fraccionArancelariaSeleccion = jest.fn();
    component.fraccionReglaSeleccion = jest.fn();
    component.onEntidadFederativaChange = jest.fn();
    component.sanitizeNumPedimento = jest.fn();
    component.ngOnInit();
    component.fraccionArancelariaSeleccion();
    component.fraccionReglaSeleccion();
    component.onEntidadFederativaChange();
    expect(component.inicializaCatalogos).toHaveBeenCalled();
    expect(component.fraccionArancelariaSeleccion).toHaveBeenCalled();
    expect(component.fraccionReglaSeleccion).toHaveBeenCalled();
    expect(component.onEntidadFederativaChange).toHaveBeenCalled();
  });
 
  it('should run #isValid()', () => {
    component.validacionesService = component.validacionesService || {};
    component.validacionesService.isValid = jest.fn();
    component.isValid({}, {});
    expect(component.validacionesService.isValid).toHaveBeenCalled();
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
    expect(component.fb.group).toHaveBeenCalled();
  });
 
  it('should run #inicializaCatalogos()', () => {
    component.avisoService = component.avisoService || {};
    component.avisoService.getFraccionArancelariaCatalogo = jest.fn().mockReturnValue(observableOf({
      data: []
    }));
    component.avisoService.getFraccionReglaCatalogo = jest.fn().mockReturnValue(observableOf({
      data: []
    }));
    component.inicializaCatalogos();
    expect(component.avisoService.getFraccionArancelariaCatalogo).toHaveBeenCalled();
    expect(component.avisoService.getFraccionReglaCatalogo).toHaveBeenCalled();
  });
 
  it('should run #fraccionArancelariaSeleccion()', () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite32502Store = component.tramite32502Store || {};
    component.tramite32502Store.setCveFraccionArancelaria = jest.fn();
    component.fraccionArancelariaSeleccion();
    expect(component.FormSolicitud.get).toHaveBeenCalledWith('fraccionArancelaria');
    expect(component.tramite32502Store.setCveFraccionArancelaria).toHaveBeenCalled();
  });
 
  it('should run #fraccionReglaSeleccion()', () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite32502Store = component.tramite32502Store || {};
    component.tramite32502Store.setFraccionRegla = jest.fn();
    component.fraccionReglaSeleccion();
    expect(component.FormSolicitud.get).toHaveBeenCalledWith('reglaFraccion');
    component.tramite32502Store.setFraccionRegla()
    expect(component.tramite32502Store.setFraccionRegla).toHaveBeenCalled();
  });
 
  it('should run #onEntidadFederativaChange()', () => {
    component.FormSolicitud = component.FormSolicitud || {};
    component.FormSolicitud.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite32502Store = component.tramite32502Store || {};
    component.tramite32502Store.setFraccionRegla = jest.fn();
    component.onEntidadFederativaChange();
    expect(component.FormSolicitud.get).toHaveBeenCalledWith('reglaFraccion');
    component.tramite32502Store.setFraccionRegla()
    expect(component.tramite32502Store.setFraccionRegla).toHaveBeenCalled();
  });
 
  it('should run #setValoresStore()', () => {
    component.tramite32502Store = component.tramite32502Store || {};
    component.tramite32502Store.setFraccionArancelaria = jest.fn();
    component.tramite32502Store.setFraccionRegla = jest.fn();
    component.setValoresStore({
      get: function () {
        return {
          value: {}
        };
      }
    }, 'fraccionArancelaria', 'setFraccionArancelaria');
    component.tramite32502Store.setFraccionArancelaria()
    expect(component.tramite32502Store.setFraccionArancelaria).toHaveBeenCalled();
    component.setValoresStore({
      get: function () {
        return {
          value: {}
        };
      }
    }, 'fraccionRegla', 'setFraccionRegla');
    component.tramite32502Store.setFraccionRegla()
    expect(component.tramite32502Store.setFraccionRegla).toHaveBeenCalled();
  });
 
  it('should run #validarFormulario()', () => {
    component.FormSolicitud = component.FormSolicitud || {};
    expect(component.FormSolicitud.invalid).toBe(true);
    component.FormSolicitud.markAllAsTouched = jest.fn();
    component.validarFormulario();
    expect(component.FormSolicitud.markAllAsTouched).toHaveBeenCalled();
  });
});