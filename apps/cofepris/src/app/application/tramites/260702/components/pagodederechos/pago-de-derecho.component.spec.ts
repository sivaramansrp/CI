// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component, ChangeDetectorRef } from '@angular/core';
import { PagoDeDerechoComponent } from './pago-de-derecho.component';
import { RegistrarSolicitudMcpService } from '../../services/registrar-solicitud-mcp.service';
import { FormBuilder } from '@angular/forms';
import { Solicitud260702Store } from '../../estados/tramites260702.store';
import { Solicitud260702Query } from '../../estados/tramites260702.query';

class MockRegistrarSolicitudMcpService {
  getBancoData() {
    return observableOf([]); // Mocked response for getBancoData
  }

  getTramitesAsociados() {
    return observableOf([]); // Mocked response for getTramitesAsociados
  }
}
class MockSolicitud260702Store {
  metodoNombre() {
    return jest.fn();
  }
}

class MockSolicitud260702Query {
  selectSolicitud$ = observableOf({});
}
describe('PagoDeDerechoComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,PagoDeDerechoComponent ],
    
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: RegistrarSolicitudMcpService, useClass: MockRegistrarSolicitudMcpService },
        FormBuilder,
        ChangeDetectorRef,
        { provide: Solicitud260702Store, useClass: MockSolicitud260702Store },
        { provide: Solicitud260702Query, useClass: MockSolicitud260702Query }
      ]
    }).overrideComponent(PagoDeDerechoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PagoDeDerechoComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
   
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
    component.solicitud260702Query = component.solicitud260702Query || {};
    component.solicitud260702Query.selectSolicitud$ = observableOf({});
    component.createForm = jest.fn();
    component.getBancoData = jest.fn();
    component.ngOnInit();
    expect(component.createForm).toHaveBeenCalled();
    expect(component.getBancoData).toHaveBeenCalled();
  });

  it('should run #getBancoData()', async () => {
    component.registrarsolicitudmcp = component.registrarsolicitudmcp || {};
    component.registrarsolicitudmcp.getBancoData = jest.fn().mockReturnValue(observableOf({}));
    component.bancoData = component.bancoData || {};
    component.bancoData.catalogos = 'catalogos';
    component.getBancoData();
    expect(component.registrarsolicitudmcp.getBancoData).toHaveBeenCalled();
  });

  it('should run #createForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.pagoDeDerechosState = component.pagoDeDerechosState || {};
    component.pagoDeDerechosState.clavedereferencia = 'clavedereferencia';
    component.pagoDeDerechosState.cadenadeladependencia = 'cadenadeladependencia';
    component.pagoDeDerechosState.banco = 'banco';
    component.pagoDeDerechosState.llavedepago = 'llavedepago';
    component.pagoDeDerechosState.fechadepago = 'fechadepago';
    component.pagoDeDerechosState.importedepago = 'importedepago';
    component.createForm();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #clearForm()', async () => {
    component.pagoDeDerechosForm = component.pagoDeDerechosForm || {};
    component.pagoDeDerechosForm.reset = jest.fn();
    component.clearForm();
    expect(component.pagoDeDerechosForm.reset).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.solicitud260702Store = component.solicitud260702Store || {};
    component.solicitud260702Store['metodoNombre'] = jest.fn(); // Mock metodoNombre as a function
  
    const mockForm = {
      get: jest.fn().mockReturnValue({ value: 'mockValue' }), // Mock form.get(campo)?.value
    };
  
    component.setValoresStore(mockForm, 'campo', 'metodoNombre');
    expect(component.solicitud260702Store['metodoNombre']).toHaveBeenCalledWith('mockValue');
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