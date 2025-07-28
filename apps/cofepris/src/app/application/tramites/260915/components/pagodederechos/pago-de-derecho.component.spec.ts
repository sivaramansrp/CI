import {  ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component, ChangeDetectorRef } from '@angular/core';
import { PagoDeDerechoComponent } from './pago-de-derecho.component';
import { PermisoSanitarioDispositivosMedicosService } from '../../services/permiso-sanitario-dispositivos-medicos.service';
import { FormBuilder } from '@angular/forms';
import { Solicitud260915Store } from '../../estados/tramites260915.store';
import { Solicitud260915Query } from '../../estados/tramites260915.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

@Injectable()
class MockPermisoSanitarioDispositivosMedicosService {}

@Injectable()
class MockSolicitud260915Store {}

@Injectable()
class MockSolicitud260915Query {}


describe('PagoDeDerechoComponent', () => {
  let fixture: ComponentFixture<PagoDeDerechoComponent>;
  let component: {
    esFormularioSoloLectura: boolean; ngOnDestroy: () => void; pagoDeDerechosForm: { get?: any; disable?: any; enable?: any; reset?: any; }; pagoDeDerechos: { get?: any; }; solicitud260915Query: { selectSolicitud260915$?: any; }; inicializarEstadoFormulario: jest.Mock<any, any, any> | (() => void); getBancoData: jest.Mock<any, any, any> | (() => void); ngOnInit: () => void; guardarDatosFormulario: jest.Mock<any, any, any> | (() => void); crearFormulario: jest.Mock<any, any, any> | (() => void); permisosanitariodisposivos: { getBancoData?: any; }; bancoData: { catalogos?: any; }; fb: { group?: any; }; pagoDeDerechosState: { clavedereferencia?: any; cadenadeladependencia?: any; banco?: any; llavedepago?: any; fechadepago?: any; importedepago?: any; }; solicitud260915Store: {
    setFechadePago: jest.Mock<any, any, any>; getValue?: any; setTramite260915State?: any; 
}; seleccionarFechaInicio: (arg0: {}) => void; clearForm: () => void; setValoresStore: (arg0: { get: () => { value: {}; }; }, arg1: {}) => void; destroyed$: { next?: any; complete?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,PagoDeDerechoComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: PermisoSanitarioDispositivosMedicosService, useClass: MockPermisoSanitarioDispositivosMedicosService },
        FormBuilder,
        ChangeDetectorRef,
        { provide: Solicitud260915Store, useClass: MockSolicitud260915Store },
        { provide: Solicitud260915Query, useClass: MockSolicitud260915Query },
        ConsultaioQuery
      ]
    }).overrideComponent(PagoDeDerechoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PagoDeDerechoComponent);
    component = fixture.debugElement.componentInstance;
    const fb = TestBed.inject(FormBuilder);
  component.fb = fb; 
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #pagoDeDerechos', async () => {
    component.pagoDeDerechosForm = component.pagoDeDerechosForm || {};
    component.pagoDeDerechosForm.get = jest.fn();
    const pagoDeDerechos = component.pagoDeDerechos;
     expect(component.pagoDeDerechosForm.get).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.solicitud260915Query = component.solicitud260915Query || {};
    component.solicitud260915Query.selectSolicitud260915$ = observableOf({});
    component.inicializarEstadoFormulario = jest.fn();
    component.getBancoData = jest.fn();
    component.ngOnInit();
     expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
     expect(component.getBancoData).toHaveBeenCalled();
  });

  it('should run #inicializarEstadoFormulario()', async () => {
    component.guardarDatosFormulario = jest.fn();
    component.crearFormulario = jest.fn();
  
    component.esFormularioSoloLectura = true;
    component.inicializarEstadoFormulario();
  
    expect(component.guardarDatosFormulario).toHaveBeenCalled();
    expect(component.crearFormulario).not.toHaveBeenCalled();
  
    jest.clearAllMocks();
  
    component.esFormularioSoloLectura = false;
    component.inicializarEstadoFormulario();
      expect(component.crearFormulario).toHaveBeenCalled();
    expect(component.guardarDatosFormulario).not.toHaveBeenCalled();
  });

  it('should run #guardarDatosFormulario()', async () => {
    component.crearFormulario = jest.fn();
  
    component.pagoDeDerechosForm = component.fb.group({
      pagoDeDerechos: component.fb.group({
        banco: ['Banco1'],
        clavedereferencia: [''],
        cadenadeladependencia: [''],
        llavedepago: [''],
        fechadepago: [''],
        importedepago: [''],
      }),
    });
  
    const disableSpy = jest.spyOn(component.pagoDeDerechosForm, 'disable');
    const enableSpy = jest.spyOn(component.pagoDeDerechosForm, 'enable');
  
    component.esFormularioSoloLectura = true;
    component.guardarDatosFormulario();
  
    expect(component.crearFormulario).toHaveBeenCalled();
  
    expect(disableSpy).toHaveBeenCalled();
  
    component.esFormularioSoloLectura = false;
    component.guardarDatosFormulario();
  
    expect(enableSpy).toHaveBeenCalled();
  });

  it('should run #getBancoData()', async () => {
    component.permisosanitariodisposivos = component.permisosanitariodisposivos || {};
    component.permisosanitariodisposivos.getBancoData = jest.fn().mockReturnValue(observableOf({}));
    component.bancoData = component.bancoData || {};
    component.bancoData.catalogos = 'catalogos';
    component.getBancoData();
     expect(component.permisosanitariodisposivos.getBancoData).toHaveBeenCalled();
  });

  it('should run #crearFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.pagoDeDerechosState = component.pagoDeDerechosState || {};
    component.pagoDeDerechosState.clavedereferencia = 'clavedereferencia';
    component.pagoDeDerechosState.cadenadeladependencia = 'cadenadeladependencia';
    component.pagoDeDerechosState.banco = 'banco';
    component.pagoDeDerechosState.llavedepago = 'llavedepago';
    component.pagoDeDerechosState.fechadepago = 'fechadepago';
    component.pagoDeDerechosState.importedepago = 'importedepago';
    component.crearFormulario();
     expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #seleccionarFechaInicio()', async () => {
    component.solicitud260915Store = component.solicitud260915Store || {};
    component.solicitud260915Store.getValue = jest.fn().mockReturnValue({
      fechadepago: {}
    });
    component.seleccionarFechaInicio({});
     expect(component.solicitud260915Store.getValue).toHaveBeenCalled();
  });

  it('should run #clearForm()', async () => {
    component.pagoDeDerechosForm = component.fb.group({
      pagoDeDerechos: component.fb.group({
        banco: ['Banco1'], 
        clavedereferencia: [''],
        cadenadeladependencia: [''],
        llavedepago: [''],
        fechadepago: [''],
        importedepago: [''],
      }),
    });
  
    
    const resetSpy = jest.spyOn(component.pagoDeDerechosForm, 'reset');
    const setValueSpy = jest.spyOn(component.pagoDeDerechos.get('banco')!, 'setValue');
  
    component.clearForm();
  
    expect(resetSpy).toHaveBeenCalled();
  
    expect(setValueSpy).toHaveBeenCalledWith('Banco1');
  });
  

  it('should run #setValoresStore()', async () => {
    component.solicitud260915Store = component.solicitud260915Store || {};
    component.solicitud260915Store.setTramite260915State = jest.fn();
    component.setValoresStore({
      get: function() {
        return {
          value: {}
        };
      }
    }, {});
     expect(component.solicitud260915Store.setTramite260915State).toHaveBeenCalled();
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