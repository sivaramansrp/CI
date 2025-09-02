import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ValidacionPosterioriService } from './validacion-posteriori.service';
import { CatalogoLista, DisponiblesTabla, ProductorExportador, RespuestaConsulta, SeleccionadasTabla } from '../models/validacion-posteriori.model';

describe('ValidacionPosterioriService', () => {
  let service: ValidacionPosterioriService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ValidacionPosterioriService],
    });

    service = TestBed.inject(ValidacionPosterioriService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch idiomas from the correct URL', () => {
    const mockResponse: CatalogoLista = {
      "datos": [
        {
          "id": 0,
          "descripcion": "ALEMANIA (REPUBLICA FEDERAL DE)"
        }
      ]
    };

    service.obtenerIdioma().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110212/idioma.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simulate the HTTP response
  });

  it('should fetch entidades federativas from the correct URL', () => {
    const mockResponse: CatalogoLista = {
      "datos": [
        {
          "id": 0,
          "descripcion": "ALEMANIA (REPUBLICA FEDERAL DE)"
        }
      ]
    };

    service.obtenerEntidadFederativa().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110212/entidad-federativa.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simulate the HTTP response
  });

  it('should fetch representaciones federales from the correct URL', () => {
    const mockResponse: CatalogoLista = {
      "datos": [
        {
          "id": 0,
          "descripcion": "ALEMANIA (REPUBLICA FEDERAL DE)"
        }
      ]
    };

    service.obtenerRepresentacionFederal().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110212/representacion-federal.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simulate the HTTP response
  });

  it('should fetch productores/exportadores from the correct URL', () => {
    const mockResponse: ProductorExportador = {
      "datos": [
        {
          "id": 0,
          "nombreProductor": "LAURA CONTRERAS",
          "numeroRegistroFiscal": "AEVL621207B95",
          "direccion": "SAN GABRIEL 144 DURANGO",
          "correoElectronico": "laura2992@hotmail.com",
          "telefono": "044-6182999535",
          "fax": "6182999535"
        },
      ]
    };

    service.obtenerProductorPorExportador().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110212/productor-exportador.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simulate the HTTP response
  });

  it('should fetch productor por exportador from the correct URL', () => {
    const mockResponse: ProductorExportador = {
      "datos": [
        {
          "id": 0,
          "nombreProductor": "LAURA CONTRERAS",
          "numeroRegistroFiscal": "AEVL621207B95",
          "direccion": "SAN GABRIEL 144 DURANGO",
          "correoElectronico": "laura2992@hotmail.com",
          "telefono": "044-6182999535",
          "fax": "6182999535"
        },
      ]
    };

    service.obtenerProductorPorExportador().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110212/productor-exportador.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simulate the HTTP response
  });

  it('should fetch mercancías disponibles from the correct URL', () => {
    const mockResponse: DisponiblesTabla[] = [
      {
        "fraccionArancelaria": "34029002",
        "nombreTecnico": "Composiciones constituidas por polialquifenol-formaldehido oxietilado y/o polioxipropileno oxietilado, aunque contengan solventes orgánicos, para la fabricación de de hulsificantes para la industria petrolera.",
        "nombreComercial": "PRUEBA DE LA FIRMA DE ORIGEN",
        "numeroRegistroProductos": "254023028918",
        "fechaVencimiento": "2033-04-26",
        "fechaExpedicion": "2033-03-23"
      }
    ];

    service.obtenerMercanciasDisponibles().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110212/mercancia-disponsible.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simulate the HTTP response
  });

  it('should fetch mercancías seleccionadas from the correct URL', () => {
    const mockResponse: SeleccionadasTabla[] = [
      {
        "id": 0,
        "fraccionArancelaria": "08888888",
        "cantidad": "100.00",
        "unidadMedida": "Caja",
        "valorMercancia": "100.00",
        "tipoFactura": "Manual",
        "numFactura": "1122232",
        "complementoDescripcion": "CAJA ROJA GRANDE",
        "fechaFactura": "2015-03-01"
      }
    ];

    service.obtenerMercanciasSeleccionadas().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110212/mercancias-seleccionadas.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simulate the HTTP response
  });

  it('should fetch tratados from the correct URL', () => {
    const mockResponse: CatalogoLista = {
      "datos": [
        {
          "id": 0,
          "descripcion": "ALEMANIA (REPUBLICA FEDERAL DE)"
        }
      ]
    };

    service.obtenerTratado().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110212/pais.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simulate the HTTP response
  });

  it('should fetch países from the correct URL', () => {
    const mockResponse: CatalogoLista = {
      "datos": [
        {
          "id": 0,
          "descripcion": "ALEMANIA (REPUBLICA FEDERAL DE)"
        }
      ]
    };

    service.obtenerPais().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110212/pais.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse); // Simulate the HTTP response
  });

  it('should fetch getDatosConsulta', () => {
    const mockResponse: RespuestaConsulta = {
      "success": true,
      "message": "",
      "datos": {
        "tercerOperador": true,
        "grupoOperador": {
          "nombre": "Nombre",
          "apellidoPrimer": "Primer",
          "apellidoSegundo": "Segundo",
          "numeroFiscal": "fiscal",
          "razonSocial": "https://www.google.com"
        },
        "grupoTratado": {
          "tratado": "0",
          "pais": "5",
          "fraccionArancelaria": "1",
          "numeroRegistro": "producto",
          "nombreComercial": "comercial",
          "fechaFinalInput": "05/06/2025",
          "fechaInicialInput": "05/06/2025"
        },
        "mercanciaSeleccionadasTablaDatos": [
          {
            "id": 0,
            "fraccionArancelaria": "08888888",
            "cantidad": "100.00",
            "unidadMedida": "Caja",
            "valorMercancia": "100.00",
            "tipoFactura": "Manual",
            "numFactura": "1122232",
            "complementoDescripcion": "CAJA ROJA GRANDE",
            "fechaFactura": "2015-03-01"
          }
        ],
        "mercanciaDisponsiblesTablaDatos": [
          {
            "fraccionArancelaria": "34029002",
            "nombreTecnico": "Composiciones constituidas por polialquifenol-formaldehido oxietilado y/o polioxipropileno oxietilado, aunque contengan solventes orgánicos, para la fabricación de de hulsificantes para la industria petrolera.",
            "nombreComercial": "PRUEBA DE LA FIRMA DE ORIGEN",
            "numeroRegistroProductos": "254023028918",
            "fechaVencimiento": "2033-04-26",
            "fechaExpedicion": "2033-03-23"
          }
        ],
        "observaciones": "Observaciones",
        "idioma": "1",
        "entidadFederativa": "7",
        "representacionFederal": "1",
        "grupoReceptor": {
          "nombre": "Nombre",
          "apellidoPrimer": "Primer ",
          "apellidoSegundo": "Segundo",
          "numeroFiscal": "fiscal",
          "razonSocial": "https://www.google.com"
        },
        "grupoDeDirecciones": {
          "ciudad": "provincia",
          "calle": "Calle",
          "numeroLetra": "letra",
          "lada": "11",
          "telefono": "123456789",
          "fax": "12345",
          "correoElectronico": "test@gmail.com",
          "pais": "México"
        },
        "grupoCertificadoOrigen": {
          "pais": "México",
          "ciudad": "Ciudad Certificado",
          "calle": "Calle Certificado",
          "numeroLetra": "123",
          "lada": "55",
          "telefono": "987654321",
          "fax": "54321",
          "correoElectronico": "certificado@test.com"
        },
        "grupoRepresentativo": {
          "lugar": "Lugar",
          "nombreExportador": "exportador",
          "empresa": "Empresa",
          "cargo": "Cargo",
          "lada": "11",
          "telefono": "123456789",
          "fax": "12345",
          "correoElectronico": "test@gmail.com"
        }
      }
    };

    service.getDatosConsulta().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('assets/json/110212/consulta-110212.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
  
});