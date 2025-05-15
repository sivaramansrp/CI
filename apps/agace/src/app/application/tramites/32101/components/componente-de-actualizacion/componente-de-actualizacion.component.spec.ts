// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { ComponenteDeActualizacionComponent } from './componente-de-actualizacion.component';
import { FormBuilder } from '@angular/forms';
import { ConsultaAvisoAcreditacionService } from '../../services/consulta-aviso-acreditacion.service';
import { Tramite32101Store } from '../../../../estados/tramites/tramite32101.store';
import { Tramite32101Query } from '../../../../estados/queries/tramite32101.query';

@Injectable()
class MockConsultaAvisoAcreditacionService {}

@Injectable()
class MockTramite32101Store {}

@Injectable()
class MockTramite32101Query {}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

describe('ComponenteDeActualizacionComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        ComponenteDeActualizacionComponent, FormsModule, ReactiveFormsModule ],
      declarations: [
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: ConsultaAvisoAcreditacionService, useClass: MockConsultaAvisoAcreditacionService },
        { provide: Tramite32101Store, useClass: MockTramite32101Store },
        { provide: Tramite32101Query, useClass: MockTramite32101Query }
      ]
    }).overrideComponent(ComponenteDeActualizacionComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ComponenteDeActualizacionComponent);
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
    component.tramite32101Query = component.tramite32101Query || {};
    component.tramite32101Query.selectSolicitud$ = observableOf({});
    component.initForm = jest.fn();
    component.fetchListaDeDocumentos = jest.fn();
    component.fetchListaDeInversion = jest.fn();
    component.ngOnInit();
  });

  it('should run #initForm()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.solicitudState = component.solicitudState || {};
    component.solicitudState.abc = {
      descripcionGeneral: {},
      valorEnPesos: {}
    };
    component.initForm();
  });

  it('should run #fetchListaDeDocumentos()', async () => {
    component.consultaAvisoAcreditacionService = component.consultaAvisoAcreditacionService || {};
    component.consultaAvisoAcreditacionService.getListaDeDocumentos = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.tramiteList = component.tramiteList || {};
    component.tramiteList.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.solicitudState = component.solicitudState || {};
    component.solicitudState.abc = {
      tipoDeInversion: {}
    };
    component.modificarFormulario = component.modificarFormulario || {};
    component.modificarFormulario.patchValue = jest.fn();
    component.fetchListaDeDocumentos();
  });

  it('should run #fetchListaDeInversion()', async () => {
    component.consultaAvisoAcreditacionService = component.consultaAvisoAcreditacionService || {};
    component.consultaAvisoAcreditacionService.getListaDeDocumentos = jest.fn().mockReturnValue(observableOf({
      data: {}
    }));
    component.aduana = component.aduana || {};
    component.aduana.catalogos = {
      find: function() {
        return [
          {
            "descripcion": {}
          }
        ];
      }
    };
    component.solicitudState = component.solicitudState || {};
    component.solicitudState.abc = {
      formaAdquisicion: {}
    };
    component.modificarFormulario = component.modificarFormulario || {};
    component.modificarFormulario.patchValue = jest.fn();
    component.fetchListaDeInversion();
  });

});