import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AutoridadService } from './autoridad.service';
import { CatalogosSelect } from '@libs/shared/data-access-user/src';
import { RespuestaContenedor } from '../models/datos-tramite.model';

describe('AutoridadService', () => {
  let service: AutoridadService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AutoridadService],
    });
    service = TestBed.inject(AutoridadService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch tramite list', (done) => {
    const mockResponse: CatalogosSelect = {
      catalogos: [
        {
          id: 1,
          descripcion: 'Documentos',
        },
        {
          id: 2,
          descripcion: 'Documentos 1',
        },
        {
          id: 3,
          descripcion: 'Documentos 2',
        },
      ],
      required: false,
      labelNombre: 'Tipo de trámite',
      primerOpcion: 'Seleccione un valor',
    };

    service.obtenerTramiteLista().subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne('assets/json/32401/tipo-de-tramite.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch aduana list', (done) => {
    const mockResponse: CatalogosSelect = {
      catalogos: [
        {
          id: 1,
          descripcion: 'Documentos',
        },
        {
          id: 2,
          descripcion: 'Documentos 1',
        },
        {
          id: 3,
          descripcion: 'Documentos 2',
        },
      ],
      required: false,
      labelNombre: 'Tipo de trámite',
      primerOpcion: 'Seleccione un valor',
    };

    service.obtenerAduanaLista().subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne(
      'assets/json/32401/tipo-de-requerimiento.json'
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch solicitud data', (done) => {
    const mockResponse: RespuestaContenedor = {
      success: true,
      message: 'Solicitud enviada exitosamente',
      datos: {
        id: 1,
        folioTramite: '0100300701020160301001711',
        tipoTramite:
          'Aviso de Modificación para Certificación en Materia de IVA e IEPS ',
        rfc: 'RDC070320K75',
        razonSocial: 'RDCM S DE RL DE CV',
        estadoDelTramite: 'Concluido',
      },
    };

    service.agregarSolicitud().subscribe((response) => {
      expect(response).toEqual(mockResponse);
      done();
    });

    const req = httpMock.expectOne('assets/json/32401/contenedorLista.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
