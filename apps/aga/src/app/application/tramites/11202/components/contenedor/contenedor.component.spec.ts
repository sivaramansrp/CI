
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';


import { ContenedorComponent } from './contenedor.component';
import { FormBuilder } from '@angular/forms';
import { DatosTramiteService } from 'libs/shared/data-access-user/src/core/services/11202/datos-tramite.service';
import { Contenedor11202Store } from '../../../../estados/tramites/contenedor11202.store';
import { Contenedor11202Query } from '../../../../estados/queries/contenedor11202.query';

@Injectable()
class MockContenedor11202Store {}

@Injectable()
class MockContenedor11202Query {}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom: any;
}

@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
  transform(value: any) { return value; }
}

@Pipe({name: 'phoneNumber'})
class PhoneNumberPipe implements PipeTransform {
  transform(value: any) { return value; }
}

@Pipe({name: 'safeHtml'})
class SafeHtmlPipe implements PipeTransform {
  transform(value: any) { return value; }
}

describe('ContenedorComponent', () => {
  let fixture: ComponentFixture<ContenedorComponent>;
  let component: { ngOnDestroy: () => void; solicitudForm: { get?: any; reset?: any; valid?: any; value?: any; patchValue?: any; }; datosGenerales: { get?: any; }; datosContenedor: { get?: any; }; onPageChange: (arg0: {}) => void; ngSubmit: () => void; inicializarFormulario: jest.Mock<any, any, any>; cargarCatalogAduanas: jest.Mock<any, any, any> | (() => void); cargarCatalogContenedores: jest.Mock<any, any, any> | (() => void); tabSeleccionado: jest.Mock<any, any, any> | (() => void); configurarValidaciones: jest.Mock<any, any, any> | (() => void); setFormValues: jest.Mock<any, any, any> | (() => void); contenedorQuery: { selectSolicitud$?: any; }; crearFormSolicitud: jest.Mock<any, any, any> | (() => void); ngOnInit: () => void; datosTramiteService: { getAduanas?: any; getContenedores?: any; submitSolicitud?: any; }; mostrarCampos: jest.Mock<any, any, any> | (() => void); limpiarCampos: () => void; datosCaptura: () => void; contenedores: { push?: any; }; agregarAGrid: () => void; adjuntarArchivo: () => void; openModalCancelarTramite: () => void; cancelarRadioButton: () => void; mostrarTIpoContenedor: () => void; vaiarGridRC: () => void; fb: { group?: any; }; contenedorState: { idSolicitud?: any; tipoBusqueda?: any; aduana?: any; inicialesContenedor?: any; numeroContenedor?: any; tipoContenedor?: any; }; contenedorStore: { metodoNombre?: any; }; setValoresStore: (arg0: { get: () => { value: {}; }; }, arg1: {}, arg2: {}) => void; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule ],
      declarations: [
        ContenedorComponent,
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        DatosTramiteService,
        { provide: Contenedor11202Store, useClass: MockContenedor11202Store },
        { provide: Contenedor11202Query, useClass: MockContenedor11202Query }
      ]
    }).overrideComponent(ContenedorComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(ContenedorComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #datosGenerales', async () => {
    component.solicitudForm = component.solicitudForm || {};
    component.solicitudForm.get = jest.fn();
    const datosGenerales = component.datosGenerales;
    // expect(component.solicitudForm.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #datosContenedor', async () => {
    component.solicitudForm = component.solicitudForm || {};
    component.solicitudForm.get = jest.fn();
    const datosContenedor = component.datosContenedor;
    // expect(component.solicitudForm.get).toHaveBeenCalled();
  });

  it('should run #onPageChange()', async () => {

    component.onPageChange({});

  });

 

  it('should run #ngOnInit()', async () => {
    component.inicializarFormulario = jest.fn();
    component.cargarCatalogAduanas = jest.fn();
    component.cargarCatalogContenedores = jest.fn();
    component.tabSeleccionado = jest.fn();
    component.configurarValidaciones = jest.fn();
    component.setFormValues = jest.fn();
    component.contenedorQuery = component.contenedorQuery || {};
    component.contenedorQuery.selectSolicitud$ = observableOf({});
    component.crearFormSolicitud = jest.fn();
    component.ngOnInit();
    // expect(component.inicializarFormulario).toHaveBeenCalled();
    // expect(component.cargarCatalogAduanas).toHaveBeenCalled();
    // expect(component.cargarCatalogContenedores).toHaveBeenCalled();
    // expect(component.tabSeleccionado).toHaveBeenCalled();
    // expect(component.configurarValidaciones).toHaveBeenCalled();
    // expect(component.setFormValues).toHaveBeenCalled();
    // expect(component.crearFormSolicitud).toHaveBeenCalled();
  });

  it('should run #undefined()', async () => {
    // Error: ERROR this JS code is invalid, "value.replace(/[^a)"
    //     at Util.getFuncReturn (/var/task/lib/util.js:325:13)
    //     at /var/task/lib/util.js:413:30
    //     at Array.forEach (<anonymous>)
    //     at Util.getFuncParamObj (/var/task/lib/util.js:396:26)
    //     at Util.getFuncArguments (/var/task/lib/util.js:347:30)
    //     at Util.getFuncReturn (/var/task/lib/util.js:332:34)
    //     at FuncTestGen.setMockData (/var/task/lib/func-test-gen.js:159:31)
    //     at FuncTestGen.setMockData (/var/task/lib/func-test-gen.js:88:12)
    //     at FuncTestGen.setMockData (/var/task/lib/func-test-gen.js:90:12)
    //     at /var/task/lib/index.js:188:17
  });

  // it('should run #setFormValues()', async () => {
  //   component.solicitudForm = component.solicitudForm || {};
  //   component.solicitudForm.get = jest.fn().mockReturnValue({
  //     setValue: function() {}
  //   });
  //   component.setFormValues();
  //   // expect(component.solicitudForm.get).toHaveBeenCalled();
  // });

  it('should run #cargarCatalogAduanas()', async () => {
    component.datosTramiteService = component.datosTramiteService || {};
    component.datosTramiteService.getAduanas = jest.fn().mockReturnValue(observableOf({}));
    component.cargarCatalogAduanas();
    // expect(component.datosTramiteService.getAduanas).toHaveBeenCalled();
  });

  it('should run #cargarCatalogContenedores()', async () => {
    component.datosTramiteService = component.datosTramiteService || {};
    component.datosTramiteService.getContenedores = jest.fn().mockReturnValue(observableOf({}));
    component.cargarCatalogContenedores();
    // expect(component.datosTramiteService.getContenedores).toHaveBeenCalled();
  });

  it('should run #configurarValidaciones()', async () => {

    component.configurarValidaciones();

  });

  it('should run #mostrarCampos()', async () => {
    component.solicitudForm = component.solicitudForm || {};
    component.solicitudForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.mostrarCampos();
    // expect(component.solicitudForm.get).toHaveBeenCalled();
  });

  it('should run #limpiarCampos()', async () => {
    component.solicitudForm = component.solicitudForm || {};
    component.solicitudForm.reset = jest.fn();
    component.limpiarCampos();
    // expect(component.solicitudForm.reset).toHaveBeenCalled();
  });

  it('should run #datosCaptura()', async () => {
    component.solicitudForm = component.solicitudForm || {};
    component.solicitudForm.valid = 'valid';
    component.solicitudForm.value = 'value';
    component.datosTramiteService = component.datosTramiteService || {};
    component.datosTramiteService.submitSolicitud = jest.fn().mockReturnValue(observableOf({}));
    component.datosCaptura();
    // expect(component.datosTramiteService.submitSolicitud).toHaveBeenCalled();
  });

  // it('should run #agregarAGrid()', async () => {
  //   component.datosContenedor = component.datosContenedor || {};
  //   component.datosContenedor.get = jest.fn().mockReturnValue({
  //     value: {}
  //   });
  //   component.solicitudForm = component.solicitudForm || {};
  //   component.solicitudForm.get = jest.fn().mockReturnValue({
  //     value: {}
  //   });
  //   component.solicitudForm.patchValue = jest.fn();
  //   component.datosGenerales = component.datosGenerales || {};
  //   component.datosGenerales.get = jest.fn().mockReturnValue({
  //     value: {}
  //   });
  //   component.contenedores = component.contenedores || {};
  //   component.contenedores.push = jest.fn();
  //   component.agregarAGrid();
  //   // expect(component.datosContenedor.get).toHaveBeenCalled();
  //   // expect(component.solicitudForm.get).toHaveBeenCalled();
  //   // expect(component.solicitudForm.patchValue).toHaveBeenCalled();
  //   // expect(component.datosGenerales.get).toHaveBeenCalled();
  //   // expect(component.contenedores.push).toHaveBeenCalled();
  // });

  it('should run #adjuntarArchivo()', async () => {

    component.adjuntarArchivo();

  });

  it('should run #openModalCancelarTramite()', async () => {
    component.solicitudForm = component.solicitudForm || {};
    component.solicitudForm.reset = jest.fn();
    component.openModalCancelarTramite();
    // expect(component.solicitudForm.reset).toHaveBeenCalled();
  });

  it('should run #tabSeleccionado()', async () => {

    component.tabSeleccionado();

  });

  it('should run #cancelarRadioButton()', async () => {
    component.solicitudForm = component.solicitudForm || {};
    component.solicitudForm.get = jest.fn().mockReturnValue({
      setValue: function() {}
    });
    component.mostrarCampos = jest.fn();
    component.cancelarRadioButton();
    // expect(component.solicitudForm.get).toHaveBeenCalled();
    // expect(component.mostrarCampos).toHaveBeenCalled();
  });

  it('should run #mostrarTIpoContenedor()', async () => {

    component.mostrarTIpoContenedor();

  });

  // it('should run #vaiarGridRC()', async () => {

  //   component.vaiarGridRC();

  // });

  it('should run #crearFormSolicitud()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.contenedorState = component.contenedorState || {};
    component.contenedorState.idSolicitud = 'idSolicitud';
    component.contenedorState.tipoBusqueda = 'tipoBusqueda';
    component.contenedorState.aduana = 'aduana';
    component.contenedorState.inicialesContenedor = 'inicialesContenedor';
    component.contenedorState.numeroContenedor = 'numeroContenedor';
    component.contenedorState.tipoContenedor = 'tipoContenedor';
    component.crearFormSolicitud();
    // expect(component.fb.group).toHaveBeenCalled();
  });

  // it('should run #setValoresStore()', async () => {
  //   component.contenedorStore = component.contenedorStore || {};
  //   component.contenedorStore.metodoNombre = jest.fn();
  //   component.setValoresStore({
  //     get: function() {
  //       return {
  //         value: {}
  //       };
  //     }
  //   }, {}, {});
  //   // expect(component.contenedorStore.metodoNombre).toHaveBeenCalled();
  // });

});