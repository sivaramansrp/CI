// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { CertificadoOrigenComponent } from './certificado-origen.component';
import { FormBuilder } from '@angular/forms';
import { Tramite110202Store } from '../../estados/tramite110202.store';
import { Tramite110202Query } from '../../estados/tramite110202.query';
import { CertificadoValidacionService } from '../../services/certificado-validacion.service';
import { ToastrService } from 'ngx-toastr';
import { SeccionLibQuery, SeccionLibStore } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

@Injectable()
class MockTramite110202Store {}

@Injectable()
class MockTramite110202Query {
  formCertificado$ = observableOf({});
  selectAltaPlanta$ = {};
  selectPaisBloque$ = {};
  selectBuscarMercancia$ = {};
  selectmercanciaTabla$ = {};
}

@Injectable()
class MockCertificadoValidacionService {}

describe('CertificadoOrigenComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: Tramite110202Store, useClass: MockTramite110202Store },
        { provide: Tramite110202Query, useClass: MockTramite110202Query },
        { provide: CertificadoValidacionService, useClass: MockCertificadoValidacionService },
        ToastrService,
        SeccionLibQuery,
        SeccionLibStore,
        ConsultaioQuery
      ]
    }).overrideComponent(CertificadoOrigenComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(CertificadoOrigenComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #obtenerDatosFormulario()', async () => {
    component.store = component.store || {};
    component.store.setFormCertificado = jest.fn();
    component.obtenerDatosFormulario({});
    expect(component.store.setFormCertificado).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.cargarTratadoAcuerdo = jest.fn();
    component.cargarBloque = jest.fn();
    component.consultaQuery = component.consultaQuery || {};
    component.consultaQuery.selectConsultaioState$ = observableOf({});
    component.ngOnInit();
    expect(component.cargarTratadoAcuerdo).toHaveBeenCalled();
    expect(component.cargarBloque).toHaveBeenCalled();
  });

  it('should run #cargarTratadoAcuerdo()', async () => {
    component.certificadoService = component.certificadoService || {};
    component.certificadoService.obtenerListaTratadoAcuerdo = jest.fn().mockReturnValue(observableOf({}));
    component.store = component.store || {};
    component.store.setaltaPlanta = jest.fn();
    component.cargarTratadoAcuerdo();
    expect(component.certificadoService.obtenerListaTratadoAcuerdo).toHaveBeenCalled();
    expect(component.store.setaltaPlanta).toHaveBeenCalled();
  });

  it('should run #cargarBloque()', async () => {
    component.certificadoService = component.certificadoService || {};
    component.certificadoService.obtenerPaisBloque = jest.fn().mockReturnValue(observableOf({}));
    component.store = component.store || {};
    component.store.setBloque = jest.fn();
    component.cargarBloque();
    expect(component.certificadoService.obtenerPaisBloque).toHaveBeenCalled();
    expect(component.store.setBloque).toHaveBeenCalled();
  });

  it('should run #tipoEstadoSeleccion()', async () => {
    component.store = component.store || {};
    component.store.setEstado = jest.fn();
    component.tipoEstadoSeleccion({});
    expect(component.store.setEstado).toHaveBeenCalled();
  });

  it('should run #tipoSeleccion()', async () => {
    component.store = component.store || {};
    component.store.setBloqueSeleccion = jest.fn();
    component.tipoSeleccion({});
    expect(component.store.setBloqueSeleccion).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.store = component.store || {};
    component.store.setFormCertificadoGenric = jest.fn();
    component.setValoresStore({});
    expect(component.store.setFormCertificadoGenric).toHaveBeenCalled();
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
    component.certificadoService = component.certificadoService || {};
    component.certificadoService.obtenerMercancia = jest.fn().mockReturnValue(observableOf({}));
    component.store = component.store || {};
    component.store.setbuscarMercancia = jest.fn();
    component.toastr = component.toastr || {};
    component.toastr.error = jest.fn();
    component.buscarrMercancia();
    expect(component.certificadoService.obtenerMercancia).toHaveBeenCalled();
    expect(component.store.setbuscarMercancia).toHaveBeenCalled();
    expect(component.toastr.error).toHaveBeenCalled();
  });

  it('should run #abrirModificarModal()', async () => {
    component.store = component.store || {};
    component.store.setFormMercancia = jest.fn();
    component.modalInstance = component.modalInstance || {};
    component.modalInstance.show = jest.fn();
    component.abrirModificarModal({});
    expect(component.store.setFormMercancia).toHaveBeenCalled();
    expect(component.modalInstance.show).toHaveBeenCalled();
  });

  it('should run #cerrarModificarModal()', async () => {
    component.modalInstance = component.modalInstance || {};
    component.modalInstance.hide = jest.fn();
    component.cerrarModificarModal();
    expect(component.modalInstance.hide).toHaveBeenCalled();
  });

  it('should run #ngAfterViewInit()', async () => {
    component.modifyModal = component.modifyModal || {};
    component.modifyModal.nativeElement = 'nativeElement';
    component.ngAfterViewInit();

  });

  it('should run #setFormValida()', async () => {
    component.store = component.store || {};
    component.store.setFormValida = jest.fn();
    component.setFormValida({});
    expect(component.store.setFormValida).toHaveBeenCalled();
  });

});