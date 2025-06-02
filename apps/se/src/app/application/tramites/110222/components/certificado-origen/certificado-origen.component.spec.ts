// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Input, Output } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { Component } from '@angular/core';
import { CertificadoOrigenComponent } from './certificado-origen.component';
import { FormBuilder } from '@angular/forms';
import { ValidarInicialmenteCertificadoService } from '../../services/validar-inicialmente-certificado.service';
import { Tramite110222Store } from '../../estados/tramite110222.store';
import { Tramite110222Query } from '../../estados/tramite110222.query';
import { SeccionLibStore, SeccionLibQuery } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

@Injectable()
class MockValidarInicialmenteCertificadoService {}

@Injectable()
class MockTramite110222Store {}

@Injectable()
class MockTramite110222Query {
  formCertificado$ = observableOf({});
}

describe('CertificadoOrigenComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule,CommonModule ],
       declarations: [ CertificadoOrigenComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: ValidarInicialmenteCertificadoService, useClass: MockValidarInicialmenteCertificadoService },
        { provide: Tramite110222Store, useClass: MockTramite110222Store },
        { provide: Tramite110222Query, useClass: MockTramite110222Query },
        SeccionLibStore,
        SeccionLibQuery,
        ConsultaioQuery
      ]
    }).overrideComponent(CertificadoOrigenComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(CertificadoOrigenComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()',  () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()',  () => {
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});
    component.consultaQuery = component.consultaQuery || {};
    component.consultaQuery.selectConsultaioState$ = observableOf({});
    component.query = component.query || {};
    component.query.selectTramite$ = observableOf({});
    component.query.selectmercanciaTabla$ = 'selectmercanciaTabla$';
    component.estadoOpcion = jest.fn();
    component.paisOpcion = jest.fn();
    component.ngOnInit();
    expect(component.estadoOpcion).toHaveBeenCalled();
    expect(component.paisOpcion).toHaveBeenCalled();
  });

  it('should run #setValoresStore()',  () => {
    component.store = component.store || {};
    component.store.setFormCertificadoGenric = jest.fn();
    component.setValoresStore({});
    expect(component.store.setFormCertificadoGenric).toHaveBeenCalled();
  });

  it('should run #estadoOpcion()',  () => {
    component.ValidarInicialmenteCertificadoService = component.ValidarInicialmenteCertificadoService || {};
    component.ValidarInicialmenteCertificadoService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.estadoOpcion();
  });

  it('should run #paisOpcion()',  () => {
    component.ValidarInicialmenteCertificadoService = component.ValidarInicialmenteCertificadoService || {};
    component.ValidarInicialmenteCertificadoService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.paisOpcion();
  });

  it('should run #conseguirDisponiblesDatos()',  () => {
    component.ValidarInicialmenteCertificadoService = component.ValidarInicialmenteCertificadoService || {};
    component.ValidarInicialmenteCertificadoService.obtenerTablaDatos = jest.fn().mockReturnValue(observableOf({}));
    component.conseguirDisponiblesDatos();
  });

  it('should run #obtenerDatosFormulario()',  () => {
    component.store = component.store || {};
    component.store.setFormCertificado = jest.fn();
    component.obtenerDatosFormulario({});
  });

  it('should run #tipoEstadoSeleccion()',  () => {
    component.store = component.store || {};
    component.store.setEstado = jest.fn();
    component.tipoEstadoSeleccion({});
  });

  it('should run #tipoSeleccion()',  () => {
    component.store = component.store || {};
    component.store.setBloque = jest.fn();
    component.tipoSeleccion({});
  });

  it('should run #abrirModificarModal()', () => {
    component.store = component.store || {};
    component.store.setFormMercancia = jest.fn();
    component.modalInstance = component.modalInstance || {};
    component.modalInstance.show = jest.fn();
    component.abrirModificarModal({});
  });

  it('should run #cerrarModificarModal()', () => {
    component.modalInstance = component.modalInstance || {};
    component.modalInstance.hide = jest.fn();
    component.cerrarModificarModal();
    expect(component.modalInstance.hide).toHaveBeenCalled();
  });

  it('should run #setFormValida()', () => {
    component.store = component.store || {};
    component.store.setFormValida = jest.fn();
    component.setFormValida({});
    expect(component.store.setFormValida).toHaveBeenCalled();
  });

  it('should run #guardarClicado()',  () => {

    component.guardarClicado({});

  });

  it('should run #ngOnDestroy()',  () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
  });

});