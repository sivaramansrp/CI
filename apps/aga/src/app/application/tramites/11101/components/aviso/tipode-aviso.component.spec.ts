// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { TipodeAvisoComponent } from './tipode-aviso.component';
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { FormBuilder } from '@angular/forms';
import { Tramite11101Query } from '../../estados/tramite11101.query';
import { TramiteFolioService } from '../../service/servicios-extraordinarios.service';
import { Tramite11101Store } from '../../estados/tramite11101.store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

@Injectable()
class MockTramite11101Query {}

@Injectable()
class MockTramiteFolioService {}

@Injectable()
class MockTramite11101Store {}

describe('TipodeAvisoComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, TipodeAvisoComponent, HttpClientTestingModule, CommonModule ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        ConsultaioQuery,
        FormBuilder,
        { provide: Tramite11101Query, useClass: MockTramite11101Query },
        { provide: TramiteFolioService, useClass: MockTramiteFolioService },
        { provide: Tramite11101Store, useClass: MockTramite11101Store }
      ]
    }).compileComponents();
    
    fixture = TestBed.createComponent(TipodeAvisoComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #ngOnInit()', async () => {
    component.query = component.query || {};
    component.query.selectSeccionState$ = observableOf({});
    component.donanteDomicilio = jest.fn();
    component.ngOnInit();
    expect(component.donanteDomicilio).toHaveBeenCalled();
  });

  it('should run #donanteDomicilio()', async () => {
    component.formBuilder = component.formBuilder || {};
    component.formBuilder.group = jest.fn();
    component.solicitudState = {
      numeroderegistro: 'numeroderegistro',
      NobmreDenominationRazonSocial: 'NobmreDenominationRazonSocial',
      rfctaxid: 'rfctaxid',
      Telefono: 'Telefono',
      correoelectronico: 'correoelectronico',
      entidadadfederativa: 'entidadadfederativa',
      alcadilamunicipio: 'alcadilamunicipio',
      colonia: 'colonia',
      codigopostal: 'codigopostal',
      calle: 'calle',
      numeroletraexterior: 'numeroletraexterior',
      numeroletrainterior: 'numeroletrainterior',
      entrecalle: 'entrecalle',
      ycalle: 'ycalle'
    };
    component.inicializarEstadoFormulario = jest.fn();
    component.donanteDomicilio();
    expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
  });

  it('should run #guardarDatosDelFormulario()', async () => {
    component.avisoForm = {
      disable: jest.fn(),
      enable: jest.fn()
    };
    component.guardarDatosDelFormulario();
  });

  it('should run #setManual()', async () => {
    component.setManual({});
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = {
      next: jest.fn(),
      complete: jest.fn()
    };
    component.ngOnDestroy();
    expect(component.destroyNotifier$.next).toHaveBeenCalled();
    expect(component.destroyNotifier$.complete).toHaveBeenCalled();
  });

  describe('#inicializarEstadoFormulario', () => {
    it('should call guardarDatosDelFormulario when esFormularioSoloLectura is true', () => {
      component.esFormularioSoloLectura = true;
      component.guardarDatosDelFormulario = jest.fn();
      component.datosDeAvisoForm = jest.fn();

      component.inicializarEstadoFormulario();

      expect(component.guardarDatosDelFormulario).toHaveBeenCalled();
      expect(component.datosDeAvisoForm).not.toHaveBeenCalled();
    });

    it('should call datosDeAvisoForm when esFormularioSoloLectura is false', () => {
      component.esFormularioSoloLectura = false;
      component.guardarDatosDelFormulario = jest.fn();
      component.datosDeAvisoForm = jest.fn();

      component.inicializarEstadoFormulario();

      expect(component.datosDeAvisoForm).toHaveBeenCalled();
      expect(component.guardarDatosDelFormulario).not.toHaveBeenCalled();
    });

    describe('#guardarDatosDelFormulario', () => {
      it('should disable the form when esFormularioSoloLectura is true', () => {
        component.esFormularioSoloLectura = true;
        component.avisoForm = {
          disable: jest.fn(),
          enable: jest.fn()
        };

        component.guardarDatosDelFormulario();

        expect(component.avisoForm.disable).toHaveBeenCalled();
        expect(component.avisoForm.enable).not.toHaveBeenCalled();
      });

      it('should enable the form when esFormularioSoloLectura is false', () => {
        component.esFormularioSoloLectura = false;
        component.avisoForm = {
          disable: jest.fn(),
          enable: jest.fn()
        };

        component.guardarDatosDelFormulario();

        expect(component.avisoForm.enable).toHaveBeenCalled();
        expect(component.avisoForm.disable).not.toHaveBeenCalled();
      });

      describe('#datosDeAvisoForm', () => {
        let formGroupMock: any;

        beforeEach(() => {
          formGroupMock = {
            get: jest.fn(() => ({
              disable: jest.fn()
            }))
          };
          component.avisoForm = formGroupMock;
        });

        it('should disable all controls when esFormularioSoloLectura is true and avisoForm exists', () => {
          component.esFormularioSoloLectura = true;

          component.datosDeAvisoForm();

          [
            'numeroderegistro',
            'NobmreDenominationRazonSocial',
            'Telefono',
            'correoelectronico',
            'entidadadfederativa',
            'alcadilamunicipio',
            'colonia',
            'codigopostal',
            'calle',
            'numeroletraexterior',
            'numeroletrainterior',
            'entrecalle',
            'ycalle'
          ].forEach(field => {
            expect(formGroupMock.get).toHaveBeenCalledWith(field);
          });
        });

        it('should not disable controls if esFormularioSoloLectura is false', () => {
          component.esFormularioSoloLectura = false;
          component.datosDeAvisoForm();
          expect(formGroupMock.get).not.toHaveBeenCalled();
        });

        it('should not throw if avisoForm is undefined', () => {
          component.esFormularioSoloLectura = true;
          component.avisoForm = undefined;
          expect(() => component.datosDeAvisoForm()).not.toThrow();
        });
      });
    });
  });
});
