// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { ToastrModule, provideToastr } from 'ngx-toastr';
import { Component } from '@angular/core';
import { DatosCertificadoComponent } from './datos-certificado.component';
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
  formDatosCertificado$ = observableOf({});
  selectAltaPlanta$ = {};
  selectPaisBloque$ = {};
  selectBuscarMercancia$ = {};
}


describe('DatosCertificadoComponent', () => {
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
    }).overrideComponent(DatosCertificadoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosCertificadoComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #formularioControl', async () => {
    component.formDatosCertificado = component.formDatosCertificado || {};
    component.formDatosCertificado.get = jest.fn();
    const formularioControl = component.formularioControl;
    expect(component.formDatosCertificado.get).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.cargarIdioma = jest.fn();
    component.cargarEntidadFederativa = jest.fn();
    component.formDatosCertificado = component.formDatosCertificado || {};
    component.formDatosCertificado.valueChanges = observableOf({});
    component.store = component.store || {};
    component.store.setFormDatosCertificado = jest.fn();
    component.cargarRepresentacionFederal = jest.fn();
    component.ngOnInit();
    expect(component.cargarIdioma).toHaveBeenCalled();
    expect(component.cargarEntidadFederativa).toHaveBeenCalled();
    expect(component.store.setFormDatosCertificado).toHaveBeenCalled();
    expect(component.cargarRepresentacionFederal).toHaveBeenCalled();
  });

  it('should run #idiomaSeleccion()', async () => {
    component.store = component.store || {};
    component.store.setIdiomaDatos = jest.fn();
    component.idiomaSeleccion({});
    expect(component.store.setIdiomaDatos).toHaveBeenCalled();
  });

  it('should run #entidadFederativaSeleccion()', async () => {
    component.store = component.store || {};
    component.store.setEntidadFederativaDatos = jest.fn();
    component.entidadFederativaSeleccion({});
    expect(component.store.setEntidadFederativaDatos).toHaveBeenCalled();
  });

  it('should run #representacionFederalSeleccion()', async () => {
    component.store = component.store || {};
    component.store.setRepresentacionFederalDatos = jest.fn();
    component.representacionFederalSeleccion({});
    expect(component.store.setRepresentacionFederalDatos).toHaveBeenCalled();
  });

  it('should run #cargarIdioma()', async () => {
    component.certificadoService = component.certificadoService || {};
    component.certificadoService.obtenerIdioma = jest.fn().mockReturnValue(observableOf({}));
    component.store = component.store || {};
    component.store.setIdiomaDatos = jest.fn();
    component.cargarIdioma();
    expect(component.certificadoService.obtenerIdioma).toHaveBeenCalled();
    expect(component.store.setIdiomaDatos).toHaveBeenCalled();
  });

  it('should run #cargarRepresentacionFederal()', async () => {
    component.certificadoService = component.certificadoService || {};
    component.certificadoService.obtenerRepresentacionFederal = jest.fn().mockReturnValue(observableOf({}));
    component.store = component.store || {};
    component.store.setRepresentacionFederalDatos = jest.fn();
    component.cargarRepresentacionFederal();
    expect(component.certificadoService.obtenerRepresentacionFederal).toHaveBeenCalled();
    expect(component.store.setRepresentacionFederalDatos).toHaveBeenCalled();
  });

  it('should run #cargarEntidadFederativa()', async () => {
    component.certificadoService = component.certificadoService || {};
    component.certificadoService.obtenerEntidadFederativa = jest.fn().mockReturnValue(observableOf({}));
    component.store = component.store || {};
    component.store.setEntidadFederativaDatos = jest.fn();
    component.cargarEntidadFederativa();
    expect(component.certificadoService.obtenerEntidadFederativa).toHaveBeenCalled();
    expect(component.store.setEntidadFederativaDatos).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

});