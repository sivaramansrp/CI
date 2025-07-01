// @ts-nocheck
import { async } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf, throwError } from 'rxjs';

import { ExportacionMedicamentosContenganService } from './exportacion-medicamentos-contengan.service';
import { HttpClient } from '@angular/common/http';
import { Tramite260304Store } from '../estados/tramite260304Store.store';

@Injectable()
class MockHttpClient {
  post() {};
}

@Injectable()
class MockTramite260304Store {}

describe('ExportacionMedicamentosContenganService', () => {
  let service;

  beforeEach(() => {
    service = new ExportacionMedicamentosContenganService({}, {});
  });

  it('should run #obtenerOstro()', async () => {
    service.httpServicios = service.httpServicios || {};
    service.httpServicios.get = jest.fn();
    service.obtenerOstro();
    expect(service.httpServicios.get).toHaveBeenCalled();
  });

  it('should run #getAcuiculturaData()', async () => {
    service.httpServicios = service.httpServicios || {};
    service.httpServicios.get = jest.fn();
    service.getAcuiculturaData();
    expect(service.httpServicios.get).toHaveBeenCalled();
  });

  it('should run #actualizarEstadoFormulario()', async () => {
    service.store = service.store || {};
    service.store.updateOpcionConfigDatos = jest.fn();
    service.store.updateDestinatarioTablaDatos = jest.fn();
    service.store.updateOtrosTablaDatos = jest.fn();
    service.store.updateSeleccionadoOtrosDatos = jest.fn();
    service.store.updateSeleccionadoDestinatarioDatos = jest.fn();
    service.store.updateScianConfigDatos = jest.fn();
    service.store.updateTablaMercanciasConfigDatos = jest.fn();
    service.store.updatePagoDerechos = jest.fn();
    service.store.updateTabSeleccionado = jest.fn();
    service.actualizarEstadoFormulario({
      opcionConfigDatos: {},
      destinatarioTableDatos: {},
      otrosTablaDatos: {},
      seleccionadoOtrosDatos: {},
      seleccionadoDestinatarioDatos: {},
      scianConfigDatos: {},
      tablaMercanciasConfigDatos: {},
      pagoDerechos: {},
      tabSeleccionado: {}
    });
    expect(service.store.updateOpcionConfigDatos).toHaveBeenCalled();
    expect(service.store.updateDestinatarioTablaDatos).toHaveBeenCalled();
    expect(service.store.updateOtrosTablaDatos).toHaveBeenCalled();
    expect(service.store.updateSeleccionadoOtrosDatos).toHaveBeenCalled();
    expect(service.store.updateSeleccionadoDestinatarioDatos).toHaveBeenCalled();
    expect(service.store.updateScianConfigDatos).toHaveBeenCalled();
    expect(service.store.updateTablaMercanciasConfigDatos).toHaveBeenCalled();
    expect(service.store.updatePagoDerechos).toHaveBeenCalled();
    expect(service.store.updateTabSeleccionado).toHaveBeenCalled();
  });

});