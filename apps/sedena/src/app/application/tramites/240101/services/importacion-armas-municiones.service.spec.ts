// @ts-nocheck
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { ImportacionArmasMunicionesService } from './importacion-armas-municiones.service';
import { HttpClient } from '@angular/common/http';
import { Tramite240101Store } from '../estados/tramite240101Store.store';

@Injectable()
class MockHttpClient {
  post() {};
}

@Injectable()
class MockTramite240101Store {}

describe('ImportacionArmasMunicionesService', () => {
  let service;

  beforeEach(() => {
    service = new ImportacionArmasMunicionesService({}, {});
  });

  it('should run #actualizarEstadoFormulario()', async () => {
    service.tramite240101Store = service.tramite240101Store || {};
    service.tramite240101Store.update = jest.fn().mockReturnValue([
      null
    ]);
    service.actualizarEstadoFormulario({});
    expect(service.tramite240101Store.update).toHaveBeenCalled();
  });

  it('should run #obtenerRegistroTomarMuestrasDatos()', async () => {
    service.httpClient = service.httpClient || {};
    service.httpClient.get = jest.fn();
    service.obtenerRegistroTomarMuestrasDatos();
    expect(service.httpClient.get).toHaveBeenCalled();
  });

});