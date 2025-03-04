import { HttpClient } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { Injectable } from '@angular/core';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { of as observableOf } from 'rxjs';

import { Anexo1Component } from './anexo-1.component';
import { PermisoImmexDatosService } from '../../servicios/immex/permiso-immex-datos.service';
import { NicoService } from '../../servicios/nico/nico.service';


@Injectable()
class MockHttpClient {
  post() {};
}


describe('Anexo1Component', () => {
  let fixture: ComponentFixture<Anexo1Component>;
  let component: { ngOnDestroy: () => void; fb: { group?: any; }; fetchData: jest.Mock<any, any, any> | (() => void); obtenerListasDesplegables: jest.Mock<any, any, any> | (() => void); disableFormControls: jest.Mock<any, any, any> | (() => void); ngOnInit: () => void; permisoImmexDatosService: { getDatos?: any; }; permisoImmexDatos: { [x: string]: { tbodyData: { 2: {}; 3: {}; }; }; }; fraccionDatos: { [x: string]: { tbodyData: { 1: {}; 4: {}; }; }; }; immexRegistroform: { get?: any; patchValue?: any; }; obtenerIngresoSelectList: jest.Mock<any, any, any> | (() => void); nicoService: { obtenerMenuDesplegable?: any; }; showFraccionExportacion: () => void; showProductoImportacion: () => void; showCommodityImportacion: () => void; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ Anexo1Component, FormsModule, ReactiveFormsModule ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        PermisoImmexDatosService,
        { provide: HttpClient, useClass: MockHttpClient },
        NicoService
      ]
    }).overrideComponent(Anexo1Component, {

    }).compileComponents();
    fixture = TestBed.createComponent(Anexo1Component);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.fetchData = jest.fn();
    component.obtenerListasDesplegables = jest.fn();
    component.disableFormControls = jest.fn();
    component.ngOnInit();
    // expect(component.fb.group).toHaveBeenCalled();
    // expect(component.fetchData).toHaveBeenCalled();
    // expect(component.obtenerListasDesplegables).toHaveBeenCalled();
    // expect(component.disableFormControls).toHaveBeenCalled();
  });

  it('should run #fetchData()', async () => {
    component.permisoImmexDatosService = component.permisoImmexDatosService || {};
    component.permisoImmexDatosService.getDatos = jest.fn().mockReturnValue(observableOf({}));
    component.permisoImmexDatos = component.permisoImmexDatos || {};
    component.permisoImmexDatos['0'] = {
      tbodyData: {
        2: {},
        3: {}
      }
    };
    component.fraccionDatos = component.fraccionDatos || {};
    component.fraccionDatos['0'] = {
      tbodyData: {
        1: {},
        4: {}
      }
    };
    component.immexRegistroform = component.immexRegistroform || {};
    component.immexRegistroform.get = jest.fn().mockReturnValue({
      patchValue: function() {}
    });
    component.immexRegistroform.patchValue = jest.fn();
    component.fetchData();
    // expect(component.permisoImmexDatosService.getDatos).toHaveBeenCalled();
    // expect(component.immexRegistroform.get).toHaveBeenCalled();
    // expect(component.immexRegistroform.patchValue).toHaveBeenCalled();
  });

  it('should run #obtenerListasDesplegables()', async () => {
    component.obtenerIngresoSelectList = jest.fn();
    component.obtenerListasDesplegables();
    // expect(component.obtenerIngresoSelectList).toHaveBeenCalled();
  });

  it('should run #obtenerIngresoSelectList()', async () => {
    component.nicoService = component.nicoService || {};
    component.nicoService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerIngresoSelectList();
    // expect(component.nicoService.obtenerMenuDesplegable).toHaveBeenCalled();
  });

  it('should run #showFraccionExportacion()', async () => {

    component.showFraccionExportacion();

  });

  it('should run #showProductoImportacion()', async () => {

    component.showProductoImportacion();

  });

  it('should run #showCommodityImportacion()', async () => {

    component.showCommodityImportacion();

  });

  it('should run #disableFormControls()', async () => {
    component.immexRegistroform = component.immexRegistroform || {};
    component.immexRegistroform.get = jest.fn().mockReturnValue({
      disable: function() {}
    });
    component.disableFormControls();
    // expect(component.immexRegistroform.get).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.immexRegistroform = component.immexRegistroform || {};
    component.immexRegistroform.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.ngOnDestroy();
    // expect(component.immexRegistroform.get).toHaveBeenCalled();
  });

});