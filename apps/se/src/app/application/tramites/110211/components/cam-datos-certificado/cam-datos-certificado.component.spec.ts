import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { CamDatosCertificadoComponent } from './cam-datos-certificado.component';
import { FormBuilder } from '@angular/forms';
import { CamCertificadoService } from '../../services/cam-certificado.service';
import { camCertificadoStore } from '../../estados/cam-certificado.store';
import { camCertificadoQuery } from '../../estados/cam-certificado.query';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

@Injectable()
class MockCamCertificadoService {}

@Injectable()
class MockcamCertificadoStore {}

@Injectable()
class MockcamCertificadoQuery {
  formDatosCertificado$ = observableOf({});
}

describe('CamDatosCertificadoComponent', () => {
  let fixture: ComponentFixture<CamDatosCertificadoComponent>;
  let component: { ngOnDestroy: () => void; idiomOpcion: jest.Mock<any, any, any> | (() => void); entidadFederativasOpcion: jest.Mock<any, any, any> | (() => void); representacionFederalOpcion: jest.Mock<any, any, any> | (() => void); ngOnInit: () => void; store: { setFormCertificadoGenric?: any; setFormDatosCertificado?: any; setIdiomaSeleccion?: any; setEntidadFederativaSeleccion?: any; setRepresentacionFederalDatosSeleccion?: any; setFormValida?: any; }; setValoresStore: (arg0: {}) => void; camCertificadoService: { obtenerMenuDesplegable?: any; }; obtenerDatosFormulario: (arg0: {}) => void; idiomaSeleccion: (arg0: {}) => void; entidadFederativaSeleccion: (arg0: {}) => void; representacionFederalSeleccion: (arg0: {}) => void; setFormValida: (arg0: {}) => void; destroyNotifier$: { next?: any; complete?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, CamDatosCertificadoComponent ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: CamCertificadoService, useClass: MockCamCertificadoService },
        { provide: camCertificadoStore, useClass: MockcamCertificadoStore },
        { provide: camCertificadoQuery, useClass: MockcamCertificadoQuery },
        ConsultaioQuery
      ]
    }).overrideComponent(CamDatosCertificadoComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(CamDatosCertificadoComponent);
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
    component.idiomOpcion = jest.fn();
    component.entidadFederativasOpcion = jest.fn();
    component.representacionFederalOpcion = jest.fn();
    component.ngOnInit();
    // expect(component.idiomOpcion).toHaveBeenCalled();
    // expect(component.entidadFederativasOpcion).toHaveBeenCalled();
    // expect(component.representacionFederalOpcion).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.store = component.store || {};
    component.store.setFormCertificadoGenric = jest.fn();
    component.setValoresStore({});
    // expect(component.store.setFormCertificadoGenric).toHaveBeenCalled();
  });

  it('should run #idiomOpcion()', async () => {
    component.camCertificadoService = component.camCertificadoService || {};
    component.camCertificadoService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.idiomOpcion();
    // expect(component.camCertificadoService.obtenerMenuDesplegable).toHaveBeenCalled();
  });

  it('should run #entidadFederativasOpcion()', async () => {
    component.camCertificadoService = component.camCertificadoService || {};
    component.camCertificadoService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.entidadFederativasOpcion();
    // expect(component.camCertificadoService.obtenerMenuDesplegable).toHaveBeenCalled();
  });

  it('should run #representacionFederalOpcion()', async () => {
    component.camCertificadoService = component.camCertificadoService || {};
    component.camCertificadoService.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.representacionFederalOpcion();
    // expect(component.camCertificadoService.obtenerMenuDesplegable).toHaveBeenCalled();
  });

  it('should run #obtenerDatosFormulario()', async () => {
    component.store = component.store || {};
    component.store.setFormDatosCertificado = jest.fn();
    component.obtenerDatosFormulario({});
    // expect(component.store.setFormDatosCertificado).toHaveBeenCalled();
  });

  it('should run #idiomaSeleccion()', async () => {
    component.store = component.store || {};
    component.store.setIdiomaSeleccion = jest.fn();
    component.idiomaSeleccion({});
    // expect(component.store.setIdiomaSeleccion).toHaveBeenCalled();
  });

  it('should run #entidadFederativaSeleccion()', async () => {
    component.store = component.store || {};
    component.store.setEntidadFederativaSeleccion = jest.fn();
    component.entidadFederativaSeleccion({});
    // expect(component.store.setEntidadFederativaSeleccion).toHaveBeenCalled();
  });

  it('should run #representacionFederalSeleccion()', async () => {
    component.store = component.store || {};
    component.store.setRepresentacionFederalDatosSeleccion = jest.fn();
    component.representacionFederalSeleccion({});
    // expect(component.store.setRepresentacionFederalDatosSeleccion).toHaveBeenCalled();
  });

  it('should run #setFormValida()', async () => {
    component.store = component.store || {};
    component.store.setFormValida = jest.fn();
    component.setFormValida({});
    // expect(component.store.setFormValida).toHaveBeenCalled();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
    // expect(component.destroyNotifier$.next).toHaveBeenCalled();
    // expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

});