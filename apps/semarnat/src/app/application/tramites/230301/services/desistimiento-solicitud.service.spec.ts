// @ts-nocheck
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { DesistimientoSolicitudService } from './desistimiento-solicitud.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
class MockHttpClient {
  post() {};
}

describe('DesistimientoSolicitudService', () => {
  let service;

  beforeEach(() => {
    service = new DesistimientoSolicitudService({});
  });

  it('should run #getDesistimientoSolicitud()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getDesistimientoSolicitud({});
    // expect(service.http.get).toHaveBeenCalled();
  });

});