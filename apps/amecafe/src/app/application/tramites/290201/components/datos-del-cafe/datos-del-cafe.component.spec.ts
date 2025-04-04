// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosDelCafeComponent } from './datos-del-cafe.component';
import { RegistrarSolicitudService } from '../../services/registrar-solicitud.service';
import { FormBuilder } from '@angular/forms';
import { Solicitud290201Store } from '../../../../estados/tramites/tramites290201.store';
import { Solicitud290201Query } from '../../../../estados/queries/tramites290201.query';


describe('DatosDelCafeComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,DatosDelCafeComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: RegistrarSolicitudService, useClass: MockRegistrarSolicitudService },
        FormBuilder,
        { provide: Solicitud290201Store, useClass: MockSolicitud290201Store },
        { provide: Solicitud290201Query, useClass: MockSolicitud290201Query }
      ]
    }).overrideComponent(DatosDelCafeComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosDelCafeComponent);
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
    component.dataCafeForm = component.dataCafeForm || {};
    component.dataCafeForm.get = jest.fn();
    const datosDelTramiteRealizar = component.datosDelTramiteRealizar;
    expect(component.dataCafeForm.get).toHaveBeenCalled();
  });

  it('should run #createForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.dataCafeState = component.dataCafeState || {};
    component.dataCafeState.envasadoen = 'envasadoen';
    component.dataCafeState.utilizoCafeComo = 'utilizoCafeComo';
    component.dataCafeState.cantidadutilizada = 'cantidadutilizada';
    component.dataCafeState.numerodepedimento = 'numerodepedimento';
    component.dataCafeState.paisdeimportacion = 'paisdeimportacion';
    component.dataCafeState.fraccionarancelaria = 'fraccionarancelaria';
    component.dataCafeState.cantidad = 'cantidad';
    component.dataCafeState.unidaddemedida = 'unidaddemedida';
    component.dataCafeState.precioapplicable = 'precioapplicable';
    component.dataCafeState.dolar = 'dolar';
    component.dataCafeState.lote = 'lote';
    component.dataCafeState.otrasmarcas = 'otrasmarcas';
    component.dataCafeState.elcafe = 'elcafe';
    component.dataCafeState.fechaexportacion = 'fechaexportacion';
    component.dataCafeState.paisdetransbordo = 'paisdetransbordo';
    component.dataCafeState.mediodetransporte = 'mediodetransporte';
    component.dataCafeState.Identificadordel = 'Identificadordel';
    component.dataCafeState.observaciones = 'observaciones';
    component.createForm();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.solicitud290201Query = component.solicitud290201Query || {};
    component.solicitud290201Query.selectSolicitud$ = observableOf({});
    component.createForm = jest.fn();
    component.ngOnInit();
    expect(component.createForm).toHaveBeenCalled();
  });

  it('should run #getEnvasadoenData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getEnvasadoenData = jest.fn().mockReturnValue(observableOf({}));
    component.envasadoenData = component.envasadoenData || {};
    component.envasadoenData.catalogos = 'catalogos';
    component.getEnvasadoenData();
    expect(component.registrarsolicitud.getEnvasadoenData).toHaveBeenCalled();
  });

  it('should run #getUtilicoCafeComoData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getUtilicoCafeComoData = jest.fn().mockReturnValue(observableOf({}));
    component.utilizoCafeComoData = component.utilizoCafeComoData || {};
    component.utilizoCafeComoData.catalogos = 'catalogos';
    component.getUtilicoCafeComoData();
    expect(component.registrarsolicitud.getUtilicoCafeComoData).toHaveBeenCalled();
  });

  it('should run #getPaisDeImportacionData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getPaisDeImportacionData = jest.fn().mockReturnValue(observableOf({}));
    component.paisdeimportacionData = component.paisdeimportacionData || {};
    component.paisdeimportacionData.catalogos = 'catalogos';
    component.getPaisDeImportacionData();
    expect(component.registrarsolicitud.getPaisDeImportacionData).toHaveBeenCalled();
  });

  it('should run #getFraccionArancelariaData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getFraccionArancelariaData = jest.fn().mockReturnValue(observableOf({}));
    component.fraccionarancelariaData = component.fraccionarancelariaData || {};
    component.fraccionarancelariaData.catalogos = 'catalogos';
    component.getFraccionArancelariaData();
    expect(component.registrarsolicitud.getFraccionArancelariaData).toHaveBeenCalled();
  });

  it('should run #getUnidadDeMedidaData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getUnidadDeMedidaData = jest.fn().mockReturnValue(observableOf({}));
    component.unidaddemedidaData = component.unidaddemedidaData || {};
    component.unidaddemedidaData.catalogos = 'catalogos';
    component.getUnidadDeMedidaData();
    expect(component.registrarsolicitud.getUnidadDeMedidaData).toHaveBeenCalled();
  });

  it('should run #getDollarData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getDollarData = jest.fn().mockReturnValue(observableOf({}));
    component.dolarData = component.dolarData || {};
    component.dolarData.catalogos = 'catalogos';
    component.getDollarData();
    expect(component.registrarsolicitud.getDollarData).toHaveBeenCalled();
  });

  it('should run #getElcafeData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getUtilicoCafeComoData = jest.fn().mockReturnValue(observableOf({}));
    component.elcafeData = component.elcafeData || {};
    component.elcafeData.catalogos = 'catalogos';
    component.getElcafeData();
    expect(component.registrarsolicitud.getUtilicoCafeComoData).toHaveBeenCalled();
  });

  it('should run #getPaisDeTransbordoData()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getPaisDeImportacionData = jest.fn().mockReturnValue(observableOf({}));
    component.paisdetransbordoData = component.paisdetransbordoData || {};
    component.paisdetransbordoData.catalogos = 'catalogos';
    component.getPaisDeTransbordoData();
    expect(component.registrarsolicitud.getPaisDeImportacionData).toHaveBeenCalled();
  });

  it('should run #getMediaDeTransporte()', async () => {
    component.registrarsolicitud = component.registrarsolicitud || {};
    component.registrarsolicitud.getMediaDeTransporte = jest.fn().mockReturnValue(observableOf({}));
    component.mediodetransporteData = component.mediodetransporteData || {};
    component.mediodetransporteData.catalogos = 'catalogos';
    component.getMediaDeTransporte();
    expect(component.registrarsolicitud.getMediaDeTransporte).toHaveBeenCalled();
  });

  it('should run #onSubmit()', async () => {
    component.dataCafeForm = component.dataCafeForm || {};
    component.dataCafeForm.value = 'value';
    component.envasadoenData = component.envasadoenData || {};
    component.envasadoenData.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.utilizoCafeComoData = component.utilizoCafeComoData || {};
    component.utilizoCafeComoData.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.paisdeimportacionData = component.paisdeimportacionData || {};
    component.paisdeimportacionData.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.fraccionarancelariaData = component.fraccionarancelariaData || {};
    component.fraccionarancelariaData.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.unidaddemedidaData = component.unidaddemedidaData || {};
    component.unidaddemedidaData.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.dolarData = component.dolarData || {};
    component.dolarData.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.elcafeData = component.elcafeData || {};
    component.elcafeData.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.paisdetransbordoData = component.paisdetransbordoData || {};
    component.paisdetransbordoData.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.mediodetransporteData = component.mediodetransporteData || {};
    component.mediodetransporteData.catalogos = {
      find: function() {
        return [
          {
            "id": {}
          }
        ];
      }
    };
    component.tableData = component.tableData || {};
    component.tableData.push = jest.fn();
    component.onSubmit();
    expect(component.tableData.push).toHaveBeenCalled();
  });

  it('should run #onAgregar()', async () => {

    component.onAgregar();

  });

  it('should run #onRowClick()', async () => {
    component.dataCafeForm = component.dataCafeForm || {};
    component.dataCafeForm.patchValue = jest.fn();
    component.envasadoenData = component.envasadoenData || {};
    component.envasadoenData.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.utilizoCafeComoData = component.utilizoCafeComoData || {};
    component.utilizoCafeComoData.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.paisdeimportacionData = component.paisdeimportacionData || {};
    component.paisdeimportacionData.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.fraccionarancelariaData = component.fraccionarancelariaData || {};
    component.fraccionarancelariaData.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.unidaddemedidaData = component.unidaddemedidaData || {};
    component.unidaddemedidaData.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.dolarData = component.dolarData || {};
    component.dolarData.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.elcafeData = component.elcafeData || {};
    component.elcafeData.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.paisdetransbordoData = component.paisdetransbordoData || {};
    component.paisdetransbordoData.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.mediodetransporteData = component.mediodetransporteData || {};
    component.mediodetransporteData.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.onRowClick({
      datosDelTramiteRealizar: {
        envasadoen: {},
        utilizoCafeComo: {},
        paisdeimportacion: {},
        fraccionarancelaria: {},
        unidaddemedida: {},
        dolar: {},
        elcafe: {},
        paisdetransbordo: {},
        mediodetransporte: {}
      }
    });
    expect(component.dataCafeForm.patchValue).toHaveBeenCalled();
  });

  it('should run #onCheckboxClick()', async () => {
    component.selectedRows = component.selectedRows || {};
    component.selectedRows.has = jest.fn();
    component.selectedRows.delete = jest.fn();
    component.selectedRows.add = jest.fn();
    component.onCheckboxClick({
      stopPropagation: function() {}
    }, {});
    expect(component.selectedRows.has).toHaveBeenCalled();
    expect(component.selectedRows.delete).toHaveBeenCalled();
    expect(component.selectedRows.add).toHaveBeenCalled();
  });

  it('should run #onDeleteSelectedRows()', async () => {
    component.tableData = component.tableData || {};
    component.tableData = ['tableData'];
    component.selectedRows = component.selectedRows || {};
    component.selectedRows.has = jest.fn();
    component.selectedRows.clear = jest.fn();
    component.dataCafeForm = component.dataCafeForm || {};
    component.dataCafeForm.reset = jest.fn();
    component.onDeleteSelectedRows();
    expect(component.selectedRows.has).toHaveBeenCalled();
    expect(component.selectedRows.clear).toHaveBeenCalled();
    expect(component.dataCafeForm.reset).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.solicitud290201Store = component.solicitud290201Store || {};
    component.solicitud290201Store.metodoNombre = jest.fn();
    component.setValoresStore({
      get: function() {
        return {
          value: {}
        };
      }
    }, {}, {});
    expect(component.solicitud290201Store.metodoNombre).toHaveBeenCalled();
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