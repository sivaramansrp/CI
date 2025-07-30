import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Component } from '@angular/core';
import { DatosDelEstablecimientoComponent } from './datos-del-establecimiento.component';
import { FormBuilder } from '@angular/forms';
import { AvisoSanitarioService } from '../../services/aviso-sanitario.service';
import { Tramite260601Store } from '../../../../estados/tramites/tramite260601.store';
import { Tramite260601Query } from '../../../../estados/queries/tramite260601.query';
import { ConsultaioQuery } from '@libs/shared/data-access-user/src';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Injectable()
class MockAvisoSanitarioService {}

@Injectable()
class MockTramite260601Store {}

@Injectable()
class MockTramite260601Query {}

describe('DatosDelEstablecimientoComponent', () => {
  let fixture: ComponentFixture<DatosDelEstablecimientoComponent>;
  let component: { ngOnDestroy: () => void; manifiestosForm: { get?: any; disable?: any; enable?: any; }; seleccionadaManifiesto: { controls?: any; }; inicializarEstadoFormulario: jest.Mock<any, any, any> | (() => void); ngOnInit: () => void; guardarDatosFormulario: jest.Mock<any, any, any> | (() => void); inicializarFormulario: jest.Mock<any, any, any> | (() => void); inicializaCatalogos: jest.Mock<any, any, any> | (() => void); obtenerManifiestos: jest.Mock<any, any, any> | (() => void); tramite260601Query: { selectSeccionState$?: any; }; crearFormulario: jest.Mock<any, any, any> | (() => void); obtenerSCIAN: jest.Mock<any, any, any> | (() => void); obtenerProducto: jest.Mock<any, any, any> | (() => void); estadoSeleccion: jest.Mock<any, any, any> | (() => void); claveScianSeleccion: jest.Mock<any, any, any> | (() => void); regimenesSeleccion: jest.Mock<any, any, any> | (() => void); aduanaSeleccion: jest.Mock<any, any, any> | (() => void); datosDelEstablecimientoForm: { disable?: any; enable?: any; }; domicilloDelEstablecimientoForm: { disable?: any; enable?: any; get?: any; }; scianForm: { disable?: any; enable?: any; get?: any; }; fb: { group?: any; array?: any; }; avisoSanitarioState: { RFCResponsableSanitario?: any; razonSocial?: any; correoElectronico?: any; codigoPostal?: any; cveEstado?: any; descripcionMunicipio?: any; informacionExtra?: any; descripcionColonia?: any; calle?: any; lada?: any; telefono?: any; avisoFuncionamiento?: any; cveRegimenes?: any; cveAduanas?: any; cveSCIAN?: any; cveSCIANDescripcion?: any; seleccionadaManifiesto?: any; informacionConfidencial?: any; }; avisoSanitarioService: { getEstado?: any; getClaveScian?: any; getDescripcionScian?: any; getRegimenes?: any; getAduanas?: any; getManifiestos?: any; }; tramite260601Store: { setEstado?: any; setDescripcionScian?: any; setClaveScian?: any; setCveRegimenes?: any; setCveAduanas?: any; metodoNombre?: any; }; descripcionScianSeleccion: () => void; getSCIANTableData: { tableHeader?: any; tableBody?: any; }; getProductoTableData: { tableHeader?: any; tableBody?: any; }; seleccionarEstablecimiento: () => void; aceptar: () => void; setValoresStore: jest.Mock<any, any, any> | ((arg0: { get: () => { value: {}; }; }, arg1: {}, arg2: {}) => void); onManifiestoCheckboxCambiar: (arg0: { target: { checked: {}; }; }, arg1: {}) => void; modalElement: { nativeElement?: any; }; agregarMercanciaGrid2606: () => void; closeModal: { nativeElement?: any; }; cerrarModal: () => void; destruirNotificador$: { next?: any; complete?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, HttpClientTestingModule, ToastrModule.forRoot()  ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: AvisoSanitarioService, useClass: MockAvisoSanitarioService },
        { provide: Tramite260601Store, useClass: MockTramite260601Store },
        { provide: Tramite260601Query, useClass: MockTramite260601Query },
        ConsultaioQuery,
        ToastrService,
        { provide: 'ToastConfig', useValue: {} }
      ]
    }).overrideComponent(DatosDelEstablecimientoComponent, {

      set: { providers: [{ provide: AvisoSanitarioService, useClass: MockAvisoSanitarioService }] }    
    }).compileComponents();
    fixture = TestBed.createComponent(DatosDelEstablecimientoComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    component.ngOnDestroy = function() {};
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #seleccionadaManifiesto', async () => {
    component.manifiestosForm = component.manifiestosForm || {};
    component.manifiestosForm.get = jest.fn();
    const seleccionadaManifiesto = component.seleccionadaManifiesto;
    // expect(component.manifiestosForm.get).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.inicializarEstadoFormulario = jest.fn();
    component.ngOnInit();
    // expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
  });

  it('should run #inicializarEstadoFormulario()', async () => {
    component.guardarDatosFormulario = jest.fn();
    component.inicializarFormulario = jest.fn();
    component.inicializarEstadoFormulario();
    // expect(component.guardarDatosFormulario).toHaveBeenCalled();
    // expect(component.inicializarFormulario).toHaveBeenCalled();
  });

  it('should run #inicializarFormulario()', async () => {
    component.inicializaCatalogos = jest.fn();
    component.obtenerManifiestos = jest.fn();
    component.tramite260601Query = component.tramite260601Query || {};
    component.tramite260601Query.selectSeccionState$ = observableOf({});
    component.crearFormulario = jest.fn();
    component.obtenerSCIAN = jest.fn();
    component.obtenerProducto = jest.fn();
    component.estadoSeleccion = jest.fn();
    component.claveScianSeleccion = jest.fn();
    component.regimenesSeleccion = jest.fn();
    component.aduanaSeleccion = jest.fn();
    component.inicializarFormulario();
    // expect(component.inicializaCatalogos).toHaveBeenCalled();
    // expect(component.obtenerManifiestos).toHaveBeenCalled();
    // expect(component.crearFormulario).toHaveBeenCalled();
    // expect(component.obtenerSCIAN).toHaveBeenCalled();
    // expect(component.obtenerProducto).toHaveBeenCalled();
    // expect(component.estadoSeleccion).toHaveBeenCalled();
    // expect(component.claveScianSeleccion).toHaveBeenCalled();
    // expect(component.regimenesSeleccion).toHaveBeenCalled();
    // expect(component.aduanaSeleccion).toHaveBeenCalled();
  });

  it('should run #guardarDatosFormulario()', async () => {
    component.inicializarFormulario = jest.fn();
    component.datosDelEstablecimientoForm = component.datosDelEstablecimientoForm || {};
    component.datosDelEstablecimientoForm.disable = jest.fn();
    component.datosDelEstablecimientoForm.enable = jest.fn();
    component.domicilloDelEstablecimientoForm = component.domicilloDelEstablecimientoForm || {};
    component.domicilloDelEstablecimientoForm.disable = jest.fn();
    component.domicilloDelEstablecimientoForm.enable = jest.fn();
    component.scianForm = component.scianForm || {};
    component.scianForm.disable = jest.fn();
    component.scianForm.enable = jest.fn();
    component.manifiestosForm = component.manifiestosForm || {};
    component.manifiestosForm.disable = jest.fn();
    component.manifiestosForm.enable = jest.fn();
    component.guardarDatosFormulario();
    // expect(component.inicializarFormulario).toHaveBeenCalled();
    // expect(component.datosDelEstablecimientoForm.disable).toHaveBeenCalled();
    // expect(component.datosDelEstablecimientoForm.enable).toHaveBeenCalled();
    // expect(component.domicilloDelEstablecimientoForm.disable).toHaveBeenCalled();
    // expect(component.domicilloDelEstablecimientoForm.enable).toHaveBeenCalled();
    // expect(component.scianForm.disable).toHaveBeenCalled();
    // expect(component.scianForm.enable).toHaveBeenCalled();
    // expect(component.manifiestosForm.disable).toHaveBeenCalled();
    // expect(component.manifiestosForm.enable).toHaveBeenCalled();
  });

  it('should run #crearFormulario()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.fb.array = jest.fn();
    component.avisoSanitarioState = component.avisoSanitarioState || {};
    component.avisoSanitarioState.RFCResponsableSanitario = 'RFCResponsableSanitario';
    component.avisoSanitarioState.razonSocial = 'razonSocial';
    component.avisoSanitarioState.correoElectronico = 'correoElectronico';
    component.avisoSanitarioState.codigoPostal = 'codigoPostal';
    component.avisoSanitarioState.cveEstado = 'cveEstado';
    component.avisoSanitarioState.descripcionMunicipio = 'descripcionMunicipio';
    component.avisoSanitarioState.informacionExtra = 'informacionExtra';
    component.avisoSanitarioState.descripcionColonia = 'descripcionColonia';
    component.avisoSanitarioState.calle = 'calle';
    component.avisoSanitarioState.lada = 'lada';
    component.avisoSanitarioState.telefono = 'telefono';
    component.avisoSanitarioState.avisoFuncionamiento = 'avisoFuncionamiento';
    component.avisoSanitarioState.cveRegimenes = 'cveRegimenes';
    component.avisoSanitarioState.cveAduanas = 'cveAduanas';
    component.avisoSanitarioState.cveSCIAN = 'cveSCIAN';
    component.avisoSanitarioState.cveSCIANDescripcion = 'cveSCIANDescripcion';
    component.avisoSanitarioState.seleccionadaManifiesto = 'seleccionadaManifiesto';
    component.avisoSanitarioState.informacionConfidencial = 'informacionConfidencial';
    component.crearFormulario();
    // expect(component.fb.group).toHaveBeenCalled();
    // expect(component.fb.array).toHaveBeenCalled();
  });

  it('should run #inicializaCatalogos()', async () => {
    component.avisoSanitarioService = component.avisoSanitarioService || {};
    component.avisoSanitarioService.getEstado = jest.fn().mockReturnValue(observableOf({
      0: "E",
      1: "S",
      2: "T",
      3: "A",
      4: "D",
      5: "O",
      6: "$"
    }));
    component.avisoSanitarioService.getClaveScian = jest.fn().mockReturnValue(observableOf({
      0: "C",
      1: "L",
      2: "A",
      3: "V",
      4: "E",
      5: "_",
      6: "S",
      7: "C",
      8: "I",
      9: "A",
      10: "N",
      11: "$"
    }));
    component.avisoSanitarioService.getDescripcionScian = jest.fn().mockReturnValue(observableOf({
      0: "D",
      1: "E",
      2: "S",
      3: "C",
      4: "R",
      5: "I",
      6: "P",
      7: "C",
      8: "I",
      9: "O",
      10: "N",
      11: "_",
      12: "S",
      13: "C",
      14: "I",
      15: "A",
      16: "N",
      17: "$"
    }));
    component.avisoSanitarioService.getRegimenes = jest.fn().mockReturnValue(observableOf({
      0: "R",
      1: "E",
      2: "G",
      3: "I",
      4: "M",
      5: "E",
      6: "N",
      7: "E",
      8: "S",
      9: "$"
    }));
    component.avisoSanitarioService.getAduanas = jest.fn().mockReturnValue(observableOf({
      0: "A",
      1: "D",
      2: "U",
      3: "A",
      4: "N",
      5: "A",
      6: "S",
      7: "$"
    }));
    component.inicializaCatalogos();
    // expect(component.avisoSanitarioService.getEstado).toHaveBeenCalled();
    // expect(component.avisoSanitarioService.getClaveScian).toHaveBeenCalled();
    // expect(component.avisoSanitarioService.getDescripcionScian).toHaveBeenCalled();
    // expect(component.avisoSanitarioService.getRegimenes).toHaveBeenCalled();
    // expect(component.avisoSanitarioService.getAduanas).toHaveBeenCalled();
  });

  it('should run #estadoSeleccion()', async () => {
    component.domicilloDelEstablecimientoForm = component.domicilloDelEstablecimientoForm || {};
    component.domicilloDelEstablecimientoForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite260601Store = component.tramite260601Store || {};
    component.tramite260601Store.setEstado = jest.fn();
    component.estadoSeleccion();
    // expect(component.domicilloDelEstablecimientoForm.get).toHaveBeenCalled();
    // expect(component.tramite260601Store.setEstado).toHaveBeenCalled();
  });

  it('should run #claveScianSeleccion()', async () => {
    component.scianForm = component.scianForm || {};
    component.scianForm.get = jest.fn().mockReturnValue({
      setValue: function() {},
      value: {}
    });
    component.avisoSanitarioService = component.avisoSanitarioService || {};
    component.avisoSanitarioService.getDescripcionScian = jest.fn().mockReturnValue(observableOf({}));
    component.tramite260601Store = component.tramite260601Store || {};
    component.tramite260601Store.setDescripcionScian = jest.fn();
    component.tramite260601Store.setClaveScian = jest.fn();
    component.claveScianSeleccion();
    // expect(component.scianForm.get).toHaveBeenCalled();
    // expect(component.avisoSanitarioService.getDescripcionScian).toHaveBeenCalled();
    // expect(component.tramite260601Store.setDescripcionScian).toHaveBeenCalled();
    // expect(component.tramite260601Store.setClaveScian).toHaveBeenCalled();
  });

  it('should run #descripcionScianSeleccion()', async () => {
    component.scianForm = component.scianForm || {};
    component.scianForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite260601Store = component.tramite260601Store || {};
    component.tramite260601Store.setDescripcionScian = jest.fn();
    component.descripcionScianSeleccion();
    // expect(component.scianForm.get).toHaveBeenCalled();
    // expect(component.tramite260601Store.setDescripcionScian).toHaveBeenCalled();
  });

  it('should run #regimenesSeleccion()', async () => {
    component.domicilloDelEstablecimientoForm = component.domicilloDelEstablecimientoForm || {};
    component.domicilloDelEstablecimientoForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite260601Store = component.tramite260601Store || {};
    component.tramite260601Store.setCveRegimenes = jest.fn();
    component.regimenesSeleccion();
    // expect(component.domicilloDelEstablecimientoForm.get).toHaveBeenCalled();
    // expect(component.tramite260601Store.setCveRegimenes).toHaveBeenCalled();
  });

  it('should run #aduanaSeleccion()', async () => {
    component.domicilloDelEstablecimientoForm = component.domicilloDelEstablecimientoForm || {};
    component.domicilloDelEstablecimientoForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite260601Store = component.tramite260601Store || {};
    component.tramite260601Store.setCveAduanas = jest.fn();
    component.aduanaSeleccion();
    // expect(component.domicilloDelEstablecimientoForm.get).toHaveBeenCalled();
    // expect(component.tramite260601Store.setCveAduanas).toHaveBeenCalled();
  });

  it('should run #obtenerSCIAN()', async () => {
    component.getSCIANTableData = component.getSCIANTableData || {};
    component.getSCIANTableData.tableHeader = 'tableHeader';
    component.getSCIANTableData.tableBody = 'tableBody';
    component.obtenerSCIAN();

  });

  it('should run #obtenerProducto()', async () => {
    component.getProductoTableData = component.getProductoTableData || {};
    component.getProductoTableData.tableHeader = 'tableHeader';
    component.getProductoTableData.tableBody = 'tableBody';
    component.obtenerProducto();

  });

  it('should run #seleccionarEstablecimiento()', async () => {

    component.seleccionarEstablecimiento();

  });

  it('should run #aceptar()', async () => {
    component.datosDelEstablecimientoForm = component.datosDelEstablecimientoForm || {};
    component.datosDelEstablecimientoForm.enable = jest.fn();
    component.domicilloDelEstablecimientoForm = component.domicilloDelEstablecimientoForm || {};
    component.domicilloDelEstablecimientoForm.enable = jest.fn();
    component.aceptar();
    // expect(component.datosDelEstablecimientoForm.enable).toHaveBeenCalled();
    // expect(component.domicilloDelEstablecimientoForm.enable).toHaveBeenCalled();
  });

  it('should run #obtenerManifiestos()', async () => {
    component.avisoSanitarioService = component.avisoSanitarioService || {};
    component.avisoSanitarioService.getManifiestos = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerManifiestos();
    // expect(component.avisoSanitarioService.getManifiestos).toHaveBeenCalled();
  });

  it('should run #cerrarModal()', async () => {
    component.closeModal = component.closeModal || {};
    component.closeModal.nativeElement = {
      click: function() {}
    };
    component.cerrarModal();

  });

  it('should run #ngOnDestroy()', async () => {
    component.destruirNotificador$ = component.destruirNotificador$ || {};
    component.destruirNotificador$.next = jest.fn();
    component.destruirNotificador$.complete = jest.fn();
    component.ngOnDestroy();
    // expect(component.destruirNotificador$.next).toHaveBeenCalled();
    // expect(component.destruirNotificador$.complete).toHaveBeenCalled();
  });

});