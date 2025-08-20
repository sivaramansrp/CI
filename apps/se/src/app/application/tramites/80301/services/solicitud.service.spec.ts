import { TestBed } from '@angular/core/testing';
import { SolicitudService } from './solicitud.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { Tramite80301Store } from '../estados/tramite80301.store';
import {
  Solicitud80301State,
  Solicitud80301StateObj,
} from '../estados/tramite80301.store';
import { DatosDelModificacion } from '../models/datos-tramite.model';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';

import {
  Anexo,
  Bitacora,
  Complimentaria,
  Federetarios,
  Operacions,
} from '../models/plantas-consulta.model';

describe('SolicitudService', () => {
  let service: SolicitudService;
  let httpClientSpy: jest.Mocked<HttpClient>;
  let storeSpy: jest.Mocked<Tramite80301Store>;

  beforeEach(() => {
    httpClientSpy = {
      get: jest.fn(),
    } as any;

    storeSpy = {
      setRfc: jest.fn(),
      setFederal: jest.fn(),
      setTipo: jest.fn(),
      setPrograma: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      providers: [
        SolicitudService,
        { provide: HttpClient, useValue: httpClientSpy },
        { provide: Tramite80301Store, useValue: storeSpy },
      ],
    });
    service = TestBed.inject(SolicitudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getDatosDelSolicitante should return data', (done) => {
    const mockData: RespuestaCatalogos[] = [{ id: 1 } as any];
    httpClientSpy.get.mockReturnValue(of({ data: mockData }));
    service.getDatosDelSolicitante().subscribe((result) => {
      expect(result).toEqual(mockData);
      done();
    });
  });

  it('getDatosModificacion should return data', (done) => {
    const mockData: RespuestaCatalogos[] = [{ id: 2 } as any];
    httpClientSpy.get.mockReturnValue(of(mockData));
    service.getDatosModificacion().subscribe((result) => {
      expect(result).toEqual(mockData);
      done();
    });
  });

  it('getModificacion should return data', (done) => {
    const mockData: RespuestaCatalogos[] = [{ id: 3 } as any];
    httpClientSpy.get.mockReturnValue(of(mockData));
    service.getModificacion().subscribe((result) => {
      expect(result).toEqual(mockData);
      done();
    });
  });

  it('getDatosTableData should return table data', (done) => {
    const mockData: DatosDelModificacion[] = [{ campo: 'valor' } as any];
    httpClientSpy.get.mockReturnValue(of(mockData));
    service.getDatosTableData().subscribe((result) => {
      expect(result).toEqual(mockData);
      done();
    });
  });

  it('obtenerComplimentaria should return complimentaria data', (done) => {
    const mockData: Complimentaria[] = [{ nombre: 'test' } as any];
    httpClientSpy.get.mockReturnValue(of({ data: mockData }));
    service.obtenerComplimentaria().subscribe((result) => {
      expect(result).toEqual(mockData);
      done();
    });
  });

  it('obtenerAnexo should return anexo data', (done) => {
    const mockData: Anexo[] = [{ archivo: 'file.pdf' } as any];
    httpClientSpy.get.mockReturnValue(of({ data: mockData }));
    service.obtenerAnexo().subscribe((result) => {
      expect(result).toEqual(mockData);
      done();
    });
  });

  it('obtenerFederetarios should return federetarios data', (done) => {
    const mockData: Federetarios[] = [{ nombre: 'fed' } as any];
    httpClientSpy.get.mockReturnValue(of({ data: mockData }));
    service.obtenerFederetarios().subscribe((result) => {
      expect(result).toEqual(mockData);
      done();
    });
  });

  it('obtenerOperacion should return operacion data', (done) => {
    const mockData: Operacions[] = [{ operacion: 'op' } as any];
    httpClientSpy.get.mockReturnValue(of({ data: mockData }));
    service.obtenerOperacion().subscribe((result) => {
      expect(result).toEqual(mockData);
      done();
    });
  });

  it('obtenerBitacora should return bitacora data', (done) => {
    const mockData: Bitacora[] = [{ registro: 'bit' } as any];
    httpClientSpy.get.mockReturnValue(of({ data: mockData }));
    service.obtenerBitacora().subscribe((result) => {
      expect(result).toEqual(mockData);
      done();
    });
  });

  it('actualizarEstadoFormulario should call store methods', () => {
    const datos: Solicitud80301State = {
      datosModificacion: {
        rfc: 'RFC123',
        federal: 'FED',
        tipo: 'TIPO',
        programa: 'PROG',
      },
    } as any;
    service.actualizarEstadoFormulario(datos);
    expect(storeSpy.setRfc).toHaveBeenCalledWith('RFC123');
    expect(storeSpy.setFederal).toHaveBeenCalledWith('FED');
    expect(storeSpy.setTipo).toHaveBeenCalledWith('TIPO');
    expect(storeSpy.setPrograma).toHaveBeenCalledWith('PROG');
  });

  it('obtenerTramiteDatos should return tramite datos', (done) => {
    const mockData: Solicitud80301StateObj = { some: 'data' } as any;
    httpClientSpy.get.mockReturnValue(of(mockData));
    service.obtenerTramiteDatos().subscribe((result) => {
      expect(result).toEqual(mockData);
      done();
    });
  });
});