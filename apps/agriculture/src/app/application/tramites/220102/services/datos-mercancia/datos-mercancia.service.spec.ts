// @ts-nocheck
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { DatosMercanciaService } from './datos-mercancia.service';
import { HttpClient } from '@angular/common/http';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';

@Injectable()
class MockHttpClient {
  post() { };
}

describe('DatosMercanciaService', () => {
  let service;

  beforeEach(() => {
    service = new DatosMercanciaService({}, {});
  });

  it('should run #obtenerSelectorList()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.obtenerSelectorList({});
  });

});