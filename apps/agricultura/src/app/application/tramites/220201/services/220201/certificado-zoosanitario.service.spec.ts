import { TestBed } from '@angular/core/testing';
import { CertificadoZoosanitarioServiceService } from './certificado-zoosanitario.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ZoosanitarioStore } from '../../estados/220201/zoosanitario.store';
import { SeccionLibStore } from '@libs/shared/data-access-user/src';
import { of } from 'rxjs';

describe('CertificadoZoosanitarioServiceService', () => {
  let service: CertificadoZoosanitarioServiceService;
  let mockZoosanitarioStore: any;

  const MOCK_STORE_DATA = {
    datosDeLaSolicitud: { tipoMercancia: 'yes' },
    datosParaMovilizacionNacional: {},
    pagoDeDerechos: {},
    validarEnvio: {},
    tercerosRelacionados: [],
  };

  beforeEach(() => {
    mockZoosanitarioStore = {
      _select: jest.fn().mockReturnValue(of(MOCK_STORE_DATA)),
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
      expect(data).toEqual(MOCK_STORE_DATA);
      done();
    });
  });
  it('should call http.get with the correct URL in obtenerRespuestaPorUrl', (done) => {
    const HTTP_CLIENT_SPY = { get: jest.fn() };
    const TEST_URL = 'testfile.json';
    const EXPECTED_URL = `../../../../../assets/json/220201/${TEST_URL}`;
    const EXPECTED_RESPONSE = { some: 'data' };

    // Replace the http client in the service with our spy
    (service as any).http = HTTP_CLIENT_SPY;
    HTTP_CLIENT_SPY.get.mockReturnValue(of(EXPECTED_RESPONSE));

    service.obtenerRespuestaPorUrl(TEST_URL).subscribe((resp) => {
      expect(HTTP_CLIENT_SPY.get).toHaveBeenCalledWith(EXPECTED_URL);
      expect(resp).toEqual(EXPECTED_RESPONSE);
      done();
    });
  });
  it('should return all form data from store via getFormData()', (done) => {
    service.getFormData().subscribe((data) => {
      expect(mockZoosanitarioStore._select).toHaveBeenCalled();
      expect(data).toEqual(MOCK_STORE_DATA);
      done();
    });
  });
  it('should return validarEnvio from store via getValidarEnvio()', (done) => {
    const VALIDAR_ENVIO_MOCK = { seccion1: true, seccion2: false };
    mockZoosanitarioStore._select.mockReturnValueOnce(of(VALIDAR_ENVIO_MOCK));

    service.getValidarEnvio().subscribe((data) => {
      expect(mockZoosanitarioStore._select).toHaveBeenCalledWith(expect.any(Function));
      expect(data).toEqual(VALIDAR_ENVIO_MOCK);
      done();
    });
  });
  
});
