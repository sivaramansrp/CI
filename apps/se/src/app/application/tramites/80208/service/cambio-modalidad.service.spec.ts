// @ts-nocheck
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { CambioModalidadService } from './cambio-modalidad.service';
import { HttpClient } from '@angular/common/http';
import { CambioModalidadStore } from '../estados/tramite80208.store';

@Injectable()
class MockHttpClient {
  post() {};
}

@Injectable()
class MockCambioModalidadStore {}

describe('CambioModalidadService', () => {
  let service;

  beforeEach(() => {
    service = new CambioModalidadService({}, {});
  });

  it('should run #getDatosSimulados()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getDatosSimulados();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #getServiciosImmx()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getServiciosImmx();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #getCambioDeModalidad()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getCambioDeModalidad();
    expect(service.http.get).toHaveBeenCalled();
  });

  it('should run #actualizarEstadoFormulario()', async () => {
    service.cambioModalidadStore = service.cambioModalidadStore || {};
    service.cambioModalidadStore.setCambioDeModalidad = jest.fn();
    service.cambioModalidadStore.setCambioModalidad = jest.fn();
    service.cambioModalidadStore.setServiciosImmx = jest.fn();
    service.actualizarEstadoFormulario({
      combioDeModalidaDatos: {},
      cambioModalidad: {},
      serviciosImmx: {}
    });
    expect(service.cambioModalidadStore.setCambioDeModalidad).toHaveBeenCalled();
    expect(service.cambioModalidadStore.setCambioModalidad).toHaveBeenCalled();
    expect(service.cambioModalidadStore.setServiciosImmx).toHaveBeenCalled();
  });

  it('should run #getDatosDeLaSolicitudData()', async () => {
    service.http = service.http || {};
    service.http.get = jest.fn();
    service.getDatosDeLaSolicitudData();
    expect(service.http.get).toHaveBeenCalled();
  });

});