// @ts-nocheck
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { ConcluirRelacionService } from './concluir-relacion.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
class MockHttpClient {
  post() {};
}

describe('ConcluirRelacionService', () => {
  let service;

  beforeEach(() => {
    service = new ConcluirRelacionService({});
  });

  it('should run #obtenerTablerList()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({}));
    service.obtenerTablerList({});
    // expect(service.http.get).toHaveBeenCalled();
  });

});