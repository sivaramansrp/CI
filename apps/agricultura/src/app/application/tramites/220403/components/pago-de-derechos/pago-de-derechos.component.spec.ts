import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { PagoDeDerechosComponent } from './pago-de-derechos.component';
import { FormBuilder } from '@angular/forms';
import { CatalogoSelectComponent, CatalogosService, InputFechaComponent, InputRadioComponent, SeccionLibQuery, SeccionLibStore, TablaDinamicaComponent, TituloComponent } from '@ng-mf/data-access-user';
import { ExportaccionAcuicolaService } from '../../services/exportaccion-acuicola.service';
import { Tramite220403Query } from '../../estados/tramite220403.query';
import { Tramite220403Store } from '../../estados/tramite220403.store';
import { HttpClientModule } from '@angular/common/http';
import { AlertComponent } from 'ngx-bootstrap/alert';

@Injectable()
class MockExportaccionAcuicolaService {}

@Injectable()
class MockTramite220403Query {}

@Injectable()
class MockTramite220403Store {}



describe('PagoDeDerechosComponent', () => {
  let fixture: ComponentFixture<PagoDeDerechosComponent>;
  let component: { ngOnDestroy: () => void; fb: { group?: any; control?: any; }; crearFormulario: () => void; configuracion: string[]; inicializarFormGroup: jest.Mock<any, any, any> | ((arg0: ({ props: { validators: {}; campo: {}; disabled: {}; jsonDataFileName: {}; }; inputType: {}; } | { props?: undefined; inputType?: undefined; })[], arg1: {}, arg2: {}) => void); seccionQuery: { selectSeccionState$?: any; }; tramite220403Query: { setPagoDerechos$?: any; }; formulario: { get?: any; statusChanges?: any; }; tramite220403store: { setPagoDerechos?: any; setPagoDerechosValidada?: any; }; exportaccionAcuicolaServcios: { actualizarFormaValida?: any; getDatos?: any; obtenerMenuDesplegable?: any; }; seccionStore: { establecerSeccion?: any; establecerFormaValida?: any; }; ngOnInit: () => void; obtenerValoresCatalogo: jest.Mock<any, any, any> | ((arg0: {}, arg1: {}, arg2: {}) => void); getRadioData: jest.Mock<any, any, any> | ((arg0: {}, arg1: {}) => void); getValidators: (arg0: {}[]) => void; fechaCambiado: (arg0: {}) => void; seleccionCatalogo: (arg0: {}, arg1: {}) => void; cambioValorRadio: (arg0: {}, arg1: {}, arg2: {}, arg3: {}) => void; destroyNotifier$: { next?: any; complete?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PagoDeDerechosComponent, TituloComponent, AlertComponent, TablaDinamicaComponent, InputRadioComponent, InputFechaComponent, CatalogoSelectComponent, FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        CatalogosService,
        { provide: ExportaccionAcuicolaService, useClass: MockExportaccionAcuicolaService },
        { provide: Tramite220403Query, useClass: MockTramite220403Query },
        { provide: Tramite220403Store, useClass: MockTramite220403Store },
        SeccionLibQuery,
        SeccionLibStore
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
    component.seccionQuery = component.seccionQuery || {};
    component.seccionQuery.selectSeccionState$ = observableOf({});
    component.tramite220403Query = component.tramite220403Query || {};
    component.tramite220403Query.setPagoDerechos$ = observableOf({});
    component.formulario = component.formulario || {};
    component.formulario.get = jest.fn().mockReturnValue({
      valid: {},
      value: {},
      patchValue: function() {}
    });
    component.formulario.statusChanges = observableOf({});
    component.tramite220403store = component.tramite220403store || {};
    component.tramite220403store.setPagoDerechos = jest.fn();
    component.tramite220403store.setPagoDerechosValidada = jest.fn();
    component.exportaccionAcuicolaServcios = component.exportaccionAcuicolaServcios || {};
    component.exportaccionAcuicolaServcios.actualizarFormaValida = jest.fn();
    component.seccionStore = component.seccionStore || {};
    component.seccionStore.establecerSeccion = jest.fn();
    component.seccionStore.establecerFormaValida = jest.fn();
    component.ngOnInit();
    // expect(component.inicializarFormGroup).toHaveBeenCalled();
    // expect(component.formulario.get).toHaveBeenCalled();
    // expect(component.tramite220403store.setPagoDerechos).toHaveBeenCalled();
    // expect(component.tramite220403store.setPagoDerechosValidada).toHaveBeenCalled();
    // expect(component.exportaccionAcuicolaServcios.actualizarFormaValida).toHaveBeenCalled();
    // expect(component.seccionStore.establecerSeccion).toHaveBeenCalled();
    // expect(component.seccionStore.establecerFormaValida).toHaveBeenCalled();
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
  component.configuracion[1] = JSON.stringify({
    menu: {
      0: {
        props: {
          radioOptions: {},
          radioSelectedValue: {}
        }
      }
    }
  });
  // Ensure both objects in the array have a 'props' property with 'validators'
  component.inicializarFormGroup([
    {
      props: {
        validators: [],
        campo: {},
        disabled: {},
        jsonDataFileName: {}
      },
      inputType: {}
    },
    {
      props: {
        validators: [],
        campo: {},
        disabled: {},
        jsonDataFileName: {}
      },
      inputType: {}
    }
  ], {}, {});
});

  it('should run #getRadioData()', async () => {
    component.exportaccionAcuicolaServcios = component.exportaccionAcuicolaServcios || {};
    component.exportaccionAcuicolaServcios.getDatos = jest.fn().mockReturnValue(observableOf({}));
    component.getRadioData({}, {});
    // expect(component.exportaccionAcuicolaServcios.getDatos).toHaveBeenCalled();
  });

  it('should run #obtenerValoresCatalogo()', async () => {
    component.exportaccionAcuicolaServcios = component.exportaccionAcuicolaServcios || {};
    component.exportaccionAcuicolaServcios.obtenerMenuDesplegable = jest.fn().mockReturnValue(observableOf({}));
    component.configuracion = component.configuracion || {};
    (component.configuracion as any).indiceGrupo = {
      menu: {
        indiceMenu: {
          props: {
            catalogos: {}
          }
        }
      }
    };
    component.obtenerValoresCatalogo({}, {}, {});
  });

  it('should run #fechaCambiado()', async () => {
    component.formulario = component.formulario || {};
    component.formulario.get = jest.fn().mockReturnValue({
      patchValue: function() {}
    });
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

});