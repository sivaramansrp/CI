// @ts-nocheck
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { ExportacionMateriasPrimasService } from './exportacion-materias-primas.service';
import { HttpClient } from '@angular/common/http';
import { Tramite260302Store } from '../estados/tramite260302Store.store';

@Injectable()
class MockHttpClient {
  post() {};
}

@Injectable()
class MockTramite260302Store {}

describe('ExportacionMateriasPrimasService', () => {
  let service;

  beforeEach(() => {
    service = new ExportacionMateriasPrimasService({}, {});
  });

  it('should run #obtenerOstro()', async () => {
    service.httpServicios = service.httpServicios || {};
    service.httpServicios.get = jest.fn();
    service.obtenerOstro();
    expect(service.httpServicios.get).toHaveBeenCalled();
  });

  it('should run #actualizarEstadoFormulario()', async () => {
    service.tramite260302Store = service.tramite260302Store || {};
    service.tramite260302Store.update = jest.fn().mockReturnValue([
      null
    ]);
    service.actualizarEstadoFormulario({});
    expect(service.tramite260302Store.update).toHaveBeenCalled();
  });

  it('should run #getTramiteDatos()', async () => {
    service.httpServicios = service.httpServicios || {};
    service.httpServicios.get = jest.fn();
    service.getTramiteDatos();
    expect(service.httpServicios.get).toHaveBeenCalled();
  });

});