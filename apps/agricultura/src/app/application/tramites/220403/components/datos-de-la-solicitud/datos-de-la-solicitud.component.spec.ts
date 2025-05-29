import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { FormBuilder } from '@angular/forms';
import { CatalogosService, SeccionLibStore, SeccionLibQuery } from '@ng-mf/data-access-user';
import { ExportaccionAcuicolaService } from '../../services/exportaccion-acuicola.service';
import { Tramite220403Query } from '../../estados/tramite220403.query';
import { Tramite220403Store } from '../../estados/tramite220403.store';
import { HttpClientModule } from '@angular/common/http';

@Injectable()
class MockExportaccionAcuicolaService {
  getDatos() {
    return observableOf({});
  }

  obtenerMenuDesplegable() {
    return observableOf({});
  }
}

@Injectable()
class MockTramite220403Query {}

@Injectable()
class MockTramite220403Store {}


describe('DatosDeLaSolicitudComponent', () => {
  let fixture: ComponentFixture<DatosDeLaSolicitudComponent>;
  let component: { ngOnDestroy: () => void; configuracion: string[] | { menu: { 0: { props: { radioOptions: {}; radioSelectedValue: {}; }; }; }; }[]; inicializarFormGroup: jest.Mock<any, any, any> | ((arg0: ({ inputType: {}; props: { validators: {}; campo: {}; disabled: {}; jsonDataFileName: {}; }; value: {}; } | { inputType?: undefined; props?: undefined; value?: undefined; })[], arg1: {}, arg2: {}) => void); seccionQuery: { selectSeccionState$?: any; }; tramite220403Query: { setDatosRealizar$?: any; setCombinacionRequerida$?: any; }; formulario: { get?: any; statusChanges?: any; }; tramite220403store: { setDatosRealizar?: any; setCombinacionRequerida?: any; setDatosRealizarValidada?: any; setCombinacionRequeridaValidada?: any; }; exportaccionAcuicolaServcios: { actualizarFormaValida?: any; getDatos?: any; obtenerMenuDesplegable?: any; }; seccionStore: { establecerSeccion?: any; establecerFormaValida?: any; }; ngOnInit: () => void; fb: { group?: any; control?: any; }; crearFormulario: () => void; obtenerValoresCatalogo: jest.Mock<any, any, any> | ((arg0: {}, arg1: {}, arg2: {}) => void); getRadioData: jest.Mock<any, any, any> | ((arg0: {}, arg1: {}) => void); getValidators: (arg0: {}[]) => void; fechaCambiado: (arg0: {}) => void; seleccionCatalogo: (arg0: {}, arg1: {}) => void; cambioValorRadio: (arg0: {}, arg1: {}, arg2: {}, arg3: {}) => void; destroyNotifier$: { next?: any; complete?: any; }; mostrar_colapsable: () => void; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientModule ],
      declarations: [
        DatosDeLaSolicitudComponent,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        CatalogosService,
        { provide: ExportaccionAcuicolaService, useClass: MockExportaccionAcuicolaService },
        { provide: Tramite220403Query, useClass: MockTramite220403Query },
        { provide: Tramite220403Store, useClass: MockTramite220403Store },
        SeccionLibStore,
        SeccionLibQuery
      ]
    }).overrideComponent(DatosDeLaSolicitudComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
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
    component.configuracion = component.configuracion || {};
    component.configuracion = ['configuracion'];
    component.inicializarFormGroup = jest.fn();
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});
    component.tramite220403Query = component.tramite220403Query || {};
    component.tramite220403Query.setDatosRealizar$ = observableOf({});
    component.tramite220403Query.setCombinacionRequerida$ = observableOf({});
    component.formulario = component.formulario || {};
    component.formulario.get = jest.fn().mockReturnValue({
      valid: {},
      value: {},
      patchValue: function() {}
    });
    component.formulario.statusChanges = observableOf({});
    component.tramite220403store = component.tramite220403store || {};
    component.tramite220403store.setDatosRealizar = jest.fn();
    component.tramite220403store.setCombinacionRequerida = jest.fn();
    component.tramite220403store.setDatosRealizarValidada = jest.fn();
    component.tramite220403store.setCombinacionRequeridaValidada = jest.fn();
    component.exportaccionAcuicolaServcios = component.exportaccionAcuicolaServcios || {};
    component.exportaccionAcuicolaServcios.actualizarFormaValida = jest.fn();
    component.seccionStore = component.seccionStore || {};
    component.seccionStore.establecerSeccion = jest.fn();
    component.seccionStore.establecerFormaValida = jest.fn();
    component.ngOnInit();
  });

  it('should run #crearFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.crearFormulario();
  });

  it('should run #inicializarFormGroup()', async () => {
    component.formulario = component.formulario || {};
    component.formulario.get = jest.fn().mockReturnValue({
      addControl: function() {}
    });
    component.fb = component.fb || {};
    component.fb.control = jest.fn();
    component.obtenerValoresCatalogo = jest.fn();
    component.getRadioData = jest.fn();
    component.configuracion = component.configuracion || {};
    component.configuracion[0] = {
      menu: {
        0: {
          props: {
            radioOptions: {},
            radioSelectedValue: {}
          }
        }
      }
    };
    component.inicializarFormGroup([{
      inputType: {},
      props: {
        validators: [],
        campo: {},
        disabled: {},
        jsonDataFileName: {}
      },
      value: {}
    }, {
      inputType: {},
      props: {
        validators: [],
        campo: {},
        disabled: {},
        jsonDataFileName: {}
      },
      value: {}
    }], {}, {});
  });

  it('should run #getRadioData()', async () => {
    component.exportaccionAcuicolaServcios = component.exportaccionAcuicolaServcios || {};
    component.exportaccionAcuicolaServcios.getDatos = jest.fn().mockReturnValue(observableOf({}));
    component.getRadioData({}, {});
  });

  it('should run #obtenerValoresCatalogo()', async () => {
    component.exportaccionAcuicolaServcios = component.exportaccionAcuicolaServcios || {};
    component.exportaccionAcuicolaServcios.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.configuracion = component.configuracion || {};
    if (Array.isArray(component.configuracion) && typeof component.configuracion[0] !== 'string') {
      component.configuracion[0] = {
        ...component.configuracion[0],
        menu: {
          0: {
            props: {
              radioOptions: {},
              radioSelectedValue: {}
            }
          }
        }
      };
    }
    component.obtenerValoresCatalogo({}, {}, {});
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
  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyNotifier$ = component.destroyNotifier$ || {};
    component.destroyNotifier$.next = jest.fn();
    component.destroyNotifier$.complete = jest.fn();
    component.ngOnDestroy();
  });

  it('should run #mostrar_colapsable()', async () => {

    component.mostrar_colapsable();

  });

});