// @ts-nocheck
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { OperacionService } from './operacion.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
class MockHttpClient {
  post() {};
}

describe('OperacionService', () => {
  let service;

  beforeEach(() => {
    service = new OperacionService({});
  });

  it('should run #obtenerSelectorList()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.obtenerSelectorList({});
    // expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #obtenerTablerList()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.obtenerTablerList({});
    // expect(service.http.get).toHaveBeenCalled();
  });

});