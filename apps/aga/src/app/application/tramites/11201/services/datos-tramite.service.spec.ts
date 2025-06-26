import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DatosTramiteService } from './datos-tramite.service';
import { RespuestaApi, RespuestaAduanas, RespuestaConsulta } from '@libs/shared/data-access-user/src/core/models/11201/datos-tramite.model';
import { RespuestaCatalogos } from "@libs/shared/data-access-user/src";


describe('DatosTramiteService', () => {
  let service: DatosTramiteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DatosTramiteService],
    });

    service = TestBed.inject(DatosTramiteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch contenedores data', () => {
    const mockResponse: RespuestaCatalogos = {
      code: 200,
      data: [{ id: 1, descripcion: 'Contenedor 1' }],
      message: ''
    };

    service.getContenedores().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/11201/tipoLista.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should simulate file upload', () => {
    const mockResponse: RespuestaApi = { success: true, message: 'File uploaded successfully' };

    service.uploadArchivo().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/11201/contenedorLista.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should simulate form submission', () => {
    const mockResponse: RespuestaAduanas =
    {
      code: 200,
      data: [{ id: 1, descripcion: 'Aduana 1' }],
      message: ''
    };
    service.submitSolicitud().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/11201/aduanaList.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch table data', () => {
    const mockResponse: RespuestaCatalogos = {
      code: 200,
      data: [{ id: 1, descripcion: 'Contenedor 1' }],
      message: ''
    };;

    service.getDatosTableData().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/11201/datosTabla.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch datos del solicitante', () => {
    const mockResponse: RespuestaCatalogos = {
      code: 200,
      data: [{ id: 1, descripcion: 'Contenedor 1' }],
      message: ''
    };;

    service.getDatosSolicitante().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/11201/datosSolicitante.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch consulta data', () => {
    const mockResponse: RespuestaConsulta =
    {
      success: true,
      datos: {
        "tipoBusqueda": "Contenedor",
        "aduana": "0",
        "fechaIngreso": "15/10/2025",
        "inicialesContenedor": "equipo",
        "numeroContenedor": "equipo",
        "digitoDeControl": "1",
        "contenedores": "C11223",
        "aduanaMenuDesplegable": "0",
        "fechaDeIngreso": "15/10/2025",
        "menuDesplegable": "0",
        "numeroManifiesta": "1",
        "datosDelContenedor": [
          {
            "id": 1,
            "inicialesEquipo": "BBZM",
            "numeroEquipo": 1098765,
            "digitoVerificador": 4,
            "tipoEquipo": "AC",
            "aduana": 430,
            "fechaIngreso": "2024-03-13",
            "vigencia": "2025-03-13",
            "estadoConstancia": "Válido",
            "existeEnVUCEM": "Sí",
            "idConstancia": "CONST12345",
            "numeroManifiesto": "MANI67890",
            "idSolicitud": "SOLICITUD001",
            "fechaInicio": "2024-03-01"
          }
        ]
      },
      message: ''
    };

    service.getDatosConsulta().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/11201/consulta_11201.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});