
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component, ChangeDetectorRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ImportarDeRemediosHerbalsService } from '../../services/importar-de-remedios-herbals.service';
import { Solicitud260919Store } from '../../estados/tramites260919.store';
import { Solicitud260919Query } from '../../estados/tramites260919.query';
import { DatosdelasolicitudComponent } from '../../../260919/components/datos-del/datos-de-la-solicitud.component';

@Injectable()
class MockImportarDeRemediosHerbalsService {}

@Injectable()
class MockSolicitud260919Store {}

@Injectable()
class MockSolicitud260919Query {}



describe('DatosdelasolicitudComponent', () => {
  let fixture: ComponentFixture<unknown>;
  let component: { ngOnDestroy: () => void; dataDeLaSolicitudForm: { get?: any; enable?: any; }; datosDelTramiteRealizar: any; solicitud260919Query: { selectSolicitud$?: any; }; createForm: jest.Mock<any, any, any> | (() => void); getEstadosData: jest.Mock<any, any, any> | (() => void); getClaveScianData: jest.Mock<any, any, any> | (() => void); getRegimenalqueData: jest.Mock<any, any, any> | (() => void); getAduanaData: jest.Mock<any, any, any> | (() => void); getMercanciasData: jest.Mock<any, any, any> | (() => void); ngOnInit: () => void; fb: { group?: any; }; dataDeLaSolicitudState: { tipoOperacion?: any; justification?: any; rfcDel?: any; denominacion?: any; correoElectronico?: any; codigopostal?: any; estado?: any; municipoyalcaldia?: any; localidad?: any; colonia?: any; calle?: any; lada?: any; telefono?: any; avisoDeFuncionamiento?: any; licenciaSanitaria?: any; regimenalque?: any; aduana?: any; rfc?: any; legalRazonSocial?: any; apellidoPaterno?: any; apellidoMaterno?: any; }; toggleLicenciaSanitaria: () => void; changeEvent: () => void; importarDeRemediosHerbals: { getEstadosData?: any; getClaveScianData?: any; getMercanciasData?: any; getRegimenalqueData?: any; getAduanaData?: any; }; estadoData: { catalogos?: any; }; regimenalqueData: { catalogos?: any; }; aduanaData: { catalogos?: any; }; aceptar: () => void; solicitud260919Store: { metodoNombre?: any; }; setValoresStore: (arg0: { get: () => { value: {}; }; }, arg1: {}, arg2: {}) => void; destroyed$: { next?: any; complete?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,DatosdelasolicitudComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: ImportarDeRemediosHerbalsService, useClass: MockImportarDeRemediosHerbalsService },
        ChangeDetectorRef,
        { provide: Solicitud260919Store, useClass: MockSolicitud260919Store },
        { provide: Solicitud260919Query, useClass: MockSolicitud260919Query }
      ]
    }).overrideComponent(DatosdelasolicitudComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosdelasolicitudComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #datosDelTramiteRealizar', async () => {
    component.dataDeLaSolicitudForm = component.dataDeLaSolicitudForm || {};
    component.dataDeLaSolicitudForm.get = jest.fn();
    const datosDelTramiteRealizar = component.datosDelTramiteRealizar;
    expect(component.dataDeLaSolicitudForm.get).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.solicitud260919Query = component.solicitud260919Query || {};
    component.solicitud260919Query.selectSolicitud$ = observableOf({});
    component.createForm = jest.fn();
    component.getEstadosData = jest.fn();
    component.getClaveScianData = jest.fn();
    component.getRegimenalqueData = jest.fn();
    component.getAduanaData = jest.fn();
    component.getMercanciasData = jest.fn();
    component.ngOnInit();
    expect(component.createForm).toHaveBeenCalled();
    expect(component.getEstadosData).toHaveBeenCalled();
    expect(component.getClaveScianData).toHaveBeenCalled();
    expect(component.getRegimenalqueData).toHaveBeenCalled();
    expect(component.getAduanaData).toHaveBeenCalled();
    expect(component.getMercanciasData).toHaveBeenCalled();
  });

  it('should run #createForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.dataDeLaSolicitudState = component.dataDeLaSolicitudState || {};
    component.dataDeLaSolicitudState.tipoOperacion = 'tipoOperacion';
    component.dataDeLaSolicitudState.justification = 'justification';
    component.dataDeLaSolicitudState.rfcDel = 'rfcDel';
    component.dataDeLaSolicitudState.denominacion = 'denominacion';
    component.dataDeLaSolicitudState.correoElectronico = 'correoElectronico';
    component.dataDeLaSolicitudState.codigopostal = 'codigopostal';
    component.dataDeLaSolicitudState.estado = 'estado';
    component.dataDeLaSolicitudState.municipoyalcaldia = 'municipoyalcaldia';
    component.dataDeLaSolicitudState.localidad = 'localidad';
    component.dataDeLaSolicitudState.colonia = 'colonia';
    component.dataDeLaSolicitudState.calle = 'calle';
    component.dataDeLaSolicitudState.lada = 'lada';
    component.dataDeLaSolicitudState.telefono = 'telefono';
    component.dataDeLaSolicitudState.avisoDeFuncionamiento = 'avisoDeFuncionamiento';
    component.dataDeLaSolicitudState.licenciaSanitaria = 'licenciaSanitaria';
    component.dataDeLaSolicitudState.regimenalque = 'regimenalque';
    component.dataDeLaSolicitudState.aduana = 'aduana';
    component.dataDeLaSolicitudState.rfc = 'rfc';
    component.dataDeLaSolicitudState.legalRazonSocial = 'legalRazonSocial';
    component.dataDeLaSolicitudState.apellidoPaterno = 'apellidoPaterno';
    component.dataDeLaSolicitudState.apellidoMaterno = 'apellidoMaterno';
    component.createForm();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #toggleLicenciaSanitaria()', async () => {
    component.dataDeLaSolicitudForm = component.dataDeLaSolicitudForm || {};
    component.dataDeLaSolicitudForm.get = jest.fn().mockReturnValue({
      enable: function() {},
      disable: function() {}
    });
    component.toggleLicenciaSanitaria();
    expect(component.dataDeLaSolicitudForm.get).toHaveBeenCalled();
  });

  it('should run #changeEvent()', async () => {
    component.dataDeLaSolicitudForm = component.dataDeLaSolicitudForm || {};
    component.dataDeLaSolicitudForm.get = jest.fn().mockReturnValue({
      setValue: function() {},
      disable: function() {},
      enable: function() {}
    });
    component.changeEvent();
    expect(component.dataDeLaSolicitudForm.get).toHaveBeenCalled();
  });

  it('should run #getEstadosData()', async () => {
    component.importarDeRemediosHerbals = component.importarDeRemediosHerbals || {};
    component.importarDeRemediosHerbals.getEstadosData = jest.fn().mockReturnValue(observableOf({}));
    component.estadoData = component.estadoData || {};
    component.estadoData.catalogos = 'catalogos';
    component.getEstadosData();
    expect(component.importarDeRemediosHerbals.getEstadosData).toHaveBeenCalled();
  });

  it('should run #getClaveScianData()', async () => {
    component.importarDeRemediosHerbals = component.importarDeRemediosHerbals || {};
    component.importarDeRemediosHerbals.getClaveScianData = jest.fn().mockReturnValue(observableOf({}));
    component.getClaveScianData();
    expect(component.importarDeRemediosHerbals.getClaveScianData).toHaveBeenCalled();
  });

  it('should run #getMercanciasData()', async () => {
    component.importarDeRemediosHerbals = component.importarDeRemediosHerbals || {};
    component.importarDeRemediosHerbals.getMercanciasData = jest.fn().mockReturnValue(observableOf({}));
    component.getMercanciasData();
    expect(component.importarDeRemediosHerbals.getMercanciasData).toHaveBeenCalled();
  });

  it('should run #getRegimenalqueData()', async () => {
    component.importarDeRemediosHerbals = component.importarDeRemediosHerbals || {};
    component.importarDeRemediosHerbals.getRegimenalqueData = jest.fn().mockReturnValue(observableOf({}));
    component.regimenalqueData = component.regimenalqueData || {};
    component.regimenalqueData.catalogos = 'catalogos';
    component.getRegimenalqueData();
    expect(component.importarDeRemediosHerbals.getRegimenalqueData).toHaveBeenCalled();
  });

  it('should run #getAduanaData()', async () => {
    component.importarDeRemediosHerbals = component.importarDeRemediosHerbals || {};
    component.importarDeRemediosHerbals.getAduanaData = jest.fn().mockReturnValue(observableOf({}));
    component.aduanaData = component.aduanaData || {};
    component.aduanaData.catalogos = 'catalogos';
    component.getAduanaData();
    expect(component.importarDeRemediosHerbals.getAduanaData).toHaveBeenCalled();
  });

  it('should run #aceptar()', async () => {
    component.dataDeLaSolicitudForm = component.dataDeLaSolicitudForm || {};
    component.dataDeLaSolicitudForm.enable = jest.fn();
    component.aceptar();
    expect(component.dataDeLaSolicitudForm.enable).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.solicitud260919Store = component.solicitud260919Store || new MockSolicitud260919Store();
    component.setValoresStore(
      {
        get: function () {
          return {
            value: {},
          };
        },
      },
      {},
      {}
    );
    expect(component.solicitud260919Store.metodoNombre).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyed$ = component.destroyed$ || {};
    component.destroyed$.next = jest.fn();
    component.destroyed$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyed$.next).toHaveBeenCalled();
    expect(component.destroyed$.complete).toHaveBeenCalled();
  });

});