// @ts-nocheck
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Injectable } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';

import { ImportacionMateriasPrimasService } from './importacion-materias-primas.service';
import { Tramite260301Store } from '../estados/tramite260301Store.store';
import { Facturador } from '../../../shared/models/terceros-relacionados.model';

@Injectable()
class MockTramite260301Store {
  updateDatosSolicitudFormState = jest.fn();
  updateFabricanteTablaDatos = jest.fn();
  updateCertificadoTablaDatos = jest.fn();
  updateProveedorTablaDatos = jest.fn();
  updateFacturadorTablaDatos = jest.fn();
  updateOtrosTablaDatos = jest.fn();
  updateOpcionConfigDatos = jest.fn();
  updateScianConfigDatos = jest.fn();
  updateTablaMercanciasConfigDatos = jest.fn();
  updatePagoDerechos = jest.fn();
  updateTabSeleccionado = jest.fn();
}

describe('ImportacionMateriasPrimasService', () => {
  let service: ImportacionMateriasPrimasService;
  let httpMock: HttpTestingController;
  let mockStore: MockTramite260301Store;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ImportacionMateriasPrimasService,
        { provide: Tramite260301Store, useClass: MockTramite260301Store }
      ]
    });
    service = TestBed.inject(ImportacionMateriasPrimasService);
    httpMock = TestBed.inject(HttpTestingController);
    mockStore = TestBed.inject(Tramite260301Store) as MockTramite260301Store;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should run #obtenerOstro()', () => {
    const mockFacturador: Facturador = { 
      // Add mock properties based on Facturador interface
      id: 1,
      nombre: 'Test Facturador'
    };

    service.obtenerOstro().subscribe(data => {
      expect(data).toEqual(mockFacturador);
    });

    const req = httpMock.expectOne('assets/json/260301/buscar-otros.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockFacturador);
  });

  it('should run #getAcuiculturaData()', () => {
    const mockTramiteState = {
      // Add mock properties based on Tramite260301State interface
      datosSolicitudFormState: {},
      fabricanteTablaDatos: [],
      certificadoTablaDatos: [],
      proveedorTablaDatos: [],
      facturadorTablaDatos: [],
      otrosTablaDatos: [],
      opcionConfigDatos: {},
      scianConfigDatos: {},
      tablaMercanciasConfigDatos: {},
      pagoDerechos: {},
      tabSeleccionado: 0
    };

    service.getAcuiculturaData().subscribe(data => {
      expect(data).toEqual(mockTramiteState);
    });

    const req = httpMock.expectOne('assets/json/260301/forma.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockTramiteState);
  });

  it('should run #actualizarEstadoFormulario()', () => {
    const mockDatos = {
      datosSolicitudFormState: {},
      fabricanteTablaDatos: [],
      certificadoTablaDatos: [],
      proveedorTablaDatos: [],
      facturadorTablaDatos: [],
      otrosTablaDatos: [],
      opcionConfigDatos: {},
      scianConfigDatos: {},
      tablaMercanciasConfigDatos: {},
      pagoDerechos: {},
      tabSeleccionado: 1
    };

    service.actualizarEstadoFormulario(mockDatos);

    expect(mockStore.updateDatosSolicitudFormState).toHaveBeenCalledWith(mockDatos.datosSolicitudFormState);
    expect(mockStore.updateFabricanteTablaDatos).toHaveBeenCalledWith(mockDatos.fabricanteTablaDatos);
    expect(mockStore.updateCertificadoTablaDatos).toHaveBeenCalledWith(mockDatos.certificadoTablaDatos);
    expect(mockStore.updateProveedorTablaDatos).toHaveBeenCalledWith(mockDatos.proveedorTablaDatos);
    expect(mockStore.updateFacturadorTablaDatos).toHaveBeenCalledWith(mockDatos.facturadorTablaDatos);
    expect(mockStore.updateOtrosTablaDatos).toHaveBeenCalledWith(mockDatos.otrosTablaDatos);
    expect(mockStore.updateOpcionConfigDatos).toHaveBeenCalledWith(mockDatos.opcionConfigDatos);
    expect(mockStore.updateScianConfigDatos).toHaveBeenCalledWith(mockDatos.scianConfigDatos);
    expect(mockStore.updateTablaMercanciasConfigDatos).toHaveBeenCalledWith(mockDatos.tablaMercanciasConfigDatos);
    expect(mockStore.updatePagoDerechos).toHaveBeenCalledWith(mockDatos.pagoDerechos);
    expect(mockStore.updateTabSeleccionado).toHaveBeenCalledWith(1);
    });

});