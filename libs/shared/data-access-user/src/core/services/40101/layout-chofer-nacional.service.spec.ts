// @ts-nocheck
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { LayoutChoferNacionalService } from './layout-chofer-nacional.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
class MockHttpClient {
  post() {};
}

describe('LayoutChoferNacionalService', () => {
  let service;

  beforeEach(() => {
    service = new LayoutChoferNacionalService({});
  });

  it('should run #getChoferNacionalData()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getChoferNacionalData();
  });

});
