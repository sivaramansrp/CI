// @ts-nocheck
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { AutorizacionProgrmaNuevoService } from './autorizacion-programa-nuevo.service';
import { HttpClient } from '@angular/common/http';
import { Tramite80102Store } from '../estados/tramite80102.store';

@Injectable()
class MockHttpClient {
  post() {};
}

@Injectable()
class MockTramite80102Store {}

describe('AutorizacionProgrmaNuevoService', () => {
  let service;

  beforeEach(() => {
    service = new AutorizacionProgrmaNuevoService({}, {});
  });

  it('should run #getDatos()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({data: {}}));
    service.getDatos().subscribe(() => {
      expect(service.http.get).toHaveBeenCalled();
    });
  });

  it('should run #obtenerIngresoSelectList()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({data: {}}));
    service.obtenerIngresoSelectList().subscribe(() => {
      expect(service.http.get).toHaveBeenCalled();
    });
  });

  it('should run #obtenerListaEstado()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.obtenerListaEstado();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #getSubfabricantesDisponibles()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({data:{}}));
    service.getSubfabricantesDisponibles().subscribe(() => {
      expect(service.http.get).toHaveBeenCalled();
    });
  });

  it('should run #obtenerComplimentos()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn().mockReturnValue(observableOf({data: {}}));
    service.obtenerComplimentos();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #actualizarEstadoFormulario()', async () => {
    service.tramite80102Store = service.tramite80102Store || {};
    service.tramite80102Store.update = jest.fn().mockReturnValue([
      'test'
    ]);
    service.actualizarEstadoFormulario({});
    expect(service.tramite80102Store.update).toHaveBeenCalled();
  });

  it('should run #getRegistroTomaMuestrasMercanciasData()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getRegistroTomaMuestrasMercanciasData();
    expect(service.http.get).toHaveBeenCalled();
  });

});