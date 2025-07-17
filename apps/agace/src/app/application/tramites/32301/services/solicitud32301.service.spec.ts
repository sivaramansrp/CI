// @ts-nocheck
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { Solicitud32301Service } from './solicitud32301.service';
import { HttpClient } from '@angular/common/http';
import { Tramite32301Store } from '../estados/tramite32301.store';

@Injectable()
class MockHttpClient {
  post() {};
}

@Injectable()
class MockTramite32301Store {}

describe('Solicitud32301Service', () => {
  let service;

  beforeEach(() => {
    service = new Solicitud32301Service({}, {});
  });

  it('should run #actualizarEstadoFormulario()', async () => {
    service.tramite301Store = service.tramite301Store || {};
    service.tramite301Store.setModalidadCertificacion = jest.fn();
    service.tramite301Store.setClientesProveedoresExtranjeros = jest.fn();
    service.tramite301Store.setProveedoresNacionales = jest.fn();
    service.tramite301Store.setModificacionesMiembros = jest.fn();
    service.tramite301Store.setCambiosDocumentosLegales = jest.fn();
    service.tramite301Store.setNotifiFusionOescision = jest.fn();
    service.tramite301Store.setAdicionalesFractions = jest.fn();
    service.tramite301Store.setAceptacion253 = jest.fn();
    service.tramite301Store.setArchivoExtranjero = jest.fn();
    service.tramite301Store.setRegistrosProveedoresExtranjeros = jest.fn();
    service.tramite301Store.setSnsucarácterde = jest.fn();
    service.tramite301Store.setRfc = jest.fn();
    service.tramite301Store.setObligadoaTributarenMéxico = jest.fn();
    service.tramite301Store.setNacionalidad = jest.fn();
    service.tramite301Store.setModificacionGoceInmueble = jest.fn();
    service.tramite301Store.SetpersonaFusionEscisionDTO = jest.fn();
    service.tramite301Store.setNombreCompleto = jest.fn();
    service.actualizarEstadoFormulario({
      tipoDevAviso: {
        modalidadCertificacion: {},
        foreignClientsSuppliers: {},
        nationalSuppliers: {},
        modificationsMembers: {},
        changesToLegalDocuments: {},
        mergerOrSplitNotice: {},
        additionFractions: {},
        acepto253: {}
      },
      proveedorExtranjero: {},
      modificacionSocios: {
        ensucarácterde: {},
        rfc: {},
        obligadoaTributarenMéxico: {},
        nacionalidad: {},
        nombreCompleto: {}
      },
      modificacionGoceInmueble: {},
      personaFusionEscisionDTO: {}
    });
    expect(service.tramite301Store.setModalidadCertificacion).toHaveBeenCalled();
    expect(service.tramite301Store.setClientesProveedoresExtranjeros).toHaveBeenCalled();
    expect(service.tramite301Store.setProveedoresNacionales).toHaveBeenCalled();
    expect(service.tramite301Store.setModificacionesMiembros).toHaveBeenCalled();
    expect(service.tramite301Store.setCambiosDocumentosLegales).toHaveBeenCalled();
    expect(service.tramite301Store.setNotifiFusionOescision).toHaveBeenCalled();
    expect(service.tramite301Store.setAdicionalesFractions).toHaveBeenCalled();
    expect(service.tramite301Store.setAceptacion253).toHaveBeenCalled();
    expect(service.tramite301Store.setArchivoExtranjero).toHaveBeenCalled();
    expect(service.tramite301Store.setRegistrosProveedoresExtranjeros).toHaveBeenCalled();
    expect(service.tramite301Store.setSnsucarácterde).toHaveBeenCalled();
    expect(service.tramite301Store.setRfc).toHaveBeenCalled();
    expect(service.tramite301Store.setObligadoaTributarenMéxico).toHaveBeenCalled();
    expect(service.tramite301Store.setNacionalidad).toHaveBeenCalled();
    expect(service.tramite301Store.setModificacionGoceInmueble).toHaveBeenCalled();
    expect(service.tramite301Store.SetpersonaFusionEscisionDTO).toHaveBeenCalled();
    expect(service.tramite301Store.setNombreCompleto).toHaveBeenCalled();
  });

  it('should run #getRegistroTomaMuestrasMercanciasData()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getRegistroTomaMuestrasMercanciasData();
    // expect(service.http.get).toHaveBeenCalled();
  });

});