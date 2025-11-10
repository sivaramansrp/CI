// @ts-nocheck
import { async, TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Solocitud110201Service } from './service110201.service';
import { HttpClient } from '@angular/common/http';
import { Tramites110201Store } from './../state/tramites110201.store';
import { Tramites110201Query } from '../state/tramites110201.query';
import { HttpCoreService } from '@libs/shared/data-access-user/src';

@Injectable()
class MockHttpClient {
  post() {};
}

@Injectable()
class MockTramites110201Store {
  setEntidadFederativa() {};
  setBloque() {}
  setFraccionArancelariaForm() {}
  setRegistroProductoForm() {}
  setNombreComercialForm() {}
  setFechaInicio() {}
  setFechaFinal() {}
  setTercerOperador() {}
  setMarca() {}
  setUmc() {}
  setCantidad() {}
  setValorDeLa() {}
  setComplementoDescripcion() {}
  setNFactura() {}
  setTipoDeFactura() {}
  setFechaFactura() {}
  setNombres() {}
  setPrimerApellido() {}
  setSegundoApellido() {}
  setNumeroFiscal() {}
  setRazonSocial() {}
  setCiudad() {}
  setCalle() {}
  setNumeroLetra() {}
  setLada() {}
  setTelefono() {}
  setFax() {}
  setCorreoElectronico() {}
  setPaisDestino() {}
  setMedioTransporte() {}
  setRutaCompleta() {}
  setPuertoDesembarque() {}
  setPuertoEmbarque() {}
  setObservaciones() {}
  setIdioma() {}
  setEntidadFederativaCertificado() {}
  setRepresentacionFederal() {}

}

@Injectable()
class MockTramites110201Query {}

