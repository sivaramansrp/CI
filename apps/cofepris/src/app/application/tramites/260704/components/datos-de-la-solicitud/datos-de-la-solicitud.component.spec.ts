// @ts-nocheck
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Pipe, PipeTransform, Injectable, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, Directive, Input, Output } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of as observableOf, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Mock Bootstrap Modal
jest.mock('bootstrap', () => ({
  Modal: jest.fn().mockImplementation(() => ({
    show: jest.fn(),
    hide: jest.fn()
  }))
}));

import { Component } from '@angular/core';
import { DatosDeLaSolicitudComponent } from './datos-de-la-solicitud.component';
import { ConsultaService } from '../../service/consulta.service';
import { Tramite260704Store } from '../../estados/Tramite260704.store';
import { Tramite260704Query } from '../../estados/Tramite260704.query';
import { FormBuilder } from '@angular/forms';
import { ValidacionesFormularioService, SolicitanteService } from '@libs/shared/data-access-user/src';
import { ConsultaioQuery } from '@ng-mf/data-access-user';

@Injectable()
class MockConsultaService {}

@Injectable()
class MockTramite260704Store {}

@Injectable()
class MockTramite260704Query {}

@Directive({ selector: '[myCustom]' })
class MyCustomDirective {
  @Input() myCustom;
}

@Pipe({name: 'translate'})
class TranslatePipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'phoneNumber'})
class PhoneNumberPipe implements PipeTransform {
  transform(value) { return value; }
}

@Pipe({name: 'safeHtml'})
class SafeHtmlPipe implements PipeTransform {
  transform(value) { return value; }
}

describe('DatosDeLaSolicitudComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule, ReactiveFormsModule, DatosDeLaSolicitudComponent, HttpClientTestingModule ],
      declarations: [
        TranslatePipe, PhoneNumberPipe, SafeHtmlPipe,
        MyCustomDirective
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
      providers: [
        { provide: ConsultaService, useClass: MockConsultaService },
        { provide: Tramite260704Store, useClass: MockTramite260704Store },
        { provide: Tramite260704Query, useClass: MockTramite260704Query },
        FormBuilder,
        ValidacionesFormularioService,
        ConsultaioQuery,
        SolicitanteService
      ]
    }).overrideComponent(DatosDeLaSolicitudComponent, {

    }).compileComponents();
    fixture = TestBed.createComponent(DatosDeLaSolicitudComponent);
    component = fixture.debugElement.componentInstance;
  });

  afterEach(() => {
    if (component && component.ngOnDestroy) {
      component.ngOnDestroy = function() {};
    }
    fixture.destroy();
  });

  it('should run #constructor()', async () => {
    expect(component).toBeTruthy();
  });

  it('should run GetterDeclaration #validacionForm', async () => {
    component.datosDelEstablecimientoForm = component.datosDelEstablecimientoForm || {};
    component.datosDelEstablecimientoForm.get = jest.fn();
    const validacionForm = component.validacionForm;
    expect(component.datosDelEstablecimientoForm.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #validacionMercanciaForm', async () => {
    component.datosDelEstablecimientoForm = component.datosDelEstablecimientoForm || {};
    component.datosDelEstablecimientoForm.get = jest.fn();
    const validacionMercanciaForm = component.validacionMercanciaForm;
    expect(component.datosDelEstablecimientoForm.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #validacionScionForm', async () => {
    component.datosDelEstablecimientoForm = component.datosDelEstablecimientoForm || {};
    component.datosDelEstablecimientoForm.get = jest.fn();
    const validacionScionForm = component.validacionScionForm;
    expect(component.datosDelEstablecimientoForm.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #validacionAduanaMercanciaForm', async () => {
    component.datosDelEstablecimientoForm = component.datosDelEstablecimientoForm || {};
    component.datosDelEstablecimientoForm.get = jest.fn();
    const validacionAduanaMercanciaForm = component.validacionAduanaMercanciaForm;
    expect(component.datosDelEstablecimientoForm.get).toHaveBeenCalled();
  });

  it('should run GetterDeclaration #validacionDatosMercanciaForm', async () => {
    component.datosDelEstablecimientoForm = component.datosDelEstablecimientoForm || {};
    component.datosDelEstablecimientoForm.get = jest.fn();
    const validacionDatosMercanciaForm = component.validacionDatosMercanciaForm;
    expect(component.datosDelEstablecimientoForm.get).toHaveBeenCalled();
  });

  it('should run #ngOnInit()', async () => {
    component.donanteDomicilio = jest.fn();
    component.query = component.query || {};
    component.query.selectSolicitud$ = observableOf({});
    component.obtenerTablaScian = jest.fn();
    component.obtenerDatosEstado = jest.fn();
    component.obtenerTablaMercancias = jest.fn();
    component.obtenerDatosClave = jest.fn();
    component.obtenerTablaListaClave = jest.fn();
    component.inicializarEstadoFormulario = jest.fn();
    component.ngOnInit();
    expect(component.donanteDomicilio).toHaveBeenCalled();
    expect(component.obtenerTablaScian).toHaveBeenCalled();
    expect(component.obtenerDatosEstado).toHaveBeenCalled();
    expect(component.obtenerTablaMercancias).toHaveBeenCalled();
    expect(component.obtenerDatosClave).toHaveBeenCalled();
    expect(component.obtenerTablaListaClave).toHaveBeenCalled();
    expect(component.inicializarEstadoFormulario).toHaveBeenCalled();
  });

  it('should run #inicializarEstadoFormulario()', async () => {
    component.guardarDatosFormulario = jest.fn();
    component.donanteDomicilio = jest.fn();
    component.soloLectura = true; // Set to true to trigger guardarDatosFormulario
    component.inicializarEstadoFormulario();
    expect(component.guardarDatosFormulario).toHaveBeenCalled();
    expect(component.donanteDomicilio).not.toHaveBeenCalled(); // This should NOT be called when soloLectura is true
  });

  it('should run #guardarDatosFormulario()', async () => {
    component.donanteDomicilio = jest.fn();
    component.datosDelEstablecimientoForm = component.datosDelEstablecimientoForm || {};
    component.datosDelEstablecimientoForm.disable = jest.fn();
    component.datosDelEstablecimientoForm.enable = jest.fn();
    component.soloLectura = true; // Set to true to trigger disable
    component.guardarDatosFormulario();
    expect(component.donanteDomicilio).toHaveBeenCalled();
    expect(component.datosDelEstablecimientoForm.disable).toHaveBeenCalled();
    expect(component.datosDelEstablecimientoForm.enable).not.toHaveBeenCalled(); // Should not be called when soloLectura is true
  });

  it('should run #obtenerTablaScian()', async () => {
    component.consulta = component.consulta || {};
    component.consulta.obtenerTablaScian = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerTablaScian();
    expect(component.consulta.obtenerTablaScian).toHaveBeenCalled();
  });

  it('should run #obtenerTablaMercancias()', async () => {
    component.consulta = component.consulta || {};
    component.consulta.obtenerTablaMercancias = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerTablaMercancias();
    expect(component.consulta.obtenerTablaMercancias).toHaveBeenCalled();
  });

  it('should run #obtenerTablaListaClave()', async () => {
    component.consulta = component.consulta || {};
    component.consulta.obtenerTablaListaClave = jest.fn().mockReturnValue(observableOf({}));
    component.obtenerTablaListaClave();
    expect(component.consulta.obtenerTablaListaClave).toHaveBeenCalled();
  });

  it('should run #aceptar()', async () => {
    component.datosDelEstablecimientoForm = component.datosDelEstablecimientoForm || {};
    component.datosDelEstablecimientoForm.enable = jest.fn();
    component.aceptar();
    expect(component.datosDelEstablecimientoForm.enable).toHaveBeenCalled();
  });

  it('should run #claveScianSeleccion()', async () => {
    const mockScianData = { data: [{ descripcion: 'Test Description' }] };
    component.scianForm = component.scianForm || {};
    component.scianForm.get = jest.fn().mockReturnValue({
      setValue: jest.fn(),
      value: 'testValue'
    });
    component.consulta = component.consulta || {};
    component.consulta.getDescripcionScian = jest.fn().mockReturnValue(observableOf(mockScianData));
    component.store = component.store || {};
    component.store.setDescripcionScian = jest.fn();
    component.store.setClaveScian = jest.fn();
    
    component.claveScianSeleccion();
    
    expect(component.scianForm.get).toHaveBeenCalledWith('cveSCIAN');
    expect(component.consulta.getDescripcionScian).toHaveBeenCalled();
    expect(component.store.setClaveScian).toHaveBeenCalled();
    
    // Wait for async operations to complete
    await new Promise(resolve => setTimeout(resolve, 0));
    expect(component.store.setDescripcionScian).toHaveBeenCalledWith('Test Description');
  });

  it('should run #seleccionarEstablecimiento()', async () => {
    component.modalElement = { nativeElement: document.createElement('div') };
    component.abrirModal = jest.fn();
    component.seleccionarEstablecimiento();
    expect(component.abrirModal).toHaveBeenCalled();
  });

  it('should run #obtenerDatosEstado()', async () => {
    component.consulta = component.consulta || {};
    component.consulta.obtenerDatosEstado = jest.fn().mockReturnValue(observableOf({}));
    component.estadoCatalogo = component.estadoCatalogo || {};
    component.estadoCatalogo.catalogos = 'catalogos';
    component.obtenerDatosEstado();
    expect(component.consulta.obtenerDatosEstado).toHaveBeenCalled();
  });

  it('should run #obtenerDatosClave()', async () => {
    component.consulta = component.consulta || {};
    component.consulta.obtenerDatosClave = jest.fn().mockReturnValue(observableOf({}));
    component.catalogoClave = component.catalogoClave || {};
    component.catalogoClave.catalogos = 'catalogos';
    component.obtenerDatosClave();
    expect(component.consulta.obtenerDatosClave).toHaveBeenCalled();
  });

  it('should run #agregarMercanciaGrid()', async () => {
    component.modalElement = { nativeElement: document.createElement('div') };
    component.agregarMercanciaGrid();
    // Expect that Modal is created and show is called
    expect(require('bootstrap').Modal).toHaveBeenCalled();
  });

  it('should run #verificarSeleccionCheckbox()', async () => {

    component.verificarSeleccionCheckbox({
      target: {
        closest: function() {
          return {
            checked: {}
          };
        }
      }
    });

  });

  it('should run #alCambiarSeleccion()', async () => {
    component.datosDelEstablecimientoForm = component.datosDelEstablecimientoForm || {};
    component.datosDelEstablecimientoForm.get = jest.fn().mockReturnValue({
      disable: jest.fn(),
      enable: jest.fn()
    });
    
    const mockForm = {
      get: jest.fn().mockReturnValue({
        value: 'modificacion'
      })
    };
    
    component.alCambiarSeleccion(mockForm, 'testField');
    expect(mockForm.get).toHaveBeenCalledWith('testField');
    expect(component.datosDelEstablecimientoForm.get).toHaveBeenCalledWith('validacionForm.justificacion');
  });

  it('should run #eliminarMercanciaGrid()', async () => {
    component.abrirModalmercancia = jest.fn();
    component.abrirModalmercanciaChecked = jest.fn();
    
    // Test when esCheckboxSeleccionado is false
    component.esCheckboxSeleccionado = false;
    component.eliminarMercanciaGrid();
    expect(component.abrirModalmercancia).toHaveBeenCalled();
    expect(component.abrirModalmercanciaChecked).not.toHaveBeenCalled();
    
    // Reset mocks
    component.abrirModalmercancia.mockClear();
    component.abrirModalmercanciaChecked.mockClear();
    
    // Test when esCheckboxSeleccionado is true
    component.esCheckboxSeleccionado = true;
    component.eliminarMercanciaGrid();
    expect(component.abrirModalmercancia).not.toHaveBeenCalled();
    expect(component.abrirModalmercanciaChecked).toHaveBeenCalled();
  });

  it('should run #establecerAvisoDeFuncionamiento()', async () => {
    component.store = component.store || {};
    component.store.setAvisoDeFuncionamiento = jest.fn();
    component.establecerAvisoDeFuncionamiento({
      target: {
        checked: {}
      }
    });
    expect(component.store.setAvisoDeFuncionamiento).toHaveBeenCalled();
  });

  it('should run #establecerLicenciaSanitaria()', async () => {
    component.store = component.store || {};
    component.store.setLicenciaSanitaria = jest.fn();
    component.establecerLicenciaSanitaria({
      target: {
        value: {}
      }
    });
    expect(component.store.setLicenciaSanitaria).toHaveBeenCalled();
  });

  it('should run #paisOrigenColapsable()', async () => {

    component.paisOrigenColapsable();

  });

  it('should run #paisProcedencis_colapsable()', async () => {

    component.paisProcedencis_colapsable();

  });

  it('should run #establecerClaveDeLosLotes()', async () => {
    component.store = component.store || {};
    component.store.setClaveDeLosLotes = jest.fn();
    component.establecerClaveDeLosLotes({
      target: {
        value: {}
      }
    });
    expect(component.store.setClaveDeLosLotes).toHaveBeenCalled();
  });

  it('should run #usoEspecificoColapsable()', async () => {

    component.usoEspecificoColapsable();

  });

  it('should run #agregarMercanias()', async () => {
    component.datosDelEstablecimientoForm = component.datosDelEstablecimientoForm || {};
    component.datosDelEstablecimientoForm.get = jest.fn().mockReturnValue({
      value: {}
    });
    component.store = component.store || {};
    component.store.addMercanciasDatos = jest.fn();
    component.agregarMercanias();
    expect(component.datosDelEstablecimientoForm.get).toHaveBeenCalled();
    expect(component.store.addMercanciasDatos).toHaveBeenCalled();
  });

  it('should run #AcceptarEliminarScian()', async () => {

    component.AcceptarEliminarScian();

  });

  it('should run #setTablaSeleccionFabricante()', async () => {

    component.setTablaSeleccionFabricante({
      length: {}
    });

  });

  it('should run #eliminarPedimento()', async () => {
    component.pedimentos = component.pedimentos || {};
    component.pedimentos.splice = jest.fn();
    component.eliminarPedimento({});
    expect(component.pedimentos.splice).toHaveBeenCalled();
  });

  it('should run #abrirModal()', async () => {

    component.abrirModal();

  });

  it('should run #abrirModalmercancia()', async () => {

    component.abrirModalmercancia();

  });

  it('should run #eliminarMercanciaChecked()', async () => {
    component.pedimentos = component.pedimentos || {};
    component.pedimentos.splice = jest.fn();
    component.eliminarMercanciaChecked({});
    expect(component.pedimentos.splice).toHaveBeenCalled();
  });

  it('should run #abrirModalmercanciaChecked()', async () => {

    component.abrirModalmercanciaChecked();

  });

  it('should run #isValid()', async () => {
    component.validacionesService = component.validacionesService || {};
    component.validacionesService.isValid = jest.fn();
    component.isValid({}, {});
    expect(component.validacionesService.isValid).toHaveBeenCalled();
  });

  it('should run #setValoresStore()', async () => {
    component.store = component.store || {};
    component.store.setTestMethod = jest.fn(); // Mock a specific store method
    component.alCambiarSeleccion = jest.fn();
    
    const mockForm = {
      get: jest.fn().mockReturnValue({
        value: 'testValue'
      })
    };
    
    component.setValoresStore(mockForm, 'testField', 'setTestMethod');
    expect(mockForm.get).toHaveBeenCalledWith('testField');
    expect(component.store.setTestMethod).toHaveBeenCalledWith('testValue');
    expect(component.alCambiarSeleccion).toHaveBeenCalledWith(mockForm, 'testField');
  });

  it('should run #donanteDomicilio()', async () => {
    component.fb = component.fb || {};
    component.fb.group = jest.fn();
    component.solicitudState = component.solicitudState || {};
    component.solicitudState.tipoOperacion = 'tipoOperacion';
    component.solicitudState.justificacion = 'justificacion';
    component.solicitudState.establecimiento = 'establecimiento';
    component.solicitudState.razonSocial = 'razonSocial';
    component.solicitudState.correoElectronico = 'correoElectronico';
    component.solicitudState.codigoPostal = 'codigoPostal';
    component.solicitudState.estado = 'estado';
    component.solicitudState.municipio = 'municipio';
    component.solicitudState.localidad = 'localidad';
    component.solicitudState.colonia = 'colonia';
    component.solicitudState.calle = 'calle';
    component.solicitudState.lada = 'lada';
    component.solicitudState.telefono = 'telefono';
    component.solicitudState.scian = 'scian';
    component.solicitudState.scianDatos = 'scianDatos';
    component.solicitudState.claveScian = 'claveScian';
    component.solicitudState.descripcionScian = 'descripcionScian';
    component.solicitudState.avisoDeFuncionamiento = 'avisoDeFuncionamiento';
    component.solicitudState.licenciaSanitaria = 'licenciaSanitaria';
    component.solicitudState.regimen = 'regimen';
    component.solicitudState.aduana = 'aduana';
    component.solicitudState.immex = 'immex';
    component.solicitudState.ano = 'ano';
    component.solicitudState.clasificacionProducto = 'clasificacionProducto';
    component.solicitudState.especificarClasificacionProducto = 'especificarClasificacionProducto';
    component.solicitudState.denominacionProducto = 'denominacionProducto';
    component.solicitudState.marca = 'marca';
    component.solicitudState.tipoProducto = 'tipoProducto';
    component.solicitudState.especifique = 'especifique';
    component.solicitudState.fraccionArancelaria = 'fraccionArancelaria';
    component.solicitudState.descripcionFraccionArancelaria = 'descripcionFraccionArancelaria';
    component.solicitudState.cantidadUMT = 'cantidadUMT';
    component.solicitudState.umt = 'umt';
    component.solicitudState.cantidadUMC = 'cantidadUMC';
    component.solicitudState.umc = 'umc';
    component.solicitudState.claveLote = 'claveLote';
    component.solicitudState.listaClave = 'listaClave';
    component.solicitudState.manfestosYDeclaraciones = 'manfestosYDeclaraciones';
    component.solicitudState.hacerlosPublicos = 'hacerlosPublicos';
    component.solicitudState.rfc = 'rfc';
    component.solicitudState.nombreRazon = 'nombreRazon';
    component.solicitudState.apellidoPaterno = 'apellidoPaterno';
    component.solicitudState.apellidoMaterno = 'apellidoMaterno';
    component.donanteDomicilio();
    expect(component.fb.group).toHaveBeenCalled();
  });

  it('should run #eliminarPedimentoMercancia()', async () => {
    component.pedimentos = [];
    component.pedimentos.splice = jest.fn();
    component.certificadoDisponsiblesTablaDatos = [];
    component.certificadoDisponsiblesTablaDatos.pop = jest.fn();
    component.elementoParaEliminar = 0;
    component.tieneFilaSeleccionadaFabricante = true;
    component.esCheckboxSeleccionado = true;
    
    component.eliminarPedimentoMercancia(true); // Pass true to trigger borrar condition
    expect(component.pedimentos.splice).toHaveBeenCalledWith(0, 1);
    expect(component.certificadoDisponsiblesTablaDatos.pop).toHaveBeenCalled();
  });

  it('should run #buscarRFC()', async () => {
    component.datosDelEstablecimientoForm = component.datosDelEstablecimientoForm || {};
    component.datosDelEstablecimientoForm.get = jest.fn().mockReturnValue({
      value: 'MAVL621207C95' // Provide the hardcoded RFC value that triggers the logic
    });
    component.datosDelEstablecimientoForm.patchValue = jest.fn();
    component.abrirRfcModal = jest.fn();
    component.store = component.store || {};
    component.store.setNombreRazon = jest.fn();
    component.store.setApellidoPaterno = jest.fn();
    component.store.setApellidoMaterno = jest.fn();
    
    component.buscarRFC();
    expect(component.datosDelEstablecimientoForm.get).toHaveBeenCalledWith('rfc');
    expect(component.datosDelEstablecimientoForm.patchValue).toHaveBeenCalled();
    expect(component.store.setNombreRazon).toHaveBeenCalledWith('MARIA ALEJANDRA');
    expect(component.store.setApellidoPaterno).toHaveBeenCalledWith('VELASCO');
    expect(component.store.setApellidoMaterno).toHaveBeenCalledWith('LOPEZ');
    expect(component.abrirRfcModal).not.toHaveBeenCalled(); // Should not be called when RFC exists
  });

  it('should run #abrirRfcModal()', async () => {

    component.abrirRfcModal();

  });

  it('should run #ngOnDestroy()', async () => {
    component.destroyed$ = component.destroyed$ || {};
    component.destroyed$.next = jest.fn();
    component.destroyed$.complete = jest.fn();
    component.ngOnDestroy();
    expect(component.destroyed$.next).toHaveBeenCalled();
    expect(component.destroyed$.complete).toHaveBeenCalled();
  });

});