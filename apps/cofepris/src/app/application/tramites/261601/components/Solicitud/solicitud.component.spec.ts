// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { SolicitudComponent } from './solicitud.component';
import { CorreccionInternaDeLaCofeprisService } from '../../services/correccion-interna-de-la-cofepris.service';
import { Solicitud261601Store } from '../../estados/tramites261601.store';
import { Solicitud261601Query } from '../../estados/tramites261601.query';
import { FormBuilder } from '@angular/forms';

@Injectable()
class MockCorreccionInternaDeLaCofeprisService {}

@Injectable()
class MockSolicitud261601Store {
  metodoNombre = jest.fn(); 
  setDetalledelaSolicitud = jest.fn();
  setRfc = jest.fn();
  setLegalRazonSocial = jest.fn();
  setApellidoPaterno = jest.fn();
  setApellidoMaterno = jest.fn();
}

@Injectable()
class MockSolicitud261601Query {
  selectSolicitud$ = observableOf({}); 
}


describe('SolicitudComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,SolicitudComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: CorreccionInternaDeLaCofeprisService, useClass: MockCorreccionInternaDeLaCofeprisService },
        { provide: Solicitud261601Store, useClass: MockSolicitud261601Store },
        { provide: Solicitud261601Query, useClass: MockSolicitud261601Query },
        FormBuilder
      ]
    }).overrideComponent(SolicitudComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(SolicitudComponent);
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
    component.solicitud261601Query = component.solicitud261601Query || {};
    component.solicitud261601Query.selectSolicitud$ = observableOf({});
    component.createForm = jest.fn();
    component.loadFolioDelTramite = jest.fn();
    component.ngOnInit();
    expect(component.createForm).toHaveBeenCalled();
    expect(component.loadFolioDelTramite).toHaveBeenCalled();
  });

  it('should run #createForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.solicitudState = component.solicitudState || {};
    component.solicitudState.detalledelaSolicitud = 'detalledelaSolicitud';
    component.solicitudState.rfc = 'rfc';
    component.solicitudState.legalRazonSocial = 'legalRazonSocial';
    component.solicitudState.apellidoPaterno = 'apellidoPaterno';
    component.solicitudState.apellidoMaterno = 'apellidoMaterno';
    component.createForm();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #loadFolioDelTramite()', async () => {
    component.correccionService = component.correccionService || {};
    component.correccionService.getTramitesAsociados = jest.fn().mockReturnValue(observableOf({
      length: {}
    }));
    component.loadFolioDelTramite();
    expect(component.correccionService.getTramitesAsociados).toHaveBeenCalled();
  });

  it('should run #getSolicitudData()', async () => {
    // Mock correccionService and its method
    component.correccionService = component.correccionService || {};
    component.correccionService.getSolicitudData = jest.fn().mockReturnValue(observableOf([
      {
        nombreORazónSocial: 'Test Razon Social',
        apellidoPaterno: 'Test Paterno',
        apellidoMaterno: 'Test Materno',
      },
    ]));

    // Mock solicitudForm and its methods
    component.solicitudForm = component.solicitudForm || {
      patchValue: jest.fn(),
      get: jest.fn().mockReturnValue({
        disable: jest.fn(),
      }),
    };

    // Call the method
    component.getSolicitudData();

    // Assertions
    expect(component.correccionService.getSolicitudData).toHaveBeenCalled();
    expect(component.solicitudForm.patchValue).toHaveBeenCalledWith({
      legalRazonSocial: 'Test Razon Social',
      apellidoPaterno: 'Test Paterno',
      apellidoMaterno: 'Test Materno',
    });
    expect(component.solicitudForm.get).toHaveBeenCalledWith('legalRazonSocial');
    expect(component.solicitudForm.get).toHaveBeenCalledWith('apellidoPaterno');
    expect(component.solicitudForm.get).toHaveBeenCalledWith('apellidoMaterno');
  });

  it('should run #setValoresStore()', async () => {
    // Mock solicitud261601Store and its methods
    component.solicitud261601Store = component.solicitud261601Store || new MockSolicitud261601Store();

    // Mock form with a get method
    const mockForm = {
      get: jest.fn().mockReturnValue({ value: 'Test Value' }),
    };

    // Call the method with a valid metodoNombre
    component.setValoresStore(mockForm as any, 'campo', 'setDetalledelaSolicitud');

    // Assertions
    expect(mockForm.get).toHaveBeenCalledWith('campo');
    expect(component.solicitud261601Store.setDetalledelaSolicitud).toHaveBeenCalledWith('Test Value');
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