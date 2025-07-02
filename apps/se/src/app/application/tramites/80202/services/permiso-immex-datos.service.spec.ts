// @ts-nocheck
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { PermisoImmexDatosService } from './permiso-immex-datos.service';
import { HttpClient } from '@angular/common/http';
import { ImmexAmpliacionSensiblesStore } from '../estados/immex-ampliacion-sensibles.store';

@Injectable()
class MockHttpClient {
  post() {};
}

@Injectable()
class MockImmexAmpliacionSensiblesStore {}

describe('PermisoImmexDatosService', () => {
  let service;

  beforeEach(() => {
    service = new PermisoImmexDatosService({}, {});
  });

  it('should run #getDatos()', async () => {
    service.httpClient = service.httpClient || {};
    service.httpClient.get = jest.fn().mockReturnValue(observableOf({}));
    service.getDatos();
    expect(service.httpClient.get).toHaveBeenCalled();
  });

  it('should run #getRegistroTomaMuestrasMercanciasData()', async () => {
    service.httpClient = service.httpClient || {};
    service.httpClient.get = jest.fn();
    service.getRegistroTomaMuestrasMercanciasData();
    expect(service.httpClient.get).toHaveBeenCalled();
  });

  it('should run #actualizarEstadoFormulario()', async () => {
    service.tramite80202Store = service.tramite80202Store || {};
    service.tramite80202Store.setFraccionArancelariaSensibles = jest.fn();
    service.tramite80202Store.setFraccionArancelaria = jest.fn();
    service.tramite80202Store.setDescripcionDelProducto = jest.fn();
    service.tramite80202Store.setTablaFraccionArancelaria = jest.fn();
    service.tramite80202Store.setTablaFraccionDeImportacion = jest.fn();
    service.actualizarEstadoFormulario({
      fraccionArancelariaSensibles: {},
      fraccionArancelaria: {},
      descripciondelproducto: {},
      tablaFraccionArancelaria: {},
      tablaFraccionDeImportacion: {}
    });
    expect(service.tramite80202Store.setFraccionArancelariaSensibles).toHaveBeenCalled();
    
  });

});