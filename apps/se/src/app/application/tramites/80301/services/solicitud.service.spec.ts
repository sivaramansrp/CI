import { TestBed } from '@angular/core/testing';
import { SolicitudService } from './solicitud.service';
import { Tramite80301Store } from '../estados/tramite80301.store';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';

import {
  Complimentaria,
  ExportacionImportacionPayload,
  Bitacora,
  Federetarios,
  Operacions,
} from '../models/plantas-consulta.model';

import {
  ImportacionExportacionFracciones,
  DatosDelModificacion,
  JSONRespuesta,
} from '../models/datos-tramite.model';

import {
  Solicitud80301State,
  Solicitud80301StateObj,
} from '../estados/tramite80301.store';

import { Tramite80301Query } from '../estados/tramite80301.query';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { of } from 'rxjs';
import { PROC_80301 } from '../servers/api-route';

describe('SolicitudService', () => {
  let service: SolicitudService;
  let storeSpy: jest.Mocked<Tramite80301Store>;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    storeSpy = {
      setRfc: jest.fn(),
      setFederal: jest.fn(),
      setTipo: jest.fn(),
      setPrograma: jest.fn(),
      _select: jest.fn().mockReturnValue(of({})),
      select: jest.fn().mockReturnValue(of({})),
      setDatosModificacion: jest.fn(),
    } as any;

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SolicitudService,
        { provide: Tramite80301Store, useValue: storeSpy },
        Tramite80301Query,
      ],
    });

    service = TestBed.inject(SolicitudService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getDatosDelSolicitante should return data', () => {
    const mockData: RespuestaCatalogos[] = [{ id: 1 } as any];

    service.getDatosDelSolicitante().subscribe((result) => {
      expect(result).toEqual(mockData);
    });

    const req = httpMock.expectOne((r) => r.method === 'GET');
    req.flush({ data: mockData });
  });

  it('getDatosModificacion should return data', () => {
    const mockData: RespuestaCatalogos[] = [{ id: 2 } as any];

    service.getDatosModificacion().subscribe((result) => {
      expect(result).toEqual(mockData);
    });

    const req = httpMock.expectOne((r) => r.method === 'GET');
    req.flush(mockData);
  });

  it('getModificacion should return data', () => {
    const mockData: RespuestaCatalogos[] = [{ id: 3 } as any];

    service.getDatosModificacion().subscribe((result) => {
      expect(result).toEqual(mockData);
    });

    const req = httpMock.expectOne((r) => r.method === 'GET');
    req.flush(mockData);
  });

  it('getDatosExportacionTableData should return table data', () => {
    const mockData: ImportacionExportacionFracciones[] = [
      { campo: 'valor' } as any,
    ];

    const payload: ExportacionImportacionPayload = {
      idSolicitud: '',
      tipoPrograma: 'TICPSE.IMMEX',
      folioPrograma: '2',
      discriminatorValue: '80301',
      rfc: 'TSD931210493',
      idPrograma: '1234',
    };

    service.getDatosExportacionTableData(payload).subscribe((result) => {
      expect(result).toEqual(mockData);
    });

    const req = httpMock.expectOne((r) => r.method === 'POST');
    req.flush(mockData);
  });

  it('obtenerComplimentaria should return complimentaria data', () => {
    const mockData: Complimentaria[] = [{ nombre: 'test' } as any];

    service.obtenerComplimentaria(['12345']).subscribe((result) => {
      expect(result).toEqual(mockData);
    });

    const req = httpMock.expectOne((r) => r.method === 'POST');
    req.flush({ data: mockData });
  });

  it('obtenerFederetarios should return federetarios data', () => {
    const mockData: Federetarios[] = [{ nombre: 'fed' } as any];

    service.obtenerFederetarios(['12345']).subscribe((result) => {
      expect(result).toEqual(mockData);
    });

    const req = httpMock.expectOne((r) => r.method === 'POST');
    req.flush({ data: mockData });
  });

  it('obtenerOperacion should return operacion data', () => {
    const mockData: Operacions[] = [{ nombre: 'nombre' } as any];

    service.obtenerOperacion(['12345']).subscribe(result => {
      expect(result).toEqual(mockData);
    });

    const req = httpMock.expectOne((r) =>
      r.url.includes('consulta-plantas') && r.method === 'POST'
    );

    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ idSolicitud: ['12345'] });

    req.flush({ data: mockData });
  });

  it('obtenerBitacora should return bitacora data', () => {
    const mockData: Bitacora[] = [{ registro: 'bit' } as any];

    service.obtenerBitacora('12345').subscribe((result) => {
      expect(result).toEqual(mockData);
    });

    const req = httpMock.expectOne((r) => r.method === 'GET');
    req.flush({ data: mockData });
  });

  it('should call GET and return certificacionSAT data', () => {
    const RFC = 'ABC123456789';
    const MOCK_RESPONSE: JSONRespuesta<{ certificacionSAT: string }> = {
      datos: { certificacionSAT: 'CERT-OK' },
      mensaje: ''
    };

    service.obtenerDatosCertificacionSAT(RFC).subscribe((resp) => {
      expect(resp).toEqual(MOCK_RESPONSE);
    });

    const req = httpMock.expectOne(PROC_80301.CERTIFICACION_SAT + RFC);

    expect(req.request.method).toBe('GET');

    req.flush(MOCK_RESPONSE);
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

    expect(storeSpy.setDatosModificacion).toHaveBeenCalledWith(
      datos.datosModificacion
    );
  });

  it('obtenerTramiteDatos should return tramite datos', () => {
    const mockData: Solicitud80301StateObj = { some: 'data' } as any;

    service.obtenerTramiteDatos().subscribe((result) => {
      expect(result).toEqual(mockData);
    });

    const req = httpMock.expectOne((r) => r.method === 'GET');
    req.flush(mockData);
  });
});