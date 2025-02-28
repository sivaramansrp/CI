// @ts-nocheck
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { ImportadorExportadorService } from './importador-exportador.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
class MockHttpClient {
  post() {};
}

describe('ImportadorExportadorService', () => {
  let service;

  beforeEach(() => {
    service = new ImportadorExportadorService({});
  });

  it('should run #getAduanaIngresara()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getAduanaIngresara();
    // expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #getAno()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getAno();
    // expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #getCondicion()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getCondicion();
    // expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #getPais()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getPais();
    // expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #getTipoDocumento()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getTipoDocumento();
    // expect(service.http.get).toHaveBeenCalled();
  });

});