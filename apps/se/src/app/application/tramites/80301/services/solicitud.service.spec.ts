// @ts-nocheck
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { SolicitudService } from './solicitud.service';
import { HttpClient } from '@angular/common/http';
import { Tramite80301Store } from '../estados/tramite80301.store';

@Injectable()
class MockHttpClient {
  post() {};
}

@Injectable()
class MockTramite80301Store {}

describe('SolicitudService', () => {
  let service;

  beforeEach(() => {
    service = new SolicitudService({}, {});
  });

  it('should run #getDatosDelSolicitante()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.getDatosDelSolicitante();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #getDatosModificacion()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getDatosModificacion();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #getModificacion()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getModificacion();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #getDatosTableData()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getDatosTableData();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #obtenerComplimentaria()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.obtenerComplimentaria();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #obtenerAnexo()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.obtenerAnexo();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #obtenerFederetarios()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.obtenerFederetarios();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #obtenerOperacion()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.obtenerOperacion();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #obtenerBitacora()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.obtenerBitacora();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #actualizarEstadoFormulario()', async () => {
    service.store = service.store || {};
    service.store.setRfc = jest.fn();
    service.store.setFederal = jest.fn();
    service.store.setTipo = jest.fn();
    service.store.setPrograma = jest.fn();
    service.actualizarEstadoFormulario({
      datosModificacion: {
        rfc: {},
        federal: {},
        tipo: {},
        programa: {}
      }
    });
    expect(service.store.setRfc).toHaveBeenCalled();
    expect(service.store.setFederal).toHaveBeenCalled();
    expect(service.store.setTipo).toHaveBeenCalled();
    expect(service.store.setPrograma).toHaveBeenCalled();
  });

  it('should run #obtenerTramiteDatos()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.obtenerTramiteDatos();
    expect(service.http.get).toHaveBeenCalled();
  });

});