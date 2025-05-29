import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SolicitudPantallasService } from './solicitud-pantallas.service';
import { CargarDatosIniciales, TipoContenedor, DatosDelTramiteRealizar } from '../models/solicitud-pantallas.model';

describe('SolicitudPantallasService', () => {
  let service: SolicitudPantallasService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SolicitudPantallasService],
    });
    service = TestBed.inject(SolicitudPantallasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch CargarDatosIniciales data', () => {
    const mockData: CargarDatosIniciales = {
      hHistorialinspeccion: [],
      dHistorialInspecciones: [],
      dCarrosDeFerrocarril: [],
      hCarroFerrocarril: [],
        hSolicitud:[],
        dSolicitud: [],
        hMerchandise: [],
        dMercancia: [],
        medioDeTransporte:
          {labelNombre: "string",
          required: true,
          primerOpcion: "string",
          catalogos: []
        }
      // Add other required properties with mock values here
    };

    service.getData().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('../../../assets/json/220503/solicitud-pantallas-mock-data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch DatosDelTramiteRealizar data', () => {
    const mockData: DatosDelTramiteRealizar = {   /** Clave de control */
      pendientesCertificados:[],
      horaInspeccion:[],
      aduanaIngreso:[],
      sanidadAgropecuaria:[],
      puntoInspeccion:[]};

    service.getDataDatosDelTramite().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('../../../assets/json/220503/solicitud-pantallas-mock-data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should fetch TipoContenedor data', () => {
    const mockData: TipoContenedor = { tipoContenedor:{labelNombre: "string",
      required: true,
      primerOpcion: "string",
      catalogos: []
    } };

    service.getDataResponsableInspeccion().subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne('../../../assets/json/220503/solicitud-pantallas-mock-data.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });
});