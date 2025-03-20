// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { FormBuilder } from '@angular/forms';
import { CatalogosService } from '@ng-mf/data-access-user';
import { ExportaccionAcuicolaService } from '../../services/exportaccion-acuicola.service';
import { HttpClientModule } from '@angular/common/http';
import { Tramite220403Query } from '../../estados/tramite220403.query';
import { Tramite220403Store } from '../../estados/tramite220403.store';

@Injectable()
class MockExportaccionAcuicolaService {}

@Injectable()
class MockTramite220403Query {}

@Injectable()
class MockTramite220403Store {}


describe('PagoDeDerechosComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientModule ],
      declarations: [
        PagoDeDerechosComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        CatalogosService,
        { provide: ExportaccionAcuicolaService, useClass: MockExportaccionAcuicolaService },
        { provide: Tramite220403Query, useClass: MockTramite220403Query },
        { provide: Tramite220403Store, useClass: MockTramite220403Store }
      ]
    }).overrideComponent(PagoDeDerechosComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(PagoDeDerechosComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run #crearFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.crearFormulario();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.configuracion = component.configuracion || {};
    component.configuracion = ['configuracion'];
    component.inicializarFormGroup = jest.fn();
    component.tramite220403Query = component.tramite220403Query || {};
    component.tramite220403Query.setPagoDerechos$ = observableOf({});
    component.formulario = component.formulario || {};
    component.formulario.get = jest.fn().mockReturnValue({
      patchValue: function() {}
    });
    component.ngOnInit();
    // expect(component.inicializarFormGroup).toHaveBeenCalled();
    // expect(component.formulario.get).toHaveBeenCalled();
  });


  it('should run #getRadioData()', async () => {
    component.exportaccionAcuicolaServcios = component.exportaccionAcuicolaServcios || {};
    component.exportaccionAcuicolaServcios.getDatos = jest.fn().mockReturnValue(observableOf({}));
    component.getRadioData({}, {});
    // expect(component.exportaccionAcuicolaServcios.getDatos).toHaveBeenCalled();
  });

  it('should run #obtenerValoresCatalogo()', async () => {
    component.catalogosServicios = component.catalogosServicios || {};
    component.catalogosServicios.getCatalogo = jest.fn().mockReturnValue(observableOf({}));
    component.configuracion = component.configuracion || {};
    component.configuracion.indiceGrupo = {
      menu: {
        indiceMenu: {
          props: {
            catalogos: {}
          }
        }
      }
    };
    component.obtenerValoresCatalogo({}, {}, {});
    // expect(component.catalogosServicios.getCatalogo).toHaveBeenCalled();
  });

  it('should run #fechaCambiado()', async () => {

    component.fechaCambiado({});

  });

  it('should run #seleccionCatalogo()', async () => {
    component.formulario = component.formulario || {};
    component.formulario.get = jest.fn().mockReturnValue({
      setValue: function() {}
    });
    component.seleccionCatalogo({}, {});
    // expect(component.formulario.get).toHaveBeenCalled();
  });



  it('should run #onSubmit()', async () => {
    component.tramite220403store = component.tramite220403store || {};
    component.tramite220403store.setDatosRealizer = jest.fn();
    component.formulario = component.formulario || {};
    component.formulario.value = {
      datosRealizer: {}
    };
    component.onSubmit();
    // expect(component.tramite220403store.setDatosRealizer).toHaveBeenCalled();
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