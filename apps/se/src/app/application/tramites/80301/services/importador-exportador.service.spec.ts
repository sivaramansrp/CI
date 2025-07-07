// @ts-nocheck
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { ImportadorExportadorService } from './importador-exportador.service';
import { HttpClient } from '@angular/common/http';
import { Tramite80301Store } from '../estados/tramite80301.store';

@Injectable()
class MockHttpClient {
  post() {};
}

@Injectable()
class MockTramite80301Store {}

describe('ImportadorExportadorService', () => {
  let service;

  beforeEach(() => {
    service = new ImportadorExportadorService({}, {});
  });

  it('should run #getAduanaIngresara()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.store = service.store || {};
    service.store.setAduana = jest.fn();
    service.getAduanaIngresara();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #getAno()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.store = service.store || {};
    service.store.setAno = jest.fn();
    service.getAno();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #getCondicion()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.store = service.store || {};
    service.store.setCondicion = jest.fn();
    service.getCondicion();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #getPais()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.store = service.store || {};
    service.store.setPais = jest.fn();
    service.getPais();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #getTipoDocumento()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.store = service.store || {};
    service.store.setTipoDocumento = jest.fn();
    service.getTipoDocumento();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #getFechasSeleccionadas()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.store = service.store || {};
    service.store.setFechasSeleccionadas = jest.fn();
    service.getFechasSeleccionadas();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #getDocumentos()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.store = service.store || {};
    service.store.setDocumentos = jest.fn();
    service.getDocumentos();
    expect(service.http.get).toHaveBeenCalled();
  });

});