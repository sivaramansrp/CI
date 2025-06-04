// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { AvisoComponent } from './aviso.component';
import { FormBuilder } from '@angular/forms';
import { CatalogosService, ConsultaioQuery } from '@ng-mf/data-access-user';
import { Tramite32504Store } from '../../estados/tramite32504.store';
import { AvisoDatosService } from '../../services/aviso-datos.service';
import { Tramite32504Query } from '../../estados/tramite32504.query';

@Injectable()
class MockTramite32504Store {}

@Injectable()
class MockAvisoDatosService {}

@Injectable()
class MockTramite32504Query {}

describe('AvisoComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, AvisoComponent, HttpClientTestingModule],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        CatalogosService,
        { provide: Tramite32504Store, useClass: MockTramite32504Store },
        { provide: AvisoDatosService, useClass: MockAvisoDatosService },
        ConsultaioQuery,
        { provide: Tramite32504Query, useClass: MockTramite32504Query }
      ]
    }).overrideComponent(AvisoComponent, {

      set: { providers: [{ provide: AvisoDatosService, useClass: MockAvisoDatosService }] }    
    }).compileComponents();
    fixture = TestBed.createComponent(AvisoComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.configuracion = component.configuracion || {};
    component.configuracion = ['configuracion'];
    component.inicializarFormGroup = jest.fn();
    component.consultaQuery = component.consultaQuery || {};
    component.consultaQuery.selectConsultaioState$ = observableOf({});
    component.inicializarEstadoFormulario = jest.fn();
    component.ngOnInit();
    // expect(component.inicializarFormGroup).toHaveBeenCalled();
    // expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
  });

  it('should run #inicializarEstadoFormulario()', async () => {
    component.formulario = component.formulario || {};
    component.formulario.disable = jest.fn();
    component.formulario.enable = jest.fn();
    component.configuracion = component.configuracion || {};
    component.configuracion = ['configuracion'];
    component.inicializarFormGroup = jest.fn();
    component.inicializarEstadoFormulario();
    // expect(component.formulario.disable).toHaveBeenCalled();
    // expect(component.formulario.enable).toHaveBeenCalled();
    // expect(component.inicializarFormGroup).toHaveBeenCalled();
  });

  it('should run #getRadioData()', async () => {
    component.avisoDatosService = component.avisoDatosService || {};
    component.avisoDatosService.getDatos = jest.fn().mockReturnValue(observableOf({}));
    component.getRadioData({}, {});
    // expect(component.avisoDatosService.getDatos).toHaveBeenCalled();
  });

  it('should run #obtenerValoresCatalogo()', async () => {
    component.catalogosServicios = component.catalogosServicios || {};
    component.catalogosServicios.getCatalogo = jest.fn().mockReturnValue(observableOf({}));
    component.configuracion = component.configuracion || {};
    component.configuracion.indiceGrupo = {
      menu: {
        indiceMenu: {
          props: {
            catalogos: {}
          }
        }
      }
    };
    component.obtenerValoresCatalogo({}, {}, {});
    // expect(component.catalogosServicios.getCatalogo).toHaveBeenCalled();
  });

  it('should run #crearFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.crearFormulario();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #fechaCambiado()', async () => {

    component.fechaCambiado({});

  });

  it('should run #seleccionCatalogo()', async () => {
    component.formulario = component.formulario || {};
    component.formulario.get = jest.fn().mockReturnValue({
      setValue: function() {}
    });
    component.seleccionCatalogo({}, {});
    // expect(component.formulario.get).toHaveBeenCalled();
  });

  it('should run #accionesBotones()', async () => {

    component.accionesBotones({});

  });

  it('should run #onSubmit()', async () => {
    component.store = component.store || {};
    component.store.setDatosEmpresa = jest.fn();
    component.store.setCargaTipo = jest.fn();
    component.formulario = component.formulario || {};
    component.formulario.value = {
      datosEmpresa: {},
      cargaTipo: {}
    };
    component.onSubmit();
    // expect(component.store.setDatosEmpresa).toHaveBeenCalled();
    // expect(component.store.setCargaTipo).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.formulario = component.formulario || {};
    component.formulario.value = 'value';
    component.store = component.store || {};
    component.store.setEstadoGeneral = jest.fn();
    component.setValoresStore();
    // expect(component.store.setEstadoGeneral).toHaveBeenCalled();
  });

});