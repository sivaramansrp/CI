import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ModificacionDescripcionService } from './modificacion-descripcion.service';
import { PartidasLista, ArancelariaLista, SolicitudLista, MercanciaLista, MercanciaTablaLista, RespuestaConsulta } from '../models/modificacion-descripcion.model';

describe('ModificacionDescripcionService', () => {
  let service: ModificacionDescripcionService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ModificacionDescripcionService],
    });

    service = TestBed.inject(ModificacionDescripcionService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch the list of partidas', () => {
    const mockResponse: PartidasLista = {
      datos: [{
        "id": 1,
        "cantidad": "100",
        "descripcion": "PRUEBA QA",
        "precioUnitarioUSD": "1",
        "totalUSD": "100"
      }]
    };

    service.obtenerPartidas().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/130401/partidas.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch the list of arancelarias', () => {
    const mockResponse: ArancelariaLista = {
      datos: [{
        "id": 1,
        "fraccionArancelaria": "87033302",
        "descripcion": "PRUEBAS QA"
      }]
    };

    service.obtenerarancelaria().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/130401/arancelaria.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch the list of solicitudes', () => {
    const mockResponse: SolicitudLista = {
      datos: {
        "numeroFolioTramiteOriginal": "0201300100320242540000014",
        "solicitud": "1",
        "regimen": "Definitivos",
        "clasificacionRegimen": "De importación",
        "condicionMercancia": "0",
        "mercanciaDescripcion": "PRUEBA QA PAU",
        "fraccionArancelaria": "98020019- Mercancías para el Programa ",
        "unidadMedidaComercial": "Caja",
        "unidadesAutorizadas": "100",
        "importeFacturaAutorizadoUSD": "100",
        "usoEspecifico": "",
        "justificacionImportacionExportacion": "PRUEBAS QA",
        "observaciones": "",
        "representacionFederal": "CULIACAN"
      }
    };

    service.obtenerSolicitud().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/130401/solicitud.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch the list of mercancías', () => {
    const mockResponse: MercanciaLista = {
      datos: {
        "numeroFolioResolucion": "2540R824038180",
        "cantidadLibreMercancia": "100",
        "descripcion": "PRUEBA QA PAU",
        "descripcionModificacion": ""
      }
    };

    service.obtenerMercancia().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/130401/mercancia.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch the data for the mercancía table', () => {
    const mockResponse: MercanciaTablaLista = {
      datos: [{
        "id": 1,
        "cantidad": "100",
        "descripcionSolicitada": "PRUEBA QA",
        "descripcionAutorizada": "PRUEBA QA",
        "precioUnitarioUSD": "1",
        "totalUSD": "100"
      }]
    };

    service.obtenerMercanciaTabla().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/130401/mercancia-tabla.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  it('should fetch data for consulta', () => {
    const mockResponse: RespuestaConsulta = {
      success: true,
      message: "",
      datos: {
        "datosSolicitud": {
          "numeroFolioTramiteOriginal": "0201300100320242540000014",
          "solicitud": "1",
          "regimen": "Definitivos",
          "clasificacionRegimen": "De importación",
          "condicionMercancia": "0",
          "mercanciaDescripcion": "PRUEBA QA PAU",
          "fraccionArancelaria": "98020019- Mercancías para el Programa de Promoción Sectorial de la Industria Automotriz y de Autopartes, cuando las empresas cuenten con la autorización a que se refiere la Regla 8a de las Complementarias, para la interpretación y aplicación de la Tarifa de la Ley de los Impuestos Generales de Importación y de Exportación,",
          "unidadMedidaComercial": "Caja",
          "unidadesAutorizadas": "100",
          "importeFacturaAutorizadoUSD": "100",
          "usoEspecifico": "CANCULIACAN",
          "justificacionImportacionExportacion": "PRUEBAS QA",
          "observaciones": "PRUEBAS",
          "representacionFederal": "CULIACAN"
        },
        "mercancia": {
          "numeroFolioResolucion": "2540R824038180",
          "cantidadLibreMercancia": "100",
          "descripcion": "PRUEBA QA PAU",
          "descripcionModificacion": "PRUEBA QA PAU MODIFICADA"
        },
        "mercanciaTablaDatos": [
          {
            "id": 1,
            "cantidad": "100",
            "descripcionSolicitada": "PRUEBA QA",
            "descripcionAutorizada": "PRUEBA QA",
            "precioUnitarioUSD": "1",
            "totalUSD": "100"
          }
        ]
      }
    };

    service.getDatosConsulta().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/130401/consulta-130401.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});