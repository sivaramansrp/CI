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
import { ConsultaioQuery } from '@ng-mf/data-access-user';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

@Injectable()
class MockAvisoSanitarioService {}

@Injectable()
class MockTramite260601Store {}

@Injectable()
class MockTramite260601Query {}

describe('DatosDelEstablecimientoComponent', () => {
  let fixture: ComponentFixture<DatosDelEstablecimientoComponent>;
  let component: { ngOnDestroy: () => void; manifiestosForm: { get?: any; disable?: any; enable?: any; valid?: any; markAllAsTouched?: any; }; seleccionadaManifiesto: { controls?: any; }; inicializarEstadoFormulario: jest.Mock<any, any, any> | (() => void); tramite260601Query: { selectSeccionState$?: any; }; ngOnInit: () => void; guardarDatosFormulario: jest.Mock<any, any, any> | (() => void); inicializarFormulario: jest.Mock<any, any, any> | (() => void); inicializaCatalogos: jest.Mock<any, any, any> | (() => void); obtenerManifiestos: jest.Mock<any, any, any> | (() => void); crearFormulario: jest.Mock<any, any, any> | (() => void); estadoSeleccion: jest.Mock<any, any, any> | (() => void); claveScianSeleccion: jest.Mock<any, any, any> | (() => void); regimenesSeleccion: jest.Mock<any, any, any> | (() => void); aduanaSeleccion: jest.Mock<any, any, any> | (() => void); datosDelEstablecimientoForm: { disable?: any; enable?: any; valid?: any; markAllAsTouched?: any; }; domicilloDelEstablecimientoForm: { disable?: any; enable?: any; get?: any; valid?: any; markAllAsTouched?: any; }; scianForm: { disable?: any; enable?: any; get?: any; reset?: any; valid?: any; markAllAsTouched?: any; }; fb: { group?: any; array?: any; }; avisoSanitarioState: { RFCResponsableSanitario?: any; razonSocial?: any; correoElectronico?: any; codigoPostal?: any; cveEstado?: any; descripcionMunicipio?: any; informacionExtra?: any; descripcionColonia?: any; calle?: any; lada?: any; telefono?: any; avisoFuncionamiento?: any; cveRegimenes?: any; cveAduanas?: any; cveSCIAN?: any; cveSCIANDescripcion?: any; seleccionadaManifiesto?: any; informacionConfidencial?: any; }; avisoSanitarioService: { getEstado?: any; getClaveScian?: any; getDescripcionScian?: any; getRegimenes?: any; getAduanas?: any; obtenerScianTabla?: any; obtenerProducto?: any; getManifiestos?: any; }; tramite260601Store: { setEstado?: any; setDescripcionScian?: any; setClaveScian?: any; setCveRegimenes?: any; setCveAduanas?: any; setScianTabla?: any; setProductoTabla?: any; metodoNombre?: any; setProductoClasificacion?: any; }; descripcionScianSeleccion: () => void; obtenerSCIAN: () => void; seleccionarDomicilios: (arg0: {}) => void; obtenerProducto: () => void; seleccionarEstablecimiento: () => void; aceptar: () => void; setValoresStore: jest.Mock<any, any, any> | ((arg0: { get: () => { value: {}; }; }, arg1: {}, arg2: {}) => void); onManifiestoCheckboxCambiar: (arg0: { target: { checked: {}; }; }, arg1: {}) => void; modalElement: { nativeElement?: any; }; modalInstance: { show?: any; hide?: any; }; agregarMercanciaGrid2606: () => void; closeModal: { nativeElement?: any; }; cerrarModal: () => void; scianSeleccionados: string[]; scianBodyData: string[]; eliminarScianGrid: () => void; agregarSCIAN: () => void; limpiarSCIAN: () => void; limpiarMercancia: () => void; modifyModal: { nativeElement?: any; }; modalAddSCIAN: { nativeElement?: any; }; ngAfterViewInit: () => void; cerrarModificarModal: () => void; abrirModificarModal: (arg0: { cveEspecificoProductoClasifi: {}; cveTipoProducto: {}; fraccionArancelaria: {}; fraccionArancelariaDescripcion: {}; modelo: {}; productoDescripcion: {}; paisDeOrigen: {}; }) => void; modalAddSCIANInstance: { show?: any; hide?: any; }; abrirModalAgregarSCIAN: () => void; cancelarAgregarSCIAN: () => void; validarFormularios: () => void; destruirNotificador$: { next?: any; complete?: any; }; };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, DatosDelEstablecimientoComponent, HttpClientTestingModule, ToastrModule.forRoot()  ],
      declarations: [
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        FormBuilder,
        { provide: AvisoSanitarioService, useClass: MockAvisoSanitarioService },
        { provide: Tramite260601Store, useClass: MockTramite260601Store },
        { provide: Tramite260601Query, useClass: MockTramite260601Query },
        ConsultaioQuery
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
    
  });

  it('should run #ngOnInit()', async () => {
    component.inicializarEstadoFormulario = jest.fn();
    component.tramite260601Query = component.tramite260601Query || {};
    component.tramite260601Query.selectSeccionState$ = observableOf({});
    component.ngOnInit();
  });

  it('should run #inicializarEstadoFormulario()', async () => {
    component.guardarDatosFormulario = jest.fn();
    component.inicializarFormulario = jest.fn();
    component.inicializarEstadoFormulario();
  });

  it('should run #inicializarFormulario()', async () => {
    component.inicializaCatalogos = jest.fn();
    component.obtenerManifiestos = jest.fn();
    component.tramite260601Query = component.tramite260601Query || {};
    component.tramite260601Query.selectSeccionState$ = observableOf({});
    component.crearFormulario = jest.fn();
    component.estadoSeleccion = jest.fn();
    component.claveScianSeleccion = jest.fn();
    component.regimenesSeleccion = jest.fn();
    component.aduanaSeleccion = jest.fn();
    component.inicializarFormulario();
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
  });

  it('should run #estadoSeleccion()', async () => {
    component.domicilloDelEstablecimientoForm = component.domicilloDelEstablecimientoForm || {};
    component.domicilloDelEstablecimientoForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite260601Store = component.tramite260601Store || {};
    component.tramite260601Store.setEstado = jest.fn();
    component.estadoSeleccion();
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
  });

  it('should run #descripcionScianSeleccion()', async () => {
    component.scianForm = component.scianForm || {};
    component.scianForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite260601Store = component.tramite260601Store || {};
    component.tramite260601Store.setDescripcionScian = jest.fn();
    component.descripcionScianSeleccion();
  });

  it('should run #regimenesSeleccion()', async () => {
    component.domicilloDelEstablecimientoForm = component.domicilloDelEstablecimientoForm || {};
    component.domicilloDelEstablecimientoForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite260601Store = component.tramite260601Store || {};
    component.tramite260601Store.setCveRegimenes = jest.fn();
    component.regimenesSeleccion();
  });

  it('should run #aduanaSeleccion()', async () => {
    component.domicilloDelEstablecimientoForm = component.domicilloDelEstablecimientoForm || {};
    component.domicilloDelEstablecimientoForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite260601Store = component.tramite260601Store || {};
    component.tramite260601Store.setCveAduanas = jest.fn();
    component.aduanaSeleccion();
  });

  it('should run #obtenerSCIAN()', async () => {
    component.avisoSanitarioService = component.avisoSanitarioService || {};
    component.avisoSanitarioService.obtenerScianTabla = jest.fn().mockReturnValue(observableOf({}));
    component.tramite260601Store = component.tramite260601Store || {};
    component.tramite260601Store.setScianTabla = jest.fn();
    component.obtenerSCIAN();
  });

  it('should run #seleccionarDomicilios()', async () => {

    component.seleccionarDomicilios({});

  });

  it('should run #obtenerProducto()', async () => {
    component.avisoSanitarioService = component.avisoSanitarioService || {};
    component.avisoSanitarioService.obtenerProducto = jest.fn().mockReturnValue(observableOf({}));
    component.tramite260601Store = component.tramite260601Store || {};
    component.tramite260601Store.setProductoTabla = jest.fn();
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
  });

  it('should run #obtenerManifiestos()', async () => {
    component.avisoSanitarioService = component.avisoSanitarioService || {};
    component.avisoSanitarioService.getManifiestos = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerManifiestos();
  });

  it('should run #cerrarModal()', async () => {
    component.closeModal = component.closeModal || {};
    component.closeModal.nativeElement = {
      click: function() {}
    };
    component.cerrarModal();

  });

  it('should run #agregarSCIAN()', async () => {
    component.scianForm = component.scianForm || {};
    component.scianForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.tramite260601Store = component.tramite260601Store || {};
    component.tramite260601Store.setScianTabla = jest.fn();
    component.agregarSCIAN();
  });

  it('should run #limpiarSCIAN()', async () => {
    component.scianForm = component.scianForm || {};
    component.scianForm.reset = jest.fn();
    component.limpiarSCIAN();
    
  });

  it('should run #limpiarMercancia()', async () => {
    component.tramite260601Store = component.tramite260601Store || {};
    component.tramite260601Store.setProductoClasificacion = jest.fn();
    component.limpiarMercancia();
    
  });

  it('should run #cerrarModificarModal()', async () => {
    component.modalInstance = component.modalInstance || {};
    component.modalInstance.hide = jest.fn();
    component.cerrarModificarModal();
    
  });

  it('should run #abrirModificarModal()', async () => {
    component.tramite260601Store = component.tramite260601Store || {};
    component.tramite260601Store.setProductoTabla = jest.fn();
    component.abrirModificarModal({
      cveEspecificoProductoClasifi: {},
      cveTipoProducto: {},
      fraccionArancelaria: {},
      fraccionArancelariaDescripcion: {},
      modelo: {},
      productoDescripcion: {},
      paisDeOrigen: {}
    });
    
  });

  it('should run #abrirModalAgregarSCIAN()', async () => {
    component.modalAddSCIANInstance = component.modalAddSCIANInstance || {};
    component.modalAddSCIANInstance.show = jest.fn();
    component.abrirModalAgregarSCIAN();
    
  });

  it('should run #cancelarAgregarSCIAN()', async () => {
    component.modalAddSCIANInstance = component.modalAddSCIANInstance || {};
    component.modalAddSCIANInstance.hide = jest.fn();
    component.cancelarAgregarSCIAN();
    
  });

  it('should run #validarFormularios()', async () => {
    component.datosDelEstablecimientoForm = component.datosDelEstablecimientoForm || {};
    component.datosDelEstablecimientoForm.valid = 'valid';
    component.datosDelEstablecimientoForm.markAllAsTouched = jest.fn();
    component.domicilloDelEstablecimientoForm = component.domicilloDelEstablecimientoForm || {};
    component.domicilloDelEstablecimientoForm.valid = 'valid';
    component.domicilloDelEstablecimientoForm.markAllAsTouched = jest.fn();
    component.scianForm = component.scianForm || {};
    component.scianForm.valid = 'valid';
    component.scianForm.markAllAsTouched = jest.fn();
    component.manifiestosForm = component.manifiestosForm || {};
    component.manifiestosForm.valid = 'valid';
    component.manifiestosForm.markAllAsTouched = jest.fn();
    component.validarFormularios();
  });

  it('should run #ngOnDestroy()', async () => {
    component.destruirNotificador$ = component.destruirNotificador$ || {};
    component.destruirNotificador$.next = jest.fn();
    component.destruirNotificador$.complete = jest.fn();
    component.ngOnDestroy();
  });

});