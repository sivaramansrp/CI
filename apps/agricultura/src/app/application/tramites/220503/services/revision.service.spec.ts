import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { RevisionService } from './revision.service';
import { RespuestaCatalogos } from '@libs/shared/data-access-user/src';
import { PagoDeDerechos } from '../models/pago-de-derechos.model';
import { Solicitud220503State } from '../estados/tramites220503.store';
import { Movilizacion } from '../models/datos-generales.model';

jest.mock('@angular/common/http');

describe('RevisionService', () => {
  let service: RevisionService;
  let httpClientMock: jest.Mocked<HttpClient>;

  beforeEach(() => {
    httpClientMock = {
      get: jest.fn()
    } as any;
    service = new RevisionService(httpClientMock);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get AduanaIngreso', (done) => {
    const mockData: RespuestaCatalogos = { data: [], code: 200, message: '' };
    httpClientMock.get.mockReturnValue(of(mockData));
    service.getAduanaIngreso().subscribe(res => {
      expect(res).toEqual(mockData);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/220503/aduana-ingreso.json');
      done();
    });
  });

  it('should get OficianaInspeccion', (done) => {
    const mockData: RespuestaCatalogos = { data: [], code: 200, message: '' };
    httpClientMock.get.mockReturnValue(of(mockData));
    service.getOficianaInspeccion().subscribe(res => {
      expect(res).toEqual(mockData);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/220503/oficiana-de-inspeccion.json');
      done();
    });
  });

  it('should get PuntoInspeccion', (done) => {
    const mockData: RespuestaCatalogos = { data: [], code: 200, message: '' };
    httpClientMock.get.mockReturnValue(of(mockData));
    service.getPuntoInspeccion().subscribe(res => {
      expect(res).toEqual(mockData);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/220503/punto-de-inspeccion.json');
      done();
    });
  });

  it('should get Establecimiento', (done) => {
    const mockData: RespuestaCatalogos = { data: [], code: 200, message: '' };
    httpClientMock.get.mockReturnValue(of(mockData));
    service.getEstablecimiento().subscribe(res => {
      expect(res).toEqual(mockData);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/220503/establecimiento.json');
      done();
    });
  });

  it('should get RegimenDestinaran', (done) => {
    const mockData: RespuestaCatalogos = { data: [], code: 200, message: '' };
    httpClientMock.get.mockReturnValue(of(mockData));
    service.getRegimenDestinaran().subscribe(res => {
      expect(res).toEqual(mockData);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/220503/regimen-destinaran.json');
      done();
    });
  });

  it('should get MovilizacionNacional', (done) => {
    const mockData: RespuestaCatalogos = { data: [], code: 200, message: '' };
    httpClientMock.get.mockReturnValue(of(mockData));
    service.getMovilizacionNacional().subscribe(res => {
      expect(res).toEqual(mockData);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/220503/movilizacion-nacional.json');
      done();
    });
  });

  it('should get PuntoVerificacion', (done) => {
    const mockData: RespuestaCatalogos = { data: [], code: 200, message: '' };
    httpClientMock.get.mockReturnValue(of(mockData));
    service.getPuntoVerificacion().subscribe(res => {
      expect(res).toEqual(mockData);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/220503/punto-verificacion.json');
      done();
    });
  });

  it('should get EmpresaTransportista', (done) => {
    const mockData: RespuestaCatalogos = { data: [], code: 200, message: '' };
    httpClientMock.get.mockReturnValue(of(mockData));
    service.getEmpresaTransportista().subscribe(res => {
      expect(res).toEqual(mockData);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/220503/empresa-transportista.json');
      done();
    });
  });

  it('should get Justificacion', (done) => {
    const mockData: RespuestaCatalogos = { data: [], code: 200, message: '' };
    httpClientMock.get.mockReturnValue(of(mockData));
    service.getJustificacion().subscribe(res => {
      expect(res).toEqual(mockData);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/220503/justificacion.json');
      done();
    });
  });

  it('should get Banco', (done) => {
    const mockData: RespuestaCatalogos = { data: [], code: 200, message: '' };
    httpClientMock.get.mockReturnValue(of(mockData));
    service.getBanco().subscribe(res => {
      expect(res).toEqual(mockData);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/220503/banco.json');
      done();
    });
  });

  it('should get PagoDeDerechos', (done) => {
    const mockData: PagoDeDerechos = {
      exentoPagoNo: 'false',
      exentoPagoSi: 'false',
      justificacion: '',
      claveReferencia: '',
      fetchapago: '',
      banco: 0,
      cadenaDependencia: '',
      llavePago: '',
      importePago: '0'
    };
    httpClientMock.get.mockReturnValue(of(mockData));
    service.getPagoDeDerechos().subscribe(res => {
      expect(res).toEqual(mockData);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/220503/pago-de-derechos.json');
      done();
    });
  });

  it('should get DatosDelaSolicitud', (done) => {
    const mockData = { solicitud: 'test' } as unknown as Solicitud220503State;
    httpClientMock.get.mockReturnValue(of(mockData));
    service.getDatosDelaSolicitud().subscribe(res => {
      expect(res).toEqual(mockData);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/220503/datos-dela-solicitud.json');
      done();
    });
  });

  it('should get Movilizacion', (done) => {
    const mockData: Movilizacion = {
      coordenadas: '',
      nombre: '',
      medio: '',
      transporte: '',
      punto: ''
    };
    httpClientMock.get.mockReturnValue(of(mockData));
    service.getMovilizacion().subscribe(res => {
      expect(res).toEqual(mockData);
      expect(httpClientMock.get).toHaveBeenCalledWith('assets/json/220503/movilizacion.json');
      done();
    });
  });
});
