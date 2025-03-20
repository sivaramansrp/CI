// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { Component } from '@angular/core';
import { CertificadoOrigenComponent } from './certificado-origen.component';
import { FormBuilder } from '@angular/forms';
import { Tramite110204Store } from '../../estados/tramite110204.store';
import { Tramite110204Query } from '../../estados/tramite110204.query';
import { CertificadosOrigenGridService } from '../../services/certificadosOrigenGrid.service';
import { ToastrService } from 'ngx-toastr';
import { SeccionLibQuery, SeccionLibStore } from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Injectable()
class MockTramite110204Store {}

@Injectable()
class MockTramite110204Query {
  formCertificado$ = observableOf({});
  selectAltaPlanta$ = {};
  selectPaisBloque$ = {};
  selectBuscarMercancia$ = {};
}

describe('CertificadoOrigenComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,HttpClientTestingModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        ToastrService,
                provideToastr({
                  positionClass: 'toast-top-right',
                }),
        FormBuilder,
        CertificadosOrigenGridService,
        { provide: Tramite110204Store, useClass: MockTramite110204Store },
        { provide: Tramite110204Query, useClass: MockTramite110204Query },
        SeccionLibQuery,
        SeccionLibStore
      ]
    }).overrideComponent(CertificadoOrigenComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(CertificadoOrigenComponent);
    component = fixture.debugElement.componentInstance;
  });


  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.cargarEstados = jest.fn();
    component.cargarBloque = jest.fn();
    component.formCertificado = component.formCertificado || {};
    component.formCertificado.valueChanges = observableOf({});
    component.store = component.store || {};
    component.store.setFormCertificado = jest.fn();
    component.ngOnInit();
    expect(component.cargarEstados).toHaveBeenCalled();
    expect(component.cargarBloque).toHaveBeenCalled();
    expect(component.store.setFormCertificado).toHaveBeenCalled();
  });

  it('should run #cargarEstados()', async () => {
    component.certificadoService = component.certificadoService || {};
    component.certificadoService.obtenerListaEstado = jest.fn().mockReturnValue(observableOf({}));
    component.store = component.store || {};
    component.store.setaltaPlanta = jest.fn();
    component.cargarEstados();
    expect(component.certificadoService.obtenerListaEstado).toHaveBeenCalled();
  });


  it('should run #tipoEstadoSeleccion()', async () => {
    component.store = component.store || {};
    component.store.setEstado = jest.fn();
    component.tipoEstadoSeleccion({});
    expect(component.store.setEstado).toHaveBeenCalled();
  });

  it('should run #tipoSeleccion()', async () => {
    component.store = component.store || {};
    component.store.setBloque = jest.fn();
    component.tipoSeleccion({});
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

  it('should run #buscarrMercancia()', async () => {
    component.formCertificado = component.formCertificado || {};
    component.formCertificado.value = 'value';
    component.certificadoService = component.certificadoService || {};
    component.certificadoService.obtenerMercancia = jest.fn().mockReturnValue(observableOf({}));
    component.store = component.store || {};
    component.store.setbuscarMercancia = jest.fn();
    component.toastr = component.toastr || {};
    component.toastr.error = jest.fn();
    component.buscarrMercancia();
    expect(component.certificadoService.obtenerMercancia).toHaveBeenCalled();
    expect(component.store.setbuscarMercancia).toHaveBeenCalled();
  });

  it('should run #cambioFechaInicio()', async () => {
    component.formCertificado = component.formCertificado || {};
    component.formCertificado.get = jest.fn().mockReturnValue({
      markAsUntouched: function() {},
      setValue: function() {}
    });
    component.cambioFechaInicio({});
    expect(component.formCertificado.get).toHaveBeenCalled();
  });

  it('should run #cambioFechaFinal()', async () => {
    component.formCertificado = component.formCertificado || {};
    component.formCertificado.get = jest.fn().mockReturnValue({
      markAsUntouched: function() {},
      setValue: function() {}
    });
    component.cambioFechaFinal({});
    expect(component.formCertificado.get).toHaveBeenCalled();
  });

});