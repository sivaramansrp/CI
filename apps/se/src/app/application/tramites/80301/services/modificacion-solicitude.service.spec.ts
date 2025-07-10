// @ts-nocheck
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { ModificacionSolicitudeService } from './modificacion-solicitude.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
class MockHttpClient {
  post() {};
}

describe('ModificacionSolicitudeService', () => {
  let service;

  beforeEach(() => {
    service = new ModificacionSolicitudeService({});
  });

  it('should run #obtenerListaEstado()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.obtenerListaEstado();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #obtenerDomicilios()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.obtenerDomicilios();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #obtenerBitacora()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.obtenerBitacora();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #obtenerDatosGenerales()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.obtenerDatosGenerales();
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

});