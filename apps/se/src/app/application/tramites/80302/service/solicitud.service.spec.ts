// @ts-nocheck
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { SolicitudService } from './solicitud.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
class MockHttpClient {
  post() {};
}

describe('SolicitudService', () => {
  let service;

  beforeEach(() => {
    service = new SolicitudService({});
  });

  it('should run #getDatosSolicitante()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getDatosSolicitante();
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

  it('should run #obtenerTramiteDatos()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.obtenerTramiteDatos();
    expect(service.http.get).toHaveBeenCalled();
  });

});