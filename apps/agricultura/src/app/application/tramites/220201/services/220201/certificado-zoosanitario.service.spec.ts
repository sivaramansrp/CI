import { TestBed } from '@angular/core/testing';
import { CertificadoZoosanitarioServiceService } from './certificado-zoosanitario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ZoosanitarioStore } from '../../estados/220201/zoosanitario.store';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
import { of } from 'rxjs';

describe('CertificadoZoosanitarioServiceService', () => {
  let service: CertificadoZoosanitarioServiceService;
  let mockZoosanitarioStore: any;

  const mockStoreData = {
    datosDeLaSolicitud: { tipoMercancia: 'yes' },
    datosParaMovilizacionNacional: {},
    pagoDeDerechos: {},
    validarEnvio: {},
    tercerosRelacionados: [],
  };

  beforeEach(() => {
    mockZoosanitarioStore = {
      _select: jest.fn().mockReturnValue(of(mockStoreData)),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        CertificadoZoosanitarioServiceService,
        { provide: ZoosanitarioStore, useValue: mockZoosanitarioStore },
        { provide: SeccionLibStore, useValue: {} },
      ],
    });

    service = TestBed.inject(CertificadoZoosanitarioServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all form data from store via getAllDatosForma()', (done) => {
    service.getAllDatosForma().subscribe((data) => {
      expect(mockZoosanitarioStore._select).toHaveBeenCalled();
      expect(data).toEqual(mockStoreData);
      done();
    });
  });
  it('should call http.get with the correct URL in obtenerRespuestaPorUrl', (done) => {
    const httpClientSpy = { get: jest.fn() };
    const testUrl = 'testfile.json';
    const expectedUrl = `../../../../../assets/json/220201/${testUrl}`;
    const expectedResponse = { some: 'data' };

    // Replace the http client in the service with our spy
    (service as any).http = httpClientSpy;
    httpClientSpy.get.mockReturnValue(of(expectedResponse));

    service.obtenerRespuestaPorUrl(testUrl).subscribe((resp) => {
      expect(httpClientSpy.get).toHaveBeenCalledWith(expectedUrl);
      expect(resp).toEqual(expectedResponse);
      done();
    });
  });
  it('should return all form data from store via getFormData()', (done) => {
    service.getFormData().subscribe((data) => {
      expect(mockZoosanitarioStore._select).toHaveBeenCalled();
      expect(data).toEqual(mockStoreData);
      done();
    });
  });
  it('should return validarEnvio from store via getValidarEnvio()', (done) => {
    const validarEnvioMock = { seccion1: true, seccion2: false };
    mockZoosanitarioStore._select.mockReturnValueOnce(of(validarEnvioMock));

    service.getValidarEnvio().subscribe((data) => {
      expect(mockZoosanitarioStore._select).toHaveBeenCalledWith(expect.any(Function));
      expect(data).toEqual(validarEnvioMock);
      done();
    });
  });
  
});
