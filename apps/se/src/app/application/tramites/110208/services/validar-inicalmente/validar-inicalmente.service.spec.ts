import { TestBed } from '@angular/core/testing';
import { ValidarInicalmenteService } from './validar-inicalmente.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ValidarInicalmenteService', () => {
  let service: ValidarInicalmenteService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ValidarInicalmenteService]
    });
    service = TestBed.inject(ValidarInicalmenteService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch estado list', () => {
    const mockResponse = { data: [{ id: 1, nombre: 'Estado1' }] };
    service.obtenerEstadoList().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/110208/seleccion.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch form datos', () => {
    const mockResponse = { data: [{ id: 1, nombre: 'FormDato1' }] };
    service.obtenerFormDatos().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/110208/mercancia-datos.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch tabla datos', () => {
    const mockResponse = { data: [{ id: 1, nombre: 'TablaDato1' }] };
    service.obtenerTablaDatos().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/110208/mercancias-tabla.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch tabla datos certificado', () => {
    const mockResponse = { data: [{ id: 1, nombre: 'CertificadoDato1' }] };
    service.obtenerTablaDatosCertificado().subscribe(res => {
      expect(res).toEqual(mockResponse);
    });
    const req = httpMock.expectOne('assets/json/110208/certificado-tabla.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});