// @ts-nocheck
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { PermisoImmexDatosService } from './permiso-immex-datos.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
class MockHttpClient {
  post() {};
}

describe('PermisoImmexDatosService', () => {
  let service;

  beforeEach(() => {
    service = new PermisoImmexDatosService({});
  });

  it('should run #getDatos()', async () => {
    service.httpClient = service.httpClient || {};
    service.httpClient.get = jest.fn().mockReturnValue(observableOf({}));
    service.getDatos();
    // expect(service.httpClient.get).toHaveBeenCalled();
  });

});