describe('Solocitud110201Service', () => {
  let service: Solocitud110201Service;

beforeEach(() => {
  TestBed.configureTestingModule({
    providers: [
      Solocitud110201Service,
      { provide: HttpClient, useClass: MockHttpClient },
      { provide: Tramites110201Store, useClass: MockTramites110201Store },
      { provide: Tramites110201Query, useClass: MockTramites110201Query },
      { provide: HttpCoreService, useValue: { post: jest.fn(), get: jest.fn() } }
    ]
  });

  service = TestBed.inject(Solocitud110201Service);
});


  it('should run #actualizarEstadoFormulario()', async () => {
    service.Tramites110201Store = service.Tramites110201Store || {};
    service.Tramites110201Store.setEntidadFederativa = jest.fn();
    service.Tramites110201Store.setBloque = jest.fn();
    service.Tramites110201Store.setFraccionArancelariaForm = jest.fn();
    service.Tramites110201Store.setRegistroProductoForm = jest.fn();
    service.Tramites110201Store.setNombreComercialForm = jest.fn();
    service.Tramites110201Store.setFechaInicio = jest.fn();
    service.Tramites110201Store.setFechaFinal = jest.fn();
    service.Tramites110201Store.setTercerOperador = jest.fn();
    service.Tramites110201Store.setMarca = jest.fn();
    service.Tramites110201Store.setUmc = jest.fn();
    service.Tramites110201Store.setCantidad = jest.fn();
    service.Tramites110201Store.setValorDeLa = jest.fn();
    service.Tramites110201Store.setComplementoDescripcion = jest.fn();
    service.Tramites110201Store.setNFactura = jest.fn();
    service.Tramites110201Store.setTipoDeFactura = jest.fn();
    service.Tramites110201Store.setFechaFactura = jest.fn();
    service.Tramites110201Store.setNombres = jest.fn();
    service.Tramites110201Store.setPrimerApellido = jest.fn();
    service.Tramites110201Store.setSegundoApellido = jest.fn();
    service.Tramites110201Store.setNumeroFiscal = jest.fn();
    service.Tramites110201Store.setRazonSocial = jest.fn();
    service.Tramites110201Store.setCiudad = jest.fn();
    service.Tramites110201Store.setCalle = jest.fn();
    service.Tramites110201Store.setNumeroLetra = jest.fn();
    service.Tramites110201Store.setLada = jest.fn();
    service.Tramites110201Store.setTelefono = jest.fn();
    service.Tramites110201Store.setFax = jest.fn();
    service.Tramites110201Store.setCorreoElectronico = jest.fn();
    service.Tramites110201Store.setPaisDestino = jest.fn();
    service.Tramites110201Store.setMedioTransporte = jest.fn();
    service.Tramites110201Store.setRutaCompleta = jest.fn();
    service.Tramites110201Store.setPuertoDesembarque = jest.fn();
    service.Tramites110201Store.setPuertoEmbarque = jest.fn();
    service.Tramites110201Store.setObservaciones = jest.fn();
    service.Tramites110201Store.setIdioma = jest.fn();
    service.Tramites110201Store.setEntidadFederativaCertificado = jest.fn();
    service.Tramites110201Store.setRepresentacionFederal = jest.fn();
    service.actualizarEstadoFormulario({
      entidadFederativa: {},
      bloque: {},
      fraccionArancelariaForm: {},
      registroProductoForm: {},
      nombreComercialForm: {},
      fechaInicio: {},
      fechaFinal: {},
      tercerOperador: {},
      marca: {},
      umc: {},
      cantidad: {},
      valorDeLa: {},
      complementoDescripcion: {},
      nFactura: {},
      tipoDeFactura: {},
      fechaFactura: {},
      nombres: {},
      primerApellido: {},
      segundoApellido: {},
      numeroFiscal: {},
      razonSocial: {},
      ciudad: {},
      calle: {},
      numeroLetra: {},
      lada: {},
      telefono: {},
      fax: {},
      correoElectronico: {},
      paisDestino: {},
      medioTransporte: {},
      rutaCompleta: {},
      puertoDeEmbarque: {},
      puertoDeDesembarque: {},
      observaciones: {},
      idioma: {},
      entidadFederativaCertificado: {},
      representacionFederal: {}
    });
  });

  it('should run #getRegistroTomaMuestrasMercanciasData()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getRegistroTomaMuestrasMercanciasData();
  });

  it('should run #getAllState()', async () => {
    service.query = service.query || {};
    service.query.selectSolicitud$ = 'selectSolicitud$';
    service.getAllState();

  });

  it('should run #buscarMercanciasCert()', async () => {
    service.httpService = service.httpService || {};
    service.httpService.post = jest.fn().mockReturnValue(observableOf('post'));
    service.buscarMercanciasCert({});
  });

  it('should run #guardarDatosPost()', async () => {
    service.httpService = service.httpService || {};
    service.httpService.post = jest.fn().mockReturnValue(observableOf('post'));
    service.guardarDatosPost({});
  });

  it('should run #buildMercanciaSeleccionadas()', async () => {

    service.buildMercanciaSeleccionadas([{}]);

  });

  it('should run #buildDatosCertificado()', async () => {

    service.buildDatosCertificado({
      formDatosCertificado: {
        'observacionesDates': {},
        'idiomaDates': {},
        'presentaDates': {},
        'precisaDates': {},
        'EntidadFederativaDates': {},
        'representacionFederalDates': {}
      }
    });

  });

  it('should run #buildCertificado()', async () => {
    service.buildMercanciaSeleccionadas = jest.fn();
    service.buildCertificado({
      formCertificado: {
        'entidadFederativa': {},
        'bloque': {},
        'fraccionArancelaria': {},
        'nombreComercial': {},
        'fechaInicio': {},
        'fechaFin': {},
        'registroProducto': {}
      },
      mercanciaTabla: {}
    });
  });

  it('should run #buildDestinatario()', async () => {

    service.buildDestinatario({
      formDatosDelDestinatario: {
        'nombres': {},
        'primerApellido': {},
        'segundoApellido': {},
        'numeroDeRegistroFiscal': {},
        'razonSocial': {}
      },
      formDestinatario: {
        'ciudad': {},
        'calle': {},
        'numeroLetra': {},
        'lada': {},
        'telefono': {},
        'fax': {},
        'correoElectronico': {},
        'paisDestin': {}
      },
      medioDeTransporteSeleccion: {
        clave: {}
      },
      rutaCompleta: {},
      puertoDeEmbarque: {},
      puertoDeDesembarque: {}
    });

  });

});